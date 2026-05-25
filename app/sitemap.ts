import type { MetadataRoute } from "next"
import { siteConfig } from "@/lib/site-config"

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  const routes: Array<{ path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] }> = [
    { path: "", priority: 1.0, changeFrequency: "monthly" },
    { path: "/o-nas", priority: 0.8, changeFrequency: "yearly" },
    { path: "/sluzby", priority: 0.9, changeFrequency: "monthly" },
    { path: "/vzornik", priority: 0.7, changeFrequency: "yearly" },
    { path: "/realizace", priority: 0.9, changeFrequency: "monthly" },
    { path: "/kontakt", priority: 0.8, changeFrequency: "yearly" },
    { path: "/konzultace", priority: 0.6, changeFrequency: "yearly" },
  ]

  return routes.map(r => ({
    url: `${siteConfig.url}${r.path}`,
    lastModified: now,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }))
}
