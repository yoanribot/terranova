"use client";

import { useSyncExternalStore } from "react";
import { formatRelativeReviewDate } from "@/lib/review-dates.mjs";

function subscribeToClock(notify: () => void) {
  const timer = window.setInterval(notify, 60_000);
  return () => window.clearInterval(timer);
}
const clientMinute = () => Math.floor(Date.now() / 60_000);
const serverMinute = () => null;
const absoluteDate = new Intl.DateTimeFormat("es-ES", { day: "numeric", month: "long", year: "numeric", timeZone: "Europe/Madrid" });

export default function ReviewDate({ publishedAt, label }: { publishedAt?: string | null; label?: string | null }) {
  // Do not bake a relative age into static HTML or mismatch it during hydration.
  const minute = useSyncExternalStore(subscribeToClock, clientMinute, serverMinute);
  if (publishedAt) {
    if (minute === null) return null;
    const relative = formatRelativeReviewDate(publishedAt, minute * 60_000);
    if (!relative) return null;
    const fullDate = absoluteDate.format(new Date(publishedAt));
    return <time dateTime={publishedAt} title={fullDate} aria-label={`${relative}, ${fullDate}`}>{relative}</time>;
  }
  return label ? <span>{label}</span> : null;
}
