import styles from "./Footer.module.css";
import sharedStyles from "@/app/shared.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faPhone,
  faMapMarkerAlt,
} from "@fortawesome/free-solid-svg-icons";
import { Link, LocationSection } from "@/types/data";
import { getSocialIconFromLabel } from "@/lib/utils";

type Props = {
  title: string;
  socials: Array<Link>;
  location: LocationSection;
};

const termsConditionsLinks = [
  { label: "Datos Legales", slug: "datos-legales" },
  {
    label: "Política de privacidad y cookies",
    slug: "politica-privacidad-cookies",
  },
  { label: "Aviso legal", slug: "aviso-legal" },
];

const Footer = ({ title, socials, location }: Props) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="footer" className={styles.footerRoot}>
      <div className={sharedStyles.container}>
        <div className={styles.footerContent}>
          {/* Company Info */}
          <div className={styles.footerSection}>
            <h3 className={styles.footerTitle}>{title}</h3>

            <ul className={styles.footerList}>
              {termsConditionsLinks.map(({ label, slug }, index) => (
                <li key={index} className={styles.footerListItem}>
                  <a href={`/terminos/${slug}`} className={styles.footerLink}>
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className={styles.footerSection}>
            <h4 className={styles.footerSubtitle}>Contacto</h4>
            <ul className={styles.footerList}>
              <li className={styles.contactItem}>
                <FontAwesomeIcon
                  icon={faPhone}
                  className={styles.contactIcon}
                />
                <span>{location.phoneMain}</span>
              </li>

              {location.phoneSecondary && (
                <li className={styles.contactItem}>
                  <FontAwesomeIcon
                    icon={faPhone}
                    className={styles.contactIcon}
                  />
                  <span>{location.phoneSecondary}</span>
                </li>
              )}
              <li className={styles.contactItem}>
                <FontAwesomeIcon
                  icon={faEnvelope}
                  className={styles.contactIcon}
                />
                <a href={`mailto:${location.email}`}>{location.email}</a>
              </li>
              <li className={styles.contactItem}>
                <FontAwesomeIcon
                  icon={faMapMarkerAlt}
                  className={styles.contactIcon}
                />
                <span>{location.address}</span>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div className={styles.footerSection}>
            <h4 className={styles.footerSubtitle}>Síguenos</h4>
            <div className={styles.socialLinks}>
              {socials.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialLink}
                  aria-label={social.label}
                >
                  <FontAwesomeIcon
                    icon={getSocialIconFromLabel(social.label)}
                    size="lg"
                  />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className={styles.footerBottom}>
          <p className={styles.copyright}>
            © {currentYear} Terranova Dentista. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
