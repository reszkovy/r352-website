import { useState } from "react";

/**
 * YouTubeEmbed — premium click-to-play YouTube embed.
 *
 * Shows hi-res YouTube thumbnail with custom lime play button overlay.
 * On click: loads youtube-nocookie iframe with autoplay + modestbranding + rel=0.
 *
 * Why: default YouTube embed shows "Watch on YouTube" button, related videos
 * overlay, and YouTube logo prominently — looks like an ad placement.
 * This component renders editorial-grade poster + play affordance, loads
 * iframe only on click (faster initial page load), and uses youtube-nocookie
 * domain with cleaner player UI once playing.
 */

interface YouTubeEmbedProps {
  url: string;
  title?: string;
  /** Optional custom poster image — overrides YouTube auto-thumbnail */
  poster?: string;
}

function extractVideoId(url: string): string | null {
  const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/);
  return match ? match[1] : null;
}

export function YouTubeEmbed({ url, title = "Video", poster }: YouTubeEmbedProps) {
  const [started, setStarted] = useState(false);
  const videoId = extractVideoId(url);

  if (!videoId) return null;

  // YouTube provides maxresdefault for HD thumbnails; fallback handled below
  const thumbnailUrl = poster ?? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
  const embedUrl = `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1&color=white&playsinline=1`;

  if (started) {
    return (
      <div className="w-full aspect-video bg-[#0A0A0A] overflow-hidden rounded-sm">
        <iframe
          src={embedUrl}
          title={title}
          className="w-full h-full border-0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setStarted(true)}
      aria-label={`Play ${title}`}
      className="
        w-full aspect-video bg-[#0A0A0A] overflow-hidden rounded-sm
        relative group cursor-pointer outline-none
        focus-visible:ring-2 focus-visible:ring-[#D4FF00] focus-visible:ring-offset-2 focus-visible:ring-offset-black
      "
    >
      {/* Hi-res thumbnail (fallback to hqdefault if maxres unavailable — handled via onError) */}
      <img
        src={thumbnailUrl}
        alt={title}
        loading="lazy"
        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
        onError={(e) => {
          // Fallback if maxresdefault doesn't exist (older / less popular videos)
          const img = e.currentTarget;
          if (img.src.includes("maxresdefault")) {
            img.src = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
          }
        }}
      />

      {/* Dark overlay — softens on hover */}
      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/25 transition-colors duration-500 pointer-events-none" />

      {/* Subtle gradient at bottom for depth */}
      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />

      {/* Centered play button — lime accent, scale on hover */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="
          relative
          w-20 h-20 md:w-24 md:h-24
          rounded-full bg-[#D4FF00]
          flex items-center justify-center
          shadow-[0_8px_32px_rgba(0,0,0,0.5)]
          transition-transform duration-500 ease-out
          group-hover:scale-110
        ">
          {/* Pulse ring on hover */}
          <span className="
            absolute inset-0 rounded-full
            ring-2 ring-[#D4FF00]/50
            opacity-0 group-hover:opacity-100
            group-hover:scale-150
            transition-all duration-700 ease-out
          " />
          {/* Play icon */}
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 md:w-10 md:h-10 text-black ml-1">
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
      </div>

      {/* Small label bottom-left */}
      <div className="absolute bottom-4 left-4 md:bottom-6 md:left-6 pointer-events-none">
        <span className="text-[10px] md:text-xs font-display uppercase tracking-[0.2em] text-white/70">
          Play video
        </span>
      </div>
    </button>
  );
}
