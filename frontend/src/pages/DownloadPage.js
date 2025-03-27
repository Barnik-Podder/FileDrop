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
    const [loading, setLoading] = useState(true); // Track loading state

    useEffect(() => {
        const fileDetails = async () => {
            setLoading(true);
            try {
                const res = await axios.get(`${process.env.REACT_APP_API_URI}/download/filedetails/${id}`);
                setFile(res.data);
            } catch (err) {
                setError(err?.response?.data?.message || "An unexpected error occurred");
                toast.error(err?.response?.data?.message || "An unexpected error occurred", {
                    position: "top-center"
                });
            } finally {
                setLoading(false);
            }
        };
        fileDetails();
    }, [id]);

    const handleDownload = async () => {
        const toastId = toast.loading("Downloading file...", {
            position: "top-center"
        });
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URI}/download/${id}`, {
                responseType: 'blob',
            });
            fileDownload(response.data, file.name);
            toast.update(toastId, { render: "Download complete!", type: "success", isLoading: false, autoClose: 3000 });
        } catch (error) {
            let errorMessage = "An unexpected error occurred";
            if (error.response && error.response.data instanceof Blob) {
                const text = await error.response.data.text();
                const json = JSON.parse(text);
                errorMessage = json.message || errorMessage;
            }
            setFile(null);
            setError(errorMessage);
            toast.update(toastId, { render: "Download failed!", type: "error", isLoading: false, autoClose: 3000 });
        }
    };

    return (
        <>
            <Navbar />
            <ToastContainer />
            <div className="mainContainer downloadMain">
                <div className="outerBox">
                    <div className="fileUpload">
                        <img src={image} alt="download img" className="downloadImg" />
                        
                        {loading ? (
                            <div className="loading-container">
                                <span className="dot"></span>
                                <span className="dot"></span>
                                <span className="dot"></span>
                            </div>
                        ) : (
                            <RenderFile file={file} />
                        )}

                        {error && <p>{error}</p>}

                        <button className="button" onClick={handleDownload} disabled={loading}>
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
