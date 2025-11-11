import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";

export const SignUp: React.FC = () => {
  return (
    <Container className="mt-5 d-flex justify-content-center">
      <Form style={{ width: "400px" }}>
        <h2 className="text-center mb-4">Register</h2>
        <Form.Group className="mb-3" controlId="formGroupUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control type="text" placeholder="Enter Username" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formGroupPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="text" placeholder="Enter Password" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formGroupFullname">
          <Form.Label>Fullname</Form.Label>
          <Form.Control type="email" placeholder="Enter Fullname" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formGroupRole">
          <Form.Label>Role</Form.Label>
          <Form.Control type="text" placeholder="Enter role" />
        </Form.Group>
        <Button variant="success" type="submit" className="w-100">
          Sign Up
        </Button>
      </Form>
    </Container>
  );
};
