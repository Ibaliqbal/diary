"use client";

import React from "react";
import { usePathname, useRouter } from "next/navigation";
const links = [
  {
    title: "Create Diary",
    href: "/dashboard",
  },
  {
    title: "My Diarys",
    href: "/dashboard/my-diary",
  },
  {
    title: "Favorite Diary",
    href: "/dashboard/favorite-diary",
  },
  {
    title: "My Comments",
    href: "/dashboard/my-comments",
  },
];

const Sidebar = () => {
  const pathname = usePathname();
  const { push } = useRouter();
  return (
    <aside className="md:col-span-1 w-full flex flex-col gap-4 items-center p-4">
      <h1 className="text-2xl font-bold">Dashboard Panel</h1>
      <ul className="w-full flex flex-col gap-4">
        {links.map((link) => (
          <li
            key={link.title}
            onClick={() => push(link.href)}
            className={`w-full p-5 ${
              pathname === link.href
                ? "text-white bg-slate-700"
                : "bg-white text-black"
            } rounded-lg cursor-pointer`}
          >
            {link.title}
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
