import { WHATSAPP_BASE } from "./constants";

export type WhatsAppIntent = "approve" | "changes" | "info";

const MESSAGES: Record<WhatsAppIntent, (subject: string) => string> = {
  approve: (s) =>
    `Hola, revisé la propuesta "${s}" y me gustaría avanzar con la aprobación. ¿Me comparten siguientes pasos?`,
  changes: (s) =>
    `Hola, revisé la propuesta "${s}" y me gustaría solicitar algunos ajustes. ¿Podemos revisarlos?`,
  info: (s) =>
    `Hola, revisé la propuesta "${s}" y tengo algunas dudas. ¿Me pueden ayudar?`,
};

/**
 * Build a WhatsApp deep-link for a project proposal.
 *
 * @param intent – the action the client wants to take
 * @param subject – display name of the project (used in the message)
 * @param slug – project slug appended as a reference
 */
export function buildWhatsAppLink(
  intent: WhatsAppIntent,
  subject: string,
  slug: string,
): string {
  const body = `${MESSAGES[intent](subject)}\n\nReferencia: ${slug}`;
  return `${WHATSAPP_BASE}?text=${encodeURIComponent(body)}`;
}
