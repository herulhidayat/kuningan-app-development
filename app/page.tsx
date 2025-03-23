import Hero from "@/components/organisms/hero";
import HomepageSection from "@/components/pages/homepage-section";
import {
  AcademicCapIcon,
  GlobeAmericasIcon,
  HeartIcon,
  TruckIcon,
} from "@heroicons/react/20/solid";
import Link from "next/link";

export default function Home() {
  const categories = [
    {
      id: 1,
      href: "/datasets/1",
      icon: AcademicCapIcon,
      name: "Pendidikan",
      title: "Populasi Berdasarkan Tingkat Pendidikan",
      views: 500,
    },
    {
      id: 2,
      href: "/datasets/2",
      icon: AcademicCapIcon,
      name: "Pendidikan",
      title: "Pertumbuhan Pendidikan",
      views: 512,
    },
    {
      id: 3,
      href: "/datasets/3",
      icon: HeartIcon,
      name: "Kesehatan",
      title: "Status Gizi Anak di Bawah Usia 5 Tahun Berdasarkan Jenis Kelamin",
      views: 250,
    },
    {
      id: 4,
      href: "/datasets/4",
      icon: GlobeAmericasIcon,
      name: "Demografi",
      title: "Table Populasi Kabupaten Kuningan",
      views: 175,
    },
    {
      id: 5,
      href: "/datasets/5",
      icon: TruckIcon,
      name: "Transportasi",
      title: "Jumlah Penumpang Transportasi Umum Harian",
      views: 200,
    },
  ];
  return (
    <>
      <Hero
        title="Mudah. Cepat. Akurat."
        description="platform inovatif yang menyediakan akses mudah ke data publik
                resmi untuk mendukung transparansi, kolaborasi, dan pengambilan
                keputusan berbasis data. Portal ini mempermudah masyarakat,
                peneliti, dan pelaku usaha dalam memanfaatkan data untuk
                mendorong pembangunan dan kemajuan daerah secara berkelanjutan."
      >
        <div className="space-y-6">
          <div className="flex flex-wrap gap-3">
            <Link
              href="/datasets"
              className="shadow-sm bg-gradient-to-b hover:from-emerald-500 hover:to-emerald-600 from-emerald-600 to-emerald-700 px-3 py-1.5 text-sm text-white font-semibold rounded-md"
            >
              <div className="group flex items-center gap-2">
                Dataset
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                  data-slot="icon"
                  className="h-5 w-5 transition-transform group-hover:translate-x-0.5"
                >
                  <path
                    fillRule="evenodd"
                    d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </div>
            </Link>
            <Link href="/docs" className="px-3 py-1.5 text-sm font-semibold">
              <div className="group flex items-center gap-2">
                Dokumentasi API
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                  className="h-5 w-5 transition-transform group-hover:translate-x-0.5"
                >
                  <path
                    fillRule="evenodd"
                    d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </div>
            </Link>
          </div>
        </div>
      </Hero>
      <div className="flex h-full w-full justify-center ">
        <div className="md:px-4.5 dark:divide-washed-dark h-full w-full max-w-screen-2xl divide-y px-3 lg:px-6 min-h-screen">
          <HomepageSection
            title="Dataset terbaru"
            date="22 Jan 2025, 23:59"
            description="Kategori data ini berdasarkan pengelompokan data yang dibuat
                    oleh Pemerintah Kabupaten Kuningan."
            cards={categories}
          />
          <HomepageSection
            title="Dataset populer"
            date="22 Jan 2025, 23:59"
            description="berikut adalah daftar dataset terpopular kami"
            cards={categories}
          />
          <section className="py-8 lg:py-12 dark:border-zinc-800">
            <div className="flex flex-col gap-6 lg:gap-8">
              <div className="flex flex-col gap-y-3">
                <div className="flex flex-col flex-wrap items-start gap-2 lg:flex-row lg:items-center lg:justify-between">
                  <h4>Penggunaan Data dari data.kuningankab.go.id</h4>
                  <span className="text-dim text-right text-sm">
                    Data terupdate pada 25 Jan 2025, 23:59
                  </span>
                </div>
              </div>
              <div>
                <div className="grid grid-cols-1 gap-12 lg:grid-cols-3"></div>
                <div className="group flex w-full items-center gap-x-3 pt-8">
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
