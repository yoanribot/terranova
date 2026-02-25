import styles from "./Footer.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faPhone,
  faMapMarkerAlt,
} from "@fortawesome/free-solid-svg-icons";
import { Link, LocationSection } from "@/types/data";
import { getSocialIconFromLabel } from "@/lib/utils";
import Logo from "../Logo";

type Props = {
  title: string;
  socials: Array<Link>;
  location: LocationSection;
};

const termsConditionsLinks = [
  { label: "Aviso legal", slug: "aviso-legal" },
  { label: "Política de cookies", slug: "politica-cookies" },
  {
    label: "Política de privacidad",
    slug: "politica-privacidad",
  },
];

const Footer = ({ title, socials, location }: Props) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="footer" className={styles.footerRoot}>
      <div className="container">
        <div className={styles.footerContent}>
          {/* Company Info */}
          <div className={styles.footerSection}>
            <h3 className={styles.footerTitle}>
              <Logo color="#708f67" className="h-20 w-20" />
              {title}
            </h3>

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
                <span className="text-md">{location.phoneMain}</span>
              </li>

              {location.phoneSecondary && (
                <li className={styles.contactItem}>
                  <FontAwesomeIcon
                    icon={faPhone}
                    className={styles.contactIcon}
                  />
                  <span className="text-md">{location.phoneSecondary}</span>
                </li>
              )}
              <li className={styles.contactItem}>
                <FontAwesomeIcon
                  icon={faEnvelope}
                  className={styles.contactIcon}
                />
                <a href={`mailto:${location.email}`} className="text-md">
                  {location.email}
                </a>
              </li>
              <li className={styles.contactItem}>
                <FontAwesomeIcon
                  icon={faMapMarkerAlt}
                  className={styles.contactIcon}
                />
                <span className="text-md">{location.address}</span>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div className={styles.footerSection}>
            <h4 className={styles.footerSubtitle}>Siguenos</h4>
            <div className={styles.socialLinks}>
              {socials.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialLink}
                  aria-label={social.label}
                  title={social.label}
                >
                  <FontAwesomeIcon
                    icon={getSocialIconFromLabel(social.label)}
                    size="lg"
                    className={styles.socialIcon}
                  />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className={styles.footerBottom}>
          <p className={styles.copyright}>
            © {currentYear} {title}. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
