import React from "react";

/**
 * Brand motif: the "AI" acronym renders in clay (#D97757, a nod to Claude /
 * Anthropic's warm tone) against the lime/neutral system. Matches the standalone
 * acronym only - "AI", "AI-native", "AI Elevated" - never the "ai" inside words
 * like "detail", "available", "campaign", "domain", or embedded as in "OpenAI".
 *
 * Usage: {highlightAI(t("some.key"))} or highlightAI("AI-native production").
 */
export function highlightAI(text: string): React.ReactNode {
  if (!text) return text;
  const parts = text.split(/(\bAI\b)/g);
  return parts.map((part, i) =>
    part === "AI" ? (
      <span key={i} className="text-[#D97757]">
        AI
      </span>
    ) : (
      part
    )
  );
}
