import Link from "next/link";
import React from "react";
import { IoBugSharp } from "react-icons/io5";
import { FaBug } from "react-icons/fa";

const NavBar = () => {
  const navLinks = [
    { label: "Dashboard", href: "/" },
    { label: "Issues", href: "/issues" },
    { label: "TBD", href: "/" },
  ];
  return (
    <nav className="flex space-x-6 border-b mb-5 px-5 h-14 items-center">
      <Link href="/" className="hover:scale-125 transition-all duration-350 ">
        <FaBug />
      </Link>
      <ul className="flex space-x-6">
        {navLinks.map((link) => (
          <Link key={link.href} className="text-zinc-500 hover:text-zinc-800 transition-colors" href={link.href}>
            {link.label}
          </Link>
        ))}
      </ul>
    </nav>
  );
};

export default NavBar;
