"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight, Star } from "lucide-react";
import { useConsent } from "@/components/CookieConsent/ConsentProvider";
import type { GoogleReview, GoogleReviewsData } from "./types";
import styles from "./GoogleReviews.module.css";
import ReviewDate from "./ReviewDate";

function Stars({ rating }: { rating: number }) {
  return <span className={styles.stars} role="img" aria-label={`${rating} de 5 estrellas`}>{Array.from({ length: 5 }, (_, index) => <Star key={index} size={15} fill={index < rating ? "currentColor" : "none"} aria-hidden="true" />)}</span>;
}

function ReviewText({ review, index }: { review: GoogleReview; index: number }) {
  const [expanded, setExpanded] = useState(false);
  const [overflows, setOverflows] = useState(false);
  const text = useRef<HTMLParagraphElement>(null);
  useEffect(() => {
    const paragraph = text.current;
    if (!paragraph || expanded) return;
    let mounted = true;
    const check = () => { if (mounted) setOverflows(paragraph.scrollHeight > paragraph.clientHeight + 1); };
    const observer = new ResizeObserver(check);
    observer.observe(paragraph);
    document.fonts.ready.then(check);
    return () => { mounted = false; observer.disconnect(); };
  }, [expanded, review.text]);
  return <div className={styles.reviewText}><blockquote><p ref={text} id={`review-text-${index}`} className={!expanded ? styles.collapsedText : undefined}>«{review.text}»</p></blockquote>{overflows ? <button type="button" aria-expanded={expanded} aria-controls={`review-text-${index}`} aria-label={`${expanded ? "Ver menos de la reseña" : "Leer reseña completa"} de ${review.author}`} onClick={() => setExpanded(!expanded)}>{expanded ? "Ver menos" : "Leer texto completo"}</button> : null}</div>;
}

function ReviewAuthor({ review, showAvatar }: { review: GoogleReview; showAvatar: boolean }) {
  const avatar = showAvatar && review.avatarUrl
    ? <Image src={review.avatarUrl} alt="" width={44} height={44} unoptimized referrerPolicy="no-referrer" />
    : <span aria-hidden="true">{review.author.trim().split(/\s+/).slice(0, 2).map(part => part[0]).join("")}</span>;
  return <div className={styles.author}>
    {review.authorUrl ? <a className={styles.avatar} href={review.authorUrl} target="_blank" rel="noopener noreferrer" aria-label={`Perfil de ${review.author} en Google, se abre en otra pestaña`}>{avatar}</a> : <span className={styles.avatar} aria-hidden="true">{avatar}</span>}
    <div>{review.authorUrl ? <a className={styles.authorName} href={review.authorUrl} target="_blank" rel="noopener noreferrer">{review.author}<span className="sr-only"> (perfil de Google, se abre en otra pestaña)</span></a> : <strong className={styles.authorName}>{review.author}</strong>}
      {review.publishedAt || review.dateLabel ? <ReviewDate publishedAt={review.publishedAt} label={review.dateLabel} /> : null}
    </div>
  </div>;
}

