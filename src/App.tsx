import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { NavBar } from './components/NavBar';
import  DocumentUpload  from './components/Document';


function App() {
  return (
    <div>
      <NavBar />
       <h1>Document Management</h1>
      <DocumentUpload/>
    </div>
  );
}

export default App;
