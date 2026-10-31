import { ArrowUpRight, MessageSquareQuote } from "lucide-react";
import data from "@/content/google-reviews.json";
import GoogleReviewsCarousel from "./GoogleReviewsCarousel";
import type { GoogleReviewsData } from "./types";
import styles from "./GoogleReviews.module.css";

export default function GoogleReviews() {
  const reviews = data as GoogleReviewsData;
  if (reviews.reviews.length) return <GoogleReviewsCarousel data={reviews} />;
  // Publish only a real source link until individual review records are supplied.
  return <section className={styles.section} aria-labelledby="google-reviews-title"><div className={styles.inner}><header className={styles.heading}><div><p className={styles.eyebrow}>Opiniones en Google</p><h2 id="google-reviews-title">La confianza,<br />en sus palabras.</h2></div><div className={styles.summary}><MessageSquareQuote size={32} strokeWidth={1.5} aria-hidden="true" /><p>Conoce las experiencias que otras personas han compartido sobre Terranova Clinica Dental en su ficha de Google.</p><a className={styles.allReviews} href={reviews.mapsUrl} target="_blank" rel="noopener noreferrer">Leer las reseñas en Google <ArrowUpRight size={18} aria-hidden="true" /><span className="sr-only"> (se abre en otra pestaña)</span></a></div></header></div></section>;
}
