// src/components/DocumentUpload.tsx
import React, { useState } from "react";
import { uploadDocument, getDocumentById, deleteDocument } from "../../service/documentService";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Alert from "react-bootstrap/Alert";
import Spinner from "react-bootstrap/Spinner";

const DocumentUpload: React.FC = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    projectId: "",
    uploadedBy: "user123",
  });

  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");
  const [searchId, setSearchId] = useState("");
  const [foundDoc, setFoundDoc] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  // Upload handler
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) return alert("Please select a file!");

    setUploading(true);
    setMessage("");

    try {
      await uploadDocument(file, { ...formData, uploadedAt: new Date().toISOString().replace("Z", "")  });
      setMessage("✅ Document uploaded successfully!");
      setFormData({ title: "", description: "", projectId: "", uploadedBy: "user123" });
      setFile(null);
    } catch (error) {
      console.error(error);
      setMessage("❌ Failed to upload document.");
    } finally {
      setUploading(false);
    }
  };

  // Fetch document by ID
  const handleFetch = async () => {
    if (!searchId) return alert("Enter a document ID!");
    setLoading(true);
    setFoundDoc(null);
    try {
      const data = await getDocumentById(searchId);
      setFoundDoc(data);
    } catch (error) {
      setMessage("❌ Document not found.");
    } finally {
      setLoading(false);
    }
  };

  // Delete document
  const handleDelete = async () => {
    if (!searchId) return alert("Enter document ID to delete!");
    if (!window.confirm("Are you sure you want to delete this document?")) return;

    try {
      await deleteDocument(searchId);
      setMessage("🗑️ Document deleted successfully.");
      setFoundDoc(null);
    } catch (error) {
      setMessage("❌ Failed to delete document.");
    }
  };

  return (
    <div className="container mt-4" style={{ maxWidth: "700px" }}>
      <Card className="shadow-lg p-4">
        <h3 className="text-center mb-4 text-primary">📄 Document Manager</h3>

        {/* Upload Form */}
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
            <Form.Label>Choose File</Form.Label>
            <Form.Control type="file" onChange={handleFileChange} required />
            {file && <Form.Text>Selected file: {file.name}</Form.Text>}
          </Form.Group>

          <Button type="submit" variant="primary" disabled={uploading} className="w-100">
            {uploading ? (
              <>
                <Spinner animation="border" size="sm" /> Uploading...
              </>
            ) : (
              "Upload Document"
            )}
          </Button>
        </Form>

        {message && <Alert variant="info" className="mt-3">{message}</Alert>}

        <hr className="my-4" />

        {/* Get/Delete Section */}
        <h5 className="text-secondary mb-3">🔍 Find or Delete Document</h5>
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
          <Card className="p-3 bg-light">
            <h6>📘 Document Details:</h6>
            <p><strong>Title:</strong> {foundDoc.title}</p>
            <p><strong>Description:</strong> {foundDoc.description}</p>
            <p><strong>Uploaded By:</strong> {foundDoc.uploadedBy}</p>
            <p><strong>Project ID:</strong> {foundDoc.projectId}</p>
            <p><strong>Uploaded At:</strong> {foundDoc.uploadedAt}</p>
          </Card>
        )}
      </Card>
    </div>
  );
};

export default DocumentUpload;
