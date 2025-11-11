import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";

export const SignIn: React.FC = () => {
  return (
    <Container className="mt-5 d-flex justify-content-center">
      <Form style={{ width: "400px" }}>
        <h2 className="text-center mb-4">Login</h2>
        <Form.Group className="mb-3" controlId="formGroupUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control type="username" placeholder="Enter Username" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formGroupPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Enter password" />
        </Form.Group>
        <Button variant="primary" type="submit" className="w-100">
          Sign In
        </Button>
      </Form>
    </Container>
  );
};
