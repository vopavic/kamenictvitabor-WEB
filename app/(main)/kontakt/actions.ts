"use server"

import { Resend } from "resend"
import { siteConfig } from "@/lib/site-config"

export type ContactFormState = {
  status: "idle" | "success" | "error"
  message?: string
  fieldErrors?: Partial<Record<"name" | "email" | "phone" | "message", string>>
  /** Odeslané hodnoty — React po odeslání formulář resetuje, takže je vracíme zpět. */
  values?: { name: string; email: string; phone: string; message: string }
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;")
}

/** Odešle zprávu z kontaktního formuláře přes Resend na firemní email. */
export async function sendContactMessage(
  _prev: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  // Honeypot — skryté pole vyplňují jen boti. Tváříme se jako úspěch, ať nezkoušejí znovu.
  if (String(formData.get("company") ?? "").trim()) {
    return { status: "success", message: "Děkujeme, zpráva byla odeslána." }
  }

  const name = String(formData.get("name") ?? "").trim()
  const email = String(formData.get("email") ?? "").trim()
  const phone = String(formData.get("phone") ?? "").trim()
  const message = String(formData.get("message") ?? "").trim()

  const values = { name, email, phone, message }

  const fieldErrors: ContactFormState["fieldErrors"] = {}
  if (!name) fieldErrors.name = "Vyplňte prosím jméno."
  if (!email && !phone) fieldErrors.email = "Zadejte prosím email nebo telefon, abychom se vám mohli ozvat."
  if (email && !EMAIL_RE.test(email)) fieldErrors.email = "Email nemá platný formát."
  if (!message) fieldErrors.message = "Napište nám prosím zprávu."
  if (name.length > 200 || email.length > 200 || phone.length > 50 || message.length > 5000) {
    fieldErrors.message = "Zpráva je příliš dlouhá."
  }
  if (Object.keys(fieldErrors).length > 0) {
    return { status: "error", message: "Zkontrolujte prosím vyplněné údaje.", fieldErrors, values }
  }

  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    console.error("[kontakt] Chybí RESEND_API_KEY — zprávu nelze odeslat.")
    return {
      status: "error",
      message: `Zprávu se nepodařilo odeslat. Zavolejte nám prosím na ${siteConfig.phoneFormatted}.`,
      values,
    }
  }

  const to = process.env.CONTACT_TO_EMAIL || siteConfig.email
  // Odesílatel musí být z domény ověřené v Resendu (kamentabor.cz).
  const domain = new URL(siteConfig.url).hostname.replace(/^www\./, "")
  const from = process.env.CONTACT_FROM_EMAIL || `Web Kamenictví Tábor <web@${domain}>`

  const text = [
    `Jméno: ${name}`,
    `Email: ${email || "—"}`,
    `Telefon: ${phone || "—"}`,
    "",
    message,
  ].join("\n")

  const html = `
    <h2>Nová zpráva z webu ${escapeHtml(siteConfig.url)}</h2>
    <p><strong>Jméno:</strong> ${escapeHtml(name)}<br>
    <strong>Email:</strong> ${email ? `<a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a>` : "—"}<br>
    <strong>Telefon:</strong> ${phone ? `<a href="tel:${escapeHtml(phone)}">${escapeHtml(phone)}</a>` : "—"}</p>
    <p style="white-space:pre-wrap">${escapeHtml(message)}</p>
  `

  try {
    const resend = new Resend(apiKey)
    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: email || undefined,
      subject: `Poptávka z webu — ${name}`,
      text,
      html,
    })
    if (error) {
      console.error("[kontakt] Resend vrátil chybu:", error)
      return {
        status: "error",
        message: `Zprávu se nepodařilo odeslat. Zkuste to prosím znovu nebo zavolejte na ${siteConfig.phoneFormatted}.`,
        values,
      }
    }
  } catch (err) {
    console.error("[kontakt] Odeslání selhalo:", err)
    return {
      status: "error",
      message: `Zprávu se nepodařilo odeslat. Zkuste to prosím znovu nebo zavolejte na ${siteConfig.phoneFormatted}.`,
      values,
    }
  }

  return { status: "success", message: "Děkujeme, zpráva byla odeslána. Ozveme se vám co nejdříve." }
}
