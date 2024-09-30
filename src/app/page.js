import React from "react";
import Image from "next/image";
import styles from "./page.module.css";

const Home = () => {
	return (
		<div className={styles.container}>
			<div className={styles.textContainer}>
				<h1 className={styles.title}>Top platform for stress relief</h1>
				<p className={styles.desc}>
					Our app combines journaling and games to help you unwind. Find calm
					and balance in one place.
				</p>
				<div className={styles.buttons}>
					<button className={styles.button}>Learn More</button>
					<button className={styles.button}>Contact</button>
				</div>
			</div>
			<div className={styles.imgContainer}>
				<Image
					src="/logo.png"
					alt="Stress Relief Logo"
					fill
					className={styles.heroImg}
				/>
			</div>
		</div>
	);
};

export default Home;
