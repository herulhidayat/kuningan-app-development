"use client";

import Card from "@/components/molecules/card";
import Hero from "@/components/organisms/hero";
import Pagination from "@/components/organisms/pagination";
import { API_PATH } from "@/services/_path.service";
import api from "@/services/api.service";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import {
  QueryClient,
  QueryClientProvider,
  useMutation,
  useQuery,
} from "@tanstack/react-query";
import axios from "axios";
import { debounce } from "lodash";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export interface Dataset {
    _id: string;
    createdAt: number;
    updatedAt: number;
    author: string;
    data_name: string;
    category: string;
    data_source: string;
    data_description: string;
    data_table: boolean;
    upload_file: boolean;
    column: any[];
    value_row: any[];
}


const DatasetsPage = () => {
  const router = useRouter();
  const [pagination, setPagination] = useState({
    currentPage: 1,
    itemsPerPage: 10,
    count: 0,
  });
  const [params, setParams] = useState<any>({})

  const queryDataset = useQuery({
    queryKey: ["datasets", pagination.currentPage],
    queryFn: async () => {
      const response = await api.post(
        `/${API_PATH().dataset.getAll}`,
        {
          params: {
            ...params,
            page: pagination.currentPage,
            size: pagination.itemsPerPage
          }
        }
      );

      setPagination((prev) => ({
        ...prev,
        count: response.data.metaData.pagination.totalElements,
      }));
      return response.data;
    },
  });

  const mutation = useMutation({
    mutationFn: async (id: any) => {
      const res = await api.delete(`/${API_PATH().dataset.delete}`, { params: {id: id} });
      return res.data;
    },
    onSuccess: () => {
      // Setelah sukses, refetch data agar data terbaru muncul
      queryDataset.refetch();
    },
  });

  const handleSearch = (e: any) => {
    const search = e.target.value;
    if(search) {
      setParams({
        search: search,
        sarchBy: ["data_name", "data_description"]
      })
    }
  };

  const debounceSearch = debounce(handleSearch, 1000);

  useEffect(() => {
    queryDataset.refetch();
  }, [pagination.currentPage, params]);

  return (
    <>
      <Hero
        title="Dataset"
        description="Halaman Dataset menampilkan berbagai data resmi Pemerintah Kabupaten Kuningan yang dikelompokkan per kategori, lengkap dengan deskripsi, sumber, dan tanggal pembaruan untuk mendukung transparansi dan kemudahan akses informasi."
      />

      <div className="flex flex-col h-full w-full items-center">
        <div className="md:px-4.5 dark:divide-washed-dark h-full w-full max-w-screen-2xl px-3 lg:px-6 mt-8 flex flex-col gap-4">
          <div className="flex flex-col md:flex-row gap-2 md:justify-between"> 

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
                onChange={(e) => debounceSearch(e)}
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

            <div className="flex flex-row gap-4">
              <select
                name="HeadlineAct"
                id="HeadlineAct"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-emerald-500 focus:border-emerald-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-emerald-500 dark:focus:border-emerald-500"
              >
                <option className="dark:bg-zinc-700" value="">
                  Source
                </option>
              </select>
              <select
                name="HeadlineAct"
                id="HeadlineAct"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-emerald-500 focus:border-emerald-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-emerald-500 dark:focus:border-emerald-500"
              >
                <option className="dark:bg-zinc-700" value="">
                  Category
                </option>
              </select>

              <button onClick={() => router.push("/datasets/add")} className="text-white bg-emerald-600 hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm w-[20rem] px-5 py-2.5 text-center dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800">Add Dataset</button>
            </div>
          </div>

          <div className="flex flex-row gap-1 items-center">
            <h4 className="font-semibold text-base">
              {Intl.NumberFormat().format(pagination.count)}
            </h4>
            <h4 className="font-medium text-base opacity-50 hover:opacity-100 hover:text-emerald-600">
              Datasets Found
            </h4>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {queryDataset.isLoading && <Card isSkeleton />}

            {queryDataset.data?.data?.length > 0 &&
              queryDataset.data?.data?.map(
                (dataSet: Dataset) => {
                  return (
                    <div key={dataSet._id}>
                      <Card dataSet={dataSet} handleDelete={(id) => mutation.mutate(id)}/>
                    </div>
                  );
                }
              )}
          </div>
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
