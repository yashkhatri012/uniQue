import Lead from "../models/.model.js";

export async function saveData(data) {
    try {
        const leadgenId = data?.id;
        const name = data?.field_data?.find(field => field.name === "full_name")?.values?.[0];
        const email = data?.field_data?.find(field => field.name === "email")?.values?.[0];

        const existingLead = await Lead.findOne({ leadgenId: leadgenId });
        if (existingLead) {
            console.log("Lead already exists in the database.");
            return;
        }
        const newLead = await Lead.create({
            leadgenId: leadgenId,
            name: name,
            email: email
        });    

        

        if(!newLead){
            throw new Error("Failed to create new lead in the database");
        }
        return newLead;
    } catch (error) {
        console.error("Error saving lead data:", error);
        throw error;
    }
}