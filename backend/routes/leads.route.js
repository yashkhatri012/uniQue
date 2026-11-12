import express from "express";

import { verifyPage, receiveData } from "../controllers/leads.controller";

const router = express.Router();

router.get("/webhook", verifyPage);
router.post("/webhook", receiveData);

export default router;