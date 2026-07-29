import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader, SiteFooter } from "@/components/site-chrome";
import { abs, EMAIL } from "@/lib/site";

const TITLE = "Terms & Conditions | Novo Reperio";
const DESCRIPTION =
  "Terms and conditions for Matterport 3D showcase, 3D rendering, and spatial capture services provided by Novo Reperio Sdn Bhd.";
const CANONICAL = abs("/terms-and-conditions");

export const Route = createFileRoute("/terms-and-conditions")({
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
  }),
  component: TermsPage,
});

const MATTERPORT_SECTIONS = [
  {
    title: "1. Preamble",
    items: [
      "Welcome to Novo Reperio Sdn Bhd. These Terms and Conditions govern the provision of Matterport-based 3D scanning and virtual tour services by Novo Reperio Sdn Bhd.",
      "The Client acknowledges that the Services rely on the Matterport platform, and as such, the Client's use of the Services is further subject to the Matterport Terms of Use.",
    ],
  },
  {
    title: "2. Service Provider's Role and Disclaimer",
    items: [
      "The Service Provider acts solely as a service provider using the Matterport Platform.",
      "The Client acknowledges that their use of the virtual tours and related services is contingent upon their adherence to the Matterport Terms.",
    ],
  },
  {
    title: "3. Client Obligations",
    items: [
      "The Client warrants that they possess the necessary legal authority to authorize the scanning and public display of the subject property.",
      "The Client agrees to use the Services solely for lawful purposes and in compliance with all applicable laws and regulations.",
      "The Client acknowledges that all Matterport-generated content is subject to the licensing terms stipulated by Matterport.",
      "The Client is solely responsible for obtaining all necessary consents and permissions from property owners, tenants, or other relevant stakeholders before the commencement of any scanning activities.",
    ],
  },
  {
    title: "4. Data Ownership, Hosting, and Usage Rights",
    items: [
      "All 3D scans, images, and virtual tours are hosted on the Matterport Platform, and the associated hosting fees and data retention policies are governed by the Matterport Terms.",
      "The Service Provider reserves the right to use any 3D models, scans, and imagery for marketing, promotional, and portfolio purposes, unless otherwise specified in a written agreement executed by both parties.",
      "The Client acknowledges that data storage, access duration, and security measures are governed by the Matterport Platform, and the Service Provider provides no independent guarantees in this regard.",
      "The Service Provider does not warrant uninterrupted or indefinite access to the virtual tours, as such access is subject to Matterport's storage limitations, policy modifications, or service discontinuation.",
    ],
  },
  {
    title: "5. Copyright and Intellectual Property",
    items: [
      "The imagery, scans, and models generated through the Services remain the property of the Service Provider, subject to Matterport's intellectual property rights in the Platform.",
      "The Client is granted a non-exclusive, non-transferable license to use the virtual tours for their intended business or personal purposes.",
      "The Service Provider retains the right to display any scans, models, or imagery created through the Services for demonstration, marketing, and business development purposes.",
      "Any restriction on the Service Provider's use of scanned content for promotional purposes must be requested in writing and agreed upon by both parties before the provision of the Services.",
    ],
  },
  {
    title: "6. Limitation of Liability",
    items: [
      "The Service Provider shall not be liable for any disruptions, data loss, or service changes arising from Matterport's policies, system outages, or updates.",
      "The Service Provider shall not be held responsible for any third-party claims resulting from the Client's use of the Matterport Services.",
      "The Service Provider does not warrant the accuracy, completeness, or uninterrupted availability of any virtual tours, as these are dependent on Matterport's hosting and technical infrastructure.",
    ],
  },
  {
    title: "7. Amendments and Termination",
    items: [
      "The Service Provider reserves the right to amend these Terms at any time.",
      "The Client acknowledges that changes to the Matterport Terms may impact the Services, and the Service Provider shall not be liable for such changes.",
      "The Service Provider reserves the right to suspend or terminate the Client's access to the virtual tour without prior notice in the event of a breach of these Terms.",
    ],
  },
  {
    title: "8. Governing Law and Jurisdiction",
    items: [
      "These Terms shall be governed by and construed in accordance with the laws of Malaysia.",
      "Any disputes arising from these Terms shall be subject to the exclusive jurisdiction of the courts of Malaysia.",
    ],
  },
  {
    title: "9. Contact",
    items: [
      "For any inquiries regarding these Terms, please contact us at hello@novoreperio.com.",
    ],
  },
  {
    title: "10. Acknowledgement and Agreement",
    items: [
      "By utilizing the Services, the Client acknowledges that they have read, understood, and agree to be bound by these Terms and Conditions.",
    ],
  },
];

