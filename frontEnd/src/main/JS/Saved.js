import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import SavedRow from './SavedRow.js';
import axios from 'axios';
import logo_w_text from '../../SVG/logo_w_text.svg';
import '../CSS/SavedCSS.css';

export default function Saved() {
    // ACCESSING THE PROPS
    const navigate = useNavigate();
    const location = useLocation();
    const username = location.state.username;
    let savedProjects = location.state.savedArray;

    // RENDER THE SAVED WINDOW
    return (
        <div id="savedPageWrap">
            <div id="header">
                <div id="headerInner">
                    <img id="logo_img_saved" src={logo_w_text} alt="CodeCompose" height="43" />
                    <button id="newProjectButton" onClick={() => navigate("/edit", { state: { username: username, projectName: "", initSave: false } })}>New</button>
                </div>
                <span style={{ color: "var(--accent-colour)", fontFamily: "sans-serif", fontStyle: "oblique", marginLeft: "20px" }}>{username}</span>
            </div>
            <div className="savedProjects">
                {savedProjects.map((project, idx) => <SavedRow key={idx} username={username} projectName={project.name} savedHTML={project.savedHTML} savedCSS={project.savedCSS} savedJS={project.savedJS} initSave={true}
                projectDelete={e => {
                    e.target.closest(".row").remove();
                    axios.get(`/userHandler/`+username)
                        .then(res => {
                            const deleteObjectText = (e.target.closest(".row").getElementsByClassName("info"))[0].innerText; // Get the text from the object to delete
                            const index = savedProjects.findIndex(element => (element.name) === deleteObjectText); // Find the index of the array object with the retrieved text
                            savedProjects.splice(index, 1); // Delete the project at the found index
                            axios.put(`/userHandler/`+username, { savedProjectsList: savedProjects }); // Update the database array of saved projects
                        });
                    }}
                />)}
            </div>
        </div>
    );
}
