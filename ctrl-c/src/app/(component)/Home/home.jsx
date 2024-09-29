"use client"; // Enables client-side rendering

import React from "react";
import Image from "next/image";
import styles from "@/app/(component)/Home/home.module.css";
import { useAuth } from "@/app/(context)/auth"; // Custom hook for auth
import { useRouter } from "next/navigation"; // Router for navigation

export default function Home() {
	const { userLoggedIn } = useAuth(); // Get user login status
	const router = useRouter(); // Access navigation

	// Redirect to homepage if not logged in
	console.log("is user logged in: " + userLoggedIn);

	return ( 
		<div className={styles.container}>
			{!userLoggedIn && router.push("/")} {/* Redirect if not logged in */}
		</div>
	);
}
