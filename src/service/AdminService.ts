import axios from 'axios';

const baseURL = "http://localhost:8044/api/v1/admin";

// --- Models ---
export interface AdminModel {
    id: string; // Maps to adminId in the backend
    username: string;
    password: string;
    fullName: string;
    role: 'Admin' | 'PrincipalInvestigator' | 'ResearchMember';
    createdAt: string;
}

// Input Model for creation/update
export interface AdminInputModel {
    id?: string; // Optional for creation
    username: string;
    password: string;
    fullName: string;
    role: 'Admin' | 'PrincipalInvestigator' | 'ResearchMember';
}

// --- Service Functions ---

const getToken = (): string => {
    const token = localStorage.getItem("authToken");
    if (!token) throw new Error("No auth token found");
    return `Bearer ${token}`;
};

// POST /api/v1/admin
export const saveAdmin = async (admin: AdminInputModel): Promise<void> => {
    try {
        await axios.post(`${baseURL}`, admin, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": getToken()
            }
        });
    } catch (err) {
        console.error("Error saving Admin:", err);
        throw err;
    }
}

// GET /api/v1/admin
export const getAllAdmins = async (): Promise<AdminModel[]> => {
    try {
        const response = await axios.get(`${baseURL}`, {
            headers: { "Authorization": getToken() }
        });
        return response.data;
    } catch (err) {
        console.error("Error fetching Admins:", err);
        throw err;
    }
}

// PATCH /api/v1/admin?id={adminId}
export const updateAdmin = async (adminId: string, updatedAdmin: AdminInputModel): Promise<void> => {
    try {
        // Backend uses @PatchMapping with @RequestParam("id")
        await axios.patch(`${baseURL}?id=${adminId}`, updatedAdmin, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": getToken()
            },
        });
    } catch (err) {
        console.error("Error updating Admin:", err);
        throw err;
    }
}

// DELETE /api/v1/admin/{adminId}
export const deleteAdmin = async (adminId: string): Promise<void> => {
    try {
        await axios.delete(`${baseURL}/${adminId}`, {
            headers: { "Authorization": getToken() }
        });
    } catch (err) {
        console.error("Error deleting Admin:", err);
        throw err;
    }
}