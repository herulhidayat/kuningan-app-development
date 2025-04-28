"use client"

import { Poppins } from "next/font/google";
import SearchBarRounded from "../atoms/search-bar-rounded";
import { useCallback, useMemo, useState } from "react";
import Pagination from "./pagination";
import Cookies from "js-cookie";
import { getItem } from "@/helpers/localstorage.helper";
import { useRouter } from "next/navigation";
import { QueryClient, QueryClientProvider, useMutation, useQuery } from "@tanstack/react-query";
import { API_PATH } from "@/services/_path.service";
import api from "@/services/api.service";
import CardBlog from "../molecules/card-blog";
import Skeleton from "react-loading-skeleton";
import NoResult from "../ui/illustrations/NoResult";
import { Modal, ModalBody, ModalHeader } from "flowbite-react";
import WorksPage from "../pages/formpage-works";

const poppins = Poppins({ subsets: ['latin'], weight: ['700'] })
const queryClient = new QueryClient();

function PostCatalog() {
  const isLoggedin = Cookies.get("authToken");
  const access = getItem("user")?.privileges?.find((item: any) => item.id === 'seratus-hari-kerja')
  const router = useRouter()

  const [pagination, setPagination] = useState({
    currentPage: 1,
    itemsPerPage: 21,
    count: 21,
  });

  const [params, setParams] = useState<any>({
    "order": "DESC",
    "orderBy": "createdAt",
    "filter": []
  })

  const [modal, setModal] = useState<any>({
    title: "",
    show: false,
  });

  const getAllBlog = useQuery({
    queryKey: ["blog", pagination.currentPage, params],
    queryFn: async () => {
      const response = await api.post(
        `/${API_PATH().blog.getAll}`,
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

  const deleteBlog = useMutation({
    mutationFn: async (id: any) => {
      const res = await api.delete(`/${API_PATH().blog.delete}`, { params: { id: id } });
      return res.data;
    },
    onSuccess: () => {
      // Setelah sukses, refetch data agar data terbaru muncul
      getAllBlog.refetch();
    },
  });

  const handleSearch = useCallback((search: any) => {
    if (search) {
      setParams((prev: any) => ({
        ...prev,
        search: search,
      }))
    } else {
      setParams((prev: any) => ({
        ...prev,
        search: undefined,
      }))
    }
  }, []);

  const renderCard = useMemo(() => {
    return getAllBlog.data?.data?.map(
      (item: any, index: number) => {
        return (
          <CardBlog key={index} item={item} isLoggedin={Boolean(isLoggedin)} access={access} router={router} callbackDelete={deleteBlog.mutate} refresh={getAllBlog.refetch}/>
        );
      }
    )
  }, [getAllBlog.data?.data]);

  return (
    <>
      <div className="flex flex-col items-center gap-6 md:px-4.5 w-full max-w-screen-2xl px-3 lg:px-6">
        <h1 className={`${poppins.className} font-bold text-xl text-center`}>Program 100 hari kerja Bupati dan Wakil Bupati Kabupaten Kuningan</h1>
        <SearchBarRounded placeholder="Cari..." callbackSearch={handleSearch} className="md:w-96" />
        {/* {(isLoggedin && access?.privillages?.add) && (
          <button onClick={() => router.push("/seratus-hari-kerja/add")} className="text-gray-800 bg-primary-500 hover:bg-primary-600 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm w-[10rem] px-5 py-2.5 text-center dark:bg-primary-500 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Tambah Postingan</button>
        )} */}
        {/* {(isLoggedin && access?.privillages?.add) && ( */}
          <button onClick={() => setModal((prev: any) => ({ ...prev, show: true, title: "Tambah Program Kerja" }))} className="text-gray-800 bg-primary-500 hover:bg-primary-600 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm w-[13rem] px-5 py-2.5 text-center dark:bg-primary-500 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Tambah Program Kerja</button>
        {/* )} */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:gap-6 lg:gap-10 mt-6">
            {getAllBlog.isLoading && (
              Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="w-full">
                  <Skeleton height={150} />
                </div>
              ))
            )}

            {getAllBlog.data?.data?.length > 0 &&
              renderCard
            }

        </div>
        {getAllBlog.isError && (
          <div className='px-6 py-4 text-center font-semibold text-gray-500'>
            <div className='flex justify-center w-full text-primary-500'>
              <NoResult />
            </div>
            <span>Maaf, data tidak ditemukan</span>
          </div>
        )}
        <Pagination
          itemsPerPage={pagination.itemsPerPage}
          totalItems={pagination.count}
          currentPage={pagination.currentPage}
          setPagination={setPagination}
        />
      </div>

      <Modal show={modal.show} position="center" onClose={() => {setModal((prev: any) => ({ ...prev, show: false }));router.replace('/')}}>
        <ModalHeader>{modal.title}</ModalHeader>
        <ModalBody>
          <WorksPage closeModal={() => setModal((prev: any) => ({ ...prev, show: false }))} refresh={() => getAllBlog.refetch}/>
        </ModalBody>
      </Modal>
    </>
  )
}

export default function PostCatalogPage() {
  return (
    <QueryClientProvider client={queryClient}>
      <PostCatalog />
    </QueryClientProvider>
  );
}