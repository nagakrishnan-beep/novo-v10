import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  ArrowRight,
  Boxes,
  Building2,
  ChevronDown,
  HelpCircle,
  Images,
  Palette,
  Plane,
  Rocket,
  Ruler,
  ScanLine,
  Search,
  Sparkles,
  Target,
} from "lucide-react";
import { SiteHeader, SiteFooter, BreadcrumbNav } from "@/components/site-chrome";
import { WHATSAPP_URL, abs } from "@/lib/site";

const TITLE = "FAQ & Help | Novo Reperio";
const DESCRIPTION =
  "Answers on digital twins, reality capture, Matterport, LiDAR, 3D rendering, drone mapping, Scan-to-BIM, pricing and how a Novo Reperio project runs from first message to delivery.";
const CANONICAL = abs("/faq");

type QA = { q: string; a: string };
type Group = { id: string; icon: any; title: string; blurb: string; items: QA[] };

const GENERAL: QA[] = [
  { q: "What is reality capture?", a: "Reality capture is the process of recording a real place as accurate 3D data using LiDAR, Matterport, 360 imaging, drone and photogrammetry. It is the input that a digital twin, point cloud or BIM model is built from." },
  { q: "How accurate is LiDAR scanning?", a: "We capture with Matterport Pro3 LiDAR (per Matterport's published spec, range up to roughly 100 m with point accuracy in the plus or minus 20 mm class) and terrestrial LiDAR for larger or survey-grade work, tied to survey control points where geodetic accuracy is needed." },
  { q: "What is a digital twin?", a: "A digital twin is a photorealistic, dimensionally accurate 3D copy of a real space that people can explore online. It captures every wall, corner and finish so remote viewers can walk through, measure and understand the venue as if they were there." },
  { q: "What's the difference between Matterport and a 360 tour?", a: "Matterport is a measurable 3D digital twin with dollhouse view, floorplan and room-to-room navigation. A 360 tour is a series of linked panoramas, lighter and cheaper, ideal for OTAs and social. Most venues benefit from both." },
  { q: "How much does a project cost?", a: "A Matterport 3D scan starts from RM 2,599. Pricing is scoped per property, from single-space capture to full-property programmes. Request a quote and we'll size it against your space and use case." },
  { q: "How long does delivery take?", a: "Most capture projects deliver within days of the shoot. Larger CGI, UE5 masterplans and launch films are scoped per project, typically two to eight weeks depending on scale." },
  { q: "Where do you operate?", a: "We are based in Kuala Lumpur and cover Malaysia, with regional deployment across Indonesia and the Philippines." },
  { q: "How do I embed a tour on my website or listing?", a: "Every tour ships with an embed snippet and a shareable link. It drops into your website, OTA listing (Booking.com, Agoda), Google Business Profile and email, with no plugins or hosting on your side." },
  { q: "Who owns the files?", a: "You own the delivered media: final renders, videos, images and embed rights are yours to use for marketing in perpetuity. Raw project files remain with the studio unless a buy-out is agreed upfront." },
  { q: "How long do you host the tour for?", a: "Matterport tours are hosted for the term you buy, typically one to three years, renewable. We notify you before expiry so nothing goes dark unexpectedly." },
  { q: "Do I need to prepare the site before capture?", a: "Yes, the space should look the way you want buyers to see it. Lights on, clutter cleared, staging in place. We send a short prep checklist before every shoot and can advise on styling." },
  { q: "Are your drone operations licensed?", a: "Yes. Our pilots are DJI-certified, and every drone operation is flown under CAAM flight permits secured for each project, in compliance with Malaysian aviation regulations." },
  { q: "Can you deliver point clouds and Scan-to-BIM?", a: "Yes. Our LiDAR captures produce registered point clouds that we convert to as-built BIM models (up to LOD 400), 2D CAD drawings and measurable twins for AEC and facilities teams." },
  { q: "How do I book?", a: "WhatsApp us for the fastest reply, email hello@novoreperio.com, or use the contact form. We'll respond within one business day with next steps and a scoping call." },
];

