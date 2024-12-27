"use client";

import { motion } from "framer-motion";
import Link from "next/link";

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
}

export function NavLink({ href, children }: NavLinkProps) {
  return (
    <Link href={href} className="relative group">
      <motion.span
        className="inline-block text-gray-300 hover:text-red-500 transition-colors duration-300"
        whileHover={{ scale: 1.05 }}
      >
        {children}
      </motion.span>
      <motion.span
        className="absolute bottom-0 left-0 w-0 h-[1px] bg-red-800 group-hover:w-full"
        transition={{ duration: 0.7, ease: "easeInOut" }}
      />
    </Link>
  );
}