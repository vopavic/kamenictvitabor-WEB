"use client"

import { useState } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

// Dummy data for gallery
const projects = [
  { id: 1, category: "Hroby", image: "https://www.kamentabor.cz/data/gallery/zula-s-hnedou-strukturou-mystery-brown-cervena-zula-multicolor-red/img/2cd9cf40-30b1-4737-89be-e65f3c381a5f.jpg", title: "Urnový hrob - Kombinace" },
  { id: 2, category: "Interiér", image: "/kitchen.jpg", title: "Kuchyňská deska - Moderní kuchyně" },
  { id: 3, category: "Hroby", image: "https://www.kamentabor.cz/data/gallery/zula-s-hnedou-strukturou-mystery-brown-cerna-zula-impala/img/abeb156b-43dc-4b81-aa1b-535b81624d33.jpg", title: "Moderní dvojhrob" },
  { id: 4, category: "Renovace", image: "/renovation.png", title: "Renovace hrobu" },

]

const categories = ["Vše", "Hroby", "Interiér", "Renovace"]

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
                        style={{ backgroundImage: `url(${project.image})` }}
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
