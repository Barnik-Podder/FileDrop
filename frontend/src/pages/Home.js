import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import illustration from '../images/imageIllustration.png';
import Footer from '../components/Footer';
import RenderFile from '../components/RenderFile';
import DropZone from '../components/DropZone';
import FileShare from '../components/FileShare';
import axios from "axios";
import './Home.css';
import { ToastContainer, toast } from 'react-toastify';


const Home = () => {
    const [file, setFile] = useState(null);
    const [id, setId] = useState("");
    const [deleteAfter, setDeleteAfter] = useState(5); // Default 5 minutes

    const handleFileSelect = (selectedFile) => {
        setFile(selectedFile);
    };

    const handleDeleteAfterChange = (e) => {
        setDeleteAfter(e.target.value);
    };

    const handleUpload = async () => {
        if (!file) {
            toast.warning("Please select a file to upload.", {
                position: "top-center",
            });
            return;
        }

        const formData = new FormData();
        formData.append("file", file);
        formData.append("deleteAfter", deleteAfter);

        const toastId = toast.loading("Uploading your file...");

        try {
            
            const response = await axios.post(`${process.env.REACT_APP_API_URI}/api/upload`, formData, {
                headers: { "Content-Type": "multipart/form-data" }
            });

            setId(response.data.id);
            toast.dismiss(toastId); 

            toast.success("Upload complete! 🎉", {
                position: "top-center",

            });

        } catch (error) {
            console.log(error);
            
            toast.dismiss(toastId);
            toast.error("Upload failed! Try again.", {
                position: "top-center",
            });

        }
    };


    return (
        <>
            <Navbar />
            <ToastContainer />
            <div className="mainContainer">
                <div className="outerBox">
                    <div className="fileUpload">
                        {!id && <DropZone onFileSelect={handleFileSelect} />}
                        {file && <RenderFile file={file} />}
                        <FileShare fileId={id} />
                        {!id && <>
                            <span>Delete After:</span>
                            <select value={deleteAfter} onChange={handleDeleteAfterChange} className="deleteAfter">
                                <option value={1}>1 Minute</option>
                                <option value={5}>5 Minutes</option>
                                <option value={10}>10 Minutes</option>
                                <option value={30}>30 Minutes</option>
                            </select></>}
                        {!id && <input
                            type="submit"
                            className="button"
                            value="UPLOAD"
                            onClick={handleUpload}
                        />}
                    </div>
                </div>
                <div className="imageIllustration">
                    <img src={illustration} alt="Upload Illustration" draggable="false" />
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Home;
