import Link from "next/link";
import React from "react";
import NavbarButton from "./NavbarButton";

export default function Navbar() {
  return (
    <div className="navbar bg-base-100">
      <div className="container border-2 border-blue-300 flex mx-auto justify-between p-4">
        <Link href={"/"} className="btn btn-ghost text-xl">
          Open diary
        </Link>
        <NavbarButton />
      </div>
    </div>
  );
}
