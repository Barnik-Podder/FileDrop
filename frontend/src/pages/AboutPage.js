import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './AboutPage.css';
import { FaGithub } from "react-icons/fa";

const AboutUs = () => {
    return (
        <>
            <Navbar />
            <div className="mainContainer">
                <div className="about-container">
                    <h1 className="about-title">About FileDrop</h1>
                    <p className="about-text">
                        Welcome to <span className="about-highlight">FileDrop</span>, your go-to platform for fast, secure, and hassle-free file sharing. Whether you need to send a document, an image, or a large media file, we've got you covered!
                    </p>

                    <h2 className="about-subtitle">Why Choose FileDrop?</h2>
                    <ul className="about-list">
                        <li className="about-list-item"><strong>Fast Uploads & Downloads:</strong> Experience lightning-fast file transfers with our optimized servers.</li>
                        <li className="about-list-item"><strong>Auto-Deletion:</strong> Choose when your files get deleted for better privacy and control.</li>
                        <li className="about-list-item"><strong>Easy Sharing:</strong> Generate a shareable link and a QR code for quick access.</li>
                        <li className="about-list-item"><strong>User-Friendly Interface:</strong> A simple and clean design for effortless file management.</li>
                    </ul>

                    <h2 className="about-subtitle">How FileDrop Works</h2>
                    <p className="about-text">
                        Upload your file, and we'll generate a unique shareable link along with a QR code. Simply send the link or scan the QR code to download instantly—no complicated steps required!
                    </p>

                    <h2 className="about-subtitle">Open Source & Contributions</h2>
                    <p className="about-text">
                        FileDrop is an <strong>open-source</strong> project, and we welcome contributions from the community! Whether it's improving features, fixing bugs, or enhancing security, your help is invaluable.
                    </p>
                    <p className="about-text">
                        💻 Check out the GitHub repository and contribute:  
                        <a 
                            href="https://github.com/Barnik-Podder/FileDrop" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="about-link"
                        >
                           <FaGithub /> GitHub Repository
                        </a>
                    </p>

                    <h2 className="about-subtitle">Get Started with FileDrop</h2>
                    <p className="about-text">
                        Join FileDrop today and experience seamless file sharing with ease. Your files, your control!
                    </p>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default AboutUs;
