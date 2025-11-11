import React, { useState } from "react";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { SignUpProcess } from "../../service/AuthService";
import { useAuth } from "./AuthProvider";
import { useNavigate } from "react-router";
export const SignUp = () => {

  interface SignUp{
    username: string;
    password: string;
    fullname: string;
    role: string;
  }  
 

  const navigate = useNavigate()
  const { login } = useAuth();

  //state handle
  const [user,setUser]  = useState<SignUp>({
    username: "",
    password: "",
    fullname: "",
    role: "",
  })  


  //form data handle
  const handleOnChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
    const {name, value} = e.target;
    setUser((prev)=> ({...prev, [name]:value}))

  }


 // send sign updata to the server
  const handleOnSubmit = async (e:React.FormEvent<HTMLFormElement>)=>{
     e.preventDefault()
     const token = await SignUpProcess(user)
     console.log(token)
     login(token)
     navigate("/signin")
  }  

  return (
    <>
    <h1 style={{textAlign:"center"}}>Register</h1>
    <Form className="d-flex flex-column align-items-center mt-5" onSubmit={handleOnSubmit}>
        <Form.Group className="mb-3" controlId="formGroupUsername">
          <Form.Label>username</Form.Label>
          <Form.Control 
           type="text"
           placeholder="Enter Username" 
           value={user.username}
           name="username"
           onChange={handleOnChange}
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
           />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formGroupFullname">
          <Form.Label>fullname</Form.Label>
          <Form.Control
           type="text"
           placeholder="Enter Fullname" 
           value={user.fullname}
           name="fullname"
           onChange={handleOnChange}
           
        />
        </Form.Group>
        
        <Form.Group className="mb-3" controlId="formGroupRole">
          <Form.Label>Role</Form.Label>
          <Form.Control 
           type="text"
           placeholder="Enter Role" 
           value={user.role}
           name="role"
           onChange={handleOnChange}
           />
        </Form.Group>
        <Button variant="success" type="submit">Register</Button>       
      </Form>
    </>
  );
};
