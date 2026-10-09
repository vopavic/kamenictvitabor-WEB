"use client"

import { useActionState } from "react"
import { CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { cn } from "@/lib/utils"
import { sendContactMessage, type ContactFormState } from "./actions"

const inputClass =
  "flex h-12 w-full rounded-md border border-stone-300 bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:border-transparent transition-shadow"

const initialState: ContactFormState = { status: "idle" }

function FieldError({ message }: { message?: string }) {
  if (!message) return null
  return <p className="text-sm text-red-700">{message}</p>
}

export function ContactForm() {
  const [state, formAction, isPending] = useActionState(sendContactMessage, initialState)

  if (state.status === "success") {
    return (
      <div className="flex flex-col items-center text-center gap-4 py-12" role="status">
        <CheckCircle size={48} className="text-accent" />
        <p className="font-body text-lg text-foreground">{state.message}</p>
      </div>
    )
  }

  return (
    <form action={formAction} className="space-y-4" noValidate>
      {/* Honeypot proti spamu — skryté před lidmi i čtečkami */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="company">Firma</label>
        <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label htmlFor="name" className="text-sm font-medium text-foreground">Jméno</label>
          <input
            id="name"
            name="name"
            defaultValue={state.values?.name}
            type="text"
            required
            autoComplete="name"
            className={inputClass}
            placeholder="Jan Novák"
          />
          <FieldError message={state.fieldErrors?.name} />
        </div>
        <div className="space-y-2">
          <label htmlFor="phone" className="text-sm font-medium text-foreground">Telefon</label>
          <input
            id="phone"
            name="phone"
            defaultValue={state.values?.phone}
            type="tel"
            autoComplete="tel"
            className={inputClass}
            placeholder="+420 777 000 000"
          />
          <FieldError message={state.fieldErrors?.phone} />
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="email" className="text-sm font-medium text-foreground">Email</label>
        <input
          id="email"
          name="email"
          defaultValue={state.values?.email}
          type="email"
          autoComplete="email"
          className={inputClass}
          placeholder="jan.novak@example.com"
        />
        <FieldError message={state.fieldErrors?.email} />
      </div>

      <div className="space-y-2">
        <label htmlFor="message" className="text-sm font-medium text-foreground">Zpráva</label>
        <textarea
          id="message"
          name="message"
          defaultValue={state.values?.message}
          required
          className={cn(inputClass, "h-auto min-h-[150px] resize-y")}
          placeholder="Dobrý den, měl bych zájem o..."
        />
        <FieldError message={state.fieldErrors?.message} />
      </div>

      {state.status === "error" && state.message && (
        <p className="text-sm text-red-700" role="alert">{state.message}</p>
      )}

      <Button type="submit" className="w-full text-lg h-12 mt-4" size="lg" disabled={isPending}>
        {isPending ? "Odesílám…" : "Odeslat zprávu"}
      </Button>
    </form>
  )
}