const RENDERING: QA[] = [
  { q: "What is 3D rendering?", a: "3D rendering turns a 3D model into a realistic image using specialised software. It simulates lighting, materials and camera angles to produce high quality visuals of architecture, interiors, products and spaces before they are built." },
  { q: "What types of 3D rendering do you offer?", a: "Architectural rendering (interior and exterior), product visualisation, 3D floor plans, virtual staging, photorealistic stills, and animation and walkthroughs." },
  { q: "Who benefits from 3D rendering?", a: "Architects and interior designers, property developers and agents, furniture and product manufacturers, and marketing and advertising teams who need to sell a space or product before it physically exists." },
  { q: "What do you need from me to get started?", a: "Usually CAD drawings or floor plans, any existing 3D models, design references or mood boards, and material and colour specifications. If you are missing some of these, we guide you through what is needed." },
  { q: "How long does a 3D rendering project take?", a: "A standard interior or exterior render usually takes 3 to 7 business days depending on scope and complexity. Rush work can be arranged on request." },
  { q: "Can I request revisions?", a: "Yes. We include a set number of revision rounds (typically 2 to 3) so the final result matches your vision. Further changes can be arranged at a reasonable cost." },
  { q: "What does 3D rendering cost?", a: "Pricing depends on scale, level of detail and turnaround. Send us your brief and we return a tailored quote, with flexible packages for different budgets." },
  { q: "Do you offer animation or virtual tours?", a: "Yes. We produce 3D animation, walkthrough videos and interactive virtual tours to bring a space or product to life." },
  { q: "What file formats do you deliver?", a: "High resolution stills in JPEG or PNG, and animation in MP4 or MOV. Tell us if you need specific formats for print, web or VR." },
  { q: "Can you match a specific style or lighting?", a: "Yes. Whether it is a minimal Scandinavian look or a moody cinematic tone, we tailor render style and lighting to your brand and vision." },
];

const MATTERPORT: QA[] = [
  { q: "What is Matterport?", a: "Matterport is a spatial data platform for building immersive 3D digital twins of real spaces. The digital replica lets people explore a property online as if they were walking through it in person." },
  { q: "What are the key features of a Matterport tour?", a: "3D walkthroughs, dollhouse view of the whole layout, schematic floor plans, in-model measurement tools, Mattertags for embedded notes and links, high resolution imagery, and VR headset compatibility." },
  { q: "Who benefits from Matterport?", a: "Real estate listings, hospitality and event venues, retail walkthroughs, construction progress records, education and campus tours, and insurance documentation." },
  { q: "What is needed to create a Matterport tour?", a: "Access to a clean, staged space, capture with a Matterport Pro3 or supported 360 camera, and a hosting plan to process and publish the model. We handle the equipment and the capture." },
  { q: "How long does the scanning process take?", a: "Small spaces such as apartments take roughly 1 to 2 hours. Large commercial buildings can take 3 to 5 hours or more." },
  { q: "When is the tour ready after scanning?", a: "The processed tour is typically ready within 24 to 48 hours of the capture session." },
  { q: "Can I customise the virtual tour?", a: "Yes. You can add Mattertags with descriptions, links or media, build guided highlight reels, blur sensitive areas, and label rooms." },
  { q: "Does it work on mobile devices and VR?", a: "Yes. Tours run in desktop and mobile browsers, in iOS and Android apps, and on VR headsets." },
  { q: "How long does the tour stay online?", a: "For the hosting term you buy, renewable. We flag you before expiry so nothing goes offline unexpectedly." },
  { q: "Can I track viewer engagement and analytics?", a: "Yes. Matterport reports views, visitor behaviour inside the tour, and engagement with embedded content." },
  { q: "Can I add branding or a call to action?", a: "Yes. Tours can carry your logo, contact details and call to action buttons to drive enquiries." },
  { q: "Why choose Matterport over traditional photography?", a: "It is immersive rather than static, dimensionally accurate and true to scale, cuts the need for physical visits, and helps listings stand out." },
  { q: "How does Matterport differ from a 360 virtual tour?", a: "A 360 tour is linked panoramas. Matterport adds 3D spatial mapping with real depth, free navigation through the space, in-model measurement, and higher detail." },
  { q: "Can Matterport tours be integrated with other platforms?", a: "Yes. Tours embed into websites, listings, Google Business Profile and email with a simple snippet, no plugins needed." },
];

