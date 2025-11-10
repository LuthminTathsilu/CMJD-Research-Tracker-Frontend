import React, { useState } from "react";
import { uploadDocument } from "../services/documentService.js";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Spinner from "react-bootstrap/Spinner";
import Alert from "react-bootstrap/Alert";

const DocumentUpload: React.FC = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    projectId: "",
    uploadedBy: "user123", // replace with actual logged-in user
  });

  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error" | ""; text: string }>({
    type: "",
    text: "",
  });

  // Handle text input change
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) return alert("Please select a file!");

    setUploading(true);
    setMessage({ type: "", text: "" });

    try {
      await uploadDocument(file, {
        ...formData,
        uploadedAt: new Date().toISOString(),
      });

      setMessage({ type: "success", text: "✅ Document uploaded successfully!" });
      setFormData({ title: "", description: "", projectId: "", uploadedBy: "user123" });
      setFile(null);
    } catch (error) {
      console.error(error);
      setMessage({ type: "error", text: "❌ Failed to upload document." });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <Card className="shadow-lg p-4" style={{ width: "40rem", borderRadius: "15px" }}>
        <h3 className="text-center mb-4 fw-bold text-primary">📤 Upload Document</h3>

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label className="fw-semibold text-secondary">Document Title</Form.Label>
            <Form.Control
              type="text"
              name="title"
              placeholder="Enter document title"
              value={formData.title}
              onChange={handleChange}
              required
              className="border-primary shadow-sm"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="fw-semibold text-secondary">Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="description"
              placeholder="Enter description"
              value={formData.description}
              onChange={handleChange}
              required
              className="border-primary shadow-sm"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="fw-semibold text-secondary">Project ID</Form.Label>
            <Form.Control
              type="text"
              name="projectId"
              placeholder="Enter project ID"
              value={formData.projectId}
              onChange={handleChange}
              required
              className="border-primary shadow-sm"
            />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label className="fw-semibold text-secondary">Choose File</Form.Label>
            <Form.Control
              type="file"
              onChange={handleFileChange}
              required
              className="border-primary shadow-sm"
            />
            {file && <Form.Text className="text-success fw-medium">📁 {file.name}</Form.Text>}
          </Form.Group>

          <div className="d-flex justify-content-center">
            <Button
              type="submit"
              variant="gradient"
              disabled={uploading}
              className="px-5 py-2 fw-semibold text-white"
              style={{
                background:
                  "linear-gradient(90deg, rgba(0,123,255,1) 0%, rgba(0,200,255,1) 100%)",
                border: "none",
                borderRadius: "10px",
              }}
            >
              {uploading ? (
                <>
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                    className="me-2"
                  />
                  Uploading...
                </>
              ) : (
                "Upload Document"
              )}
            </Button>
          </div>
        </Form>

        {message.text && (
          <Alert
            variant={message.type === "success" ? "success" : "danger"}
            className="mt-4 text-center fw-semibold"
          >
            {message.text}
          </Alert>
        )}
      </Card>
    </div>
  );
};

export default DocumentUpload;
