import React, { useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { SignUpProcess } from "../../service/AuthService";
import { useAuth } from "./AuthProvider";
import { useNavigate } from "react-router";

export const SignUp = () => {
  interface SignUp {
    username: string;
    password: string;
    fullname: string;
    role: string;
  }

  const navigate = useNavigate();
  const { login } = useAuth();

  const [user, setUser] = useState<SignUp>({
    username: "",
    password: "",
    fullname: "",
    role: "",
  });

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const token = await SignUpProcess(user);
    console.log(token);
    login(token);
    navigate("/signin");
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        height: "100vh",
        background: "linear-gradient(135deg, #FF6B6B 0%, #FFD93D 100%)",
      }}
    >
      <Card
        className="shadow-lg rounded-4 p-4"
        style={{ width: "400px", backgroundColor: "#fefefe" }}
      >
        <h2
          className="text-center text-success mb-4"
          style={{ fontWeight: 700 }}
        >
          📝 Register
        </h2>

        <Form onSubmit={handleOnSubmit}>
          <Form.Group className="mb-3" controlId="formGroupUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Username"
              value={user.username}
              name="username"
              onChange={handleOnChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formGroupPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter Password"
              value={user.password}
              name="password"
              onChange={handleOnChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formGroupFullname">
            <Form.Label>Full Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Full Name"
              value={user.fullname}
              name="fullname"
              onChange={handleOnChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-4" controlId="formGroupRole">
            <Form.Label>Role</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Role"
              value={user.role}
              name="role"
              onChange={handleOnChange}
              required
            />
          </Form.Group>

          <Button
            variant="success"
            type="submit"
            className="w-100"
            style={{
              fontWeight: 700,
              padding: "10px 0",
              boxShadow: "0px 5px 15px rgba(0,0,0,0.3)",
            }}
          >
            ✅ Register
          </Button>
        </Form>
      </Card>
    </div>
  );
};
