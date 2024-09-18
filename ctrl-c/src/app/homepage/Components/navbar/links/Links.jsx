"use client";

import styles from "./links.module.css";
import NavLink from './navLink/navLink';
import React, { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faUser, faCog, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image';

const links = [
    {
        title: "Homepage",
        path: "/",
    },
    {
        title: "Game",
        path: "/game",
    },
    {
        title: "Journal",
        path: "/journal"
    },
];

const Links = () => {
    const [open, setOpen] = useState(false); // Mobile menu state
    const [profileMenuOpen, setProfileMenuOpen] = useState(false); // Profile dropdown state
    const menuRef = useRef();

    // Close the profile dropdown if clicked outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setProfileMenuOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className={styles.container}>
            {/* Desktop Links */}
            <div className={styles.links}>
                {links.map((link) => (
                    <NavLink item={link} key={link.title} />
                ))}

                {/* Profile Picture */}
                <div className={styles.profileContainer} ref={menuRef}>
                    <div className={styles.menuTrigger} onClick={() => setProfileMenuOpen(!profileMenuOpen)}>
                        <Image
                            src="/profile.jpg"
                            alt="Profile Picture"
                            width={50}
                            height={50}
                            className={styles.heroImg}
                        />
                    </div>

                    {/* Dropdown menu */}
                    {profileMenuOpen && (
                        <div className={styles.dropdownMenu}>
                            <h3>UserName<br /><span>@userID</span></h3>
                            <ul>
                                <p className={styles.dropdownItem}>
                                    profile information <br/>bla bla bla
                                </p>
                                <li className={styles.dropdownItem}>
                                    <FontAwesomeIcon icon={faSignOutAlt} />
                                    <a href="#">Logout</a>
                                </li>
                            </ul>
                        </div>
                    )}
                </div>
            </div>

            {/* Hamburger Icon for mobile view */}
            <div className={styles.menuIcon} onClick={() => setOpen((prev) => !prev)}>
                <FontAwesomeIcon icon={faBars} />
            </div>

            {/* Mobile Links */}
            {open && (
                <div className={styles.mobileLinks}>
                    {links.map((link) => (
                        <NavLink item={link} key={link.title} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Links;
