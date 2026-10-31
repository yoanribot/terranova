import type { AnchorHTMLAttributes } from "react";

// AdSense Auto ads cannot be reliably unloaded on a client-side route change.
// Document navigation gives each destination a fresh advertising eligibility check.
export default function PageLink(props: AnchorHTMLAttributes<HTMLAnchorElement>) {
  return <a {...props} />;
}
