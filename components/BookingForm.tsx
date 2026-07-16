"use client";

import { useState } from "react";

const WHATSAPP_NUMBER = "918884752613";

const eventTypes = [
  "Wedding",
  "Engagement / Sangeet / Haldi",
  "Birthday Party",
  "Corporate Event",
  "Private Party",
  "Other",
];

type Status = "idle" | "sending" | "success" | "error";

function buildWhatsAppLink(data: Record<string, string>) {
  const text = encodeURIComponent(
    `Hello Humming Events! I'd like to book an appointment.\n\n` +
      `Name: ${data.name}\nPhone: ${data.phone}\nEvent: ${data.eventType}\n` +
      `Date: ${data.date || "To be decided"}\nGuests: ${data.guests || "Not sure yet"}\n` +
      `Details: ${data.message || "-"}`
  );
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
}

export default function BookingForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [waLink, setWaLink] = useState<string>("");
  const [errorMsg, setErrorMsg] = useState<string>("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(
      new FormData(form).entries()
    ) as Record<string, string>;

    setStatus("sending");
    setErrorMsg("");
    try {
      const res = await fetch("/api/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok || !json.ok) {
        throw new Error(json.error || "Something went wrong");
      }
      setWaLink(json.whatsapp || buildWhatsAppLink(data));
      setStatus("success");
      form.reset();
    } catch (err) {
      // Even if the API is unreachable, WhatsApp booking still works.
      setWaLink(buildWhatsAppLink(data));
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-gold/40 bg-white p-8 text-center shadow-xl">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-green-100 text-2xl">
          ✓
        </div>
        <h3 className="font-display text-2xl text-plum">Request received!</h3>
        <p className="mt-2 text-plum-dark/70">
          Send it to us on WhatsApp so we can confirm your appointment right
          away.
        </p>
        <a
          href={waLink}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-block rounded-full bg-[#25D366] px-8 py-3 font-medium text-white transition hover:brightness-95"
        >
          Continue on WhatsApp →
        </a>
        <button
          onClick={() => setStatus("idle")}
          className="mt-4 block w-full text-sm text-plum-dark/50 underline"
        >
          Make another request
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 rounded-2xl border border-gold/30 bg-white p-6 shadow-xl md:p-8"
    >
      <div className="grid gap-4 md:grid-cols-2">
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-plum">
            Your Name *
          </span>
          <input
            name="name"
            required
            placeholder="Full name"
            className="w-full rounded-lg border border-plum/15 bg-cream/50 px-4 py-2.5 outline-none transition focus:border-gold focus:ring-2 focus:ring-gold/30"
          />
        </label>
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-plum">
            Phone Number *
          </span>
          <input
            name="phone"
            required
            type="tel"
            pattern="[0-9+\-() ]{7,15}"
            placeholder="+91 XXXXX XXXXX"
            className="w-full rounded-lg border border-plum/15 bg-cream/50 px-4 py-2.5 outline-none transition focus:border-gold focus:ring-2 focus:ring-gold/30"
          />
        </label>
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-plum">
            Event Type *
          </span>
          <select
            name="eventType"
            required
            className="w-full rounded-lg border border-plum/15 bg-cream/50 px-4 py-2.5 outline-none transition focus:border-gold focus:ring-2 focus:ring-gold/30"
          >
            {eventTypes.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-plum">
            Event Date
          </span>
          <input
            name="date"
            type="date"
            className="w-full rounded-lg border border-plum/15 bg-cream/50 px-4 py-2.5 outline-none transition focus:border-gold focus:ring-2 focus:ring-gold/30"
          />
        </label>
      </div>
      <label className="block">
        <span className="mb-1 block text-sm font-medium text-plum">
          Expected Guests
        </span>
        <input
          name="guests"
          type="number"
          min="1"
          placeholder="e.g. 200"
          className="w-full rounded-lg border border-plum/15 bg-cream/50 px-4 py-2.5 outline-none transition focus:border-gold focus:ring-2 focus:ring-gold/30"
        />
      </label>
      <label className="block">
        <span className="mb-1 block text-sm font-medium text-plum">
          Tell us about your event
        </span>
        <textarea
          name="message"
          rows={4}
          placeholder="Venue, theme, budget — anything that helps us plan"
          className="w-full rounded-lg border border-plum/15 bg-cream/50 px-4 py-2.5 outline-none transition focus:border-gold focus:ring-2 focus:ring-gold/30"
        />
      </label>

      {status === "error" && (
        <div className="rounded-lg bg-rose/10 p-4 text-sm text-rose">
          <p>We couldn&apos;t submit the form ({errorMsg}) — but you can still reach us instantly:</p>
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-block font-semibold underline"
          >
            Book via WhatsApp instead →
          </a>
        </div>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full rounded-full bg-plum py-3.5 font-medium uppercase tracking-widest text-cream transition hover:bg-plum-dark disabled:opacity-60"
      >
        {status === "sending" ? "Sending…" : "Request Appointment"}
      </button>
      <p className="text-center text-xs text-plum-dark/50">
        We usually respond within a few hours (Mon–Fri, 9 AM – 7 PM).
      </p>
    </form>
  );
}
