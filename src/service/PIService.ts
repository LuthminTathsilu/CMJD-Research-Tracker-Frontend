import axios from 'axios';

const baseURL = "http://localhost:8044/api/v1/principalInvestigator";

// --- Models ---
// Reflects the UserDto structure used by the backend Controller
export interface PIModel {
    id: string; // Maps to piId in the backend
    username: string;
    password: string; 
    fullName: string;
    role: 'Admin' | 'PrincipalInvestigator' | 'ResearchMember';
    createdAt: string;
}

// Input Model for creation/update (only fields that are sent/updated)
export interface PIInputModel {
    id?: string; // Optional for creation
    username: string;
    password: string;
    fullName: string;
    role: 'PrincipalInvestigator';
}

// --- Service Functions ---

const getToken = (): string => {
    const token = localStorage.getItem("authToken");
    if (!token) throw new Error("No auth token found");
    return `Bearer ${token}`;
};

// POST /api/v1/principalInvestigator
export const savePrincipalInvestigator = async (pi: PIInputModel): Promise<void> => {
    try {
        await axios.post(`${baseURL}`, pi, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": getToken()
            }
        });
    } catch (err) {
        console.error("Error saving PI:", err);
        throw err;
    }
}

// GET /api/v1/principalInvestigator
export const getAllPrincipalInvestigators = async (): Promise<PIModel[]> => {
    try {
        const response = await axios.get(`${baseURL}`, {
            headers: { "Authorization": getToken() }
        });
        // Assuming UserDto maps directly to PIModel structure
        return response.data;
    } catch (err) {
        console.error("Error fetching PIs:", err);
        throw err;
    }
}

// PATCH /api/v1/principalInvestigator?id={piId}
export const updatePrincipalInvestigator = async (piId: string, updatedPI: PIInputModel): Promise<void> => {
    try {
        // Backend uses @PatchMapping with @RequestParam("id")
        await axios.patch(`${baseURL}?id=${piId}`, updatedPI, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": getToken()
            },
        });
    } catch (err) {
        console.error("Error updating PI:", err);
        throw err;
    }
}

// DELETE /api/v1/principalInvestigator/{piId}
export const deletePrincipalInvestigator = async (piId: string): Promise<void> => {
    try {
        await axios.delete(`${baseURL}/${piId}`, {
            headers: { "Authorization": getToken() }
        });
    } catch (err) {
        console.error("Error deleting PI:", err);
        throw err;
    }
}