"use client"

import { useState } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

// Dummy data for gallery
const projects = [
  { id: 1, category: "Hroby", image: "https://images.unsplash.com/photo-1596501042732-c7f5f922718e?q=80&w=2574&auto=format&fit=crop", title: "Urnový hrob - Žula" },
  { id: 2, category: "Interiér", image: "https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2600&auto=format&fit=crop", title: "Kuchyňská deska - Nero Assoluto" },
  { id: 3, category: "Hroby", image: "https://images.unsplash.com/photo-1616601445749-d7bce3fd5758?q=80&w=2574&auto=format&fit=crop", title: "Dvojhrob s pomníkem" },
  { id: 4, category: "Renovace", image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=2670&auto=format&fit=crop", title: "Čištění pískovce" },
  { id: 5, category: "Interiér", image: "https://images.unsplash.com/photo-1617806118233-18e1de247200?q=80&w=2632&auto=format&fit=crop", title: "Obklad krbu" },
  { id: 6, category: "Hroby", image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=2568&auto=format&fit=crop", title: "Rodinný hrob" },
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
        <div className="container px-4 md:px-6 text-center">
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-4">Naše Realizace</h1>
          <p className="font-body text-xl text-stone-600">Prohlédněte si ukázky naší práce.</p>
        </div>
      </section>

      <section className="py-12">
        <div className="container px-4 md:px-6">
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
