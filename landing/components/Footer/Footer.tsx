import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import { Link, LocationSection } from "@/types/data";
import { getSocialIconFromLabel } from "@/lib/utils";
import PageLink from "@/components/PageLink";
import styles from "./Footer.module.css";
import { CookieSettingsButton } from "@/components/CookieConsent/ConsentProvider";

type Props = { title: string; socials: Array<Link>; location: LocationSection };
const usefulLinks = [{href:"/servicios",label:"Todos los tratamientos"},{href:"/pacientes",label:"Prepara tu visita"},{href:"/informacion-editorial",label:"Responsabilidad y fuentes"}];
const legalLinks = [{href:"/terminos",label:"Información legal"},{href:"/terminos/aviso-legal",label:"Aviso legal"},{href:"/terminos/politica-privacidad",label:"Privacidad"},{href:"/terminos/politica-cookies",label:"Cookies"}];

export default function Footer({ title, socials, location }: Props) {
  return (
    <footer id="footer" className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.top}>
          <div className={styles.brand}><PageLink href="/" aria-label={`${title}, inicio`}>{title}<span>San Blas-Canillejas · Madrid</span></PageLink><p>Información clara para cuidar tu sonrisa y preparar tu próxima visita.</p><div className={styles.socials}>{socials.map(social => <a key={social.href} href={social.href} target="_blank" rel="noopener noreferrer" aria-label={`${social.label}, se abre en otra pestaña`}><FontAwesomeIcon icon={getSocialIconFromLabel(social.label)} aria-hidden="true" /></a>)}</div></div>
          <nav aria-label="Enlaces útiles del pie"><h2>Te ayudamos a decidir</h2><ul>{usefulLinks.map(link => <li key={link.href}><PageLink href={link.href}>{link.label}<ArrowUpRight size={14} aria-hidden="true" /></PageLink></li>)}</ul></nav>
          <div className={styles.contact}><h2>Hablemos</h2><a href={`tel:${location.phoneMain?.replace(/\s/g,"")}`}><Phone size={17} aria-hidden="true" />{location.phoneMain}</a>{location.phoneSecondary ? <a href={`tel:${location.phoneSecondary.replace(/\s/g,"")}`}><Phone size={17} aria-hidden="true" />{location.phoneSecondary}</a> : null}<a href={`mailto:${location.email}`}><Mail size={17} aria-hidden="true" />{location.email}</a><p><MapPin size={17} aria-hidden="true" />{location.address}</p></div>
        </div>
        <div className={styles.bottom}><p>© {new Date().getFullYear()} {title}</p><nav aria-label="Información legal">{legalLinks.map(link => <PageLink href={link.href} key={link.href}>{link.label}</PageLink>)}<CookieSettingsButton /></nav></div>
      </div>
    </footer>
  );
}
