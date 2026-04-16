import { ExternalLink, MapPin, Navigation } from "lucide-react";

// Road-map view: !5e0! (was !5e1! = satellite / Earth view)
const MAP_SRC =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4414.009716274096!2d77.5946407831442!3d12.999447454620045!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae165a5bfd2527%3A0xb30d53b4c17642c6!2sWhizkids%20International%20Pre%20School%20Jayamahal!5e0!3m2!1sen!2sin!4v1776318901519!5m2!1sen!2sin";

const GMAPS_URL =
  "https://www.google.com/maps/place/Whizkids+International+Pre+School+Jayamahal/@12.9994474,77.5946408,17z";

const MapEmbadding = () => {
  return (
    <section className="bg-background" aria-label="Find us on the map">
      <div className="container">
        {/* ── Header ── */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            {/* Pin badge */}
            <span className="flex items-center justify-center w-10 h-10 rounded-full bg-skyblue shrink-0">
              <MapPin size={18} className="text-skyblue-strong" strokeWidth={2.5} />
            </span>
            <div>
              <h2 className="text-lg! md:text-xl! font-bold text-foreground leading-tight">
                Find Us Here
              </h2>
              <p className="text-xs text-foreground/55 mt-0.5">
                Whizkids International Pre&nbsp;School, Jayamahal, Bengaluru
              </p>
            </div>
          </div>

          {/* Get directions CTA */}
          <a
            href={GMAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 self-start sm:self-auto
                       rounded-full bg-primary px-4 py-2 text-xs font-semibold
                       text-white shadow-sm hover:brightness-105 transition-all"
          >
            <Navigation size={13} strokeWidth={2.5} />
            Get Directions
          </a>
        </div>

        {/* ── Map card ── */}
        <div className="rounded-2xl overflow-hidden shadow-lg ring-1 ring-foreground/8">

          {/* colourful top accent bar */}
          <div className="h-1.5 w-full bg-linear-to-r from-skyblue-strong via-lavender-strong to-pink-strong" />

          <div className="relative w-full" style={{ paddingBottom: "45%" }}>
            <iframe
              src={MAP_SRC}
              title="Whizkids International Pre School location map"
              className="absolute inset-0 w-full h-full"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          {/* ── Footer bar ── */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2
                          bg-white px-4 py-3 border-t border-foreground/8">
            <p className="text-xs text-foreground/55 leading-snug">
              📍 &nbsp;No. 18, 1st Main Rd, Jayamahal Extension, Bengaluru – 560046
            </p>
            <a
              href={GMAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs font-medium text-skyblue-strong
                         hover:underline underline-offset-2 shrink-0 transition-colors"
            >
              Open in Google Maps
              <ExternalLink size={11} />
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};

export default MapEmbadding;