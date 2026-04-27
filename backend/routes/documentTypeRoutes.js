import express from "express";
import {
  addDocumentType,
  addDocumentItem,
  deleteDocumentItem,
  deleteDocumentTypeById,
  getDocumentTypes,
  seedDefaultDocumentTypes,
  updateDocumentItem,
  updateDocumentTypeById,
} from "../controllers/documentTypeController.js";

const documentTypeRouter = express.Router();

documentTypeRouter.get("/document-types", getDocumentTypes);
documentTypeRouter.post("/seed-document-types", seedDefaultDocumentTypes);
documentTypeRouter.post("/add-document-type", addDocumentType);
documentTypeRouter.post("/add-document-type-item/:id", addDocumentItem);
documentTypeRouter.put("/update-document-type/:id", updateDocumentTypeById);
documentTypeRouter.put("/update-document-type-item/:id/:itemId", updateDocumentItem);
documentTypeRouter.delete("/delete-document-type-item/:id/:itemId", deleteDocumentItem);
documentTypeRouter.delete("/delete-document-type/:id", deleteDocumentTypeById);

export default documentTypeRouter;
