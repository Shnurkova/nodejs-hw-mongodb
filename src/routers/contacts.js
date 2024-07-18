import { Router } from "express";
import { getAllContacts } from "../controllers/contacts.js";

const router = Router();

router.get("/", getAllContacts);

router.get("/:contactId");

export default router;
