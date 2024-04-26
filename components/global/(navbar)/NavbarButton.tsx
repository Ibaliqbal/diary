"use client";
import React from "react";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";

function NavbarButton() {
  const { isSignedIn, isLoaded } = useUser();
  if (!isLoaded) return <p>Please wait...</p>;
  return isSignedIn ? (
    <div className="flex items-center gap-4">
      <Link href={"/dashboard"}>Dashboard</Link>
      <UserButton afterSignOutUrl="/" />
    </div>
  ) : (
    <Link href={"/sign-in"}>Sign In</Link>
  );
}

export default NavbarButton;
