"use client";

import React from "react";
import Image from "next/image";
import styles from "@/app/(component)/Home/home.module.css";
import { useAuth } from "@/app/(context)/auth"; // Custom hook for auth
import { useRouter } from "next/navigation"; // Router for navigation

export default function Home() {
	const { userLoggedIn } = useAuth(); // Get user login status
	const router = useRouter(); // Access navigation

	// console.log("is user logged in: " + userLoggedIn);

	return (
		<div className={styles.container}>
			{/* Redirect if not logged in */}
			{!userLoggedIn && router.push("/")}
			{/* Text and description section */}
			<div className={styles.textContainer}>
				<h1 className={styles.title}>Top platform for stress relief</h1>
				<p className={styles.desc}>
					Our app combines journaling and games to help you unwind.
					Find calm and balance in one place.
				</p>
			</div>
			{/* Image section */}
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
