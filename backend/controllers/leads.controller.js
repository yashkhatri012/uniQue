import { extractLeadData } from "../services/meta.service.js";
import { saveData } from "../services/db.service.js";
import { getIO } from "../config/socket.js";

export const verifyPage = (req, res) => {
    try {

        const hubMode = req.query["hub.mode"];
        const hubChallenge = req.query["hub.challenge"];
        const hubVerifyToken = req.query["hub.verify_token"];

        console.log("Verifying webhook...");

        const VERIFY_TOKEN = process.env.VERIFY_TOKEN;
       if (hubMode === "subscribe" && hubVerifyToken === VERIFY_TOKEN) {
        res.status(200).send(hubChallenge);
        } else {
        res.status(403).send("Forbidden");
        }
        console.log("Webhook verified successfully");

    } catch (error) {
        res.status(500).json({ message: "Internal server error" , error: error.message });
    }
}

export const receiveData = async (req, res) => {
    try {
        console.log("Received data:", req.body);

        const data = req.body;
        const leadgenId = data?.entry?.[0]?.changes?.[0]?.value?.leadgen_id;
        if(!leadgenId) {
            res.status(400).send("Leadgen ID not found in the payload");
            return;
            }
        

        console.log("extraction started from leadgen ID:", leadgenId);
        
        const leadData = await extractLeadData(leadgenId);

        console.log("Lead data extracted, in reciveData controller", leadData);
        if (!leadData) {
        res.status(404).send("Lead data not found");
        return;
        }

        console.log("Saving lead data to the database...");
        const savedLead = await saveData(leadData);

        console.log("Lead data saved to the database:", savedLead);

        if(!savedLead) {
            res.status(500).send("Failed to save lead data");
            return;
        }

        getIO().emit("new-lead", savedLead);

       res.status(200).json({
        success: true,
        message: "Data fetched successfully",
        data: savedLead
    });
    

    } catch (error) {
        res.status(500).json({ message: "Error receiving data" , error: error.message });
    }
}