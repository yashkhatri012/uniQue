import express from "express";

import { verifyPage } from "../controllers/leads.controller";

const router = express.Router();

router.get("/webhook", verifyPage);

export default router;