const RENDERING_SECTIONS = [
  {
    title: "1. Preamble",
    items: [
      "Welcome to Novo Reperio Sdn Bhd. These Terms of Use govern your access and use of our 3D rendering services, including but not limited to animation, perspective images, and 360 photography. By engaging with our Services, you agree to these Terms.",
    ],
  },
  {
    title: "2. Scope of Services",
    items: [
      "Our Services include 3D rendering and animation for real estate, product visualization, and marketing; perspective images for architectural, interior, and exterior visualizations; and 360-degree photography and virtual tours.",
      "We reserve the right to modify, suspend, or discontinue any aspect of our Services at any time.",
    ],
  },
  {
    title: "3. User Responsibilities",
    items: [
      "You agree to provide accurate project details and materials required for rendering.",
      "You must ensure you have legal rights to all assets and materials provided to us.",
      "You agree to review and approve work within agreed-upon timelines.",
      "You may not use our Services for any unlawful or infringing activities.",
    ],
  },
  {
    title: "4. Intellectual Property",
    items: [
      "We retain ownership of all proprietary techniques and methodologies used in our Services.",
      "You own the final rendered output upon full payment unless otherwise agreed.",
      "You grant us a non-exclusive right to use completed work for promotional purposes, unless otherwise agreed in writing.",
    ],
  },
  {
    title: "5. Payment Terms",
    items: [
      "A 50% deposit is required before commencement of services.",
      "The remaining balance is due upon completion and prior to delivery of final outputs.",
      "All accounts are to be paid within 14 days of the billing date. Interest may be charged on outstanding balances at the rate of 10% per annum if this due date is not met.",
    ],
  },
  {
    title: "6. Revisions and Variations",
    items: [
      "We will work on your project until you are satisfied. However, additional fees may apply for design changes beyond the original scope; incorrect, inaccurate, or outdated documentation provided by the client; missing documentation requiring us to create designs; changes to camera angles or positions resulting in significant additional work; feedback provided after the issuance of preview images that could have been given earlier; or revisions requested after the final high-resolution imagery has been issued.",
    ],
  },
  {
    title: "7. Delivery & Revisions",
    items: [
      "Initial drafts will be provided within the project timeline.",
      "You are entitled to 3 rounds of revisions.",
      "Additional revisions or modifications beyond the agreed scope will be subject to extra charges.",
    ],
  },
  {
    title: "8. Limitation of Liability",
    items: [
      "We are not liable for any indirect, incidental, or consequential damages; errors resulting from incorrect or incomplete project information provided by the client; or delays caused by unforeseen circumstances beyond our control.",
    ],
  },
  {
    title: "9. Confidentiality",
    items: [
      "We respect your confidentiality and will not share project details with third parties without your consent, except as required by law.",
    ],
  },
  {
    title: "10. Termination",
    items: [
      "We reserve the right to terminate the Service if the client fails to comply with these Terms, payment obligations are not met, or any abusive or unreasonable behaviour is directed towards our team.",
    ],
  },
  {
    title: "11. Governing Law and Jurisdiction",
    items: [
      "These Terms shall be governed by and construed in accordance with the laws of Malaysia.",
      "Any disputes arising from these Terms shall be subject to the exclusive jurisdiction of the courts of Malaysia.",
    ],
  },
  {
    title: "12. Contact Information",
    items: [
      "For any inquiries regarding these Terms, please contact us at hello@novoreperio.com.",
    ],
  },
  {
    title: "13. Acknowledgement and Agreement",
    items: [
      "By utilizing the Services, the Client acknowledges that they have read, understood, and agree to be bound by these Terms and Conditions.",
    ],
  },
];

