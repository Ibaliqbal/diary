"use client";
import React from "react";
import { motion } from "framer-motion";

const CardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <motion.article
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.5,
        delay: Math.round(Math.random() * 5 + 1) * 0.2,
        type: "spring",
      }}
      className="card card-body card-bordered shadow-lg hover:scale-105 duration-300 transition-all ease-in-out bg-base-300 cursor-pointer hover:bg-secondary h-80"
    >
      {children}
    </motion.article>
  );
};

export default CardLayout;
