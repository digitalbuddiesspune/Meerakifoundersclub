import mongoose from "mongoose";
import DocumentType from "../models/documentType.js";
import Service from "../models/Service.js";
import ServiceDetails from "../models/ServiceDetails.js";
import User from "../models/User.js";
import UserDocument from "../models/UserDocument.js";

const FIELD_TYPES = new Set(["text", "email", "number", "tel", "textarea"]);
const INQUIRY_PROGRESS_STATUSES = new Set(["Pending", "In Progress", "Applied", "Issued", "Closed"]);

const normalizeFormFields = (input) => {
  if (!Array.isArray(input)) return [];

  return input
    .map((field, index) => ({
      label: String(field?.label || "").trim(),
      fieldType: FIELD_TYPES.has(field?.fieldType) ? field.fieldType : "text",
      required: Boolean(field?.required),
      order: Number.isFinite(Number(field?.order)) ? Number(field.order) : index,
    }))
    .filter((field) => field.label);
};

const normalizeLinkedDocuments = (input) => {
  if (!Array.isArray(input)) return [];

  return input
    .map((row) => ({
      documentType: row?.documentType,
      documentItem: row?.documentItem,
    }))
    .filter((row) => row.documentType && row.documentItem);
};

const validateLinkedDocuments = async (linkedDocuments) => {
  const validatedLinks = [];
  const seen = new Set();

  for (const link of linkedDocuments) {
    if (!mongoose.Types.ObjectId.isValid(link.documentType) || !mongoose.Types.ObjectId.isValid(link.documentItem)) {
      return { ok: false, message: "Invalid document reference id" };
    }

    const dedupeKey = `${String(link.documentType)}:${String(link.documentItem)}`;
    if (seen.has(dedupeKey)) {
      return { ok: false, message: "Duplicate linked document is not allowed" };
    }
    seen.add(dedupeKey);

    const docType = await DocumentType.findById(link.documentType).lean();
    if (!docType) {
      return { ok: false, message: "Document category not found" };
    }

    const item = (docType.documents || []).find((d) => String(d._id) === String(link.documentItem));
    if (!item) {
      return { ok: false, message: "Document does not belong to the selected category" };
    }

    validatedLinks.push({
      documentType: docType._id,
      documentItem: item._id,
      documentTypeName: String(docType.categoryName || "").trim(),
      documentItemName: String(item.name || "").trim(),
      documentItemImage: String(item.image || "").trim(),
    });
  }

  return { ok: true, links: validatedLinks };
};

const enrichLinkedDocuments = (record) => {
  const linked = record.linkedDocuments || [];

  return linked.map((ld) => {
    const dt = ld.documentType;
    const item = dt?.documents?.find((d) => String(d._id) === String(ld.documentItem));

    return {
      _id: ld._id,
      documentType: dt?._id ?? ld.documentType,
      documentTypeName: dt?.categoryName || ld.documentTypeName || "",
      documentItem: ld.documentItem,
      documentItemName: item?.name || ld.documentItemName || null,
      documentItemImage: item?.image || ld.documentItemImage || null,
    };
  });
};

const stripIntakeSubmissions = (record) => {
  if (!record || typeof record !== "object") return record;
  const { intakeSubmissions: _omit, ...rest } = record;
  return rest;
};

