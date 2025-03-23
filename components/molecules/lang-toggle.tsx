"use client";

import { LanguageIcon } from "@heroicons/react/20/solid";
import { useState } from "react";

export default function LanguageToggle() {
  const [language, setLanguage] = useState("id");

  if (language === "id") {
    return (
      <button
        onClick={() => setLanguage("en")}
        type="button"
        className="flex select-none items-center gap-1.5 rounded-md text-start text-sm font-medium outline-none transition disabled:opacity-50 btn hover:bg-gray-100 dark:hover:bg-zinc-800 group relative p-2"
      >
        <div className="text-dim h-4 w-4 text-gray-500 group-hover:text-black">
          <LanguageIcon />
        </div>
      </button>
    );
  }
  if (language === "en") {
    return (
      <button
        onClick={() => setLanguage("id")}
        type="button"
        className="flex select-none items-center gap-1.5 rounded-md text-start text-sm font-medium outline-none transition disabled:opacity-50 btn hover:bg-gray-100 dark:hover:bg-zinc-800 group relative p-2"
      >
        <div className="text-dim h-4 w-4 text-gray-500 group-hover:text-black">
          <LanguageIcon />
        </div>
      </button>
    );
  }
}
