"use client"

import { useState } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

// Dummy data for gallery
const projects = [
  // Kuchyňské desky
  { id: 19, category: "Kuchyňské desky", image: "/kuchynske-desky/Screenshot 2026-02-21 153447.png", title: "Kuchyňská deska" },
  { id: 20, category: "Kuchyňské desky", image: "/kuchynske-desky/Screenshot 2026-02-21 153551.png", title: "Kuchyňská deska" },
  { id: 21, category: "Kuchyňské desky", image: "/kuchynske-desky/Screenshot 2026-02-21 153606.png", title: "Kuchyňská deska" },
  { id: 22, category: "Kuchyňské desky", image: "/kuchynske-desky/Screenshot 2026-02-21 153637.png", title: "Kuchyňská deska" },

  // Obklady
  { id: 23, category: "Obklady", image: "/obklady/Screenshot 2026-02-21 153719.png", title: "Kamenný obklad krbu" },

  // Schody a parapety
  { id: 24, category: "Schody a parapety", image: "/schody-parapety/Screenshot 2026-02-21 153304.png", title: "Vnitřní schodiště" },
  { id: 25, category: "Schody a parapety", image: "/schody-parapety/Screenshot 2026-02-21 153348.png", title: "Venkovní schody" },
  { id: 26, category: "Schody a parapety", image: "/schody-parapety/Screenshot 2026-02-21 153405.png", title: "Kamenný parapet" },

  // Existing Interiér
  { id: 100, category: "Kuchyňské desky", image: "/kitchen.jpg", title: "Kuchyňská deska - Moderní kuchyně" },
  
  // Renovace
  { id: 101, category: "Renovace", image: "/renovation.png", title: "Renovace hrobu" },

  // Urnové hroby
  { id: 1, category: "Urnové hroby", image: "/urnaky/IMG_5248.jpeg", title: "Urnový hrob" },
  { id: 2, category: "Urnové hroby", image: "/urnaky/IMG_5364.jpeg", title: "Urnový hrob" },
  { id: 3, category: "Urnové hroby", image: "/urnaky/IMG_5367.jpeg", title: "Urnový hrob" },
  { id: 4, category: "Urnové hroby", image: "/urnaky/IMG_5491.jpeg", title: "Urnový hrob" },

  // Jednohroby
  { id: 5, category: "Jednohroby", image: "/jednohroby/44e42b48-0646-4b4c-a558-70a1defca1de.JPG", title: "Jednohrob" },
  { id: 6, category: "Jednohroby", image: "/jednohroby/IMG_4663.jpeg", title: "Jednohrob" },
  { id: 7, category: "Jednohroby", image: "/jednohroby/IMG_4891.jpeg", title: "Jednohrob" },
  { id: 8, category: "Jednohroby", image: "/jednohroby/IMG_5351.jpeg", title: "Jednohrob" },
  { id: 9, category: "Jednohroby", image: "/jednohroby/IMG_5378.jpeg", title: "Jednohrob" },
  { id: 10, category: "Jednohroby", image: "/jednohroby/IMG_5379.jpeg", title: "Jednohrob" },
  { id: 11, category: "Jednohroby", image: "/jednohroby/IMG_5511.jpeg", title: "Jednohrob" },
  { id: 12, category: "Jednohroby", image: "/jednohroby/IMG_5517.jpeg", title: "Jednohrob" },

  // Dvojhroby
  { id: 13, category: "Dvojhroby", image: "/dvojhroby/56deb137-cb2f-4f96-9756-d65486e4ebab.JPG", title: "Dvojhrob" },
  { id: 14, category: "Dvojhroby", image: "/dvojhroby/IMG_5027.jpeg", title: "Dvojhrob" },
  { id: 15, category: "Dvojhroby", image: "/dvojhroby/IMG_5032.jpeg", title: "Dvojhrob" },
  { id: 16, category: "Dvojhroby", image: "/dvojhroby/IMG_5268 (1).jpeg", title: "Dvojhrob" },
  { id: 17, category: "Dvojhroby", image: "/dvojhroby/IMG_5268.jpeg", title: "Dvojhrob" },
  { id: 18, category: "Dvojhroby", image: "/dvojhroby/IMG_5345.jpeg", title: "Dvojhrob" },
]

const categories = ["Vše", "Urnové hroby", "Jednohroby", "Dvojhroby", "Kuchyňské desky", "Obklady", "Schody a parapety", "Renovace"]

export default function RealizationsPage() {
  const [filter, setFilter] = useState("Vše")

  const filteredProjects = projects.filter(project => 
    filter === "Vše" ? true : project.category === filter
  )

  return (
    <div className="flex flex-col min-h-screen pb-20">
      <section className="bg-stone-100 py-16">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-4">Naše Realizace</h1>
          <p className="font-body text-xl text-stone-600">Prohlédněte si ukázky naší práce.</p>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4 md:px-6">
          {/* Filter Tabs */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={cn(
                  "px-6 py-2 rounded-full font-medium transition-all duration-300 font-body",
                  filter === cat 
                    ? "bg-accent text-white shadow-md transform scale-105" 
                    : "bg-white text-stone-600 hover:bg-stone-100 border border-stone-200"
                )}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Masonry Grid */}
          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <AnimatePresence>
              {filteredProjects.map((project) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  key={project.id}
                  className="group relative overflow-hidden rounded-sm shadow-sm"
                >
                  <div className="aspect-[4/3] bg-stone-200 relative">
                     {/* Using Next/Image would be better but requires domain config for external images. Using img tag for prototype safety or remotePatterns. */}
                     {/* I will use standard img tag for external placeholder execution speed, or configure next.config.ts if I want to be strict. 
                         For MVP, standard img with object-cover is fine, or simple div bg.
                     */}
                     {/* <img src={project.image} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" /> */}
                     {/* Using div approach for consistent styling without layout shift issues if size unknown */}
                     <div 
                        className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
                        style={{ backgroundImage: `url('${project.image}')` }}
                     />
                     <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300" />
                     
                     <div className="absolute bottom-0 left-0 p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
                        <span className="text-accent text-sm font-bold uppercase tracking-wider mb-2 block">{project.category}</span>
                        <h3 className="text-white font-heading text-xl font-bold">{project.title}</h3>
                     </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
