

export async function extractLeadData (leadgenId) {
    try {

        console.log("Extracting lead data ");
        const response = await fetch(`https://graph.facebook.com/${process.env.META_GRAPH_API_VERSION}/${leadgenId}?access_token=${process.env.META_PAGE_ACCESS_TOKEN}`);
        if(!response.ok){
        const errorData = await response.json();
        console.error("Meta API error:", errorData);
        throw new Error(`Failed to fetch lead data: ${response.status}`);
        }
        const data = await response.json();

        console.log("Lead data extracted:", data);

         console.log('extraction ended')
    
    } catch (error) {
        console.error("Error extracting lead data:", error);
        throw error;
    }
}