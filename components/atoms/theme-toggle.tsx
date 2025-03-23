"use client";

import { MoonIcon, SunIcon } from "@heroicons/react/20/solid";
import { useTheme } from "next-themes";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { setTheme, resolvedTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  if (!mounted)
    return (
      <Image
        src="data:image/svg+xml;base64,PHN2ZyBzdHJva2U9IiNGRkZGRkYiIGZpbGw9IiNGRkZGRkYiIHN0cm9rZS13aWR0aD0iMCIgdmlld0JveD0iMCAwIDI0IDI0IiBoZWlnaHQ9IjIwMHB4IiB3aWR0aD0iMjAwcHgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjIwIiBoZWlnaHQ9IjIwIiB4PSIyIiB5PSIyIiBmaWxsPSJub25lIiBzdHJva2Utd2lkdGg9IjIiIHJ4PSIyIj48L3JlY3Q+PC9zdmc+Cg=="
        width={32}
        height={32}
        sizes="36x36"
        priority={false}
        alt="loading theme"
        title="Loading theme"
      />
    );

  if (resolvedTheme === "dark") {
    return (
      <button
        onClick={() => setTheme("light")}
        type="button"
        className="flex select-none items-center gap-1.5 rounded-md text-start text-sm font-medium outline-none transition disabled:opacity-50 btn hover:bg-gray-100 dark:hover:bg-zinc-800 group relative p-2"
      >
        <div className="text-dim h-4 w-4 text-gray-500 group-hover:text-white">
          <SunIcon />
        </div>
      </button>
    );
  }
  if (resolvedTheme === "light") {
    return (
      <button
        onClick={() => setTheme("dark")}
        type="button"
        className="flex select-none items-center gap-1.5 rounded-md text-start text-sm font-medium outline-none transition disabled:opacity-50 btn hover:bg-gray-100 dark:hover:bg-gray-100 group relative p-2"
      >
        <div className="text-dim h-4 w-4 text-gray-500 group-hover:text-black">
          <MoonIcon />
        </div>
      </button>
    );
  }
}
