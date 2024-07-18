import { Router } from "express";
import { getAllContacts } from "../controllers/contacts.js";

const router = Router();

router.get("/", getAllContacts );

export default router;
