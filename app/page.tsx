import Image from "next/image";
import Navbar from "@/components/Navbar";
import Gallery, { type GalleryItem } from "@/components/Gallery";
import BookingForm from "@/components/BookingForm";

const PHONE = "+91 88847 52613";
const PHONE_LINK = "tel:+918884752613";
const WHATSAPP = "https://wa.me/918884752613";
const EMAIL = "hummingevents@gmail.com";
const INSTAGRAM = "https://www.instagram.com/hummingevents/";
const YOUTUBE_CHANNEL = "https://www.youtube.com/@hummingevents3788";
const ADDRESS = "Tansen Nagar, Gwalior, Madhya Pradesh 474002";
const MAPS = "https://www.google.com/maps/search/?api=1&query=Tansen+Nagar+Gwalior+Madhya+Pradesh+474002";

// Highlight film from their YouTube channel, used as the hero background.
const HERO_VIDEO_ID = "xGZMero4xZI";

const services = [
  {
    icon: "💍",
    title: "Wedding Planning",
    desc: "From budget to blow-out — venue, décor, mandap, vendors and timelines handled end to end, so your only job is to enjoy the big day.",
  },
  {
    icon: "🎪",
    title: "Event Management",
    desc: "Complete on-ground management for functions of every size: staging, sound, lighting, catering coordination and guest experience.",
  },
  {
    icon: "🎂",
    title: "Birthday Parties",
    desc: "Theme parties, balloon and floral décor, cakes and entertainment — memorable celebrations for kids and grown-ups alike.",
  },
  {
    icon: "🏢",
    title: "Corporate Events",
    desc: "Conferences, launches, annual days and team celebrations delivered with professional polish and zero stress for your team.",
  },
  {
    icon: "🥂",
    title: "Private Events",
    desc: "Intimate gatherings, anniversaries, engagements and haldi–mehendi functions crafted with a personal touch.",
  },
  {
    icon: "📸",
    title: "Photography",
    desc: "Candid and traditional photography and videography partners to capture every moment beautifully.",
  },
];

const defaultGallery: GalleryItem[] = [
  { src: "/gallery/photo-2.jpg", alt: "Outdoor floral arch stage with vintage loveseat", caption: "Floral arch reception stage" },
  { src: "/gallery/photo-3.jpg", alt: "Indoor reception stage with pink drapes and blue uplighting", caption: "Indoor reception stage, Gwalior" },
  { src: "/gallery/photo-4.jpg", alt: "Outdoor canopy of red and yellow ribbons over guest seating", caption: "Vibrant outdoor mehendi setup" },
  { src: "/gallery/photo-5.jpg", alt: "Red curtain wedding stage with white floral canopy", caption: "Grand wedding stage décor" },
  { src: "/gallery/photo-6.jpg", alt: "Marigold garland walls and floral lattice", caption: "Traditional marigold styling" },
  { src: "/gallery/photo-7.jpg", alt: "Yellow haldi mandap with sunflowers", caption: "Haldi ceremony mandap" },
  { src: "/gallery/photo-8.jpg", alt: "Wedding entrance with floral arch and welcome board", caption: "Wedding entrance & welcome board" },
  { src: "/gallery/photo-1.jpg", alt: "Photographer shooting a couple at a wedding", caption: "Candid wedding photography" },
];

const spotlightVideos = [
  {
    id: "5G036XoSCXk",
    title: "Kartik Aaryan's sister's wedding — bride's entry with her brother",
  },
  {
    id: "r-jE0WZMID4",
    title: "The most viral wedding of 2025 — Gwalior",
  },
];

const steps = [
  { n: "01", title: "Tell us your dream", desc: "Share your vision, date and budget — over WhatsApp, a call, or the booking form below." },
  { n: "02", title: "We design the plan", desc: "Venue, theme, décor and vendors curated into a plan (and quote) tailored to you." },
  { n: "03", title: "Celebrate stress-free", desc: "Our team runs the show on the day while you soak in every moment." },
];

