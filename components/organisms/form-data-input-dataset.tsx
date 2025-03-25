import { useState } from "react";
import Table from "../molecules/table";
import Pagination from "./pagination";
import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query";
import axios from "axios";

const queryClient = new QueryClient();

interface IFormDataInput {
    callbackNext: () => void
    callbackBack: () => void
}

function FormInputDataset() {
    const [columns, setColumns] = useState<
        { title: string; sort?: "NONE" | "ASC" | "DESC" }[]
    >([
        { title: "Age", sort: "NONE" },
        { title: "Sex", sort: "NONE" },
        { title: "Date", sort: "NONE" },
        { title: "Ethnicity", sort: "NONE" },
        { title: "Population", sort: "NONE" },
    ]);
    // const dataLists = [
    //   { "Column 1": "Data 1", "Column 2": "Data 2", "Column 3": "Data 3" },
    //   { "Column 1": "Data 4", "Column 2": "Data 5", "Column 3": "Data 6" },
    // ];
    const [pagination, setPagination] = useState({
        currentPage: 1,
        itemsPerPage: 10,
        count: 10,
    });

    const dataLists = useQuery({
        queryKey: ["datasets", "detail"],
        queryFn: async () => {
            const response = await axios.get(
                `https://api.data.gov.my/data-catalogue/?id=population_malaysia`,
                {
                    params: {
                        limit: 10,
                        meta: true,
                    },
                }
            );

            setPagination((prev) => ({
                ...prev,
                count: response.data.meta.total,
            }));

            return response.data;
        },
    });
    return (
        <>
            <div>
                <Table
                    columns={columns}
                    setColumns={setColumns}
                    dataLists={dataLists?.data?.data}
                />
                <Pagination
                    itemsPerPage={pagination.itemsPerPage}
                    totalItems={pagination.count}
                    currentPage={pagination.currentPage}
                    setPagination={setPagination}
                />
            </div>
        </>
    )
}

export default function FormDataInputDataset({callbackBack,callbackNext}:IFormDataInput) {
    return(
        <QueryClientProvider client={queryClient}>
            <div className="flex items-center justify-center mt-8">
                <div className="w-1/2 max-md:w-full flex flex-col gap-8">
                    <FormInputDataset />
                    <div className="flex justify-between">
                        <button onClick={() => callbackBack()} className="text-white bg-gray-500 hover:bg-gray-600 focus:ring-4 focus:outline-none focus:ring-gray-200 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-gray-500 dark:hover:bg-gray-600 dark:focus:ring-gray-700">Back</button>
                        <button onClick={() => callbackNext()} className="text-white bg-emerald-600 hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800">Next</button>
                    </div>
                </div>
            </div>
        </QueryClientProvider>
    )
}