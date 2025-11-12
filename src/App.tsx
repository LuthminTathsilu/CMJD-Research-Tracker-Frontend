import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { NavBar } from "./components/NavBar";
import Document from "./components/document/Document"; 
import Home from "./components/Home";
import { SignIn } from "./components/auth/SignIn";
import { SignUp } from "./components/auth/SignUp";
import 'bootstrap/dist/css/bootstrap.min.css';
import { AuthProvider } from './components/auth/AuthProvider';
import { Project } from "./components/projects/Project";
import { Milestone } from "./components/milestone/Milestone";


function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <NavBar />
        <div className="container mt-4">
          <Routes>
            <Route path="/" element={<Home />} />

            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/documents" element={<Document />} />
            <Route path="/projects" element={<Project />} />
            <Route path="/milestone" element={<Milestone projectId={""} />} />
          </Routes>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
