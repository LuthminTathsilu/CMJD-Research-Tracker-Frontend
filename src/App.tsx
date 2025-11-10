import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { NavBar } from './components/NavBar';
import { Document } from './components/Document';


function App() {
  return (
    <div>
      <NavBar />
      <Document/>
    </div>
  );
}

export default App;
