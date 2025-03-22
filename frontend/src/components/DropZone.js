import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import upload from "../images/upload.png";
import "./DropZone.css";

const DropZone = ({ onFileSelect }) => {
    const [selectedFile, setSelectedFile] = useState(null);

    const onDrop = useCallback((acceptedFiles) => {
        const file = acceptedFiles[0];
        if (file) {
            setSelectedFile(file);
            onFileSelect(file);
        }
    }, [onFileSelect]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        multiple: false, // Allow only one file
    });

    return (
        <div className="dropzone-container">
            <div {...getRootProps()} className={`dropzone ${isDragActive ? "active" : ""}`}>
                <input {...getInputProps()} />
                <img src={upload} alt="Upload Here!!" draggable="false" className="upload" />
                <p>{isDragActive ? "Drop your file here..." : "Drag & drop your files here or click to browse"}</p>
            </div>
        </div>
    );
};

export default DropZone;