const DRONE: QA[] = [
  { q: "What drone services do you offer?", a: "Aerial photography and video, 360 aerial panoramas, drone based 3D mapping and modelling, cinematic marketing shots, construction progress documentation, and site surveying and inspection." },
  { q: "Which industries use your drone services?", a: "Real estate and property development, construction and infrastructure, architecture and engineering, tourism and hospitality, event coverage, and agriculture and plantation management." },
  { q: "What equipment do you use?", a: "High resolution drones with 4K to 6K video, 20 to 48MP stills, 360 panoramic capture, RTK for high precision mapping, and GPS and altitude control for stable, repeatable flight paths." },
  { q: "What is aerial 360 photography, and how is it used?", a: "High resolution spherical images captured from above, embedded into virtual tours, websites and social, interactive maps and marketing decks for an immersive view of a whole site." },
  { q: "What is drone based 3D mapping?", a: "Photogrammetry stitches aerial images taken from many angles into 3D models, topographic maps, digital elevation models and orthomosaics, ideal for land development, site planning and progress monitoring." },
  { q: "How accurate is drone 3D mapping?", a: "With RTK/PPK drones and ground control points, we reach centimetre level accuracy suitable for surveying, engineering and volumetric analysis." },
  { q: "Do you have the necessary permits and licences?", a: "Our pilots are DJI-certified, and every flight is flown under CAAM flight permits secured for each project, within no-fly zone and altitude regulations and covered by commercial operations insurance." },
  { q: "What is the typical turnaround time?", a: "Photos and video in 24 to 48 hours, 360 panoramas in 48 to 72 hours, and 3D mapping and orthophotos in 3 to 5 business days. Rush work on request." },
  { q: "What deliverables do I get?", a: "Depending on scope: high resolution JPEG/RAW photos, 4K to 6K MP4/MOV video, 360 HTML embeds or JPG panoramas, 3D models in formats such as OBJ, LAS or point cloud, and orthomosaic maps (GeoTIFF, KMZ)." },
  { q: "Can you edit and brand the drone content?", a: "Yes. Post production includes video editing with music, transitions and captions, photo retouching and colour correction, logo overlays and call to action buttons, and branding for 360 and virtual tour integration." },
  { q: "What is the maximum altitude and range you fly?", a: "Typically up to 120 metres above ground level, in line with aviation regulations. Range and altitude are set per site and airspace." },
  { q: "Can you fly in urban or restricted areas?", a: "Yes, with special flight permits, a site risk assessment and buffer time for regulatory approvals. Tell us early and we handle the paperwork." },
  { q: "Is drone mapping suitable for large areas?", a: "Yes. We map large sites such as industrial parks, plantations, residential developments and infrastructure corridors using autonomous flight planning for efficient coverage." },
  { q: "What happens in case of bad weather?", a: "Safety comes first, so we do not fly in strong wind, rain, thunderstorms or low visibility, and we reschedule at the earliest suitable window." },
  { q: "Can drone content be combined with Matterport tours?", a: "Yes. We regularly merge drone imagery and 360 panoramas with Matterport tours for a complete digital twin, ground level and aerial in one seamless experience." },
];