const contactCards = [
  { label: "Call us", value: PHONE, href: PHONE_LINK, icon: "📞" },
  { label: "WhatsApp", value: "Chat instantly", href: WHATSAPP, icon: "💬" },
  { label: "Instagram", value: "@hummingevents", href: INSTAGRAM, icon: "📷" },
  { label: "Email", value: EMAIL, href: `mailto:${EMAIL}`, icon: "✉️" },
  { label: "Visit us", value: ADDRESS, href: MAPS, icon: "📍" },
];

export default function Home() {
  return (
    <main id="home">
      <Navbar />

      {/* Hero with background video */}
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
        {/* Poster image shows until the video loads */}
        <Image
          src="/gallery/photo-2.jpg"
          alt="Floral wedding stage designed by Humming Events"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0" aria-hidden>
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${HERO_VIDEO_ID}?autoplay=1&mute=1&controls=0&loop=1&playlist=${HERO_VIDEO_ID}&playsinline=1&rel=0&modestbranding=1&iv_load_policy=3&disablekb=1`}
            title="Humming Events highlight film"
            allow="autoplay; encrypted-media"
            tabIndex={-1}
            className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            style={{
              width: "max(100vw, 177.78vh)",
              height: "max(100vh, 56.25vw)",
            }}
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-white/40 to-cream" />
        <div className="relative z-10 mx-auto max-w-4xl px-5 pt-24 pb-16 text-center">
          <p className="mb-4 text-sm uppercase tracking-[0.35em] text-gold-light">
            Wedding & Event Planners · Gwalior
          </p>
          <h1 className="font-display text-5xl leading-tight text-plum-dark md:text-7xl">
            We plan. <span className="italic text-rose">You celebrate.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-plum-dark/80 md:text-xl">
            From dreamy mandaps to dazzling receptions, Humming Events crafts
            unforgettable weddings and celebrations across Gwalior and Madhya
            Pradesh.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="#contact"
              className="rounded-full bg-rose px-8 py-3.5 font-medium uppercase tracking-widest text-white shadow-lg shadow-rose/30 transition hover:bg-rose/85"
            >
              Book an Appointment
            </a>
            <a
              href="#gallery"
              className="rounded-full border border-plum/30 bg-white/60 px-8 py-3.5 font-medium uppercase tracking-widest text-plum backdrop-blur transition hover:bg-white"
            >
              See Our Work
            </a>
          </div>
        </div>
        <a
          href="#about"
          aria-label="Scroll down"
          className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 animate-bounce text-2xl text-plum/60"
        >
          ↓
        </a>
      </section>

      {/* About */}
      <section id="about" className="mx-auto max-w-6xl scroll-mt-24 px-5 py-20 md:py-28">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <div className="relative">
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl shadow-xl shadow-plum/15">
              <Image
                src="/gallery/photo-2.jpg"
                alt="Floral stage décor by Humming Events"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-4 hidden rounded-2xl border border-gold/30 bg-white px-6 py-4 shadow-xl md:block">
              <p className="font-display text-3xl text-plum">Est. 2018</p>
              <p className="text-sm text-plum-dark/60">Serving Gwalior with love</p>
            </div>
          </div>
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-rose">About us</p>
            <h2 className="mt-3 font-display text-4xl text-plum md:text-5xl">
              One of Gwalior&apos;s most loved wedding planners
            </h2>
            <div className="gold-rule my-6 w-32" />
            <p className="text-lg leading-relaxed text-plum-dark/75">
              Humming Events has become synonymous with the words
              &ldquo;wedding planning&rdquo; in Gwalior. We&apos;ve planned all
              sorts of weddings — from budget to blow-out — and our objective is
              simple: make your celebration as perfect as possible.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-plum-dark/75">
              We work closely with you to understand exactly what your heart
              desires, then our team of trained professionals works tirelessly
              so nothing is out of place on the biggest day of your life.
            </p>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {[
                "End-to-end planning & décor",
                "Trusted local vendor network",
                "Budget-friendly to luxury",
                "On-the-day event management",
              ].map((f) => (
                <li key={f} className="flex items-center gap-2 text-plum-dark/80">
                  <span className="text-gold">✦</span> {f}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="scroll-mt-24 bg-lavender py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-5">
          <div className="text-center">
            <p className="text-sm uppercase tracking-[0.3em] text-rose">
              What we do
            </p>
            <h2 className="mt-3 font-display text-4xl text-plum md:text-5xl">
              Celebrations of every kind
            </h2>
            <div className="gold-rule mx-auto my-6 w-32" />
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <div
                key={s.title}
                className="group rounded-2xl border border-plum/10 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:border-gold/50 hover:shadow-lg"
              >
                <div className="mb-4 text-4xl">{s.icon}</div>
                <h3 className="font-display text-2xl text-plum">{s.title}</h3>
                <p className="mt-3 leading-relaxed text-plum-dark/70">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section id="gallery" className="mx-auto max-w-6xl scroll-mt-24 px-5 py-20 md:py-28">
        <div className="text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-rose">Our work</p>
          <h2 className="mt-3 font-display text-4xl text-plum md:text-5xl">
            Moments we&apos;ve made magical
          </h2>
          <div className="gold-rule mx-auto my-6 w-32" />
          <p className="mx-auto max-w-2xl text-plum-dark/70">
            A glimpse of real weddings and celebrations designed and delivered
            by the Humming Events team.
          </p>
        </div>
        <div className="mt-10">
          <Gallery items={defaultGallery} />
        </div>
      </section>

      {/* Celebrity spotlight */}
      <section id="videos" className="scroll-mt-24 bg-blush py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-5">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-rose">
                Celebrity spotlight
              </p>
              <h2 className="mt-3 font-display text-4xl text-plum md:text-5xl">
                Kartik Aaryan&apos;s sister&apos;s wedding —{" "}
                <span className="italic text-rose">planned by us</span>
              </h2>
              <div className="gold-rule my-6 w-32" />
              <p className="text-lg leading-relaxed text-plum-dark/75">
                In December 2025, Humming Events had the honour of crafting the
                Gwalior wedding of Dr. Kritika Tiwari — Bollywood star Kartik
                Aaryan&apos;s sister. From the bride&apos;s emotional entry with
                her brother to the grand celebrations that followed, it became
                one of the most talked-about weddings of the year.
              </p>
              <p className="mt-4 text-lg leading-relaxed text-plum-dark/75">
                Watch the moments below, straight from our YouTube channel.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  href={YOUTUBE_CHANNEL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 rounded-full bg-[#FF0000] px-7 py-3 font-medium text-white transition hover:brightness-90"
                >
                  <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" aria-hidden>
                    <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31.4 31.4 0 0 0 0 12a31.4 31.4 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1A31.4 31.4 0 0 0 24 12a31.4 31.4 0 0 0-.5-5.8zM9.6 15.6V8.4L15.8 12l-6.2 3.6z" />
                  </svg>
                  Watch on YouTube
                </a>
                <a
                  href={INSTAGRAM}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-[#f09433] via-[#dc2743] to-[#bc1888] px-7 py-3 font-medium text-white transition hover:brightness-95"
                >
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden>
                    <path d="M12 2.2c3.2 0 3.6 0 4.9.1 1.2.1 1.8.2 2.2.4.6.2 1 .5 1.4.9.4.4.7.8.9 1.4.2.4.4 1 .4 2.2.1 1.3.1 1.7.1 4.9s0 3.6-.1 4.9c-.1 1.2-.2 1.8-.4 2.2-.2.6-.5 1-.9 1.4-.4.4-.8.7-1.4.9-.4.2-1 .4-2.2.4-1.3.1-1.7.1-4.9.1s-3.6 0-4.9-.1c-1.2-.1-1.8-.2-2.2-.4-.6-.2-1-.5-1.4-.9-.4-.4-.7-.8-.9-1.4-.2-.4-.4-1-.4-2.2-.1-1.3-.1-1.7-.1-4.9s0-3.6.1-4.9c.1-1.2.2-1.8.4-2.2.2-.6.5-1 .9-1.4.4-.4.8-.7 1.4-.9.4-.2 1-.4 2.2-.4 1.3-.1 1.7-.1 4.9-.1zm0 2c-3.1 0-3.5 0-4.8.1-1.1.1-1.5.2-1.7.3-.4.2-.7.4-.9.7-.3.3-.5.5-.7.9-.1.3-.2.7-.3 1.7-.1 1.3-.1 1.7-.1 4.8s0 3.5.1 4.8c.1 1.1.2 1.5.3 1.7.2.4.4.7.7.9.3.3.5.5.9.7.3.1.7.2 1.7.3 1.3.1 1.7.1 4.8.1s3.5 0 4.8-.1c1.1-.1 1.5-.2 1.7-.3.4-.2.7-.4.9-.7.3-.3.5-.5.7-.9.1-.3.2-.7.3-1.7.1-1.3.1-1.7.1-4.8s0-3.5-.1-4.8c-.1-1.1-.2-1.5-.3-1.7-.2-.4-.4-.7-.7-.9-.3-.3-.5-.5-.9-.7-.3-.1-.7-.2-1.7-.3-1.3-.1-1.7-.1-4.8-.1zm0 3.4a5.1 5.1 0 1 1 0 10.2 5.1 5.1 0 0 1 0-10.2zm0 2a3.1 3.1 0 1 0 0 6.2 3.1 3.1 0 0 0 0-6.2zm5.3-3.5a1.2 1.2 0 1 1 0 2.4 1.2 1.2 0 0 1 0-2.4z" />
                  </svg>
                  @hummingevents
                </a>
              </div>
            </div>
            <div className="flex flex-wrap justify-center gap-6">
              {spotlightVideos.map((v) => (
                <div key={v.id} className="w-[260px] sm:w-[280px]">
                  <div className="overflow-hidden rounded-2xl border border-plum/10 shadow-xl shadow-plum/15">
                    <iframe
                      src={`https://www.youtube-nocookie.com/embed/${v.id}`}
                      title={v.title}
                      loading="lazy"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      className="aspect-[9/16] w-full"
                    />
                  </div>
                  <p className="mt-3 text-center text-sm text-plum-dark/60">{v.title}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-mint py-20">
        <div className="mx-auto max-w-6xl px-5">
          <div className="text-center">
            <p className="text-sm uppercase tracking-[0.3em] text-rose">
              How it works
            </p>
            <h2 className="mt-3 font-display text-4xl text-plum md:text-5xl">
              Three steps to your perfect day
            </h2>
            <div className="gold-rule mx-auto my-6 w-32" />
          </div>
          <div className="mt-10 grid gap-8 md:grid-cols-3">
            {steps.map((s) => (
              <div key={s.n} className="relative rounded-2xl bg-white p-8 shadow-md">
                <span className="font-display text-5xl text-gold/40">{s.n}</span>
                <h3 className="mt-3 font-display text-2xl text-plum">{s.title}</h3>
                <p className="mt-3 leading-relaxed text-plum-dark/70">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact / Booking */}
      <section id="contact" className="scroll-mt-24 bg-blush py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-5">
          <div className="text-center">
            <p className="text-sm uppercase tracking-[0.3em] text-rose">
              Book an appointment
            </p>
            <h2 className="mt-3 font-display text-4xl text-plum md:text-5xl">
              Let&apos;s plan something beautiful
            </h2>
            <div className="gold-rule mx-auto my-6 w-32" />
          </div>

          <div className="mt-10 grid gap-10 lg:grid-cols-5">
            <div className="space-y-5 lg:col-span-2">
              {contactCards.map((c) => (
                <a
                  key={c.label}
                  href={c.href}
                  target={c.href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="flex items-start gap-4 rounded-2xl border border-plum/10 bg-white p-5 shadow-sm transition hover:border-gold/50 hover:shadow-md"
                >
                  <span className="text-2xl">{c.icon}</span>
                  <span>
                    <span className="block text-sm uppercase tracking-widest text-rose">
                      {c.label}
                    </span>
                    <span className="mt-1 block text-lg text-plum-dark">{c.value}</span>
                  </span>
                </a>
              ))}
              <div className="rounded-2xl border border-plum/10 bg-white p-5 text-plum-dark/80 shadow-sm">
                <p className="text-sm uppercase tracking-widest text-rose">
                  Opening hours
                </p>
                <p className="mt-2">Monday – Friday · 9:00 AM – 7:00 PM</p>
                <p className="text-plum-dark/50">Weekend visits by appointment</p>
              </div>
            </div>

            <div className="lg:col-span-3">
              <BookingForm />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-cream-dark py-10 text-center text-sm text-plum-dark/70">
        <p className="font-display text-xl text-plum">Humming Events</p>
        <p className="mt-2">{ADDRESS}</p>
        <p className="mt-1">
          <a href={PHONE_LINK} className="hover:text-rose">{PHONE}</a>
          {" · "}
          <a href={`mailto:${EMAIL}`} className="hover:text-rose">{EMAIL}</a>
        </p>
        <p className="mt-2">
          <a href={INSTAGRAM} target="_blank" rel="noopener noreferrer" className="hover:text-rose">
            Instagram
          </a>
          {" · "}
          <a href={YOUTUBE_CHANNEL} target="_blank" rel="noopener noreferrer" className="hover:text-rose">
            YouTube
          </a>
          {" · "}
          <a href="/admin" className="hover:text-rose">
            Admin
          </a>
        </p>
        <p className="mt-4 text-plum-dark/40">
          © {new Date().getFullYear()} Humming Events, Gwalior. All rights reserved.
        </p>
      </footer>

      {/* Floating WhatsApp button */}
      <a
        href={WHATSAPP}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-xl shadow-plum/20 transition hover:scale-110"
      >
        <svg viewBox="0 0 32 32" width="30" height="30" fill="currentColor" aria-hidden>
          <path d="M16 3C9.4 3 4 8.3 4 14.9c0 2.6.9 5 2.3 7L4 29l7.3-2.2c1.5.8 3.1 1.2 4.7 1.2 6.6 0 12-5.3 12-11.9C28 8.3 22.6 3 16 3zm0 21.8c-1.5 0-3-.4-4.3-1.1l-.3-.2-4.3 1.3 1.3-4.1-.2-.3c-1.2-1.7-1.9-3.7-1.9-5.6 0-5.4 4.4-9.8 9.7-9.8 5.4 0 9.7 4.4 9.7 9.8 0 5.5-4.3 10-9.7 10zm5.4-7.3c-.3-.2-1.7-.9-2-1s-.5-.2-.7.2-.8 1-.9 1.1-.3.2-.6.1c-.3-.2-1.2-.5-2.4-1.5-.9-.8-1.5-1.8-1.6-2.1-.2-.3 0-.5.1-.6l.4-.5c.2-.2.2-.3.3-.5s.1-.4 0-.5c0-.2-.7-1.7-.9-2.3-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1.1 1-1.1 2.5s1.1 2.9 1.3 3.1c.2.2 2.2 3.4 5.4 4.8.8.3 1.4.5 1.8.7.8.2 1.5.2 2 .1.6-.1 1.7-.7 2-1.4.2-.7.2-1.2.2-1.4-.1-.1-.3-.2-.6-.4z" />
        </svg>
      </a>
    </main>
  );
}