const MS_MATTERPORT_SECTIONS = [
  {
    title: "1. Mukadimah, apa cerita?",
    items: [
      "Okay bos, ini adalah syarat dan terma (\"Terms\") untuk guna servis 3D scanning dan virtual tour guna teknologi Matterport yang disediakan oleh Novo Reperio Sdn Bhd (\"Kami\" atau \"Service Provider\").",
      "Nak kena faham, servis kita ni guna platform Matterport (\"Platform\"), so kalau guna servis kita, memang automatik kena ikut juga Matterport Terms of Use.",
    ],
  },
  {
    title: "2. Apa yang kami buat & tak buat",
    items: [
      "Kami ni cuma penyedia servis je, bukan owner atau pembangun sistem Matterport.",
      "Bila dah guna virtual tour dari kami, kena ikut juga semua syarat dan peraturan Matterport. Kalau Matterport ubah rules, kita pun ikut je.",
      "Kami ada hak untuk ubah, hentikan, atau berhentikan mana-mana bahagian servis pada bila-bila masa.",
    ],
  },
  {
    title: "3. Apa yang pelanggan (client) kena buat",
    items: [
      "You confirm yang you ada hak sah untuk benarkan tempat tu di-scan dan dipaparkan secara public.",
      "Jangan buat benda bukan-bukan. Guna servis ni dengan cara yang betul dan ikut undang-undang ya.",
      "Semua hasil kerja yang dibuat guna Matterport ikut syarat lesen dari Matterport.",
      "Kena ingat! Kalau tempat yang nak scan tu bukan milik sendiri, kena dapatkan izin dari owner, penyewa, atau siapa-siapa yang berkaitan sebelum kita start. Kita tak tanggung kalau ada isu lepas tu.",
    ],
  },
  {
    title: "4. Hak data, hosting & penggunaan",
    items: [
      "Semua 3D scan, gambar, dan virtual tour disimpan di platform Matterport. Nak tahu pasal caj hosting atau polisi data? Itu semua ikut polisi Matterport.",
      "Kami ada hak untuk guna mana-mana model 3D, scan, atau gambar yang dibuat untuk marketing, promosi, atau portfolio kami bila-bila masa, kecuali ada perjanjian bertulis kata lain.",
      "Jangan expect kami jaga data untuk selama-lamanya. Semua benda berkaitan storage, tempoh akses, dan keselamatan data ditentukan oleh Matterport, bukan kami.",
      "Kalau Matterport ada masalah server, ubah polisi, atau buang data, kami tak bertanggungjawab ya.",
    ],
  },
  {
    title: "5. Hak cipta & pemilikan kandungan",
    items: [
      "Semua gambar, scan, dan model 3D yang kami buat adalah hak milik kami, tapi masih tertakluk kepada hak cipta Matterport.",
      "Kami bagi lesen penggunaan kepada pelanggan untuk guna virtual tour tu, tapi tak boleh jual balik atau pindah hak milik kepada orang lain.",
      "Kami boleh tunjukkan hasil kerja (scan, model, gambar) dalam demo, marketing, dan bisnes kami tanpa perlu minta izin lagi.",
      "Kalau tak nak kami guna hasil kerja tu untuk promo, kena bagitau bertulis sebelum scan, dan kena ada persetujuan bersama. Kalau lepas scan baru nak cakap, sorry bos, tak boleh tarik balik.",
    ],
  },
  {
    title: "6. Kami tak tanggung",
    items: [
      "Kalau Matterport ada masalah teknikal, update polisi, atau hilangkan data, kami tak bertanggungjawab.",
      "Kalau ada orang saman atau buat tuntutan sebab cara you guna servis ni, itu bukan masalah kami.",
      "Jangan anggap virtual tour tu akan ada 24/7 selamanya. Semua bergantung pada Matterport, dan kami tak boleh janji benda tu sentiasa ada atau 100% tepat.",
    ],
  },
  {
    title: "7. Perubahan & penamatan",
    items: [
      "Kami boleh ubah Terms ni bila-bila masa. Kalau ada update, sila check balik ya.",
      "Kalau Matterport ubah syarat mereka dan ia bagi kesan pada servis you, itu bukan salah kami.",
      "Kalau you langgar mana-mana Terms, kami boleh hentikan atau tarik balik akses ke virtual tour tanpa notis.",
    ],
  },
  {
    title: "8. Undang-undang & mahkamah",
    items: [
      "Terms ni ikut undang-undang Malaysia.",
      "Kalau ada masalah atau pertikaian, kena selesaikan di mahkamah Malaysia.",
    ],
  },
  {
    title: "9. Nak tanya apa-apa?",
    items: [
      "Boleh contact kami di hello@novoreperio.com. Jangan segan-segan kalau ada soalan!",
    ],
  },
  {
    title: "10. Terma pembayaran",
    items: [
      "Deposit 50% diperlukan sebelum mula kerja.",
      "Baki selebihnya kena bayar lepas siap kerja dan sebelum hantar final output.",
      "Semua bayaran kena settle dalam 14 hari dari tarikh bil. Kalau lambat bayar, mungkin kena caj interest 10% setahun.",
    ],
  },
  {
    title: "11. Setuju tak?",
    items: [
      "Guna servis kami = you setuju dengan semua syarat-syarat ni. Dah baca, faham, dan diterima. Nota: kalau ada conflict atau kekeliruan, versi English akan jadi rujukan utama.",
    ],
  },
];