const DIGITAL_TWIN: QA[] = [
  { q: "What is a Digital Twin?", a: "A digital twin is an accurate digital replica of a physical space, asset or system. It combines 3D spatial data with floor plans, facility information and optional IoT data to visualise, monitor and optimise an asset across its lifecycle." },
  { q: "Which industries benefit from Digital Twin technology?", a: "Construction and engineering, building maintenance and facilities management, factories and manufacturing, warehousing and logistics, retail and commercial, and smart cities and infrastructure." },
  { q: "What does your Digital Twin service include?", a: "3D scanning and spatial capture with LiDAR, drone or Matterport, a navigable 3D model, integration of floor plans, MEP schematics and IoT data where relevant, dashboards for asset tracking and reporting, and web based access with user permissions." },
  { q: "How is a Digital Twin created?", a: "We combine LiDAR or Matterport scanning for accurate models, drone surveys for roofs and large exteriors, 360 imagery and floor plan overlays, and integration with BIM and IoT data." },
  { q: "How does a Digital Twin help in construction?", a: "Monitor progress remotely, catch clashes and delays early, reduce rework, keep an as-built record, and let off-site teams collaborate on one shared model." },
  { q: "How does a Digital Twin help with building maintenance?", a: "Track asset locations and maintenance schedules, integrate with CMMS for automated alerts, pinpoint problem areas quickly, and plan and diagnose remotely." },
  { q: "Can I use it for factory or warehouse management?", a: "Yes. Twins support equipment status monitoring, safety and compliance auditing, process flow visualisation, space and layout optimisation, and 3D walkthroughs for staff training." },
  { q: "Is the Digital Twin accessible remotely?", a: "Yes. Twins are hosted securely in the cloud, accessible by browser on desktop, tablet or mobile, with password protection and role based permissions, and shareable links for stakeholders." },
  { q: "How accurate is the 3D model?", a: "With survey-grade LiDAR and photogrammetry we achieve centimetre-class accuracy, suitable for engineering tasks and audits." },
  { q: "Can you integrate IoT sensor data?", a: "Yes. We can integrate temperature, humidity and air quality, energy and equipment status, motion and occupancy, and maintenance and performance data, turning a static model into a live operational view." },
  { q: "How often should the Digital Twin be updated?", a: "It depends on use: construction often recaptures bi-weekly or monthly, facilities quarterly or on layout changes, and manufacturing as asset turnover requires." },
  { q: "What formats can you export the digital twin into?", a: "Web based interactive 3D viewers, BIM compatible formats (IFC, Revit, DWG), point cloud (LAS, XYZ), 2D schematic PDFs and floor plans, and orthophoto and top-down site images." },
  { q: "How long does a digital twin project take?", a: "A small facility such as a retail outlet takes 1 to 3 days, a mid-sized site such as a warehouse 3 to 7 days, and a large multi-floor or factory site 1 to 3 weeks, including scanning, processing and platform integration." },
  { q: "What makes your digital twin service different?", a: "We combine ground scanning and drone imaging for full vertical coverage, tailor the interface to each industry, support fast local turnaround, and offer optional IoT, CMMS and ERP integrations." },
  { q: "Can this data feed AI or automation projects?", a: "Yes. Our models act as the spatial backbone for predictive maintenance, process simulation and optimisation, AI driven energy and space forecasting, and automated training and virtual walkthroughs." },
];

const GROUPS: Group[] = [
  { id: "general", icon: HelpCircle, title: "General", blurb: "How a Novo Reperio project runs, pricing, ownership and delivery.", items: GENERAL },
  { id: "digital-twin", icon: Boxes, title: "Digital Twin services", blurb: "What a digital twin is, how it is built, and what it does after delivery.", items: DIGITAL_TWIN },
  { id: "matterport", icon: ScanLine, title: "Matterport 3D virtual tours", blurb: "Features, capture, hosting, analytics and how it beats flat photography.", items: MATTERPORT },
  { id: "drone", icon: Plane, title: "Drone, aerial & 3D mapping", blurb: "Aerial photo and video, 360 panoramas, mapping accuracy and permits.", items: DRONE },
  { id: "rendering", icon: Palette, title: "3D rendering & visualisation", blurb: "Architectural CGI, product visuals, virtual staging and animation.", items: RENDERING },
];

