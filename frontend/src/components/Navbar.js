import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import logo from '../images/logo.png';
import { CgMenuRight, CgClose } from "react-icons/cg";

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <div className="navbar">
            <header>
                <div className="navContainer">
                    <nav>
                        <div className="brand">
                            <img src={logo} alt="Logo" width="100px" />
                            <h1>
                                <Link to="/" className="brandName color">FileDrop</Link>
                            </h1>
                        </div>

                        {/* Desktop Navigation (Visible on Large Screens) */}
                        <div className="navLinks">
                            <ul>
                                <li><Link to="/" className="color">Home</Link></li>
                                <li><Link to="/about" className="color">About Us</Link></li>
                            </ul>
                        </div>

                        {/* Mobile Menu Icon */}
                        <div className="menuIcon" onClick={() => setMenuOpen(!menuOpen)}>
                            {menuOpen ? <CgClose size={40} /> : <CgMenuRight size={40} />}
                        </div>
                    </nav>

                    {/* Mobile Popup Menu */}
                    <div className={`navPopup ${menuOpen ? "active" : ""}`}>
                        <ul>
                            <li><Link to="/" className="color" onClick={() => setMenuOpen(false)}>Home</Link></li>
                            <li><Link to="/about" className="color" onClick={() => setMenuOpen(false)}>About Us</Link></li>
                        </ul>
                    </div>
                </div>
            </header>
        </div>
    );
}

export default Navbar;
