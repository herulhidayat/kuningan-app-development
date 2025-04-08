"use client"

import FormDataPost from "@/components/organisms/form-data-post";
import Hero from "@/components/organisms/hero";
import { API_PATH } from "@/services/_path.service";
import api from "@/services/api.service";
import { QueryClient, QueryClientProvider, useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

const queryClient = new QueryClient();

function AddSeratusHariKerja() {
    const router = useRouter()
    const addPost = useMutation({
        mutationFn: async (dataPost: any) => {
          const res = await api.post(`/${API_PATH().blog.add}`, dataPost);
          return res.data;
        },
        onSuccess: () => {
          // Setelah sukses, refetch data agar data terbaru muncul
          router.push('/')
        },
      });

    const callbackSave = useCallback((data: any) => {
        addPost.mutate(data)
    }, [])
    return (
        <>
            <Hero
                title="Input Postingan Seratus Hari Kerja"
                description="Halaman ini digunakan untuk menambahkan postingan Seratus Hari Kerja."
                isWebTitle={false}
            />
            <div className="py-6">
                <FormDataPost callbackData={callbackSave}/>
            </div>
        </>
    )
}

export default function AddSeratusHariKerjaPage() {
    return (
        <QueryClientProvider client={queryClient}>
            <AddSeratusHariKerja />
        </QueryClientProvider>
    );
}