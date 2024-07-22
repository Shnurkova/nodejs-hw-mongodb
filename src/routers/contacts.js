import express from "express";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import { getAllContacts, getContactById, createUser } from "../controllers/contacts.js";

const router = express.Router();
const jsonParser = express.json();

router.get("/", ctrlWrapper(getAllContacts));
router.get("/:contactId", ctrlWrapper(getContactById));
router.post("/", jsonParser, ctrlWrapper(createUser));

export default router;
