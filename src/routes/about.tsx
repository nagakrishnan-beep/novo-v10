import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader, SiteFooter } from "@/components/site-chrome";
import { ArrowRight, Mail, MapPin, MessageCircle } from "lucide-react";
import { CLIENT_LOGOS } from "@/lib/logos";
import { FOUNDER } from "@/lib/site";
import { YouTubeEmbed } from "@/components/youtube-embed";


const WHATSAPP_URL = "https://wa.me/60172029996";
const TITLE = "About Novo Reperio — Spatial capture studio in Kuala Lumpur";
const DESCRIPTION =
  "Since 2014, Novo Reperio has helped venues, developers, and facilities present space with more clarity — through Matterport, 360°, LiDAR, aerial, and launch-ready web assets.";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/about" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: AboutPage,
});

const TIMELINE = [
  {
    year: "2014",
    tag: "Foundation",
    title: "Novo Reperio was established in Kuala Lumpur.",
    body: "The company moved early into 3D mapping and spatial data as a serious service direction instead of treating immersive media as a side add-on.",
  },
  {
    year: "2014–2018",
    tag: "Immersive capture",
    title: "The work shifted toward immersive capture.",
    body: "Matterport walkthroughs, drone-led presentation, and interactive spatial assets started defining the studio's delivery model.",
  },
  {
    year: "2019–2021",
    tag: "Expanded output",
    title: "Capability expanded beyond scanning.",
    body: "Broader production formats and stronger delivery made the output more useful for marketing, review, and presentation across sectors.",
  },
  {
    year: "2022–2023",
    tag: "Category platforms",
    title: "Category-led platforms followed the studio work.",
    body: "Novo launched initiatives such as Virtual Property and EventVenues Asia while continuing digital twin and destination presentation work.",
  },
];

const WP_MEDIA = "https://novoreperio.com/wp-content/uploads/2026/07/";

export const FOUNDER_PHOTO = `${WP_MEDIA}Naga.webp`;

const TEAM = [
  { name: "Naga", role: "Founder & CEO", img: FOUNDER_PHOTO },
  {
    name: "Kairudin",
    role: "Technical Sales & 3D Scanning Specialist",
    img: `${WP_MEDIA}kairudin.webp`,
  },
  {
    name: "Kasthuri",
    role: "Operations & Project Management",
    img: `${WP_MEDIA}Kasthuri.webp`,
  },
  {
    name: "Shobak",
    role: "Interactive Content Developer",
    img: `${WP_MEDIA}shobak.webp`,
  },
  {
    name: "Tatasha",
    role: "Graphic & Multimedia Designer",
    img: `${WP_MEDIA}Tatasha.webp`,
  },
];


const HOW = [
  {
    kicker: "Capture",
    body: "Matterport, 360 tours, aerial visuals, and stills are selected around what the audience needs to understand clearly.",
  },
  {
    kicker: "Clarify",
    body: "The space is framed around layout, arrival, atmosphere, movement, and what actually influences confidence before a visit.",
  },
  {
    kicker: "Present",
    body: "The final asset is packaged for the real commercial moment — enquiry, review, shortlist, approval, or booking.",
  },
];

