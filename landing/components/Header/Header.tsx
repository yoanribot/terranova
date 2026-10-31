"use client";

import Link from "@/components/PageLink";
import { useState, useEffect } from "react";
import styles from "./Header.module.css";
import clsx from "clsx";

const navigationLinks = [
  { id: "services", href: "/servicios", label: "Tratamientos" },
  { id: "patients", href: "/pacientes", label: "Antes de tu visita" },
  // { id: "team", href: "/#team", label: "Nuestro Equipo" },
  { id: "map", href: "/#map", label: "Nuestra Ubicación" },
  { id: "contact", href: "/#contact", label: "Contacto" },
];

const Header = ({ title }: { title?: string }) => {
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
      <div className="container">
        <div className="flex justify-between">
          {/* Logo */}
          <Link
            href="/"
            className={clsx(styles.logo, { [styles.logoScrolled]: isScrolled })}
          >
            <img src="/logo.svg" className="h-8" alt="Logo" />
            <span className={styles.logoText}>{title || "Terranova"}</span>
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
            aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={isOpen}
            aria-controls="mobile-navigation"
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
          <nav id="mobile-navigation" className={styles.mobileNav} inert={!isOpen}>
            {navigationLinks.map((link) => (
              <Link key={link.id} href={link.href} className={styles.navLink} onClick={() => setIsOpen(false)}>
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
