"use client";

import { use, useEffect, useState } from "react";

interface Props {
  callbackSelected: (selected: string) => void;
}

export default function DateDataToggle({ callbackSelected }: Props) {
  const [dateData, setDateData] = useState("today");

  useEffect(() => {
    callbackSelected(dateData);
  }, [dateData]);

  if (dateData === "today") {
    return (
      <>
        <li className="flex cursor-pointer select-none self-center whitespace-nowrap rounded-full px-2.5 py-1 text-sm outline-none transition-colors bg-gray-100 dark:bg-zinc-800 text-black dark:text-white">
          Hari ini
        </li>
        <li
          onClick={() => setDateData("all-time")}
          className="flex cursor-pointer select-none self-center whitespace-nowrap rounded-full px-2.5 py-1 text-sm outline-none transition-colors text-dim bg-transparent hover:text-black text-gray-500 dark:hover:text-white"
        >
          Sepanjang Waktu
        </li>
      </>
    );
  }
  if (dateData === "all-time") {
    return (
      <>
        <>
          <li
            onClick={() => setDateData("today")}
            className="flex cursor-pointer select-none self-center whitespace-nowrap rounded-full px-2.5 py-1 text-sm outline-none transition-colors text-dim bg-transparent hover:text-black text-gray-500 dark:hover:text-white"
          >
            Hari ini
          </li>
          <li className="flex cursor-pointer select-none self-center whitespace-nowrap rounded-full px-2.5 py-1 text-sm outline-none transition-colors bg-gray-100 dark:bg-zinc-800 text-black dark:text-white">
            Sepanjang Waktu
          </li>
        </>
      </>
    );
  }
}
