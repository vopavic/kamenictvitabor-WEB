import * as React from "react"

import { cn } from "@/lib/utils"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

export function Button({ className, variant = 'primary', size = 'md', ...props }: ButtonProps) {
  const baseStyles = "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent disabled:pointer-events-none disabled:opacity-50"
  
  const variants = {
    primary: "bg-accent text-white hover:bg-opacity-90",
    outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
    ghost: "hover:bg-accent hover:text-accent-foreground",
  }
  
  const sizes = {
    sm: "h-9 px-3 text-sm",
    md: "h-11 px-8 py-3 text-base", // Larger touch targets for luxury feel
    lg: "h-14 px-8 text-lg",
  }

  // Combine classes using clsx and tailwind-merge (via cn)
  const classes = cn(baseStyles, variants[variant], sizes[size], className)

  return (
    <button className={classes} {...props} />
  )
}