const MS_RENDERING_SECTIONS = [
  {
    title: "1. Mukadimah, apa cerita?",
    items: [
      "Selamat datang ke Novo Reperio Sdn Bhd (\"Company\", \"kami\", \"kita\", atau \"kitorang\"). Terma & Syarat (\"Terma\") ni regulate macam mana you boleh guna servis 3D rendering kami, termasuk animasi, gambar perspektif, dan fotografi 360 (\"Servis\"). Bila you engage dengan servis kami, maksudnya you setuju dengan Terma ni.",
    ],
  },
  {
    title: "2. Skop servis",
    items: [
      "3D rendering & animasi untuk hartanah, produk visualization & marketing.",
      "Gambar perspektif untuk visualisasi senibina, dalaman, dan luaran.",
      "Fotografi 360-degree & virtual tour.",
      "Kitorang ada hak untuk ubah, stop, atau terminate mana-mana servis tanpa notis awal.",
    ],
  },
  {
    title: "3. Tanggungjawab pelanggan",
    items: [
      "Bagi detail projek & material yang lengkap untuk rendering.",
      "Confirm yang you ada hak sah ke atas semua asset & material yang you bagi.",
      "Semak & bagi feedback dalam tempoh yang dipersetujui.",
      "Jangan guna servis ni untuk benda yang langgar undang-undang.",
    ],
  },
  {
    title: "4. Hak harta intelek",
    items: [
      "Teknik & method yang kitorang guna dalam servis ni semua hak milik kitorang.",
      "Bila you dah bayar penuh, hasil akhir tu milik you, kecuali ada perjanjian lain.",
      "You bagi kitorang hak non-exclusive untuk guna hasil kerja tu untuk tujuan promosi, kecuali kalau ada perjanjian bertulis kata lain.",
    ],
  },
  {
    title: "5. Bayaran",
    items: [
      "Deposit 50% kena bayar sebelum kerja start.",
      "Baki kena bayar bila kerja siap sebelum final output dihantar.",
      "Semua payment kena settle dalam 14 hari dari tarikh bil. Kalau lambat, kitorang boleh charge interest 10% setahun atas baki tertunggak.",
    ],
  },
  {
    title: "6. Revisi & perubahan",
    items: [
      "Kitorang akan adjust sampai you puas hati, tapi kalau ada extra kerja, boleh kena charge tambahan. Contohnya: design berubah dari skop asal; you bagi dokumen tak lengkap atau outdated; kitorang kena buat design sebab dokumen tak cukup; tukar angle kamera yang memerlukan extra kerja; feedback lambat bagi, patutnya boleh bagi awal; atau minta perubahan lepas final high-res output dah siap.",
    ],
  },
  {
    title: "7. Penghantaran & revisi",
    items: [
      "Draf awal akan dihantar ikut timeline projek.",
      "You dapat 3 kali revisi free.",
      "Kalau nak lebih, kena bayar extra.",
    ],
  },
  {
    title: "8. Had tanggungjawab",
    items: [
      "Kitorang tak bertanggungjawab untuk kerugian tak langsung atau kos tambahan; kesilapan sebab info yang you bagi tak betul atau tak lengkap; atau kelewatan sebab hal luar kawalan kitorang.",
    ],
  },
  {
    title: "9. Kerahsiaan",
    items: [
      "Kitorang akan jaga kerahsiaan projek you & takkan share dengan pihak ketiga tanpa izin, kecuali ikut undang-undang.",
    ],
  },
  {
    title: "10. Penamatan servis",
    items: [
      "Kitorang boleh stop servis kalau you tak ikut Terma ni, payment tak dibuat, atau you layan team kitorang dengan cara kasar atau tak reasonable.",
    ],
  },
  {
    title: "11. Undang-undang & bidang kuasa",
    items: [
      "Terma ni ikut undang-undang Malaysia.",
      "Sebarang pertikaian kena diselesaikan di mahkamah Malaysia.",
    ],
  },
  {
    title: "12. Maklumat hubungan",
    items: ["Ada soalan? Boleh contact kitorang di hello@novoreperio.com."],
  },
  {
    title: "13. Persetujuan",
    items: [
      "Dengan guna servis kitorang, you confirm yang you dah baca, faham, dan setuju dengan semua Terma & Syarat ni.",
    ],
  },
];

