import { Router } from "express";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import { getAllContacts, getContactById, createUser } from "../controllers/contacts.js";

const router = Router();

router.get("/", ctrlWrapper(getAllContacts));
router.get("/:contactId", ctrlWrapper(getContactById));
router.post("/", ctrlWrapper(createUser));

export default router;
