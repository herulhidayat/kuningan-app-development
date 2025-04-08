'use client'

import FormDataPost from "@/components/organisms/form-data-post";
import Hero from "@/components/organisms/hero";
import { API_PATH } from "@/services/_path.service";
import api from "@/services/api.service";
import { QueryClient, QueryClientProvider, useMutation, useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { useCallback } from "react";

const queryClient = new QueryClient();

function EditSeratusHariKerja() {
    const router = useRouter()
    const params = useParams();

    const updatePost = useMutation({
        mutationFn: async (dataPost: any) => {
          const res = await api.put(`/${API_PATH().blog.update}`, dataPost);
          return res.data;
        },
        onSuccess: () => {
          // Setelah sukses, refetch data agar data terbaru muncul
          router.push('/')
        },
      });

    const dataBlog = useQuery({
        queryKey: ["seratus-hari-kerja"],
        queryFn: async () => {
          const { data } = await api.get(
            `/${API_PATH().blog.getOne}`,
            {params: {id: params.id}}
          );
          return data?.data;
        },
      });

    const callbackSave = useCallback((data: any) => {
        updatePost.mutate(data)
    }, [])
    return (
        <>
            <Hero
                title="Edit Postingan Seratus Hari Kerja"
                description="Halaman ini digunakan untuk mengubah postingan Seratus Hari Kerja."
                isWebTitle={false}
            />
            <div className="py-6">
                <FormDataPost data={dataBlog?.data} callbackData={callbackSave} />
            </div>
        </>
    )
}

export default function EditSeratusHariKerjaPage() {
    return (
        <QueryClientProvider client={queryClient}>
            <EditSeratusHariKerja />
        </QueryClientProvider>
    );
}