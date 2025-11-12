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
import { PrincipalInvestigator } from "./components/pi/PrincipalInvestigator";
import { Member } from "./components/member/Member";
import { Admin } from "./components/admin/Admin";

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
            
            {/* ✅ FIXED: no need to manually pass projectId */}
            <Route path="/milestone/:projectId" element={<Milestone />} />

            <Route path="/pi" element={<PrincipalInvestigator />} />
            <Route path="/member" element={<Member />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