const COPY = {
  en: {
    eyebrow: "Legal",
    h1: "Terms & Conditions",
    intro:
      "The terms below govern Matterport 3D showcase services and 3D rendering services provided by Novo Reperio Sdn Bhd. Please read them carefully before engaging our services.",
    groupA: "Terms and Conditions of Service for Matterport 3D Showcase",
    groupB: "Terms and Conditions of 3D Rendering Services",
    ctaHeading: "Need more information?",
    ctaBody:
      "If you have any questions about these terms, please contact us and we will be happy to clarify.",
    ctaLink: "Contact us",
    sectionsA: MATTERPORT_SECTIONS,
    sectionsB: RENDERING_SECTIONS,
  },
  ms: {
    eyebrow: "Perundangan",
    h1: "Syarat & Terma Guna Pakai",
    intro:
      "Terma di bawah mengawal servis Matterport 3D showcase dan servis 3D rendering yang disediakan oleh Novo Reperio Sdn Bhd. Sila baca dengan teliti sebelum menggunakan servis kami. Kalau ada percanggahan, versi English jadi rujukan utama.",
    groupA: "Syarat & Terma Guna Pakai untuk Matterport 3D Showcase",
    groupB: "Terma & Syarat untuk Servis 3D Rendering",
    ctaHeading: "Perlukan maklumat lanjut?",
    ctaBody:
      "Kalau ada sebarang soalan tentang terma ini, hubungi kami dan kami akan jelaskan.",
    ctaLink: "Hubungi kami",
    sectionsA: MS_MATTERPORT_SECTIONS,
    sectionsB: MS_RENDERING_SECTIONS,
  },
} as const;

type Lang = keyof typeof COPY;

function TermsPage() {
  const [lang, setLang] = useState<Lang>("en");
  const t = COPY[lang];

  return (
    <div className="min-h-screen bg-[#020203] text-neutral-200 font-sans antialiased">
      <SiteHeader active={null} />

      <section className="px-6 md:px-24 pt-20 pb-16 border-b border-neutral-900">
        <div className="text-xs tracking-[0.4em] uppercase text-cyan-400 mb-6">
          {t.eyebrow}
        </div>
        <h1 className="text-4xl md:text-6xl font-light leading-[1.05] max-w-5xl text-white">
          {t.h1}
        </h1>

        <div
          role="group"
          aria-label="Language"
          className="mt-8 inline-flex items-center gap-1 rounded-full border border-neutral-800 p-1"
        >
          {(
            [
              { key: "en", label: "English" },
              { key: "ms", label: "Bahasa Malaysia" },
            ] as const
          ).map((opt) => (
            <button
              key={opt.key}
              type="button"
              onClick={() => setLang(opt.key)}
              aria-pressed={lang === opt.key}
              className={`px-4 py-1.5 rounded-full text-xs tracking-wide transition ${
                lang === opt.key
                  ? "bg-emerald-500/15 text-emerald-300 border border-emerald-500/40"
                  : "text-neutral-400 border border-transparent hover:text-neutral-200"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>

        <p className="mt-6 text-[15px] leading-relaxed text-neutral-400 max-w-3xl">
          {t.intro}
        </p>
      </section>

      <main
        lang={lang === "ms" ? "ms" : "en"}
        className="px-6 md:px-24 py-16 md:py-24 space-y-20 md:space-y-28"
      >
        <TermsGroup heading={t.groupA} sections={t.sectionsA} />
        <TermsGroup heading={t.groupB} sections={t.sectionsB} />
      </main>

      <section className="px-6 md:px-24 py-16 border-t border-neutral-900">
        <div className="max-w-3xl">
          <h2 className="text-2xl md:text-3xl font-light text-white mb-4">
            {t.ctaHeading}
          </h2>
          <p className="text-[15px] text-neutral-400 leading-relaxed mb-8">
            {t.ctaBody}
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-emerald-500/40 text-emerald-300 text-sm hover:bg-emerald-500/10 transition"
          >
            {t.ctaLink}
          </Link>
          <a
            href={`mailto:${EMAIL}`}
            className="inline-flex items-center gap-2 ml-3 text-sm text-neutral-400 hover:text-emerald-300 transition"
          >
            {EMAIL}
          </a>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}


function TermsGroup({
  heading,
  sections,
}: {
  heading: string;
  sections: readonly { readonly title: string; readonly items: readonly string[] }[];
}) {
  return (
    <div>
      <h2 className="text-2xl md:text-3xl font-light text-white mb-10 pb-6 border-b border-neutral-800">
        {heading}
      </h2>
      <div className="space-y-10">
        {sections.map((section) => (
          <div key={section.title}>
            <h3 className="text-lg md:text-xl font-light text-emerald-300 mb-4">
              {section.title}
            </h3>
            <ul className="space-y-3 text-[15px] leading-relaxed text-neutral-400">
              {section.items.map((item, i) => (
                <li key={i} className="pl-4 border-l border-neutral-800">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
