import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Realizace — galerie naší práce",
  description:
    "Prohlédněte si více než 300 fotografií našich realizací: urnové hroby, jednohroby, dvojhroby, památníky, kuchyňské desky, schody, parapety, litinové a kamenné kříže, gravírování a renovace.",
  alternates: { canonical: "/realizace" },
  openGraph: {
    title: "Realizace — galerie | Kamenictví Tábor",
    description: "Ukázky hřbitovní architektury, interiéru i exteriéru z naší dílny.",
    url: "/realizace",
  },
}

export default function RealizaceLayout({ children }: { children: React.ReactNode }) {
  return children
}
