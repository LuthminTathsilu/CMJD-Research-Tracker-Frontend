import axios from 'axios';

const baseURL = "http://localhost:8044/api/v1/researchMember";

// --- Models ---
// Reflects the UserDto fields and additional MemberEntity fields 
export interface MemberModel {
    id: string; // Maps to memberId in the backend
    username: string;
    password: string; // Included for creation/update, though security is assumed on backend
    fullName: string;
    joinedAt: string; // LocalDateTime
}

// Input Model for creation/update
export interface MemberInputModel {
    id?: string; // Optional for creation
    username: string;
    password: string;
    fullName: string;
}

// --- Service Functions ---

const getToken = (): string => {
    const token = localStorage.getItem("authToken");
    if (!token) throw new Error("No auth token found");
    return `Bearer ${token}`;
};

// POST /api/v1/researchMember
export const saveResearchMember = async (member: MemberInputModel): Promise<void> => {
    try {
        await axios.post(`${baseURL}`, member, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": getToken()
            }
        });
    } catch (err) {
        console.error("Error saving Member:", err);
        throw err;
    }
}

// GET /api/v1/researchMember
export const getAllResearchMembers = async (): Promise<MemberModel[]> => {
    try {
        const response = await axios.get(`${baseURL}`, {
            headers: { "Authorization": getToken() }
        });
        // Assuming UserDto/MemberEntity fields map directly to MemberModel structure
        return response.data;
    } catch (err) {
        console.error("Error fetching Members:", err);
        throw err;
    }
}

// PATCH /api/v1/researchMember?id={memberId}
export const updateResearchMember = async (memberId: string, updatedMember: MemberInputModel): Promise<void> => {
    try {
        // Backend uses @PatchMapping with @RequestParam("id")
        await axios.patch(`${baseURL}?id=${memberId}`, updatedMember, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": getToken()
            },
        });
    } catch (err) {
        console.error("Error updating Member:", err);
        throw err;
    }
}

// DELETE /api/v1/researchMember/{memberId}
export const deleteResearchMember = async (memberId: string): Promise<void> => {
    try {
        await axios.delete(`${baseURL}/${memberId}`, {
            headers: { "Authorization": getToken() }
        });
    } catch (err) {
        console.error("Error deleting Member:", err);
        throw err;
    }
}