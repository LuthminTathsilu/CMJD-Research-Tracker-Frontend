// src/services/documentService.js
import axios from "axios";

const BASE_URL = "http://localhost:8044/api/v1/document";

const getToken = () => {
const token = localStorage.getItem("authToken") || "";
  if (!token) throw new Error("No auth token found");
  return `Bearer ${token}`;
};

// Upload document with metadata
export const uploadDocument = async (file, data) => {
  try {
    const token = getToken();

    const formData = new FormData();
        formData.append("title", formData.title);
        formData.append("description", formData.description);
        formData.append("file", file);
        formData.append("projectId", formData.projectId);
        formData.append("uploadedBy", formData.uploadedBy);
        if (formData.uploadedAt) formData.append("uploadedAt", formData.uploadedAt);


    if (data.uploadedAt) formData.append("uploadedAt", data.uploadedAt);

    const response = await axios.post(`${BASE_URL}/upload`, formData, {
      headers: {
        Authorization: token,
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error uploading document:", error);
    throw error;
  }
};
