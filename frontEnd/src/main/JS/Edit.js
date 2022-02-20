import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import CodeEditor from './CodeEditor.js';
import axios from 'axios';
import logo from '../../SVG/logo.svg';
import arrows_down from '../../SVG/arrows_down.svg';
import html_logo from '../../SVG/html_logo.svg';
import css_logo from '../../SVG/css_logo.svg';
import js_logo from '../../SVG/js_logo.svg';
import '../CSS/EditCSS.css';
const format_html = require('js-beautify').html;
const format_css = require('js-beautify').css;
const format_js = require('js-beautify').js_beautify;

export default function Edit() {
    // ACCESSING THE PROPS
    const username = useLocation().state.username;
    let projectName = useLocation().state.projectName;
    const initSaveLoc = useLocation().state.initSave;
    const savedHTML = useLocation().state.savedHTML;
    const savedCSS = useLocation().state.savedCSS;
    const savedJS = useLocation().state.savedJS;

    // DEFINING THE STATE
    const [name, setName] = useState(projectName);
    const [buttonDisabled, setButtonDisabled] = useState();
    const [HTML, setHTML] = useState("");
    const [CSS, setCSS] = useState("");
    const [JS, setJS] = useState("");
    const [resultDocument, setResultDocument] = useState("");
    const [errorVisibility, setErrorVisibility] = useState("hidden");
    const [initSave, setInitSave] = useState(initSaveLoc);

    // INITIALIZING THE TEXT STATES WITH useEffect() HOOK
    useEffect(() => {
        (typeof savedHTML !== "undefined")  ?  setHTML(format_html(savedHTML, { indent_size: 2 }))  :  setHTML("");
        (typeof savedCSS !== "undefined")  ?  setCSS(format_css(savedCSS, { indent_size: 2 }))  :  setCSS("");
        (typeof savedJS !== "undefined")  ?  setJS(format_js(savedJS, { indent_size: 2 }))  :  setJS("");
        setButtonDisabled((name === "")  ?  true  :  false);
    }, []); // Called when the component initially loads

    // SETTING THE SAVE BUTTON DISABLED PROPERTY
    useEffect(() => setButtonDisabled((name === "")  ?  true  :  false), [name]);

    // SETTING THE UPDATED HTML/CSS/JS
    useEffect(() => {
        const interval = setTimeout(() => {
            setHTML(format_html(HTML, { indent_size: 2 }));
            setCSS(format_css(CSS, { indent_size: 2 }));
            setJS(format_js(JS, { indent_size: 2 }));
            setResultDocument(`<html><body>${HTML}</body><style>${CSS}</style><script>${JS}</script></html>`);
            axios.get(`/userHandler/`+username)
                .then(res => {
                    let projectsList = res.data[0].savedProjectsList;
                    if ((projectName !== "") && initSave) {
                        let updateDocument = projectsList.find(e => e.name === projectName);
                        updateDocument.savedHTML = HTML;
                        updateDocument.savedCSS = CSS;
                        updateDocument.savedJS = JS;
                        axios.put(`/userHandler/`+username, { savedProjectsList: projectsList });
                    }
                });
        }, 1500);
        return () => clearTimeout(interval);
    }, [HTML, CSS, JS]); // Code/rendered webpage is updated after HTML/CSS/JS is changed

    // RENDER THE MAP WINDOW
    return (
        <>
            <div id="editPage">
                <div id="editPageHeader">
                    <img src={logo} height="40px" alt="" />
                    <input id="projectName" placeholder="Untitled Project" value={name} onChange={change => setName(change.target.value)}
                           disabled={(projectName !== "") ? true : false} style={{ backgroundColor: (initSave) ? "transparent" : "var(--dark-grey)",
                                                                                   borderTopRightRadius: (initSave) ? "5px" : "0",
                                                                                   borderBottomRightRadius: (initSave) ? "5px" : "0"}} />
                    {(!initSave) ?
                        <button id="saveProjectButton" disabled={buttonDisabled}
                            onClick={() => {
                                axios.get(`/userHandler/`+username)
                                .then(res => {
                                    let projectsList = res.data[0].savedProjectsList;
                                    projectName = name.trim();
                                    if (!projectsList.some(e => e.name === projectName)) {
                                        projectsList.push({ name: projectName, savedHTML: HTML, savedCSS: CSS, savedJS: JS, initSave: true });
                                        axios.put(`/userHandler/`+username, { savedProjectsList: projectsList });
                                        setErrorVisibility("hidden");
                                        setInitSave(true);
                                    } else {
                                        setErrorVisibility("visible");
                                    }
                                });
                            }}>Save
                        </button>
                    : null}
                    <span id="errorMsg" style={{ visibility: errorVisibility }}>Project already exists.</span>
                </div>
                <div id="codeEditorWrapper">
                    <CodeEditor headerText="HTML" headerImg={html_logo} value={HTML} onChange={setHTML} programmingLanguage="xml" />
                    <CodeEditor headerText="CSS" headerImg={css_logo} value={CSS} onChange={setCSS} programmingLanguage="css" />
                    <CodeEditor headerText="JavaScript" headerImg={js_logo} value={JS} onChange={setJS} programmingLanguage="javascript" />
                </div>
                <div id="downButtonWrapper">
                    <img id="downButton" src={arrows_down} alt="" height="25px" />
                </div>
            </div>
            <iframe id="renderFrame" srcDoc={resultDocument} sandbox="allow-scripts" frameBorder="0" title="" />
        </>
    );
}