export default function GoogleReviewsCarousel({ data }: { data: GoogleReviewsData }) {
  const viewport = useRef<HTMLUListElement>(null);
  const [active, setActive] = useState(0);
  const [atEnd, setAtEnd] = useState(false);
  const { preferences } = useConsent();

  function move(direction: number) {
    const list = viewport.current;
    if (!list) return;
    const cards = Array.from(list.children) as HTMLElement[];
    const index = Math.max(0, Math.min(cards.length - 1, active + direction));
    const target = cards[index];
    list.scrollTo({ left: target.offsetLeft - cards[0].offsetLeft, behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
  }
  const updateActive = useCallback(() => {
    const list = viewport.current;
    if (!list) return;
    const cards = Array.from(list.children) as HTMLElement[];
    const first = cards[0].offsetLeft;
    const nearest = cards.reduce((best, card, index) => Math.abs(card.offsetLeft - first - list.scrollLeft) < Math.abs(cards[best].offsetLeft - first - list.scrollLeft) ? index : best, 0);
    setActive(nearest);
    setAtEnd(list.scrollLeft >= list.scrollWidth - list.clientWidth - 2);
  }, []);
  useEffect(() => {
    const list = viewport.current;
    if (!list) return;
    const observer = new ResizeObserver(updateActive);
    observer.observe(list);
    return () => observer.disconnect();
  }, [updateActive, data.reviews.length]);
  if (!data.reviews.length) return null;

  return <section id="opiniones" className={styles.section} aria-labelledby="google-reviews-title" aria-roledescription="carrusel">
    <div className={styles.inner}>
      <header className={styles.heading}>
        <div><p className={styles.eyebrow}>Opiniones en Google</p><h2 id="google-reviews-title">La confianza,<br />en sus palabras.</h2></div>
        <div className={styles.summary}><p>Experiencias compartidas por quienes han visitado Terranova Clinica Dental.</p>{data.rating !== undefined && data.reviewCount !== undefined ? <a className={styles.aggregate} href={data.mapsUrl} target="_blank" rel="noopener noreferrer"><strong>{data.rating.toLocaleString("es-ES", { minimumFractionDigits: 1 })}</strong><span><Stars rating={Math.round(data.rating)} /><span>{data.reviewCount.toLocaleString("es-ES")} reseñas en Google</span></span><ArrowUpRight size={20} aria-hidden="true" /><span className="sr-only"> (se abre en otra pestaña)</span></a> : <a className={styles.allReviews} href={data.mapsUrl} target="_blank" rel="noopener noreferrer">Ver reseñas en Google <ArrowUpRight size={18} aria-hidden="true" /><span className="sr-only"> (se abre en otra pestaña)</span></a>}</div>
      </header>
      <p className={styles.selection}>Una selección de {data.reviews.length} opiniones de pacientes. Puedes consultar más valoraciones en Google.</p>
      <p id="reviews-instructions" className="sr-only">Desliza para ver más reseñas o utiliza los botones anterior y siguiente. Con el teclado, usa las flechas izquierda y derecha sobre la lista.</p>
      <ul id="google-reviews-list" className={styles.viewport} ref={viewport} onScroll={updateActive} tabIndex={0} aria-label="Reseñas destacadas de Google" aria-describedby="reviews-instructions" onKeyDown={event => { if (event.target !== event.currentTarget) return; if (event.key === "ArrowRight" || event.key === "ArrowLeft") { event.preventDefault(); move(event.key === "ArrowRight" ? 1 : -1); } }}>
        {data.reviews.map((review, index) => <li key={review.id} className={styles.slide}>
          <article aria-label={`Reseña de ${review.author}, ${index + 1} de ${data.reviews.length}`}>
            <div className={styles.cardTop}><Stars rating={review.rating} /><span>Google</span></div>
            <ReviewText review={review} index={index} />
            <ReviewAuthor review={review} showAvatar={preferences.maps} />
            {review.reviewUrl ? <a href={review.reviewUrl} target="_blank" rel="noopener noreferrer" className={styles.source}>Leer reseña en Google <ArrowUpRight size={16} aria-hidden="true" /><span className="sr-only"> (se abre en otra pestaña)</span></a> : null}
          </article>
        </li>)}
      </ul>
      <div className={styles.bottom}><p>Experiencias compartidas en primera persona.{data.capturedAt ? ` Consultadas el ${new Intl.DateTimeFormat("es-ES", { day:"numeric",month:"long",year:"numeric",timeZone:"Europe/Madrid" }).format(new Date(data.capturedAt))}.` : ""}</p><div className={styles.controls}><span role="status" aria-live="polite"><span className="sr-only">Desde la reseña </span>{String(active + 1).padStart(2,"0")} <span>/ {data.reviews.length}</span></span><button type="button" onClick={()=>move(-1)} disabled={active === 0} aria-label="Reseña anterior" aria-controls="google-reviews-list"><ArrowLeft size={20} aria-hidden="true" /></button><button type="button" onClick={()=>move(1)} disabled={atEnd} aria-label="Reseña siguiente" aria-controls="google-reviews-list"><ArrowRight size={20} aria-hidden="true" /></button></div></div>
    </div>
  </section>;
}
