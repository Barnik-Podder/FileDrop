import React from 'react';
import image from '../images/file.png'
import './RenderFile.css'
const RenderFile = ({ file }) => {
    if (!file) return null; 
    let { name, size } = file;
    let type = name.split(".").pop().toLowerCase();
    return (
        <div className="fileInfo">
            <img src = {image} alt="file" className="fileImg"/>
            <span className="name">{name}</span>
            <span className="size">{(size / 1024).toFixed(2)} KB</span>
            <span className="format">{type}</span>
        </div>
    );
};

export default RenderFile;