const ALL_QA: QA[] = GROUPS.flatMap((g) => g.items);

const CATEGORIES: { icon: any; to: any; title: string; body: string }[] = [
  { icon: Boxes, to: "/digital-twins", title: "Digital twins", body: "What a digital twin is, and everything it can do." },
  { icon: ScanLine, to: "/reality-capture", title: "Reality capture", body: "LiDAR, Matterport, 360 and drone, and when to use each." },
  { icon: Ruler, to: "/services/scan-to-bim", title: "Scan-to-BIM", body: "Point clouds to as-built BIM and CAD, up to LOD 400." },
  { icon: Sparkles, to: "/estimate", title: "Pricing and scope", body: "What it costs, and the project assessment." },
  { icon: Building2, to: "/industries", title: "Industries", body: "How property, AEC, hospitality, FM and government use it." },
  { icon: Images, to: "/works", title: "Our work", body: "Real projects, real measured spaces." },
  { icon: Rocket, to: "/contact", title: "Getting started", body: "How a project runs, from first message to delivery." },
  { icon: Target, to: "/solutions", title: "Solutions", body: "Sell, build, operate, plan. One space, many outcomes." },
];

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: CANONICAL },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: CANONICAL }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: ALL_QA.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }),
      },
    ],
  }),
  component: FaqPage,
});

