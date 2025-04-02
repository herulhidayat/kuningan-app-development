"use client";

import Card from "@/components/molecules/card";
import Hero from "@/components/organisms/hero";
import Pagination from "@/components/organisms/pagination";
import { API_PATH } from "@/services/_path.service";
import api from "@/services/api.service";
import {
  QueryClient,
  QueryClientProvider,
  useMutation,
  useQuery,
} from "@tanstack/react-query";
import axios from "axios";
import { debounce } from "lodash";
import { useRouter } from "next/navigation";
import React, { use, useCallback, useEffect, useMemo, useState } from "react";
import Cookies from "js-cookie";
import Skeleton from "react-loading-skeleton";
import SearchBar from "@/components/atoms/search-bar";
import NoResult from "@/components/ui/illustrations/NoResult";
import { getItem } from "@/helpers/localstorage.helper";
import SelectDynamic from "@/components/organisms/select-dynamic";

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
  const [params, setParams] = useState<any>({
    "order": "DESC",
    "orderBy": "createdAt",
    "filter": []
  })
  const isLoggedin = Cookies.get("authToken");
  const access = getItem("user")?.privileges?.find((item: any) => item.id === 'dataset')

  const queryDataset = useQuery({
    queryKey: ["datasets", pagination.currentPage, params],
    queryFn: async () => {
      const response = await api.post(
        `/${API_PATH().dataset.getAll}`,
        {
          ...params,
          page: pagination.currentPage,
          size: pagination.itemsPerPage
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

  const handleSearch = useCallback((search: any) => {
    if (search) {
      setParams((prev: any) => ({
        ...prev,
        search: search,
        searchBy: ["data_name", "data_description"]
      }))
    } else {
      setParams((prev: any) => ({
        ...prev,
        search: undefined,
        searchBy: undefined,
      }))
    }
  }, []);

  const renderCard = useMemo(() => {
    return queryDataset.data?.data?.map(
      (dataSet: Dataset) => {
        return (
          <div key={dataSet._id}>
            <Card dataSet={dataSet} handleDelete={(id) => mutation.mutate(id)}/>
          </div>
        );
      }
    )
  }, [queryDataset.data?.data]);

  

  useEffect(() => {
    queryDataset.refetch();
  }, [pagination.currentPage, params]);

  const callbackSource = (source: any) => {
    if (source) {
      setParams((prev: any) => ({
        ...prev,
        filter: [
          ...prev.filter.filter((prev: any) => prev.field !== "data_source"),
          { 
            field: "data_source", 
            value: source 
          }
        ],
      }))
    } else {
      setParams((prev: any) => ({
        ...prev,
        filter: prev.filter.filter((item: any) => item.field !== "data_source")
      }))
    }
  }

  const callbackCategory = (category: any) => {
    if (category) {
      setParams((prev: any) => ({
        ...prev,
        filter: [
          ...prev.filter.filter((prev: any) => prev.field !== "category"),
          { 
            field: "category", 
            value: category 
          }
        ],
      }))
    } else {
      setParams((prev: any) => ({
        ...prev,
        filter: prev.filter.filter((item: any) => item.field !== "category")
      }))
    }
  }

  return (
    <>
      <Hero
        title="Dataset"
        description="Halaman Dataset menampilkan berbagai data resmi Pemerintah Kabupaten Kuningan yang dikelompokkan per kategori, lengkap dengan deskripsi, sumber, dan tanggal pembaruan untuk mendukung transparansi dan kemudahan akses informasi."
      />

      <div className="flex flex-col h-full w-full items-center">
        <div className="md:px-4.5 dark:divide-washed-dark h-full w-full max-w-screen-2xl px-3 lg:px-6 mt-8 flex flex-col gap-4">
          <div className="flex flex-col md:flex-row gap-2 md:justify-between"> 

            <SearchBar placeholder="Cari dataset..." callbackSearch={handleSearch} />

            <div className="flex flex-row gap-4">
              <SelectDynamic name="Sumber" pathUrl={API_PATH().catalog.getAllSource} callback={callbackSource} fieldPath="name"/>
              <SelectDynamic name="Kategori" pathUrl={API_PATH().catalog.getAll} callback={callbackCategory} fieldPath="category"/>

              {(isLoggedin && access?.privillages?.add) && (
                <button onClick={() => router.push("/datasets/add")} className="text-gray-800 bg-primary-500 hover:bg-primary-600 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm w-[25rem] px-5 py-2.5 text-center dark:bg-primary-500 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Tambah Dataset</button>
              )}
            </div>
          </div>

          <div className="flex flex-row gap-1 items-center">
            <h4 className="font-semibold text-base">
              {Intl.NumberFormat().format(pagination.count)}
            </h4>
            <h4 className="font-medium text-base opacity-50 hover:opacity-100 hover:text-primary-500">
              Dataset ditemukan
            </h4>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {queryDataset.isLoading && (
              Array.from({ length: 3 }).map((_, index) => (
                <div key={index}>
                  <Skeleton height={125} />
                </div>
              ))
            )}

            {queryDataset.data?.data?.length > 0 &&
              renderCard
            }
          </div>
          
          {queryDataset.isError && (
            <div className='px-6 py-4 text-center font-semibold text-gray-500'>
              <div className='flex justify-center w-full text-primary-500'>
                <NoResult />
              </div>
              <span>Maaf, data tidak ditemukan</span>
            </div>
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
