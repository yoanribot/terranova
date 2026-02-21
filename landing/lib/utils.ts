import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import {
  faFacebook,
  faWhatsapp,
  faXTwitter,
  faInstagram,
  faLinkedin,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import { faMessage } from "@fortawesome/free-regular-svg-icons";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const SOCIAL_ICONS_MAP: Record<string, IconProp> = {
  facebook: faFacebook,
  whatsapp: faWhatsapp,
  twitter: faXTwitter,
  instagram: faInstagram,
  linkedin: faLinkedin,
  youtube: faYoutube,
};

export function getSocialIconFromLabel(label: string) {
  switch (label.toLowerCase()) {
    case "facebook":
      return SOCIAL_ICONS_MAP.facebook;
    case "whatsapp":
      return SOCIAL_ICONS_MAP.whatsapp;
    case "twitter":
      return SOCIAL_ICONS_MAP.twitter;
    case "instagram":
      return SOCIAL_ICONS_MAP.instagram;
    case "linkedin":
      return SOCIAL_ICONS_MAP.linkedin;
    case "youtube":
      return SOCIAL_ICONS_MAP.youtube;
    default:
      return faMessage;
  }
}

export function getStrapiMedia(url: string | undefined) {
  if (!url) return "";

  if (url.startsWith("http")) return url;

  return `${process.env.NEXT_PUBLIC_STRAPI_BASE_URL}${url}`;
}
