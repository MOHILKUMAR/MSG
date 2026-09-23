import React from "react";
import GptMovieSuggestions from "./GptMovieSuggestions";
import GptSearchBar from "./GptSearchBar";

const GptSearch = () => {
  return (
    <main className="relative min-h-screen overflow-hidden">
      {/* Ember spotlights + a faint film-strip grid behind the search */}
      <div className="glow-bg pointer-events-none absolute inset-0" aria-hidden="true" />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04] [background-image:linear-gradient(var(--fg)_1px,transparent_1px),linear-gradient(90deg,var(--fg)_1px,transparent_1px)] [background-size:48px_48px] [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]"
        aria-hidden="true"
      />
      <div className="relative pb-10 pt-28 md:pt-36">
        <GptSearchBar />
        <GptMovieSuggestions />
      </div>
    </main>
  );
};

export default GptSearch;
