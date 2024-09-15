"use client";

import styles from "./links.module.css";
import NavLink from './navLink/navLink';
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

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
    const [open, setOpen] = useState(false);

    // TEMPORARY
    const session = true;

    return (
        <div className={styles.container}>
            <div className={styles.links}>
                {links.map((link) => (
                    <NavLink item={link} key={link.title} />
                ))}
                {session ? (
                    <button className={styles.logout}>Logout</button>
                ) : (
                    <NavLink item={{ title: "Login", path: "/login" }} />
                )}
            </div>
            <div className={styles.menuIcon} onClick={() => setOpen((prev) => !prev)}>
                <FontAwesomeIcon icon={faBars} />
            </div>
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
