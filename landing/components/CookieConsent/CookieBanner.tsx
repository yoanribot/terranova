"use client";

import { useImperativeHandle, useRef, useState, type Ref } from "react";
import { BarChart3, Cookie, LockKeyhole, MapPin, Megaphone, Settings2, X } from "lucide-react";
import { DENIED_PREFERENCES } from "@/lib/consent.mjs";
import { useConsent, type Preferences } from "./ConsentProvider";
import Link from "@/components/PageLink";
import styles from "./CookieBanner.module.css";

export type CookieBannerHandle = { open: () => void };

export default function CookieBanner({ ref }: { ref: Ref<CookieBannerHandle> }) {
  const { preferences, record, ready, save, analyticsAvailable, advertisingAvailable } = useConsent();
  const [draft, setDraft] = useState<Preferences>(DENIED_PREFERENCES);
  const [message, setMessage] = useState("");
  const dialog = useRef<HTMLDialogElement>(null);
  const title = useRef<HTMLHeadingElement>(null);
  const all = { analytics: analyticsAvailable, maps: true, advertising: advertisingAvailable };

  function open() {
    setDraft({ ...preferences });
    dialog.current?.showModal();
    title.current?.focus();
  }
  useImperativeHandle(ref, () => ({ open }));

  function choose(choice: Preferences) {
    const persisted = save(choice);
    dialog.current?.close();
    setMessage(persisted ? "Preferencias de cookies guardadas. Puedes cambiarlas al pie de la página." : "Preferencias aplicadas para esta visita. Tu navegador no permite guardarlas para próximas visitas.");
  }

  const categories = [
    ...(analyticsAvailable ? [{ key: "analytics" as const, title: "Análisis", Icon: BarChart3, description: "Google Analytics permite medir las visitas y el uso del sitio para ayudarnos a mejorarlo. Puede almacenar identificadores en tu dispositivo." }] : []),
    { key: "maps" as const, title: "Mapas de Google", Icon: MapPin, description: "Permite cargar el mapa interactivo y las imágenes de perfil de reseñas de Google, cuando estén disponibles. Google recibe datos como tu dirección IP y puede utilizar cookies. Sin activarlo, puedes consultar la dirección y el enlace para llegar." },
    ...(advertisingAvailable ? [{ key: "advertising" as const, title: "Publicidad de Google", Icon: Megaphone, description: "Permite publicidad y su medición con Google AdSense. Google y sus socios pueden utilizar identificadores y datos de navegación. También se respetará tu elección en el mensaje de privacidad de Google." }] : []),
  ];

  return <>
    <p role="status" className="sr-only">{message}</p>
    {ready && !record ? <section className={styles.banner} data-cookie-banner aria-labelledby="cookie-banner-title">
      <div className={styles.bannerCopy}><span className={styles.icon}><Cookie size={25} aria-hidden="true" /></span><div><h2 id="cookie-banner-title">Tu privacidad, tu elección.</h2><p>En Terranova Clinica Dental guardamos tu elección de cookies. Con tu permiso, activamos {analyticsAvailable ? "el análisis de visitas y " : ""}los mapas de Google{advertisingAvailable ? " y la publicidad" : ""}. Puedes rechazar lo opcional y seguir navegando.</p><div className={styles.links}><Link href="/terminos/politica-cookies">Política de cookies</Link><Link href="/terminos/politica-privacidad">Privacidad</Link></div></div></div>
      <div className={styles.bannerActions}><button type="button" onClick={() => choose(DENIED_PREFERENCES)}>Rechazar opcionales</button><button type="button" onClick={() => choose(all)}>Aceptar todas</button><button type="button" className={styles.configure} onClick={open}><Settings2 size={16} aria-hidden="true" />Configurar</button></div>
    </section> : null}

    <dialog ref={dialog} className={styles.dialog} aria-labelledby="cookie-settings-title">
      <div className={styles.dialogHeader}><span className={styles.icon}><Cookie size={26} aria-hidden="true" /></span><button type="button" className={styles.close} onClick={() => dialog.current?.close()} aria-label="Cerrar configuración sin guardar"><X size={22} aria-hidden="true" /></button></div>
      <div className={styles.dialogIntro}><p className={styles.eyebrow}>Preferencias de privacidad</p><h2 id="cookie-settings-title" ref={title} tabIndex={-1}>Tú decides qué activar.</h2><p>Las opciones adicionales están desactivadas hasta que las aceptes. Cerrar esta ventana no cambia tu elección.</p></div>
      <form onSubmit={event => { event.preventDefault(); choose(draft); }}>
        <div className={styles.categories}>
          <div className={styles.category}><div className={styles.categoryHeading}><h3><LockKeyhole size={19} aria-hidden="true" />Necesarias</h3><span className={styles.always}>Siempre activas</span></div><p>Guardan tu elección en este navegador durante 180 días. Este almacenamiento local no se utiliza para medir visitas ni para publicidad.</p></div>
          {categories.map(({ key, title, Icon, description }) => <div className={styles.category} key={key}><div className={styles.categoryHeading}><label htmlFor={`cookie-${key}`}><Icon size={19} aria-hidden="true" />{title}</label><input id={`cookie-${key}`} type="checkbox" role="switch" aria-describedby={`cookie-${key}-description`} checked={draft[key]} onChange={event => setDraft(previous => ({ ...previous, [key]: event.target.checked }))} /></div><p id={`cookie-${key}-description`}>{description}</p></div>)}
        </div>
        <div className={styles.moreInfo}><p>Puedes cambiar o retirar tu permiso en cualquier momento desde «Configurar cookies», al pie de la página.</p><div className={styles.links}><Link href="/terminos/politica-cookies">Política de cookies</Link><Link href="/terminos/politica-privacidad">Privacidad</Link><a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">Privacidad de Google<span className="sr-only"> (se abre en otra pestaña)</span></a></div></div>
        <div className={styles.dialogActions}><button type="button" onClick={() => choose(DENIED_PREFERENCES)}>Rechazar opcionales</button><button type="button" onClick={() => choose(all)}>Aceptar todas</button><button type="submit" className={styles.configure}>Guardar preferencias</button></div>
      </form>
    </dialog>
  </>;
}