/** Match user-uploaded doc rows to template names (spaces vs hyphens, case). */
const normalizeDocKey = (value) =>
  String(value || "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[-_]+/g, "-")
    .replace(/^-+|-+$/g, "");

const normalizeUserIntakeFieldValues = (bodyValues, templateFields) => {
  if (!Array.isArray(templateFields) || templateFields.length === 0) {
    return [];
  }

  const sortedTemplate = [...templateFields].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  const input = Array.isArray(bodyValues) ? bodyValues : [];

  return sortedTemplate.map((field, index) => {
    const fromClient =
      input.find(
        (v) =>
          String(v?.label || "").trim() === String(field.label || "").trim() &&
          Number(v?.order ?? -1) === Number(field.order ?? index)
      ) || input[index];

    const raw = fromClient && fromClient.value != null ? String(fromClient.value) : "";
    return {
      label: String(field.label || "").trim(),
      fieldType: FIELD_TYPES.has(field.fieldType) ? field.fieldType : "text",
      order: Number.isFinite(Number(field.order)) ? Number(field.order) : index,
      value: raw.trim().slice(0, 10000),
    };
  });
};

export const getServiceDetailsByServiceId = async (req, res) => {
  try {
    const { serviceId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(serviceId)) {
      return res.status(400).json({ message: "Invalid service id" });
    }

    const record = await ServiceDetails.findOne({ serviceId })
      .populate("linkedDocuments.documentType", "categoryName documents")
      .lean();

    if (!record) {
      return res.status(200).json({
        serviceId,
        formFields: [],
        linkedDocuments: [],
      });
    }

    const safe = stripIntakeSubmissions(record);

    return res.status(200).json({
      ...safe,
      linkedDocuments: enrichLinkedDocuments(record),
    });
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch service details" });
  }
};

export const getUserIntakeSubmission = async (req, res) => {
  try {
    const { serviceId, userId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(serviceId) || !mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid id" });
    }

    const record = await ServiceDetails.findOne({ serviceId }).select("intakeSubmissions").lean();
    if (!record) {
      return res.status(404).json({ message: "Service form not configured" });
    }

    const submission = (record.intakeSubmissions || []).find((s) => String(s.userId) === String(userId));

    if (!submission) {
      return res.status(200).json({ fieldValues: [] });
    }

    return res.status(200).json({
      fieldValues: submission.fieldValues || [],
      submittedAt: submission.submittedAt,
    });
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch intake submission" });
  }
};

export const getAllServiceInquiries = async (req, res) => {
  try {
    const records = await ServiceDetails.find({
      intakeSubmissions: { $exists: true, $not: { $size: 0 } },
    })
      .select("serviceId intakeSubmissions")
      .populate("serviceId", "name")
      .lean();

    if (!records.length) {
      return res.status(200).json([]);
    }

    const userIds = new Set();
    records.forEach((record) => {
      (record.intakeSubmissions || []).forEach((submission) => {
        if (submission?.userId) {
          userIds.add(String(submission.userId));
        }
      });
    });

    const users = await User.find({ _id: { $in: [...userIds] } })
      .select("username email phone plan")
      .lean();
    const usersById = new Map(users.map((user) => [String(user._id), user]));

    const inquiries = records
      .flatMap((record) =>
        (record.intakeSubmissions || []).map((submission) => {
          const user = usersById.get(String(submission.userId));
          return {
            serviceId: record?.serviceId?._id || record?.serviceId || null,
            serviceName: record?.serviceId?.name || "Unknown service",
            submissionId: submission?._id || null,
            userId: submission?.userId || null,
            userName: user?.username || "",
            userEmail: user?.email || "",
            userPhone: user?.phone || "",
            userPlan: user?.plan || "",
            submittedAt: submission?.submittedAt || null,
            progressStatus: INQUIRY_PROGRESS_STATUSES.has(submission?.progressStatus)
              ? submission.progressStatus
              : "Pending",
            fieldValues: Array.isArray(submission?.fieldValues) ? submission.fieldValues : [],
          };
        })
      )
      .sort((a, b) => new Date(b.submittedAt || 0).getTime() - new Date(a.submittedAt || 0).getTime());

    return res.status(200).json(inquiries);
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch service inquiries" });
  }
};

export const getServiceInquiryById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid inquiry id" });
    }

    const record = await ServiceDetails.findOne({ "intakeSubmissions._id": id })
      .select("serviceId intakeSubmissions")
      .populate("serviceId", "name")
      .lean();

    if (!record) {
      return res.status(404).json({ message: "Inquiry not found" });
    }

    const submission = (record.intakeSubmissions || []).find((item) => String(item?._id) === String(id));
    if (!submission) {
      return res.status(404).json({ message: "Inquiry not found" });
    }

    let user = null;
    if (submission.userId && mongoose.Types.ObjectId.isValid(String(submission.userId))) {
      user = await User.findById(submission.userId).select("username email phone plan").lean();
    }

    return res.status(200).json({
      serviceId: record?.serviceId?._id || record?.serviceId || null,
      serviceName: record?.serviceId?.name || "Unknown service",
      submissionId: submission?._id || null,
      userId: submission?.userId || null,
      userName: user?.username || "",
      userEmail: user?.email || "",
      userPhone: user?.phone || "",
      userPlan: user?.plan || "",
      submittedAt: submission?.submittedAt || null,
      progressStatus: INQUIRY_PROGRESS_STATUSES.has(submission?.progressStatus)
        ? submission.progressStatus
        : "Pending",
      fieldValues: Array.isArray(submission?.fieldValues) ? submission.fieldValues : [],
    });
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch service inquiry" });
  }
};

