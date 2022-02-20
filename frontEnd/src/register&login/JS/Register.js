import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';
import validator from 'validator'; // used to trim username/password values
import logo_w_text from '../../SVG/logo_w_text.svg';
import background from '../../SVG/logo_background_1.svg'
import '../CSS/RegisterLoginCSS.css';

export default function Register() {
    // DEFINE STATE
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [buttonDisabled, setButtonDisabled] = useState(true);
    const [error, setError] = useState("hidden");
    const navigate = useNavigate();

    // UPDATE BUTTON TO BE ENABLED/DISABLED BASED ON USER INPUT
    useEffect(() => {
        ((username === "") || (password === ""))  ?  setButtonDisabled(true)  :  setButtonDisabled(false);
    }, [username, password]); // Run every time the username or password are updated

    // RENDER THE REGISTER WINDOW
    return (
        <div id="pageWrap">
            <div id="background" style={{ backgroundImage: `url(${background})` }}></div>
            <div id="wrapper">
                <img id="logo_img" src={logo_w_text} alt="CodeCompose" height="70" />
                <div id="usernameRow">
                    <span className="textBox">Username</span>
                    <input type="text" className="inputBox" onChange={change => setUsername(validator.trim(change.target.value.toLowerCase()))}/>

                </div>
                <div id="passwordRow">
                    <span className="textBox">Password</span>
                    <input type="password" className="inputBox" onChange={change => setPassword(validator.trim(change.target.value))}/>
                </div>
                <div id="bottomRow">
                    <Link to="/login" className="loginText"><span>Already have an account?</span></Link>
                    <button className="registerButton" disabled={buttonDisabled} onClick={() => {
                        // CREATE CLIENT DOCUMENT IN MONGODB
                        if ((username !== "") && (password !== "")) {
                            axios.get(`/userHandler/`+username)
                                .then(setError("visible"))
                                .catch(err => {
                                    if (err.response.status === 404) {
                                        axios.post("/userHandler/", { username: username, password: password })
                                            .then(navigate("/login")); // Redirect to the login page
                                    }
                                });
                        }
                    }}>Register</button>
                    <p id="error" style={{ visibility: error }}>Username already exists. Try again.</p>
                </div>
            </div>
        </div>
    );
}
