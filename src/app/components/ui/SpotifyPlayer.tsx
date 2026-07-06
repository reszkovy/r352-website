import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Music, X } from "lucide-react";

/**
 * SpotifyPlayer - a tucked, collapsible Spotify embed (official iframe widget)
 * fixed bottom-left, out of the way of the chat launcher (bottom-right).
 *
 * Note: a Spotify embed is a player, not seamless background audio - it needs a
 * click to start, and plays a 30s preview for visitors not logged into Spotify.
 * The ambient Mompou auto-play is disabled in App so the two don't overlap.
 */
const TRACK_ID = "5aP5Aar47c7WgmJU1BfDix";
const EMBED_SRC = `https://open.spotify.com/embed/track/${TRACK_ID}?utm_source=generator&theme=0`;

export function SpotifyPlayer() {
  const [open, setOpen] = useState(false);

  return (
    <div className="hidden md:block fixed bottom-6 left-6 z-[1000]">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="mb-3 w-[320px] overflow-hidden rounded-xl border border-white/10 shadow-2xl"
          >
            <iframe
              title="r352 - now playing"
              src={EMBED_SRC}
              width="100%"
              height="152"
              frameBorder="0"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
              style={{ display: "block" }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Hide music player" : "Show music player"}
        className="group flex items-center gap-2.5 rounded-full border border-white/12 bg-[#0A0A0A]/80 backdrop-blur px-4 py-2.5 text-[#D4FF00] hover:border-[#D4FF00]/50 transition-colors duration-300"
      >
        {open ? (
          <X className="w-4 h-4" strokeWidth={1.5} />
        ) : (
          <Music className="w-4 h-4" strokeWidth={1.5} />
        )}
        <span className="font-display uppercase tracking-[0.2em] text-[11px] whitespace-nowrap">
          {open ? "Close" : "Planet Rock"}
        </span>
      </button>
    </div>
  );
}
