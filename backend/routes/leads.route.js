import express from "express";

import { verifyPage, receiveData } from "../controllers/leads.controller.js";
import {getAllLeads} from "../services/db.service.js";
const router = express.Router();

router.get("/webhook", verifyPage);
router.post("/webhook", receiveData);
router.get("/leads", getAllLeads);

export default router;