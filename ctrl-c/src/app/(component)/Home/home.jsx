"use client";

import React from "react";
import Image from "next/image";
import styles from "@/app/(component)/Home/home.module.css";
import { useAuth } from "@/app/(context)/auth";
import { useRouter } from "next/navigation";

export default function Home() {
	const { userLoggedIn } = useAuth();
	const router = useRouter();

	return (
		<div className={styles.container}>
			{!userLoggedIn && router.push("/")}
			<div className={styles.textContainer}>
				<h1 className={styles.title}>Top platform for stress relief</h1>
				<p className={styles.desc}>
					Our app combines journaling and games to help you unwind.
					Find calm and balance in one place.
				</p>
				<div className={styles.buttons}>
					{/* <button className={styles.button}>Learn More</button>
					<button className={styles.button}>Contact</button> */}
				</div>
			</div>
			<div className={styles.imgContainer}>
				<Image
					src="/logo.svg"
					alt="Stress Relief Logo"
					fill
					className={styles.heroImg}
				/>
			</div>
		</div>
	);
}
