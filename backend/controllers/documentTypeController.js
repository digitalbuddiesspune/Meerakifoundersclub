import DocumentType, { DEFAULT_DOCUMENT_TYPE_GROUPS } from "../models/documentType.js";

export const getDocumentTypes = async (req, res) => {
  try {
    const documentTypes = await DocumentType.find().sort({
      categoryOrder: 1,
      createdAt: -1,
    });
    return res.status(200).json(documentTypes);
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch document types" });
  }
};

export const addDocumentType = async (req, res) => {
  try {
    const { categoryName, categoryOrder, documents = [], isActive = true } = req.body;

    if (!categoryName || categoryOrder === undefined || categoryOrder === null) {
      return res.status(400).json({
        message: "categoryName and categoryOrder are required",
      });
    }

    const documentType = await DocumentType.create({
      categoryName,
      categoryOrder,
      documents: Array.isArray(documents) ? documents : [],
      isActive,
    });
    return res.status(201).json({
      message: "Document category added successfully",
      documentType,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({ message: "Document category already exists" });
    }
    return res.status(500).json({ message: "Failed to add document category" });
  }
};

export const updateDocumentTypeById = async (req, res) => {
  try {
    const { id } = req.params;
    const { categoryName, categoryOrder, isActive } = req.body;

    const payload = {};
    if (categoryName !== undefined) payload.categoryName = categoryName;
    if (categoryOrder !== undefined) payload.categoryOrder = categoryOrder;
    if (isActive !== undefined) payload.isActive = isActive;

    if (!Object.keys(payload).length) {
      return res.status(400).json({ message: "No fields provided for update" });
    }

    const updatedDocumentType = await DocumentType.findByIdAndUpdate(id, payload, {
      new: true,
      runValidators: true,
    });

    if (!updatedDocumentType) {
      return res.status(404).json({ message: "Document type not found" });
    }

    return res.status(200).json({
      message: "Document category updated successfully",
      documentType: updatedDocumentType,
    });
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({ message: "Invalid document type id" });
    }
    if (error.code === 11000) {
      return res.status(409).json({ message: "Document category already exists" });
    }
    return res.status(500).json({ message: "Failed to update document category" });
  }
};

export const deleteDocumentTypeById = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedDocumentType = await DocumentType.findByIdAndDelete(id);
    if (!deletedDocumentType) {
      return res.status(404).json({ message: "Document type not found" });
    }

    return res.status(200).json({ message: "Document type deleted successfully" });
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({ message: "Invalid document type id" });
    }
    return res.status(500).json({ message: "Failed to delete document type" });
  }
};

export const seedDefaultDocumentTypes = async (req, res) => {
  try {
    // Cleanup old indexes from flat schema migration.
    try {
      await DocumentType.collection.dropIndex("parentCategory_1_documentName_1");
    } catch {}
    try {
      await DocumentType.collection.dropIndex("parentOrder_1_order_1_createdAt_-1");
    } catch {}

    const seedPayload = DEFAULT_DOCUMENT_TYPE_GROUPS.map((group, parentIndex) => ({
      categoryName: group.parentCategory,
      categoryOrder: parentIndex + 1,
      isActive: true,
      documents: group.items.map((item, itemIndex) => ({
        name: item,
        order: itemIndex + 1,
        isActive: true,
      })),
    }));

    await DocumentType.deleteMany({});
    await DocumentType.insertMany(seedPayload);

    return res.status(201).json({
      message: "Default document categories seeded successfully",
      insertedCount: seedPayload.length,
      updatedCount: 0,
    });
  } catch (error) {
    return res.status(500).json({ message: "Failed to seed default document types" });
  }
};

export const addDocumentItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, order, isActive = true } = req.body;

    if (!name || order === undefined || order === null) {
      return res.status(400).json({ message: "name and order are required" });
    }

    const documentType = await DocumentType.findById(id);
    if (!documentType) {
      return res.status(404).json({ message: "Document category not found" });
    }

    const isDuplicateName = documentType.documents.some(
      (item) => String(item.name).trim().toLowerCase() === String(name).trim().toLowerCase()
    );
    if (isDuplicateName) {
      return res.status(409).json({ message: "Document name already exists in this category" });
    }

    documentType.documents.push({ name, order, isActive });
    await documentType.save();

    return res.status(201).json({
      message: "Document item added successfully",
      documentType,
    });
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({ message: "Invalid document type id" });
    }
    return res.status(500).json({ message: "Failed to add document item" });
  }
};

export const updateDocumentItem = async (req, res) => {
  try {
    const { id, itemId } = req.params;
    const { name, order, isActive } = req.body;

    const documentType = await DocumentType.findById(id);
    if (!documentType) {
      return res.status(404).json({ message: "Document category not found" });
    }

    const targetItem = documentType.documents.id(itemId);
    if (!targetItem) {
      return res.status(404).json({ message: "Document item not found" });
    }

    if (name !== undefined) targetItem.name = name;
    if (order !== undefined) targetItem.order = order;
    if (isActive !== undefined) targetItem.isActive = isActive;

    await documentType.save();
    return res.status(200).json({
      message: "Document item updated successfully",
      documentType,
    });
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({ message: "Invalid id" });
    }
    return res.status(500).json({ message: "Failed to update document item" });
  }
};

export const deleteDocumentItem = async (req, res) => {
  try {
    const { id, itemId } = req.params;

    const documentType = await DocumentType.findById(id);
    if (!documentType) {
      return res.status(404).json({ message: "Document category not found" });
    }

    const targetItem = documentType.documents.id(itemId);
    if (!targetItem) {
      return res.status(404).json({ message: "Document item not found" });
    }

    targetItem.deleteOne();
    await documentType.save();

    return res.status(200).json({
      message: "Document item deleted successfully",
      documentType,
    });
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({ message: "Invalid id" });
    }
    return res.status(500).json({ message: "Failed to delete document item" });
  }
};