export const submitUserServiceIntake = async (req, res) => {
  try {
    const { serviceId } = req.params;
    const { userId, fieldValues: rawFieldValues } = req.body;

    if (!mongoose.Types.ObjectId.isValid(serviceId) || !mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Valid serviceId and userId are required" });
    }

    const record = await ServiceDetails.findOne({ serviceId });
    if (!record) {
      return res.status(404).json({ message: "Service form is not configured for this service." });
    }

    const normalized = normalizeUserIntakeFieldValues(rawFieldValues, record.formFields);
    const sortedTemplate = [...record.formFields].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

    for (let i = 0; i < normalized.length; i += 1) {
      const fv = normalized[i];
      const templateField = sortedTemplate[i];
      if (templateField?.required && !fv.value) {
        return res.status(400).json({ message: `Field "${fv.label}" is required.` });
      }
    }

    if (record.linkedDocuments?.length) {
      const userDocs = await UserDocument.find({ userId }).lean();
      for (const link of record.linkedDocuments) {
        const docType = await DocumentType.findById(link.documentType).lean();
        const item = docType?.documents?.find((d) => String(d._id) === String(link.documentItem));
        if (!docType || !item) {
          continue;
        }
        const wantParent = normalizeDocKey(docType.categoryName);
        const wantType = normalizeDocKey(item.name);
        const ud = userDocs.find(
          (e) => normalizeDocKey(e.parentCategory) === wantParent && normalizeDocKey(e.documentType) === wantType
        );
        if (!ud?.documents?.length) {
          return res.status(400).json({
            message: `Please upload required document: ${item.name}`,
          });
        }
      }
    }

    const idx = (record.intakeSubmissions || []).findIndex((s) => String(s.userId) === String(userId));
    const submission = {
      userId,
      fieldValues: normalized,
      submittedAt: new Date(),
      progressStatus: idx >= 0 && INQUIRY_PROGRESS_STATUSES.has(record.intakeSubmissions[idx]?.progressStatus)
        ? record.intakeSubmissions[idx].progressStatus
        : "Pending",
    };

    if (idx >= 0) {
      record.intakeSubmissions.splice(idx, 1, submission);
    } else {
      record.intakeSubmissions.push(submission);
    }

    await record.save();

    return res.status(200).json({
      message: "Intake saved successfully",
      fieldValues: normalized,
      submittedAt: submission.submittedAt,
    });
  } catch (error) {
    return res.status(500).json({ message: "Failed to save intake submission" });
  }
};

export const updateServiceInquiryProgressStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { progressStatus } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid inquiry id" });
    }

    if (!INQUIRY_PROGRESS_STATUSES.has(progressStatus)) {
      return res.status(400).json({ message: "Invalid progress status" });
    }

    const record = await ServiceDetails.findOne({ "intakeSubmissions._id": id })
      .populate("serviceId", "name");

    if (!record) {
      return res.status(404).json({ message: "Inquiry not found" });
    }

    const submission = (record.intakeSubmissions || []).find((item) => String(item?._id) === String(id));
    if (!submission) {
      return res.status(404).json({ message: "Inquiry not found" });
    }

    submission.progressStatus = progressStatus;
    await record.save();

    let user = null;
    if (submission.userId && mongoose.Types.ObjectId.isValid(String(submission.userId))) {
      user = await User.findById(submission.userId).select("username email phone plan").lean();
    }

    return res.status(200).json({
      message: "Inquiry progress updated successfully",
      inquiry: {
        serviceId: record?.serviceId?._id || record?.serviceId || null,
        serviceName: record?.serviceId?.name || "Unknown service",
        submissionId: submission?._id || null,
        userId: submission?.userId || null,
        userName: user?.username || "",
        userEmail: user?.email || "",
        userPhone: user?.phone || "",
        userPlan: user?.plan || "",
        submittedAt: submission?.submittedAt || null,
        progressStatus: submission?.progressStatus || "Pending",
        fieldValues: Array.isArray(submission?.fieldValues) ? submission.fieldValues : [],
      },
    });
  } catch (error) {
    return res.status(500).json({ message: "Failed to update inquiry progress" });
  }
};

