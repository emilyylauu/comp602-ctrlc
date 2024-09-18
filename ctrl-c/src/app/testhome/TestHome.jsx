"use client";

import React from "react";
// import { useAuth } from "../(contexts)/authContexts";
import { auth } from "../firebase/firebase";

export default function TestHome() {
  const user = auth.currentUser;
  console.log(user);

  return (
    <div>
      <h1>Welcome {user.displayName}!</h1>
    </div>
  );
}
