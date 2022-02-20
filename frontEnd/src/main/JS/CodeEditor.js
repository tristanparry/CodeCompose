import React from 'react';
import { Controlled as ControlledEditor } from 'react-codemirror2-react-17';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import 'codemirror/mode/xml/xml.js';
import 'codemirror/mode/css/css.js';
import 'codemirror/mode/javascript/javascript.js';
import '../CSS/EditCSS.css';

export default function CodeEditor(props) {
    // ACCESS PROPS
    const { headerText, headerImg, value, onChange, programmingLanguage } = props;

    return (
        <div className="codeEditor">
            <div className="editorHeader">{headerText}
                <img src={headerImg} height="20px" alt="" />
            </div>
            <ControlledEditor
                className="controlledEditor"
                value={value}
                onBeforeChange={(editor, data, value) => onChange(value)}
                options={{ theme:"material", mode:programmingLanguage, 
                           lineNumbers:true, lineWrapping:true, lint:true }}
            />
        </div>
    );
}
