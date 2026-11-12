

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

    } catch (error) {
        res.status(500).json({ message: "Internal server error" , error: error.message });
    }
}