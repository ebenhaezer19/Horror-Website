"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

interface DropdownItem {
  label: string;
  href: string;
}

interface NavDropdownProps {
  label: string;
  items: DropdownItem[];
}

export function NavDropdown({ label, items }: NavDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button className="flex items-center gap-1 text-gray-300 hover:text-red-500 transition-colors duration-300">
        {label}
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.6 }}
        >
          <ChevronDown className="w-4 h-4" />
        </motion.span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="absolute top-full left-0 mt-2 w-48 bg-black/90 border border-red-900/50 backdrop-blur-sm rounded-sm"
          >
            <div className="py-2">
              {items.map((item) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  className="block px-4 py-2 text-sm text-gray-300 hover:text-red-500 hover:bg-red-950/30"
                  whileHover={{ x: 10 }}
                  transition={{ duration: 0.4 }}
                >
                  {item.label}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}