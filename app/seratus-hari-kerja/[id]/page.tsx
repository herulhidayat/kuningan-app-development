"use client";

import FormDataPostHistory from "@/components/organisms/form-data-post-history";
import FormDataSubWorks from "@/components/organisms/form-data-sub-works";
import Hero from "@/components/organisms/hero";
import { API_PATH } from "@/services/_path.service";
import api from "@/services/api.service";
import { QueryClient, QueryClientProvider, useMutation, useQuery } from "@tanstack/react-query";
import moment from "moment";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useCallback } from "react";
import Skeleton from "react-loading-skeleton";

const queryClient = new QueryClient();

function ViewPost() {
    const params = useParams();
    const getBlogContent = useQuery({
        queryKey: ["blog", "seratus-hari-kerja"],
        queryFn: async () => {
          const { data } = await api.get(
            `/${API_PATH().blog.getOne}`,
            {params: {id: params.id}}
          );
    
          return data?.data;
        },
      });
    
    const updatePost = useMutation({
        mutationFn: async (dataPost: any) => {
            const res = await api.put(`/${API_PATH().blog.update}`, dataPost);
            return res.data;
        },
        onSuccess: () => {
            // Setelah sukses, refetch data agar data terbaru muncul
            getBlogContent.refetch();
        },
    });

    const callbackPostHistory = useCallback((data: any) => {
        updatePost.mutate(data)
    }, [])

    return (
        <>
			<Hero
                title={getBlogContent?.data?.judul}
                description={`${getBlogContent?.data?.author} • ${moment(getBlogContent?.data?.created_at).format("DD MMMM YYYY")}`}
                isWebTitle={false}
                isLoading={getBlogContent?.isLoading}
            />

			<div className="flex flex-col h-full w-full items-center">
				<div className="md:px-4.5 dark:divide-washed-dark h-full w-full max-w-screen-2xl px-3 lg:px-6">
                    <div className="flex items-center justify-center py-10">
                        <div className="w-9/12 max-md:w-full flex flex-col gap-8">
                            <Image src={getBlogContent?.data?.image_cover ? `https://bigdata.kuningankab.go.id:9088/blog${getBlogContent?.data?.image_cover}` : "/img/placeholder-img.svg"} unoptimized alt="post-1" width={300} height={300} className="object-cover rounded-lg w-full" />
                            <div
                            className="prose max-w-none"
                            dangerouslySetInnerHTML={{ __html: getBlogContent?.data?.content }}
                            />
                            {getBlogContent?.isLoading ? (
                                <Skeleton height={150}/>
                            ) : (
                                <FormDataSubWorks data={getBlogContent?.data} callbackData={callbackPostHistory}/>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default function ViewPostPage() {
    return (
        <QueryClientProvider client={queryClient}>
            <ViewPost />
        </QueryClientProvider>
    );
}