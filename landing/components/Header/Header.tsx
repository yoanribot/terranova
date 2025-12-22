"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import styles from "./Header.module.css";
import sharedStyles from "@/app/shared.module.css";
import clsx from "clsx";

const navigationLinks = [
  { id: "services", href: "#services", label: "Servicios" },
  { id: "team", href: "#team", label: "Nuestro Equipo" },
  { id: "testimonials", href: "#testimonials", label: "Testimonios" },
  { id: "contact", href: "#contact", label: "Contacto" },
  { id: "map", href: "#map", label: "Nuestra Ubicación" },
];

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={styles.header}>
      <div className={sharedStyles.container}>
        <div className="flex justify-between">
          {/* Logo */}
          <Link
            href="/"
            className={clsx(styles.logo, { [styles.logoScrolled]: isScrolled })}
          >
            <div className={styles.logoText}>Terranova</div>
          </Link>

          {/* Desktop Navigation */}
          <nav className={styles.desktopNav}>
            {navigationLinks.map((link) => (
              <Link key={link.id} href={link.href} className={styles.navLink}>
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={styles.menuButton}
            aria-label="Toggle menu"
          >
            <span
              className={`${styles.menuLine} ${
                isOpen ? styles.menuLineActive1 : ""
              }`}
            />
            <span
              className={`${styles.menuLine} ${
                isOpen ? styles.menuLineActive2 : ""
              }`}
            />
            <span
              className={`${styles.menuLine} ${
                isOpen ? styles.menuLineActive3 : ""
              }`}
            />
          </button>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`${styles.mobileNavWrapper} ${
            isOpen ? styles.mobileNavOpen : ""
          }`}
        >
          <nav className={styles.mobileNav}>
            <Link
              href="#services"
              onClick={() => setIsOpen(false)}
              className={styles.navLink}
            >
              Servicios
            </Link>
            <Link
              href="#about"
              onClick={() => setIsOpen(false)}
              className={styles.navLink}
            >
              Nosotros
            </Link>
            <Link
              href="#testimonials"
              onClick={() => setIsOpen(false)}
              className={styles.navLink}
            >
              Testimonios
            </Link>
            <Link
              href="#contact"
              onClick={() => setIsOpen(false)}
              className={styles.navLink}
            >
              Contacto
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
