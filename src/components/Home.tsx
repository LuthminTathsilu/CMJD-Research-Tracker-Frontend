import React from "react";
import { Card, Container, Row, Col, Button } from "react-bootstrap";

const Home: React.FC = () => {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #6B73FF 0%, #000DFF 100%)",
        color: "#fff",
        paddingTop: "60px",
        paddingBottom: "60px",
      }}
    >
      <Container>
        {/* Hero Section */}
        <Row className="mb-5 text-center">
          <Col>
            <h1 style={{ fontWeight: 700, fontSize: "3rem" }}>
              📊 Research Project Tracker
            </h1>
            <p style={{ fontSize: "1.2rem", maxWidth: "700px", margin: "auto" }}>
              Keep your research projects organized, monitor milestones, manage
              documents, and track members efficiently. Designed for researchers,
              PIs, and project teams to collaborate seamlessly.
            </p>
          
          </Col>
        </Row>

        {/* Features Section */}
        <Row className="g-4 text-dark">
          <Col md={4}>
            <Card className="p-4 shadow-lg rounded-4">
              <h3>📂 Document Management</h3>
              <p>
                Upload, download, and organize project documents. Easily find
                files and maintain all research records in one place.
              </p>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="p-4 shadow-lg rounded-4">
              <h3>📅 Milestones & Tracking</h3>
              <p>
                Track project milestones, due dates, and completion status. Stay
                updated with progress and deadlines for every research project.
              </p>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="p-4 shadow-lg rounded-4">
              <h3>👥 Team & Member Management</h3>
              <p>
                Manage Principal Investigators, team members, and their roles.
                Collaborate efficiently and assign responsibilities clearly.
              </p>
            </Card>
          </Col>
        </Row>

        {/* About Section */}
        <Row className="mt-5 text-center">
          <Col>
            <Card className="p-4 shadow-lg rounded-4 bg-light text-dark">
              <h2>Why Choose Research Project Tracker?</h2>
              <p>
                Our platform simplifies research project management by providing a
                centralized system for tracking projects, documents, milestones,
                and team members. Whether you are a Principal Investigator or a
                research assistant, this tool ensures better collaboration, 
                timely updates, and streamlined project execution.
              </p>
              
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Home;
