// ---------------------------------------------------------------------------
// Constantes centralizadas de LuminArte Projects
// ---------------------------------------------------------------------------

export const WHATSAPP_NUMBER = "524771737105";
export const WHATSAPP_BASE = `https://wa.me/${WHATSAPP_NUMBER}`;

export const CONTACT_PHONE = "+52 477 173 7105";
export const CONTACT_EMAIL = "contacto@luminarte.mx";
export const SITE_URL = "https://luminarte.mx";

export type SocialLink = {
  label: string;
  href: string;
  ariaLabel: string;
};

export const SOCIAL_LINKS: SocialLink[] = [
  { label: "Instagram", href: "https://www.instagram.com/LuminArteMx/", ariaLabel: "Instagram" },
  { label: "Facebook", href: "https://www.facebook.com/LuminArteMx/", ariaLabel: "Facebook" },
  { label: "YouTube", href: "https://www.youtube.com/@LuminArteMx", ariaLabel: "YouTube" },
  { label: "TikTok", href: "https://www.tiktok.com/@luminartemx", ariaLabel: "TikTok" },
  { label: "X", href: "https://x.com/LuminArteMx", ariaLabel: "X" },
];