function AboutPage() {
  return (
    <div className="min-h-screen bg-[#020203] text-neutral-200 font-sans antialiased">
      <SiteHeader active="about" />

      {/* Hero */}
      <section className="px-6 md:px-24 pt-20 pb-16 border-b border-neutral-900">
        <div className="text-[10px] tracking-[0.4em] uppercase text-cyan-400 mb-6">
          About
        </div>
        <h1 className="text-4xl md:text-6xl font-light leading-[1.05] max-w-5xl text-white">
          A focused team for spatial clarity, immersive capture,
          stronger presentation, and commercial confidence.
        </h1>
        <div className="mt-10 flex flex-wrap gap-3">
          <Link
            to="/works"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-cyan-400 text-black text-xs font-mono uppercase tracking-widest hover:bg-cyan-300"
          >
            View Selected Work <ArrowRight size={14} />
          </Link>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-white/15 text-xs font-mono uppercase tracking-widest hover:border-cyan-400/50 hover:text-cyan-300"
          >
            <MessageCircle size={14} /> Start a Conversation
          </a>
        </div>
      </section>

      {/* By the numbers */}
      <section className="px-6 md:px-24 py-14 border-b border-neutral-900">
        <div className="text-xs font-mono uppercase tracking-widest text-emerald-400/80 mb-6">
          By the numbers
        </div>
        <ul className="space-y-3 max-w-3xl">
          {[
            "12+ years in spatial capture (since 2014).",
            "400+ projects delivered.",
            "WTCKL digital twin: 8,000+ visits, averaging 37 per week.",
            "Skylon Residences: 60% of units sold, supported by 360° virtual tours.",
          ].map((s) => (
            <li key={s} className="text-base md:text-lg text-white font-light border-l-2 border-emerald-400/50 pl-4">
              {s}
            </li>
          ))}
        </ul>
      </section>

      {/* Led by */}
      <section className="px-6 md:px-24 py-14 border-b border-neutral-900">
        <div className="text-xs font-mono uppercase tracking-widest text-emerald-400/80 mb-6">
          Led by
        </div>
        <div className="max-w-3xl border border-white/10 rounded-xl p-6 bg-white/[0.02]">
          <div className="flex items-start gap-5">
            <img
              src={FOUNDER_PHOTO}
              alt={`${FOUNDER.name}, ${FOUNDER.jobTitle} at Novo Reperio`}
              loading="lazy"
              className="h-20 w-20 shrink-0 rounded-full border border-white/10 object-cover bg-white/[0.04]"
            />
            <div>
              <div className="text-white text-2xl font-light">{FOUNDER.name}</div>
              <div className="mt-1 text-sm text-emerald-300">
                {FOUNDER.jobTitle}
              </div>
            </div>
          </div>
          <p className="mt-4 text-sm text-neutral-300 leading-relaxed">
            {FOUNDER.bio}
          </p>
          <ul className="mt-5 flex flex-wrap gap-2 text-[11px] font-mono uppercase tracking-widest text-emerald-300/90">
            <li className="border border-emerald-500/30 rounded-full px-3 py-1">
              Matterport Certified Service Partner since 2015
            </li>
            <li className="border border-emerald-500/30 rounded-full px-3 py-1">
              MDEC Malaysia Digital
            </li>
            <li className="border border-emerald-500/30 rounded-full px-3 py-1">
              Google Street View Trusted
            </li>
          </ul>
        </div>

        <div className="mt-10 max-w-3xl">
          <YouTubeEmbed
            videoId="Q0I65mvTm28"
            title="Novo Reperio founder introduces the 360° virtual tour"
            description="Naga R. Krishnan explains how a 360° virtual tour makes a space easier to understand and act on."
            caption="Founder introduction · 360° virtual tour"
          />
        </div>
      </section>



      {/* Trust strip */}
      <section className="px-6 md:px-24 py-10 border-b border-neutral-900">
        <div className="text-[10px] tracking-[0.4em] uppercase text-neutral-500 mb-6">
          Trusted by clients across
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8 items-center">
          {CLIENT_LOGOS.map((l) => (
            <img
              key={l.alt}
              src={l.src}
              alt={`${l.alt} logo`}
              className="h-8 md:h-10 w-auto object-contain opacity-60 hover:opacity-100 transition invert brightness-200"
              loading="lazy"
            />
          ))}
        </div>
      </section>

      {/* Our story */}
      <section className="px-6 md:px-24 py-24 border-b border-neutral-900 grid md:grid-cols-[1fr_2fr] gap-10">
        <div className="text-[10px] tracking-[0.4em] uppercase text-cyan-400">
          Our story
        </div>
        <div>
          <h2 className="text-3xl md:text-4xl font-light text-white leading-tight max-w-3xl">
            A studio built around spatial clarity.
          </h2>
          <p className="mt-6 text-neutral-400 max-w-3xl leading-relaxed">
            Novo Reperio started in 2014 and moved early into immersive capture,
            spatial data, and digital twin work. Over time, the studio expanded
            from pure scanning into a broader presentation layer that includes
            360 experiences, aerial visuals, project websites, and launch-ready
            assets.
          </p>
          <p className="mt-4 text-neutral-400 max-w-3xl leading-relaxed">
            That shift matters because most clients do not simply need a file.
            They need a space to become easier to review, easier to explain, and
            easier to act on. Novo's role is to make that understanding happen
            with more confidence.
          </p>
          <div className="mt-10 max-w-3xl">
            <YouTubeEmbed
              videoId="7-rw_vOPd3g"
              title="Novo Reperio product launch"
              description="A look at how Novo Reperio brings spatial capture products to market."
              caption="Product launch"
            />
          </div>
        </div>

      </section>

      {/* How Novo works */}
      <section className="px-6 md:px-24 py-24 border-b border-neutral-900">
        <div className="text-[10px] tracking-[0.4em] uppercase text-cyan-400 mb-4">
          How Novo works
        </div>
        <h2 className="text-3xl md:text-4xl font-light text-white max-w-3xl leading-tight">
          Capture the space. Clarify the decision. Present it properly.
        </h2>
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          {HOW.map((h) => (
            <div
              key={h.kicker}
              className="border border-white/10 rounded-lg p-6 bg-white/[0.02] hover:border-cyan-400/40 transition"
            >
              <div className="text-cyan-300 text-xs font-mono uppercase tracking-[0.3em] mb-3">
                {h.kicker}
              </div>
              <p className="text-neutral-300 text-sm leading-relaxed">
                {h.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Timeline */}
      <section className="px-6 md:px-24 py-24 border-b border-neutral-900">
        <div className="text-[10px] tracking-[0.4em] uppercase text-cyan-400 mb-4">
          Studio trajectory
        </div>
        <h2 className="text-3xl md:text-4xl font-light text-white max-w-3xl leading-tight">
          A steady move from tech services into immersive space presentation.
        </h2>
        <div className="mt-14 grid gap-10 relative">
          {TIMELINE.map((t) => (
            <div
              key={t.year}
              className="grid md:grid-cols-[160px_140px_1fr] gap-6 md:gap-10 items-start border-t border-white/5 pt-8"
            >
              <div className="font-mono text-white text-lg">{t.year}</div>
              <div className="text-[10px] tracking-[0.3em] uppercase text-cyan-400/80">
                {t.tag}
              </div>
              <div>
                <h3 className="text-xl text-white font-light">{t.title}</h3>
                <p className="mt-3 text-neutral-400 text-sm leading-relaxed max-w-2xl">
                  {t.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Team */}
      <section className="px-6 md:px-24 py-24 border-b border-neutral-900">
        <div className="text-[10px] tracking-[0.4em] uppercase text-cyan-400 mb-4">
          The team
        </div>
        <h2 className="text-3xl md:text-4xl font-light text-white max-w-3xl leading-tight">
          Small studio. Deep spatial specialisation.
        </h2>
        <div className="mt-12 grid grid-cols-2 md:grid-cols-5 gap-6">
          {TEAM.map((m) => (
            <div key={m.name} className="text-center">
              <div className="aspect-square rounded-full overflow-hidden bg-white/[0.04] border border-white/10 mb-4">
                <img
                  src={m.img}
                  alt={`${m.name} portrait`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="text-white text-sm">{m.name}</div>
              <div className="text-neutral-500 text-[11px] font-mono uppercase tracking-widest mt-1 leading-snug">
                {m.role}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Next step */}
      <section className="px-6 md:px-24 py-24 border-b border-neutral-900">
        <div className="text-[10px] tracking-[0.4em] uppercase text-cyan-400 mb-4">
          Next step
        </div>
        <h2 className="text-3xl md:text-4xl font-light text-white max-w-3xl leading-tight">
          Tell us about your space in the first message.
        </h2>
        <p className="mt-6 text-neutral-400 max-w-2xl leading-relaxed">
          The fastest way to get a useful reply is to describe the space, who
          needs to understand it, and what decision the digital experience
          should support.
        </p>
        <ul className="mt-6 space-y-2 text-neutral-400 text-sm">
          <li>+ Type of space and location</li>
          <li>+ Who needs to review it</li>
          <li>+ What decision the experience should support</li>
          <li>+ Any launch date, event date, or commercial deadline</li>
        </ul>

        <div className="mt-10 grid md:grid-cols-3 gap-4">
          <a
            href="mailto:hello@novoreperio.com"
            className="border border-white/10 rounded-lg p-6 hover:border-cyan-400/50 transition"
          >
            <Mail size={16} className="text-cyan-300 mb-3" />
            <div className="text-[10px] uppercase tracking-widest text-neutral-500 mb-1">
              Email
            </div>
            <div className="text-white text-sm">hello@novoreperio.com</div>
            <div className="text-neutral-500 text-xs mt-2">
              Best for project details, attachments, proposal requests.
            </div>
          </a>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noreferrer"
            className="border border-white/10 rounded-lg p-6 hover:border-cyan-400/50 transition"
          >
            <MessageCircle size={16} className="text-cyan-300 mb-3" />
            <div className="text-[10px] uppercase tracking-widest text-neutral-500 mb-1">
              WhatsApp
            </div>
            <div className="text-white text-sm">+60 17-202 9996</div>
            <div className="text-neutral-500 text-xs mt-2">
              Best for quick questions, space references, early coordination.
            </div>
          </a>
          <a
            href="https://maps.google.com/?q=Solaris+Mont+Kiara+50480+Kuala+Lumpur+Malaysia"
            target="_blank"
            rel="noreferrer"
            className="border border-white/10 rounded-lg p-6 hover:border-cyan-400/50 transition"
          >
            <MapPin size={16} className="text-cyan-300 mb-3" />
            <div className="text-[10px] uppercase tracking-widest text-neutral-500 mb-1">
              Studio Base
            </div>
            <div className="text-white text-sm leading-snug">
              Solaris Mont Kiara, 50480 Kuala Lumpur, Malaysia
            </div>
            <div className="text-neutral-500 text-xs mt-2">
              Supporting hospitality, venues, property, and commercial spaces.
            </div>
          </a>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}

