import {
  Baby,
  ClipboardList,
  Columns3,
  HeartPulse,
  Layers,
  Moon,
  ScanFace,
  ScanLine,
  Smile,
  Sparkles,
  Target,
  WalletCards,
} from "lucide-react";

const icons = {
  "cbct-dental": ScanLine,
  "implantologia-dental": Layers,
  endodoncia: Target,
  periodoncia: HeartPulse,
  "carillas-dentales": Smile,
  blanqueamiento: Sparkles,
  "estetica-facial": ScanFace,
  "ortodoncia-invisible": Smile,
  "ortodoncia-fija": Columns3,
  odontopediatria: Baby,
  protesis: Layers,
  bruxismo: Moon,
  aseguradora: ClipboardList,
  financiaciones: WalletCards,
};

export default function ServiceIcon({ slug, size = 24 }: { slug: string; size?: number }) {
  const Icon = icons[slug as keyof typeof icons] || Smile;
  return <Icon size={size} strokeWidth={1.6} aria-hidden="true" />;
}
