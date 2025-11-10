import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { NavBar } from './components/NavBar';
import  DocumentManager  from './components/Document';
import DocumentUpload from "./components/Document";


function App() {
  return (
    <div>
      <NavBar />
      <DocumentUpload />
    </div>
  );
}

export default App;
