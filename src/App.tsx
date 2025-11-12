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
import Footer from "./components/footer";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="d-flex flex-column min-vh-100">
          <NavBar />
          
          {/* Main content grows to fill available space */}
          <div className="flex-grow-1 container mt-4">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/documents" element={<Document />} />
              <Route path="/projects" element={<Project />} />
              <Route path="/milestone/:projectId" element={<Milestone />} />
              <Route path="/pi" element={<PrincipalInvestigator />} />
              <Route path="/member" element={<Member />} />
              <Route path="/admin" element={<Admin />} />
            </Routes>
          </div>

          {/* Footer will now stick to bottom */}
          <Footer />
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}


export default App;