export const createServiceDetails = async (req, res) => {
  try {
    const { serviceId, formFields = [], linkedDocuments = [] } = req.body;

    if (!serviceId || !mongoose.Types.ObjectId.isValid(serviceId)) {
      return res.status(400).json({ message: "Valid serviceId is required" });
    }

    const service = await Service.findById(serviceId);
    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }

    const existing = await ServiceDetails.findOne({ serviceId });
    if (existing) {
      return res.status(409).json({ message: "Service details already exist; use update" });
    }

    const ff = normalizeFormFields(formFields);
    const ld = normalizeLinkedDocuments(linkedDocuments);
    const check = await validateLinkedDocuments(ld);

    if (!check.ok) {
      return res.status(400).json({ message: check.message });
    }

    const created = await ServiceDetails.create({
      serviceId,
      formFields: ff,
      linkedDocuments: check.links,
    });

    const populated = await ServiceDetails.findById(created._id)
      .populate("linkedDocuments.documentType", "categoryName documents")
      .lean();

    return res.status(201).json({
      ...stripIntakeSubmissions(populated),
      linkedDocuments: enrichLinkedDocuments(populated),
    });
  } catch (error) {
    return res.status(500).json({ message: "Failed to create service details" });
  }
};

export const upsertServiceDetailsByServiceId = async (req, res) => {
  try {
    const { serviceId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(serviceId)) {
      return res.status(400).json({ message: "Invalid service id" });
    }

    const service = await Service.findById(serviceId);
    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }

    const { formFields = [], linkedDocuments = [] } = req.body;
    const ff = normalizeFormFields(formFields);
    const ld = normalizeLinkedDocuments(linkedDocuments);
    const check = await validateLinkedDocuments(ld);

    if (!check.ok) {
      return res.status(400).json({ message: check.message });
    }

    const labelSet = new Set(ff.map((f) => f.label));

    let record = await ServiceDetails.findOne({ serviceId });
    if (!record) {
      record = new ServiceDetails({ serviceId, formFields: ff, linkedDocuments: check.links });
    } else {
      record.formFields = ff;
      record.linkedDocuments = check.links;
      if (record.intakeSubmissions?.length) {
        for (const sub of record.intakeSubmissions) {
          if (sub.fieldValues?.length) {
            sub.fieldValues = sub.fieldValues.filter((fv) => labelSet.has(fv.label));
          }
        }
      }
    }

    await record.save();

    const populated = await ServiceDetails.findById(record._id)
      .populate("linkedDocuments.documentType", "categoryName documents")
      .lean();

    return res.status(200).json({
      ...stripIntakeSubmissions(populated),
      linkedDocuments: enrichLinkedDocuments(populated),
    });
  } catch (error) {
    return res.status(500).json({ message: "Failed to save service details" });
  }
};

export const deleteServiceDetailsByServiceId = async (req, res) => {
  try {
    const { serviceId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(serviceId)) {
      return res.status(400).json({ message: "Invalid service id" });
    }

    const deleted = await ServiceDetails.findOneAndDelete({ serviceId });

    if (!deleted) {
      return res.status(404).json({ message: "Service details not found" });
    }

    return res.status(200).json({ message: "Service details deleted" });
  } catch (error) {
    return res.status(500).json({ message: "Failed to delete service details" });
  }
};
