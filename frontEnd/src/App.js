import { Route, Routes } from 'react-router-dom';
import Register from './register&login/JS/Register.js';
import Login from './register&login/JS/Login.js';
import Edit from './main/JS/Edit.js';
import Saved from './main/JS/Saved.js';
import NotFound from './NotFound.js';
import './App.css';

export default function App() {
  return (
    <div className="App">
      <div className="parent">
        <div className="bodyContainer">
          <Routes>
            <Route path="/" element={<Register/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/saved" element={<Saved/>} />
            <Route path="/edit" element={<Edit/>} />
            <Route path="*" element={<NotFound/>} />
          </Routes>
        </div>
      </div>
    </div>
  );
}