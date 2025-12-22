import styles from "./Footer.module.css";
import sharedStyles from "@/app/shared.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faWhatsapp,
  faXTwitter,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import {
  faEnvelope,
  faPhone,
  faMapMarkerAlt,
} from "@fortawesome/free-solid-svg-icons";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footerRoot}>
      <div className={sharedStyles.container}>
        <div className={styles.footerContent}>
          {/* Company Info */}
          <div className={styles.footerSection}>
            <h3 className={styles.footerTitle}>Terranova Dentista</h3>
            <p className={styles.footerDescription}>
              Tu salud dental es nuestra prioridad. Ofrecemos servicios dentales
              de calidad con tecnología de vanguardia.
            </p>
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
                <span>+1 234 567 890</span>
              </li>
              <li className={styles.contactItem}>
                <FontAwesomeIcon
                  icon={faEnvelope}
                  className={styles.contactIcon}
                />
                <span>info@terranova.com</span>
              </li>
              <li className={styles.contactItem}>
                <FontAwesomeIcon
                  icon={faMapMarkerAlt}
                  className={styles.contactIcon}
                />
                <span>Calle Principal 123, Ciudad</span>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div className={styles.footerSection}>
            <h4 className={styles.footerSubtitle}>Síguenos</h4>
            <div className={styles.socialLinks}>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
              >
                <FontAwesomeIcon icon={faFacebook} size="lg" />
              </a>
              <a
                href="https://wa.me/1234567890"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
              >
                <FontAwesomeIcon icon={faWhatsapp} size="lg" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
              >
                <FontAwesomeIcon icon={faXTwitter} size="lg" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
              >
                <FontAwesomeIcon icon={faInstagram} size="lg" />
              </a>
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
