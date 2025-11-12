import axios from 'axios';

const baseURL = "http://localhost:8044/api/v1/milestone";

// --- Models ---
export interface MilestoneModel {
    id: string; // milestoneId
    title: string;
    description: string;
    dueDate: string; // YYYY-MM-DD
    isCompleted: boolean;
    
    // Simplified structure based on backend references
    project: { id: string; title?: string }; 
    createdBy: { memberId: string; fullName?: string }; 
}

export interface MilestoneInputModel {
    title: string;
    description: string;
    dueDate: string; // YYYY-MM-DD
    isCompleted: boolean;
    
    // Used for Add/Update if needed by DTO mapping
    project?: { id: string }; 
    createdBy?: { memberId: string }; 
}

// --- Service Functions ---

const getToken = (): string => {
    const token = localStorage.getItem("authToken");
    if (!token) throw new Error("No auth token found");
    return `Bearer ${token}`;
};

// GET /api/v1/milestone/projects/{projectId}
export const getMilestonesByProject = async (projectId: string): Promise<MilestoneModel[]> => {
    try {
        const response = await axios.get(`${baseURL}/projects/${projectId}`, {
            headers: { "Authorization": getToken() }
        });
        return response.data;
    } catch (err) {
        console.error("Error fetching milestones:", err);
        throw err;
    }
}

// POST /api/v1/milestone/projects/{projectId}
export const addMilestone = async (projectId: string, milestone: MilestoneInputModel): Promise<MilestoneModel> => {
    try {
        // The backend expects the ProjectId in the URL path, and the DTO in the body.
        const response = await axios.post(`${baseURL}/projects/${projectId}`, milestone, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": getToken()
            }
        });
        return response.data;
    } catch (err) {
        console.error("Error adding milestone:", err);
        throw err;
    }
}

// PATCH /api/v1/milestone/{id}
export const updateMilestone = async (milestoneId: string, updatedMilestone: MilestoneInputModel): Promise<MilestoneModel> => {
    try {
        const response = await axios.patch(`${baseURL}/${milestoneId}`, updatedMilestone, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": getToken()
            },
        });
        return response.data;
    } catch (err) {
        console.error("Error updating milestone:", err);
        throw err;
    }
}

// DELETE /api/v1/milestone/{id}
export const deleteMilestone = async (milestoneId: string): Promise<string> => {
    try {
        const response = await axios.delete(`${baseURL}/${milestoneId}`, {
            headers: { "Authorization": getToken() }
        });
        return response.data; // Should return success string
    } catch (err) {
        console.error("Error deleting milestone:", err);
        throw err;
    }
}