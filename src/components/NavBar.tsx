import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Button } from "react-bootstrap";
import { useAuth } from "./auth/AuthProvider";

// Define custom styles outside the component to keep the component cleaner
// In a real project, you would move these to a CSS/SCSS file for better maintainability.

const customNavbarStyle = {
    // Custom dark gradient background for an uncommon look
    background: 'linear-gradient(90deg, #1A1A1D 0%, #101015 100%)',
    borderBottom: '1px solid #28282D',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.5)',
};

// Define the primary color palette
const PRIMARY_ACCENT = "#80BFFF"; // Soft Sky Blue/Electric Blue
const ACTIVE_GLOW = "0 0 10px rgba(128, 191, 255, 0.7)"; // Blue glow

export const NavBar: React.FC = () => {
    const { isAuthenticated, logout } = useAuth();
    const navigate = useNavigate();

    const handleOnLogut = () => {
        logout();
        navigate("/signin");
    };
    const location = useLocation();

    // Enhanced link style for a beautiful, glowing effect on hover/active
    const linkStyle = (path: string) => {
        const isActive = location.pathname === path;
        return {
            color: isActive ? PRIMARY_ACCENT : "#CCCCCC", // Light gray for normal, electric blue for active
            textDecoration: "none",
            fontWeight: isActive ? "600" : "400",
            // Add padding to create space for the hover/active box-shadow effect
            padding: '10px 15px', 
            borderRadius: '4px',
            transition: 'all 0.3s ease-in-out',
            // Active state: subtle border and glowing shadow
            borderBottom: isActive ? `2px solid ${PRIMARY_ACCENT}` : '2px solid transparent',
            boxShadow: isActive ? ACTIVE_GLOW : 'none',
        };
    };

    return (
        // Apply the custom style to the Navbar
        <Navbar expand="lg" className="mb-4" style={customNavbarStyle}>
            <Container>
                {/* Brand with unique color and larger size */}
                <Navbar.Brand 
                    as={Link} 
                    to="/" 
                    style={{ 
                        color: PRIMARY_ACCENT, 
                        fontWeight: "900", // Extra bold
                        fontSize: "1.5rem", 
                        letterSpacing: '1px',
                        textShadow: '0 0 5px rgba(128, 191, 255, 0.4)', // Subtle brand glow
                    }}
                >
                    Research Project Tracker
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    {/* Main Nav Links (me-auto pushes everything to the left) */}
                    <Nav className="me-auto">
                        {isAuthenticated ? (
                            <>
                                <Nav.Link as={Link} to="/documents" style={linkStyle("/documents")}>
                                    Document Maintenance
                                </Nav.Link>
                                <Nav.Link as={Link} to="/projects" style={linkStyle("/projects")}>
                                    Project Maintenance
                                </Nav.Link>
                                <Nav.Link as={Link} to="/pi" style={linkStyle("/pi")}>
                                    Investigator Maintenance
                                </Nav.Link>
                                <Nav.Link as={Link} to="/member" style={linkStyle("/member")}>
                                    Research Member Maintenance
                                </Nav.Link>
                                <Nav.Link as={Link} to="/admin" style={linkStyle("/admin")}>
                                    Admin Maintenance
                                </Nav.Link>
                            </>
                        ) : (
                            <>
                                <Nav.Link as={Link} to="/" style={linkStyle("/")}>
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

                    {/* Logout Button Group (ms-auto pushes this to the far right) */}
                    <Nav className="ms-auto">
                        {isAuthenticated && (
                            // Uncommon Button Style: Outline danger with a custom shadow
                            <Button 
                                variant="outline-danger" 
                                onClick={handleOnLogut} 
                                style={{ 
                                    border: '1px solid #FF4D4D',
                                    color: '#FF4D4D',
                                    fontWeight: 'bold',
                                    boxShadow: '0 0 8px rgba(255, 77, 77, 0.4)',
                                    transition: 'all 0.3s'
                                }}
                            >
                                Logout
                            </Button>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};