import axios from 'axios';

const baseURL = "http://localhost:8044/api/v1/projects"; // Assuming your base URL structure

// --- Models ---
// Based on ProjectDto structure from backend
export interface ProjectModel {
    id: string; // Matches project ID from backend
    title: string;
    summary: string;
    tags: string;
    pi: { // Placeholder for PI details, adjust based on actual PI DTO structure
        piId: string;
        name?: string; 
    };
    status: 'PLANNING' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED'; // Based on Status enum
    startDate: string;
    endDate: string;
    createdAt: string;
    updatedAt: string;
}

// Model for sending data to POST/PUT (excluding auto-generated fields like id, dates)
export interface ProjectInputModel {
    title: string;
    summary: string;
    tags: string;
    pi: { piId: string }; // Only need PI ID for association
    status: 'PLANNING' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';
    startDate: string;
    endDate: string;
}

// --- Service Functions ---

// get Token (reusing the function from your original service)
const getToken = (): string =>{
    const token = localStorage.getItem("authToken");
    return "Bearer "+token;
};

export const getAllProjectsData = async (): Promise<ProjectModel[]> =>{
    try{
       const response = await axios.get(`${baseURL}`,{
           headers:{
               "Authorization": getToken()
           }
       });
       // Map/transform data if needed, but assuming direct DTO mapping for now
       return response.data;

    }catch(err){
       console.error("Error fetching projects:", err);
       throw err;
    }
}

export const addProjectData = async(project: ProjectInputModel): Promise<ProjectModel> =>{
    try{
        const response = await axios.post(`${baseURL}`, project, {
          headers:{
            "Content-Type": "application/json",
            "Authorization": getToken()
          }
        });
        return response.data;

    }catch(err){
        console.error("Error saving project:", err);
        throw err;
    }
}

export const updateProjectData = async (project: ProjectInputModel, projectId: string): Promise<ProjectModel> =>{
    try {
        const response = await axios.put(`${baseURL}/${projectId}`, project, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": getToken()
            },
        });
        return response.data;
    } catch (err) {
        console.error("Error updating project:", err);
        throw err;
    }
}

export const deleteProjectData = async (projectId: string): Promise<string> =>{ 
    try {
      const response = await axios.delete(`${baseURL}/${projectId}`,{
        headers:{
          "Authorization": getToken()
        }
      }); 
      // Backend returns string "Project X deleted successfully."
      return response.data;
    } catch (err) {
      console.error("Error deleting project:", err);
      throw err;
    }
}

export const updateProjectStatusData = async (projectId: string, newStatus: ProjectModel['status']): Promise<string> =>{
    try {
      // The body is just the Status enum value, which should be sent as JSON string
      const response = await axios.patch(`${baseURL}/${projectId}/status`, JSON.stringify(newStatus), {
        headers:{
          "Content-Type": "application/json",
          "Authorization": getToken()
        }
      }); 
      // Backend returns string "Project X status updated to Y"
      return response.data;
    } catch (err) {
      console.error("Error updating project status:", err);
      throw err;
    }
}