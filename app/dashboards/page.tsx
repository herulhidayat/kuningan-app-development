"use client";

import Hero from "@/components/organisms/hero";
import dynamic from "next/dynamic";
import React from "react";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement
);

const Map = dynamic(() => import("@/components/atoms/map"), { ssr: false });

const DashboardsPage = () => {
  const dataChart = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Population",
        data: [4000, 3000, 5000, 7000, 6000, 4000],
        borderColor: "#3B82F6",
        backgroundColor: "rgba(59, 130, 246, 0.2)",
      },
    ],
  };

  return (
    <div>
      <Hero
        title="Dasbor"
        description="Halaman Dasbor menyajikan visualisasi data interaktif dari berbagai kategori, seperti ekonomi, kesehatan, dan pendidikan, untuk memberikan gambaran cepat dan mendukung keputusan berbasis data."
      />
      <div className="flex items-center justify-center w-full text-[16px]/7 text-justify">
        <div className="flex flex-col rounded-lg my-5 px-3 w-full max-w-screen-2xl dark:bg-zinc-800">
          <div className="flex flex-col md:flex-row w-full">
            <div className="w-full md:w-2/5 py-10 px-5 rounded-s-lg shadow-sm">
              <div className="flex flex-col items-start">
                <h2 className="text-[1.5em] font-bold">Data Populasi</h2>
                <p className="text-gray-500 text-[1em] mt-4 md:mr-4">
                  Data populasi adalah informasi penting yang digunakan untuk
                  memahami distribusi dan karakteristik penduduk di suatu
                  wilayah. Data ini mencakup berbagai aspek seperti jumlah
                  penduduk, kepadatan, distribusi usia, jenis kelamin, dan
                  pertumbuhan populasi dari waktu ke waktu. Informasi ini sangat
                  berguna bagi pemerintah, peneliti, dan organisasi untuk
                  merencanakan dan mengimplementasikan kebijakan yang efektif.
                  Misalnya, data populasi dapat membantu dalam perencanaan
                  pembangunan infrastruktur, layanan kesehatan, pendidikan, dan
                  program sosial lainnya. Selain itu, data ini juga dapat
                  digunakan untuk analisis tren demografis dan proyeksi masa
                  depan, yang dapat memberikan wawasan tentang perubahan yang
                  mungkin terjadi dalam struktur populasi. Dengan memahami data
                  populasi, kita dapat membuat keputusan yang lebih baik dan
                  lebih tepat sasaran untuk meningkatkan kesejahteraan
                  masyarakat secara keseluruhan. Data ini juga penting dalam
                  konteks ekonomi, karena dapat mempengaruhi pasar tenaga kerja,
                  permintaan barang dan jasa, serta pertumbuhan ekonomi secara
                  umum. Oleh karena itu, pengumpulan dan analisis data populasi
                  yang akurat dan terkini adalah langkah penting dalam
                  perencanaan dan pengambilan keputusan yang berbasis data.
                </p>
              </div>
            </div>
            <div className=" w-full md:w-3/5 my-10">
              <Map className="w-auto h-[500px] md:h-[700px] z-0 rounded-lg" />
            </div>
          </div>

          <div className="flex flex-col md:flex-row w-full h-full py-4">
            <div className="h-[35svh] md:w-[50%] md:h-[300px] px-4">
              {" "}
              {/* Adjust size as needed */}
              <Line
                data={dataChart}
                options={{ responsive: true, maintainAspectRatio: false }}
              />
            </div>
            <div className="h-[35svh] md:w-[50%] md:h-[300px] px-4">
              <Line
                data={dataChart}
                options={{ responsive: true, maintainAspectRatio: false }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardsPage;
