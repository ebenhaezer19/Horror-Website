"use client";

import { motion } from "framer-motion";
import { Skull } from "lucide-react";
import { NavLink } from "./NavLink";
import { NavDropdown } from "./NavDropdown";

const galleryItems = [
  { label: "Dark Portraits", href: "/gallery/portraits" },
  { label: "Nightmare Scenes", href: "/gallery/nightmares" },
  { label: "Abstract Horror", href: "/gallery/abstract" },
];

const aboutItems = [
  { label: "Our Story", href: "/about/story" },
  { label: "The Artists", href: "/about/artists" },
  { label: "Dark Philosophy", href: "/about/philosophy" },
];

export function Navbar() {
  return (
    <motion.nav 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="fixed w-full z-50 bg-black/80 backdrop-blur-sm border-b border-red-900/20"
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <motion.a
            href="/"
            className="flex items-center gap-2 text-red-500"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <Skull className="w-6 h-6" />
            <span className="font-serif text-xl">Horror Gallery</span>
          </motion.a>

          <div className="flex items-center gap-8">
            <NavLink href="/">Home</NavLink>
            <NavDropdown label="Gallery" items={galleryItems} />
            <NavDropdown label="About" items={aboutItems} />
            <NavLink href="/contact">Contact</NavLink>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}