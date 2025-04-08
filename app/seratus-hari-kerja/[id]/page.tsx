"use client";

import Hero from "@/components/organisms/hero";
import { API_PATH } from "@/services/_path.service";
import api from "@/services/api.service";
import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query";
import moment from "moment";
import { useParams } from "next/navigation";

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

    return (
        <>
			<Hero
                title={getBlogContent?.data?.judul}
                description={`${getBlogContent?.data?.author} • ${moment(getBlogContent?.data?.created_at).format("DD MMMM YYYY")}`}
                isWebTitle={false}
            />

			<div className="flex flex-col h-full w-full items-center">
				<div className="md:px-4.5 dark:divide-washed-dark h-full w-full max-w-screen-2xl px-3 lg:px-6">
                    <div className="flex items-center justify-center py-10">
                        <div className="w-9/12 max-md:w-full">
                            <div
                            className="prose max-w-none"
                            dangerouslySetInnerHTML={{ __html: getBlogContent?.data?.content }}
                            />
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