import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  const socialMedia = [
    {
      id: 1,
      name: "Facebook",
      href: "https://www.facebook.com/KuninganPemkab/",
    },
    {
      id: 2,
      name: "Instagram",
      href: "https://www.instagram.com/official.pemkabkuningan/",
    },
    {
      id: 3,
      name: "Tiktok",
      href: "https://www.tiktok.com/discover/kabupaten-kuningan",
    },
    {
      id: 4,
      name: "Youtube",
      href: "https://www.youtube.com/c/diskominfokuningan",
    },
  ];

  const openDataItems = [
    {
      id: 5,
      name: "Panduan",
      href: "",
    },
    {
      id: 6,
      name: "Tanya Jawab",
      href: "",
    },
    {
      id: 7,
      name: "SDI",
      href: "https://data.go.id/",
    },
    {
      id: 8,
      name: "Kuningan",
      href: "https://kuningankab.go.id/",
    },
  ];
  return (
    <footer className="flex h-full w-full dark:bg-zinc-900 text-black dark:text-white justify-center border-t dark:border-t-zinc-800 border-outline pt-12 pb-16 z-10">
      <div className="md:px-4.5 h-full w-full max-w-screen-2xl divide-y px-3 lg:px-6 undefined">
        <div className="flex w-full max-md:flex-col max-md:gap-8 md:justify-between">
          <div className="flex gap-4">
            <div className="mt-1 w-12">
              <Image
                alt="logo-kuningan"
                src="/logo.png"
                width={48}
                height={36}
              />
            </div>
            <div>
              <div className="mb-2 font-bold uppercase">
                pemerintahan daerah kabupaten kuningan
              </div>
              <p className="text-dim text-sm text-gray-500">
                © 2025 Data Terbuka Sektor Publik
              </p>
            </div>
          </div>
          <div className="flex gap-6 text-sm">
            <div className="flex w-full flex-col gap-2 md:w-[200px]">
              <p className="font-bold">Media Sosial Kami</p>
              {socialMedia.map((socialMediaItem) => {
                return (
                  <Link
                    key={socialMediaItem.id}
                    className="text-gray-500 hover:text-gray-800 dark:hover:text-gray-400 hover:underline"
                    href={socialMediaItem.href}
                  >
                    {socialMediaItem.name}
                  </Link>
                );
              })}
            </div>
            <div className="flex w-full flex-col gap-2 md:w-[200px]">
              <p className="font-bold">Data Terbuka</p>
              {openDataItems.map((openDataItem) => {
                return (
                  <Link
                    key={openDataItem.id}
                    className="text-gray-500 hover:text-gray-800 dark:hover:text-gray-400 hover:underline"
                    href={openDataItem.href}
                  >
                    {openDataItem.name}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