function FaqPage() {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState<string | null>("general:0");
  const q = query.trim().toLowerCase();

  const groups = useMemo(() => {
    if (!q) return GROUPS.map((g) => ({ ...g, items: g.items }));
    return GROUPS.map((g) => ({
      ...g,
      items: g.items.filter(
        (f) => f.q.toLowerCase().includes(q) || f.a.toLowerCase().includes(q),
      ),
    })).filter((g) => g.items.length > 0);
  }, [q]);

  return (
    <div className="min-h-screen bg-[#020203] text-neutral-100">
      <SiteHeader active={null} />

      <main className="px-6 md:px-24 py-20 md:py-24 space-y-12">
        <BreadcrumbNav items={[{ label: "Home", to: "/" }, { label: "FAQ" }]} />

        <section className="rounded-2xl bg-white/[0.03] border border-white/10 p-6 md:p-10">
          <div className="grid gap-8 md:grid-cols-[1.4fr_1fr] md:items-end">
            <div>
              <div className="text-xs font-mono uppercase tracking-widest text-emerald-300 mb-4">
                FAQ & Help
              </div>
              <h1 className="font-light leading-tight" style={{ fontSize: "clamp(30px, 5vw, 56px)" }}>
                Looking for help? Start with our most-asked questions.
              </h1>
              <p className="mt-5 text-[15px] md:text-base text-neutral-400 font-light max-w-2xl">
                Everything you need to know about our digital twins, reality capture, Matterport, drone
                and 3D rendering work, and how we run a project. Can't find your answer? Talk to a
                specialist or WhatsApp us.
              </p>
            </div>
            <div className="relative w-full">
              <Search
                size={16}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500"
                aria-hidden
              />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search the FAQs"
                aria-label="Search the FAQs"
                className="w-full rounded-full bg-black/40 border border-white/10 pl-11 pr-4 py-3 text-sm text-neutral-100 placeholder:text-neutral-500 outline-none focus:border-emerald-400/50"
              />
            </div>
          </div>
        </section>

        <section className="grid md:grid-cols-2 gap-4">
          <Link
            to="/contact"
            className="group rounded-2xl border border-white/10 bg-white/[0.02] p-6 flex items-center justify-between gap-4 hover:border-emerald-400/40 transition"
          >
            <span className="text-lg font-light">I've got a question</span>
            <span className="w-10 h-10 rounded-xl border border-white/15 flex items-center justify-center text-emerald-300 group-hover:bg-emerald-500/10 transition">
              <ArrowRight size={16} />
            </span>
          </Link>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noreferrer"
            className="group rounded-2xl border border-emerald-400/40 bg-emerald-500/15 p-6 flex items-center justify-between gap-4 hover:bg-emerald-500/25 transition"
          >
            <span className="text-lg font-light text-emerald-100">Talk to our team</span>
            <span className="w-10 h-10 rounded-xl border border-emerald-300/40 flex items-center justify-center text-emerald-200">
              <ArrowRight size={16} />
            </span>
          </a>
        </section>

        <section className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {CATEGORIES.map((c) => {
            const Icon = c.icon;
            return (
              <Link
                key={c.title}
                to={c.to}
                className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 hover:border-emerald-400/40 transition block"
              >
                <span className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-400/25 flex items-center justify-center text-emerald-300">
                  <Icon size={18} />
                </span>
                <div className="mt-4 text-base font-light">{c.title}</div>
                <p className="mt-2 text-sm text-neutral-400 font-light leading-relaxed">{c.body}</p>
              </Link>
            );
          })}
        </section>

        {!q && (
          <nav aria-label="Browse FAQs by topic" className="flex flex-wrap gap-2">
            {GROUPS.map((g) => (
              <a
                key={g.id}
                href={`#${g.id}`}
                className="rounded-full border border-white/10 bg-white/[0.02] px-4 py-2 text-xs md:text-sm text-neutral-300 font-light hover:border-emerald-400/40 hover:text-emerald-200 transition"
              >
                {g.title}
              </a>
            ))}
          </nav>
        )}

        {groups.length === 0 && (
          <p className="text-sm text-neutral-400 font-light">
            No matches for "{query}".{" "}
            <Link to="/contact" className="text-emerald-300 hover:text-emerald-200">
              Talk to a specialist.
            </Link>
          </p>
        )}

        {groups.map((g) => {
          const Icon = g.icon;
          return (
            <section
              key={g.id}
              id={g.id}
              className="scroll-mt-28 rounded-2xl border border-emerald-400/20 bg-emerald-500/[0.04] p-6 md:p-10"
            >
              <div className="flex items-start gap-4">
                <span className="w-11 h-11 shrink-0 rounded-xl bg-emerald-500/10 border border-emerald-400/25 flex items-center justify-center text-emerald-300">
                  <Icon size={20} />
                </span>
                <div>
                  <h2 className="font-light text-2xl md:text-4xl">{g.title}</h2>
                  <p className="mt-2 text-[15px] md:text-base text-neutral-400 font-light">{g.blurb}</p>
                </div>
              </div>

              <div className="mt-8 divide-y divide-white/10 border-y border-white/10">
                {g.items.map((f, i) => {
                  const key = `${g.id}:${i}`;
                  const isOpen = q ? true : open === key;
                  return (
                    <div key={f.q} className="py-2">
                      <button
                        type="button"
                        onClick={() => setOpen(isOpen && !q ? null : key)}
                        aria-expanded={isOpen}
                        className="w-full flex items-start justify-between gap-6 text-left py-4"
                      >
                        <span className="text-[15px] md:text-base font-light text-neutral-100">{f.q}</span>
                        <ChevronDown
                          size={18}
                          className={`shrink-0 mt-1 text-emerald-300 transition-transform ${isOpen ? "rotate-180" : ""}`}
                        />
                      </button>
                      {isOpen && (
                        <p className="pb-5 pr-10 text-sm md:text-[15px] text-neutral-400 font-light leading-relaxed">
                          {f.a}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>
          );
        })}

        <section className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 md:p-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h2 className="font-light text-2xl md:text-3xl">Still have a question?</h2>
            <p className="mt-2 text-[15px] md:text-base text-neutral-400 font-light">
              Tell us about your space and we'll scope it with you.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              to="/contact"
              className="rounded-full bg-emerald-500 px-6 py-3 text-sm font-medium text-black hover:bg-emerald-400 transition"
            >
              Talk to a specialist
            </Link>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-emerald-400/40 px-6 py-3 text-sm font-light text-emerald-100 hover:bg-emerald-500/10 transition"
            >
              WhatsApp us
            </a>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
