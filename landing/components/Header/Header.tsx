"use client";

import Link from "@/components/PageLink";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Menu, X } from "lucide-react";
import styles from "./Header.module.css";

const navigationLinks = [
  { href: "/servicios", label: "Tratamientos" },
  { href: "/pacientes", label: "Prepara tu visita" },
  { href: "/#map", label: "Dónde estamos" },
];

function currentSection(pathname: string, href: string): "page" | "location" | undefined {
  if (pathname === href) return "page";
  if (href === "/servicios" && pathname.startsWith("/servicios/")) return "location";
  return undefined;
}

export default function Header({ title }: { title?: string }) {
  const companyName = title || "Terranova Clinica Dental";
  const [isOpen, setIsOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (!isOpen) return;
    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
        menuButton.current?.focus();
      }
    }
    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [isOpen]);

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link href="/" className={styles.logo} aria-label={`${companyName}, inicio`}>
          <Image src="/logo.svg" width={44} height={44} alt="" />
          <span><strong>{companyName}</strong><span>San Blas-Canillejas · Madrid</span></span>
        </Link>
        <nav className={styles.desktopNav} aria-label="Navegación principal">
          {navigationLinks.map(link => <Link key={link.href} href={link.href} className={styles.navLink} aria-current={currentSection(pathname, link.href)}>{link.label}</Link>)}
        </nav>
        <Link href="/#contact" className={styles.appointment}>Pide tu cita <ArrowUpRight size={17} aria-hidden="true" /></Link>
        <button ref={menuButton} type="button" onClick={() => setIsOpen(open => !open)} className={styles.menuButton} aria-label={isOpen ? "Cerrar menú" : "Abrir menú"} aria-expanded={isOpen} aria-controls="mobile-navigation">
          {isOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
      </div>
      <nav id="mobile-navigation" className={styles.mobileNav} hidden={!isOpen} aria-label="Navegación móvil">
        {navigationLinks.map(link => <Link key={link.href} href={link.href} className={styles.navLink} onClick={() => setIsOpen(false)} aria-current={currentSection(pathname, link.href)}>{link.label}<ArrowUpRight size={18} aria-hidden="true" /></Link>)}
        <Link href="/#contact" className={styles.navLink} onClick={() => setIsOpen(false)}>Contacto <ArrowUpRight size={18} aria-hidden="true" /></Link>
      </nav>
    </header>
  );
}
