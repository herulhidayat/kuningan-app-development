"use client";

import Card from "@/components/molecules/card";
import Hero from "@/components/organisms/hero";
import Pagination from "@/components/organisms/pagination";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import axios from "axios";
import React, { useState } from "react";

export interface Dataset {
  count: number;
  results: {
    id: string;
    title: string;
    notes: string;
    resources: {
      format?: string;
    }[];
    author: string;
  }[];
}

const DatasetsPage = () => {
  const [pagination, setPagination] = useState({
    currentPage: 1,
    itemsPerPage: 10,
    count: 0,
  });

  const queryDataset = useQuery({
    queryKey: ["datasets", pagination.currentPage],
    queryFn: async () => {
      const response = await axios.get(
        `
https://katalog.data.go.id/api/3/action/package_search?q=&facet.field=%5B%22organization%22%2C%22kategori%22%2C%22prioritas_tahun%22%2C%22tags%22%2C%22res_format%22%5D&facet.limit=500&sort=prioritas_tahun%20desc&include_private=true
`,
        {
          params: {
            rows: pagination.itemsPerPage,
            start: (pagination.currentPage - 1) * pagination.itemsPerPage,
          },
        }
      );

      setPagination((prev) => ({
        ...prev,
        count: response.data.result.count,
      }));
      return response.data;
    },
  });

  return (
    <>
      <Hero
        title="Dataset"
        description="Halaman Dataset menampilkan berbagai data resmi Pemerintah Kabupaten Kuningan yang dikelompokkan per kategori, lengkap dengan deskripsi, sumber, dan tanggal pembaruan untuk mendukung transparansi dan kemudahan akses informasi."
      />

      <div className="flex flex-col h-full w-full justify-center items-center">
        <div className="md:px-4.5 dark:divide-washed-dark h-full w-full max-w-screen-2xl px-3 lg:px-6 min-h-screen">
          <div className="flex flex-col md:flex-row gap-2 justify-between py-4">
            <div className="flex flex-row gap-1 items-center">
              <h4 className="font-bold text-lg">
                {Intl.NumberFormat().format(pagination.count)}
              </h4>
              <h4 className="font-bold text-lg opacity-50 hover:opacity-100 hover:text-emerald-600">
                Datasets Found
              </h4>
            </div>

            <div className="relative">
              <label htmlFor="Search" className="sr-only">
                {" "}
                Search{" "}
              </label>

              <input
                type="text"
                id="Search"
                placeholder="Search for..."
                className="w-full rounded-md border-gray-200 ps-3 py-2.5 pe-10 shadow-xs sm:text-sm"
              />

              <span className="absolute -top-3 md:top-0 inset-y-0 end-0 grid w-10 place-content-center">
                <button
                  type="button"
                  className="text-gray-600 hover:text-gray-700"
                >
                  <span className="sr-only">Search</span>

                  <MagnifyingGlassIcon className="h-6 w-6" />
                </button>
              </span>
            </div>

            <div className="">
              <select
                name="HeadlineAct"
                id="HeadlineAct"
                className="mt-1.5 w-full rounded-md bg-inherit md:border px-1 py-2 dark:bg-zinc-700 sm:text-sm"
              >
                <option className="dark:bg-zinc-700" value="">
                  Please select
                </option>
                <option className="dark:bg-zinc-700" value="JM">
                  John Mayer
                </option>
                <option className="dark:bg-zinc-700" value="SRV">
                  Stevie Ray Vaughn
                </option>
                <option className="dark:bg-zinc-700" value="JH">
                  Jimi Hendrix
                </option>
                <option className="dark:bg-zinc-700" value="BBK">
                  B.B King
                </option>
                <option className="dark:bg-zinc-700" value="AK">
                  Albert King
                </option>
                <option className="dark:bg-zinc-700" value="BG">
                  Buddy Guy
                </option>
                <option className="dark:bg-zinc-700" value="EC">
                  Eric Clapton
                </option>
              </select>
            </div>
          </div>

          {queryDataset.isLoading && <Card isSkeleton />}

          {queryDataset.data?.result?.results.length > 0 &&
            queryDataset.data.result.results.map(
              (dataSet: Dataset["results"][0]) => {
                return (
                  <div key={dataSet.id}>
                    <Card dataSet={dataSet} />
                  </div>
                );
              }
            )}
        </div>

        <Pagination
          itemsPerPage={pagination.itemsPerPage}
          totalItems={pagination.count}
          currentPage={pagination.currentPage}
          setPagination={setPagination}
        />
      </div>
    </>
  );
};

const queryClient = new QueryClient();

export default function Datasets() {
  return (
    <QueryClientProvider client={queryClient}>
      <DatasetsPage />
    </QueryClientProvider>
  );
}
