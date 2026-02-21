import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, ArrowRight } from "lucide-react"

interface ServiceCardProps {
  title: string
  description: string
  href: string
  icon?: React.ReactNode
  imageSrc?: string
}

export function ServiceCard({ title, description, href, icon, imageSrc }: ServiceCardProps) {
  return (
    <Link 
      href={href}
      className="group flex flex-col bg-white border border-stone-200 hover:border-accent/50 hover:shadow-lg transition-all duration-300 overflow-hidden"
    >
      {imageSrc && (
        <div className="relative w-full h-48 overflow-hidden">
          <Image 
            src={imageSrc} 
            alt={title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
      )}
      <div className="p-8 flex flex-col flex-grow">
        {icon && (
          <div className="mb-4 text-accent group-hover:scale-110 transition-transform duration-300">
            {icon}
          </div>
        )}
        <h3 className="font-heading text-xl font-bold mb-3 group-hover:text-accent transition-colors">
          {title}
        </h3>
        <p className="text-stone-600 mb-6 font-body flex-grow">
          {description}
        </p>
        <div className="flex items-center text-accent font-medium mt-auto group-hover:translate-x-1 transition-transform">
          Více informací <ArrowRight className="ml-2 w-4 h-4" />
        </div>
      </div>
    </Link>
  )
}
