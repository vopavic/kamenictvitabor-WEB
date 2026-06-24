import { siteConfig } from "@/lib/site-config"

export const BUSINESS_ID = `${siteConfig.url}#business`

/** BreadcrumbList JSON-LD. `items` jdou od kořene k aktuální stránce. */
export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${siteConfig.url}${item.path}`,
    })),
  }
}

/** FAQPage JSON-LD ze sdíleného pole otázek a odpovědí. */
export function faqJsonLd(faq: ReadonlyArray<{ q: string; a: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  }
}
