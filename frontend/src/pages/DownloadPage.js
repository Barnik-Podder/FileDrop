import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useParams } from 'react-router-dom';
import image from '../images/download.png';
import './DownloadPage.css';
import RenderFile from '../components/RenderFile';
import axios from 'axios';
import fileDownload from 'js-file-download';
import { ToastContainer, toast } from "react-toastify";

const DownloadPage = () => {
    const { id } = useParams();
    const [file, setFile] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fileDetails = async () => {
            try {
                const res = await axios.get(`${process.env.REACT_APP_API_URI}/download/filedetails/${id}`);
                setFile(res.data);
            } catch (err) {
                setError(err?.response?.data?.message || "An unexpected error occurred");
                toast.error(err?.response?.data?.message || "An unexpected error occurred",{
                    position: "top-center"
                })
            } 
        };
        fileDetails();
    }, [id]);

    const handleDownload = async () => {
        const toastId = toast.loading("Downloading file...",{
            position: "top-center"
        });
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URI}/download/${id}`, {
                responseType: 'blob',  // Important: Treat as a file
            });
            fileDownload(response.data, file.name);
            toast.update(toastId, { render: "Download complete!", type: "success", isLoading: false, autoClose: 3000 });

        } catch (error) {
            console.error("Error downloading file:", error);
            toast.update(toastId, { render: "Download failed!", type: "error", isLoading: false, autoClose: 3000 });
        }
        
    };

    return (
        <>
            <Navbar />
            <ToastContainer/>
            <div className="mainContainer downloadMain">
                <div className="outerBox">
                    <div className="fileUpload">
                        <img src={image} alt="download img" className="downloadImg" />
                        <RenderFile file={file} />
                        <p>{error}</p>

                            <button className="button" onClick={handleDownload}>
                                Download!
                            </button>
                        
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default DownloadPage;
