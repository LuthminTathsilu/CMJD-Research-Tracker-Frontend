import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Button } from "react-bootstrap";
import { useAuth } from "./auth/AuthProvider";

export const NavBar: React.FC = () => {
   const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleOnLogut = () => {
    logout();
    navigate("/signin");
  };
  const location = useLocation(); // to detect current active route

  const linkStyle = (path: string) => ({
    color: location.pathname === path ? "#494848ff" : "#FFFFFF", // gold for active, white otherwise
    textDecoration: "none",
    marginRight: "15px",
    fontWeight: location.pathname === path ? "bold" : "normal",
  });

  return (
    <Navbar bg="dark" data-bs-theme="dark" expand="lg" className="mb-4 shadow-lg">
      <Container>
        <Navbar.Brand as={Link} to="/" style={{ color: "  #2c8cc4ff", fontWeight: "bold" }}>
          Research Project Tracker
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
           {/* <Navbar.Brand as={Link} to="/">Home</Navbar.Brand> */}
          <Nav className="me-auto">
             {isAuthenticated ?(<><Nav.Link as={Link} to="/documents" style={linkStyle("/documents")}>
              Document Maintenance
            </Nav.Link>
            <Nav.Link as={Link} to="/features" style={linkStyle("/features")}>
              Features
            </Nav.Link>
            <Nav.Link as={Link} to="/pricing" style={linkStyle("/pricing")}>
              Pricing
            </Nav.Link> 
            <Button variant="danger" onClick={handleOnLogut}>
                  Logout
            </Button>
            </>
          ):(
            <> <Nav.Link as={Link} to="/" style={linkStyle("/")}>
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/signIn" style={linkStyle("/signIn")}>
              SignIn
            </Nav.Link>
            <Nav.Link as={Link} to="/signUp" style={linkStyle("/signUp")}>
              SignUp
            </Nav.Link>
            </>
          )} 
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
