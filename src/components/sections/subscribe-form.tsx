"use client"

import { useState } from "react"
import { Mail } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function SubscribeForm() {
  const [message, setMessage] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function action(formData: FormData) {
    const email = String(formData.get("email") || "").trim()
    if (!email) {
      setMessage("Please enter a valid email.")
      return
    }

    setLoading(true)
    setMessage(null)

    try {
      const res = await fetch("/api/merch", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          source: "merch-section",
          tag: "merch_waitlist",
          timestamp: new Date().toISOString(),
        }),
      })

      if (!res.ok) throw new Error("failed")

      setMessage("You’re in! We’ll email you before the drop.")
      ;(document.getElementById("email") as HTMLInputElement | null)?.blur()
      ;(document.getElementById("email") as HTMLInputElement | null)!.value = ""
    } catch (err) {
      console.error(err)
      setMessage("Something went wrong — please try again shortly.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form
      action={action}
      className="mt-6 grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-3"
    >
      {/* Input styled like community cards */}
      <div className="flex items-center rounded-xl border border-purple-500/40 bg-zinc-900/70 shadow-md focus-within:border-purple-400 transition">
        <Mail className="ml-3 h-5 w-5 text-purple-400" />
        <input
          id="email"
          name="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          required
          placeholder="you@krowdkraft.com"
          aria-label="Email address"
          className="w-full bg-transparent px-3 py-3 text-sm text-white placeholder-zinc-400 focus:outline-none"
        />
      </div>

      {/* Button matches purple/white theme */}
      <Button
        type="submit"
        disabled={loading}
        className="rounded-xl px-6 py-3 font-semibold bg-purple-600 text-white hover:bg-purple-500 transition-all shadow-lg shadow-purple-500/30"
      >
        <Mail className="h-4 w-4 mr-1" />
        {loading ? 'Sending…' : 'Notify Me'}
      </Button>

      {message && (
        <div className="sm:col-span-2 mt-1 text-center text-sm text-zinc-300">{message}</div>
      )}
    </form>
  )
}
