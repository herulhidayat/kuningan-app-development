"use client"

import FormDataPost from "@/components/organisms/form-data-post";
import Hero from "@/components/organisms/hero";
import { API_PATH } from "@/services/_path.service";
import api from "@/services/api.service";
import { QueryClient, QueryClientProvider, useMutation, useQuery } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import FormDataWorks from "../organisms/form-data-works";

const queryClient = new QueryClient();

function FormPageWorks({closeModal, refresh}: {closeModal: () => void, refresh: () => void}) {
    const router = useRouter()
    const searchParams = useSearchParams()
    const id = searchParams.get('id')

    const addPost = useMutation({
        mutationFn: async (dataPost: any) => {
          const res = await api.post(`/${API_PATH().blog.add}`, dataPost);
          return res.data;
        },
        onSuccess: () => {
          // Setelah sukses, refetch data agar data terbaru muncul
          router.push('/')
          closeModal()
          refresh()
        },
      });

    const updatePost = useMutation({
        mutationFn: async (dataPost: any) => {
          const res = await api.put(`/${API_PATH().blog.update}`, dataPost);
          return res.data;
        },
        onSuccess: () => {
          // Setelah sukses, refetch data agar data terbaru muncul
          router.push('/')
          closeModal()
          refresh()
        },
      });

    const dataBlog = useQuery({
        queryKey: ["seratus-hari-kerja", id],
        queryFn: async () => {
          const { data } = await api.get(
            `/${API_PATH().blog.getOne}`,
            {params: {id: id}}
          );
          return data?.data;
        },
      });

    const callbackSave = useCallback((data: any) => {
        if(id) {
            updatePost.mutate(data)
        } else {
            addPost.mutate(data)
        }
    }, [])
    return (
        <>
            <FormDataWorks callbackData={callbackSave} data={dataBlog.data} closeModal={closeModal}/>
        </>
    )
}

export default function WorksPage({closeModal, refresh}: {closeModal: () => void, refresh: () => void}) {
    return (
        <QueryClientProvider client={queryClient}>
            <FormPageWorks closeModal={closeModal} refresh={refresh}/>
        </QueryClientProvider>
    );
}