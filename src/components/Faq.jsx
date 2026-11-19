import { Helmet } from "react-helmet-async";
import { FAQS } from "../data.js";
import { Reveal } from "./Site.jsx";

export default function Faq() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };
  return (
    <>
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
      </Helmet>
      <div className="border-t border-line">
        {FAQS.map(({ q, a }) => (
          <Reveal key={q}>
            <details className="group border-b border-line py-6">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-[clamp(1.1rem,2vw,1.5rem)] font-medium [&::-webkit-details-marker]:hidden">
                {q}
                <span
                  aria-hidden="true"
                  className="text-mint transition-transform duration-300 group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p className="mt-4 mb-0 max-w-[640px] text-muted">{a}</p>
            </details>
          </Reveal>
        ))}
      </div>
    </>
  );
}
