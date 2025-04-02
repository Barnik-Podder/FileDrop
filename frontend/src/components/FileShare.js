import React, { useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { LuCopy } from "react-icons/lu";
import { TiTick } from "react-icons/ti";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import "./FileShare.css";

const FileShare = ({ fileId }) => {
    const [isClicked, setIsClicked] = useState(false);
    if (!fileId) return null;

    const fileLink = `${window.location.origin}/download/${fileId}`;

    const handleCopy = () => {
        navigator.clipboard.writeText(fileLink);
        toast.success("Link copied to clipboard!", { position: "top-center" });

        // Add class for animation
        setIsClicked(true);
        setTimeout(() => setIsClicked(false), 2000); // Remove class after animation
    };

    return (
        <div className="filelink">
            <ToastContainer />
            <p>Shareable Link:</p>
            <div className="input-container">
                <input type="text" value={fileLink} readOnly />
                {isClicked ? (
                    <TiTick className="tick-icon" />
                ) : (
                    <LuCopy 
                        onClick={handleCopy} 
                        className="copy-icon" 
                    />
                )}
            </div>
            <div className="qr-container">
                <QRCodeCanvas value={fileLink} size={150} />
            </div>
            <div className="instruction">
            <p>To upload a new file just refresh the page!</p>
            <p>Make sure you copy the shareable link! 😊</p>
            </div>
        </div>
    );
};

export default FileShare;
