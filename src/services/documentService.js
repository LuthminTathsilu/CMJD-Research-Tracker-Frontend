// src/services/documentService.ts
import axios from "axios";

const BASE_URL = "http://localhost:8044/api/v1/document";

const getToken = (): string => {
  const token = localStorage.getItem("authToken");
  if (!token) throw new Error("No auth token found");
  return `Bearer ${token}`;
};

export const uploadDocument = async (file: File, data: any) => {
  const token = getToken();
  const formData = new FormData();

  formData.append("title", data.title);
  formData.append("description", data.description);
  formData.append("file", file);
  formData.append("projectId", data.projectId);
  formData.append("uploadedBy", data.uploadedBy);
  if (data.uploadedAt) formData.append("uploadedAt", data.uploadedAt);

  const response = await axios.post(`${BASE_URL}`, formData, {
    headers: {
      Authorization: token,
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

export const getDocumentById = async (docId: string) => {
  const token = getToken();
  const response = await axios.get(`${BASE_URL}/${docId}`, {
    headers: { Authorization: token },
  });
  return response.data;
};

export const deleteDocument = async (docId: string) => {
  const token = getToken();
  await axios.delete(`${BASE_URL}/${docId}`, {
    headers: { Authorization: token },
  });
};
