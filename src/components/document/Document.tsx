// src/components/DocumentUpload.tsx
import React, { useState } from "react";
import { uploadDocument, getDocumentById, deleteDocument } from "../../service/documentService";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Alert from "react-bootstrap/Alert";
import Spinner from "react-bootstrap/Spinner";

interface DocumentModel {
  id: string;
  title: string;
  description: string;
  projectId: string;
  uploadedBy: { id: string; fullName: string };
  uploadedAt: string;
  fileName: string;
  urlOrPath: string; // Base64 string from backend
}

const DocumentUpload: React.FC = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    projectId: "",
    uploadedBy: "",
  });
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");
  const [searchId, setSearchId] = useState("");
  const [foundDoc, setFoundDoc] = useState<DocumentModel | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) setFile(e.target.files[0]);
  };

  const getMimeType = (fileName: string) => {
    if (!fileName) return "application/octet-stream";
    if (fileName.match(/\.(jpeg|jpg)$/i)) return "image/jpeg";
    if (fileName.match(/\.png$/i)) return "image/png";
    if (fileName.match(/\.gif$/i)) return "image/gif";
    if (fileName.match(/\.pdf$/i)) return "application/pdf";
    return "application/octet-stream";
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) return alert("Please select a file!");
    if (!formData.uploadedBy.trim()) return alert("Enter Uploader/Member ID!");

    setUploading(true);
    setMessage("");

    try {
      const uploadedAt = new Date().toISOString().substring(0, 19);
      await uploadDocument(file, { ...formData, uploadedAt });
      setMessage("✅ Document uploaded successfully!");
      setFormData({ title: "", description: "", projectId: "", uploadedBy: "" });
      setFile(null);
    } catch (error) {
      console.error(error);
      setMessage("❌ Failed to upload document.");
    } finally {
      setUploading(false);
    }
  };

  const handleFetch = async () => {
    if (!searchId.trim()) return alert("Enter a document ID!");
    setLoading(true);
    setFoundDoc(null);
    setMessage("");

    try {
      const doc = await getDocumentById(searchId);
      setFoundDoc(doc);
    } catch (error) {
      console.error(error);
      setMessage("❌ Document not found.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!searchId.trim()) return alert("Enter document ID to delete!");
    if (!window.confirm("Are you sure you want to delete this document?")) return;

    try {
      await deleteDocument(searchId);
      setMessage("🗑️ Document deleted successfully.");
      setFoundDoc(null);
    } catch (error) {
      console.error(error);
      setMessage("❌ Failed to delete document.");
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "750px" }}>
      {/* Upload Form Card */}
      <Card className="shadow-lg p-4 mb-5 border-0" style={{ borderRadius: "15px", background: "#f5f7fa" }}>
        <h2 className="text-center mb-4 text-primary">📄 Upload Document</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Document Title</Form.Label>
            <Form.Control
              type="text"
              name="title"
              placeholder="Enter document title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="description"
              placeholder="Enter description"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Project ID</Form.Label>
            <Form.Control
              type="text"
              name="projectId"
              placeholder="Enter project ID"
              value={formData.projectId}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Uploader/Member ID</Form.Label>
            <Form.Control
              type="text"
              name="uploadedBy"
              placeholder="Enter uploader's member ID"
              value={formData.uploadedBy}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label>Choose File</Form.Label>
            <Form.Control type="file" onChange={handleFileChange} required />
            {file && <Form.Text className="text-muted">Selected file: {file.name}</Form.Text>}
          </Form.Group>

          <Button type="submit" variant="primary" disabled={uploading} className="w-100 py-2">
            {uploading ? <><Spinner animation="border" size="sm" /> Uploading...</> : "Upload Document"}
          </Button>
        </Form>
        {message && <Alert variant="info" className="mt-3">{message}</Alert>}
      </Card>

      {/* Search/Delete Card */}
      <Card className="shadow-lg p-4 border-0" style={{ borderRadius: "15px", background: "#e8f0fe" }}>
        <h2 className="text-center mb-4 text-success">🔍 Search / Delete Document</h2>
        <Form.Group className="mb-3 d-flex">
          <Form.Control
            type="text"
            placeholder="Enter Document ID"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
          />
          <Button variant="success" className="ms-2" onClick={handleFetch} disabled={loading}>
            {loading ? "Searching..." : "Get Document"}
          </Button>
          <Button variant="danger" className="ms-2" onClick={handleDelete}>
            Delete
          </Button>
        </Form.Group>

        {foundDoc && (
          <Card className="p-3 mt-3 shadow-sm" style={{ background: "#ffffff", borderRadius: "10px" }}>
            <h5>📘 Document Details</h5>
            <p><strong>Title:</strong> {foundDoc.title}</p>
            <p><strong>Description:</strong> {foundDoc.description}</p>
            <p><strong>Uploaded By:</strong> {foundDoc.uploadedBy?.fullName || foundDoc.uploadedBy?.id}</p>
            <p><strong>Project ID:</strong> {foundDoc.projectId}</p>
            <p><strong>Uploaded At:</strong> {foundDoc.uploadedAt}</p>

            {foundDoc.urlOrPath && (
              <>
                <p>
                  <strong>File:</strong>{" "}
                  <a
                    href={`data:${getMimeType(foundDoc.fileName)};base64,${foundDoc.urlOrPath}`}
                    download={foundDoc.fileName || "document"}
                  >
                    Download {foundDoc.fileName || "document"}
                  </a>
                </p>

                {foundDoc.fileName?.match(/\.(jpeg|jpg|png|gif)$/i) && (
                  <img
                    src={`data:${getMimeType(foundDoc.fileName)};base64,${foundDoc.urlOrPath}`}
                    alt={foundDoc.fileName}
                    style={{ maxWidth: "100%", marginTop: "10px", borderRadius: "5px" }}
                  />
                )}

                {foundDoc.fileName?.match(/\.pdf$/i) && (
                  <iframe
                    src={`data:application/pdf;base64,${foundDoc.urlOrPath}`}
                    title={foundDoc.fileName}
                    width="100%"
                    height="500px"
                    style={{ marginTop: "10px", border: "1px solid #ccc", borderRadius: "5px" }}
                  />
                )}
              </>
            )}
        </Card>
        )}
      </Card>
    </div>
  );
};

export default DocumentUpload;
