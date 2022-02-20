import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo_arrows_only from '../../SVG/logo_arrows_only.svg';
import trash from '../../SVG/trash.svg';
import '../CSS/SavedCSS.css';

export default function SavedRow(props) {
    // ACCESSING THE PROPS
    const { username, projectName, savedHTML, savedCSS, savedJS, initSave, projectDelete } = props;
    const navigate = useNavigate();

    // RENDER THE ROW
    return (
        <div className="row">
            <img id="logo_arrows_only" src={logo_arrows_only} alt="" height="25px" />
            <div className="info"
                    onClick={() => {
                        navigate("/edit", { state: { username: username, projectName: projectName, savedHTML: savedHTML,
                                                     savedCSS: savedCSS, savedJS: savedJS, initSave: initSave } })
                    }}>
                {projectName}
            </div>
            <button style={{ border: "none", background: "none", cursor: "pointer" }} onClick={projectDelete}>
                <img src={trash} alt="Delete" height="25px" />
            </button>
        </div>
    );
}
