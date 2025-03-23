import React from "react";

interface HeroProps {
  title: string;
  description: string;
  children?: React.ReactNode;
}

export default function Hero(props: HeroProps) {
  return (
    <div className="flex h-full w-full justify-center bg-gradient-to-b from-white to-emerald-50 dark:from-zinc-800 dark:to-zinc-900 border-b dark:border-b-zinc-800 relative">
      <div className="md:px-4.5 dark:divide-washed-dark h-full w-full max-w-screen-2xl divide-y px-3 lg:px-6 ">
        <div>
          <div className="md:max-lg:-ml-4.5 sticky inset-x-0 top-14 z-20 -ml-3 flex lg:hidden"></div>
          <div className="space-y-6 py-12 xl:w-full">
            <div className="relative flex justify-between">
              <span className="text-base font-semibold uppercase text-emerald-600 dark:text-emerald-500">
                portal data terbuka resmi kabupaten kuningan
              </span>
            </div>
            <div className="space-y-3">
              <h2 className="text-black dark:text-white text-4xl font-bold">
                {props.title}
              </h2>
              <p className="max-xl:max-w-prose xl:w-2/3 text-dim text-gray-500 dark:text-gray-400">
                {props.description}
              </p>
            </div>
            {props.children}
          </div>
        </div>
      </div>
    </div>
  );
}
