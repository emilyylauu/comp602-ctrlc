import React from "react";
// import Links from "./links/Links";
import styles from "@/app/(component)/NavBar/navbar.module.css";

const Navbar = () => {
  return (
    <div className={styles.container}>
      <div className={styles.logo}>Blank Web</div>
      <div>
        <Links />
      </div>
    </div>
  );
};

export default Navbar;
