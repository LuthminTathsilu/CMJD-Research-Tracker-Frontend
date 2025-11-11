import { useState } from "react";
import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";
import { SignInProcess } from "../../service/AuthService";
import { useAuth } from "./AuthProvider";
import { useNavigate } from "react-router";
export const SignIn = () => {

  interface SignIn{
      username:string;
      password:string;
  } 
  
  const navigate = useNavigate()
  
  const [user,setUser] = useState<SignIn>({
      username:"",
      password:""
  })  
  const { login } = useAuth();

  const handleOnChange = (e:React.ChangeEvent<HTMLInputElement>) =>{
    const {name, value} = e.target;
    setUser((prev)=> ({...prev, [name]:value}))
  }
  const handleOnSubmit = async (e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault()
    const token = await SignInProcess(user)
    console.log(token)
    setUser({username:"",password:""})
    login(token)
    navigate("/documents")

    

  }

  return (
    <>
    <h1 style={{textAlign:"center"}}>Login</h1>
      <Form className="d-flex flex-column align-items-center mt-5" onSubmit={handleOnSubmit}>
        <Form.Group className="mb-3" controlId="formGroupUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
           type="text"
           placeholder="Enter username" 
           name="username"
           value={user.username}
           onChange={handleOnChange}
        />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formGroupPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control 
           type="password"
           placeholder="Password" 
           name="password"
           value={user.password}
           onChange={handleOnChange}
           />
        </Form.Group>
        <Button
        type="submit"
        variant="warning"
        >Login</Button>
      </Form>
    </>
  );
};
