import Link from "next/link"
import { ArrowRight } from "lucide-react"

interface ServiceCardProps {
  title: string
  description: string
  href: string
  icon?: React.ReactNode
}

export function ServiceCard({ title, description, href, icon }: ServiceCardProps) {
  return (
    <Link 
      href={href}
      className="group flex flex-col p-8 bg-white border border-stone-200 hover:border-accent/50 hover:shadow-lg transition-all duration-300"
    >
      {icon && (
        <div className="mb-6 text-accent group-hover:scale-110 transition-transform duration-300">
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
    </Link>
  )
}
