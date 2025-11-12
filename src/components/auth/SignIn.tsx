import { useState } from "react";
import Form from "react-bootstrap/Form";
import { Button, Card } from "react-bootstrap";
import { SignInProcess } from "../../service/AuthService";
import { useAuth } from "./AuthProvider";
import { useNavigate } from "react-router";

export const SignIn = () => {
  interface SignIn {
    username: string;
    password: string;
  }

  const navigate = useNavigate();
  const [user, setUser] = useState<SignIn>({ username: "", password: "" });
  const { login } = useAuth();

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const token = await SignInProcess(user);
      if (token) {
        console.log("Received token:", token);
        localStorage.setItem("authToken", token);
        login(token);
        navigate("/projects");
      } else {
        alert("Login failed: No token returned");
      }
    } catch (error) {
      console.error("Login failed:", error);
      alert("Invalid username or password");
    }
  };

  return (
    <div 
      className="d-flex justify-content-center align-items-center" 
      style={{ height: "100vh", background: "linear-gradient(135deg, #6B73FF 0%, #000DFF 100%)" }}
    >
      <Card className="shadow-lg rounded-4 p-4" style={{ width: "350px", backgroundColor: "#f9f9f9" }}>
        <h2 className="text-center text-primary mb-4" style={{ fontWeight: 700 }}>
          🔐 Login
        </h2>

        <Form onSubmit={handleOnSubmit}>
          <Form.Group className="mb-3" controlId="formGroupUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter username"
              name="username"
              value={user.username}
              onChange={handleOnChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-4" controlId="formGroupPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              name="password"
              value={user.password}
              onChange={handleOnChange}
              required
            />
          </Form.Group>

          <Button
            type="submit"
            variant="warning"
            className="w-100"
            style={{ fontWeight: 700, padding: "10px 0", boxShadow: "0px 5px 15px rgba(0,0,0,0.3)" }}
          >
            🔓 Login
          </Button>
        </Form>
      </Card>
    </div>
  );
};
