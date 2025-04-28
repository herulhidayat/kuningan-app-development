"use client";

import FormDataPostHistory from "@/components/organisms/form-data-post-history";
import FormDataPostHistoryV2 from "@/components/organisms/form-data-post-history-v2";
import FormDataSubWorks from "@/components/organisms/form-data-sub-works";
import Hero from "@/components/organisms/hero";
import { API_PATH } from "@/services/_path.service";
import api from "@/services/api.service";
import { ArrowLeftIcon } from "@heroicons/react/16/solid";
import { QueryClient, QueryClientProvider, useMutation, useQuery } from "@tanstack/react-query";
import { parseInt } from "lodash";
import moment from "moment";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import Skeleton from "react-loading-skeleton";

const queryClient = new QueryClient();

function ViewPost() {
    const params = useParams();
    const router = useRouter()
    const paramsUrl = useSearchParams();
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
                title={getBlogContent?.data?.detail_progress?.[parseInt(paramsUrl.get("index") || "0")]?.program_name}
                description={`${getBlogContent?.data?.detail_progress?.[parseInt(paramsUrl.get("index") || "0")]?.description}`}
                isWebTitle={false}
                isLoading={getBlogContent?.isLoading}
            />

			<div className="flex flex-col h-full w-full items-center">
				<div className="md:px-4.5 dark:divide-washed-dark h-full w-full max-w-screen-2xl px-3 lg:px-6">
                    <div className="flex items-center justify-center py-10">
                        <div className="w-9/12 max-md:w-full flex flex-col gap-8">
                            <div className="text-primary-600 flex gap-2 items-center font-medium cursor-pointer" onClick={() => router.push(`/seratus-hari-kerja/${params.id}`)}><ArrowLeftIcon className="h-4" /> Kembali</div>
                            {getBlogContent?.isLoading ? (
                                <Skeleton height={150}/>
                            ) : (
                                <FormDataPostHistoryV2 data={getBlogContent?.data} callbackData={callbackPostHistory} />
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