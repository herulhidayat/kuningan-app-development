"use client";

import { columnSetter } from "@/components/atoms/column-setter";
import ReactTable from "@/components/molecules/react-table";
import Table from "@/components/molecules/table";
import Pagination from "@/components/organisms/pagination";
import { API_PATH } from "@/services/_path.service";
import {
  CodeBracketIcon,
  DocumentArrowDownIcon,
} from "@heroicons/react/20/solid";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import axios from "axios";
import { size } from "lodash";
import moment from "moment";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import Skeleton from "react-loading-skeleton";

const queryClient = new QueryClient();

const DatasetDetailPage = () => {
  const params = useParams();
  const [dataRow, setDataRow] = useState([]);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    itemsPerPage: 10,
    count: 0,
  });

  const dataLists = useQuery({
    queryKey: ["datasets", "detail"],
    queryFn: async () => {
      const response = await axios.get(
        `http://194.59.165.146:8900/${API_PATH().dataset.getOne}`,
        {params: {id: params.id}}
      );

      console.log(response.data);

      setPagination((prev) => ({
        ...prev,
        count: response.data?.data?.value_row?.length,
      }));

      return response.data;
    },
  });

  return (
    <div>
      <div className="flex flex-col h-full w-full justify-center items-center dark:bg-zinc-900 text-[16px]/7 ">
        <div className="md:px-4.5 dark:divide-zinc-800 divide-gray-200 h-full w-full max-w-screen-2xl px-3 lg:px-6 min-h-screen divide-y">
          <div className="mt-4">
            <h4 className="font-bold text-3xl my-4">Detail Dataset</h4>
            {/* <span className="font-normal text-gray-500 dark:text-gray-400 text-base">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
              Curabitur pretium tincidunt lacus. Nulla gravida orci a odio.
              Nullam varius, turpis et commodo pharetra.
            </span> */}
          </div>

          {/* <div className="mt-4 md:mx-36 text-base">
            <div className="overflow-x-auto">
              <Table
                columns={columns}
                setColumns={setColumns}
                dataLists={dataLists.data?.data}
              />
            </div>

            <Pagination
              itemsPerPage={pagination.itemsPerPage}
              totalItems={pagination.count}
              currentPage={pagination.currentPage}
              setPagination={setPagination}
            />
          </div> */}

          {dataLists?.isLoading && (
            <div className="grid grid-cols-4 gap-1">
              {Array.from({ length: 24 }).map((_, index) => (
                <div key={index}>
                  <Skeleton height={20} />
                </div>
              ))}
            </div>
          )}

          {(dataLists?.isSuccess && size(dataLists.data?.data?.value_row) > 0 && size(dataLists.data?.data?.column) > 0) && (
            <div className="w-full flex flex-col gap-3 pt-4">
              <ReactTable
                  data={dataLists.data?.data?.value_row} 
                  columns={columnSetter(dataLists.data?.data?.column)}   
                  noData={size(dataLists.data?.data?.value_row) > 0 ? false : true}                         
              />
              <Pagination
                  itemsPerPage={pagination.itemsPerPage}
                  totalItems={pagination.count}
                  currentPage={pagination.currentPage}
                  setPagination={setPagination}
              />
          </div>
          )}

          <div className="mt-4 pt-4">
            <h4 className="font-bold text-2xl">Metadata</h4>
            <div className="flex flex-col border border-gray-200 w-full bg-gray-50 dark:border-zinc-700 dark:bg-zinc-800 rounded-lg py-4 px-6 mt-4">
              <h4 className="font-bold text-xl">Deskripsi Dataset</h4>
              <span className="font-normal text-gray-500 dark:text-gray-400 mt-2 text-base">
                {dataLists.data?.data?.data_description}
              </span>

              {/* <h4 className="font-bold mt-4 text-[1.25em]">
                Variable Description
              </h4>
              <table className="table-auto text-left text-base">
                <thead className="">
                  <tr>
                    <th className="p-3 font-medium uppercase tracking-wider">
                      Name in Dataset
                    </th>
                    <th className="p-3 font-medium uppercase tracking-wider">
                      Variable
                    </th>
                    <th className="p-3 font-medium uppercase tracking-wider">
                      Definition
                    </th>
                  </tr>
                </thead>
                <tbody className="">
                  {metadataDatasets.map((metadata, index) => (
                    <tr key={index}>
                      <td className="p-3">{metadata.name}</td>
                      <td className="p-3">{metadata.variable}</td>
                      <td className="p-3">{metadata.definition}</td>
                    </tr>
                  ))}
                </tbody>
              </table> */}

              <h4 className="font-bold my-4 text-xl">Update Terakhir:</h4>
              <span className="font-normal text-gray-500 dark:text-gray-400 text-base">
                {moment(dataLists.data?.data?.updatedAt).format("DD-MM-YYYY")}
              </span>

              <h4 className="font-bold my-4 text-xl">Update Selanjutnya:</h4>
              <span className="font-normal text-gray-500 dark:text-gray-400 text-base">
                {moment(dataLists.data?.data?.updatedAt).add(1, "year").format("DD-MM-YYYY")}
              </span>

              <h4 className="font-bold my-4 text-xl">Sumber:</h4>
              <ul className="font-normal text-gray-500 dark:text-gray-400 text-base list-disc list-inside">
                <li>{dataLists.data?.data?.data_source}</li>
              </ul>

              {/* <h4 className="font-bold my-4 text-[1.25em]">
                Urls to Datasets:
              </h4>
              <ul className="font-normal text-gray-500 dark:text-gray-400 text-base list-disc list-inside">
                <li>
                  <a href="https://data.gov.my/dataset/population_malaysia">
                    Population Malaysia
                  </a>
                </li>
                <li>
                  <a href="https://data.gov.my/dataset/population_malaysia">
                    Population Malaysia
                  </a>
                </li>
                <li>
                  <a href="https://data.gov.my/dataset/population_malaysia">
                    Population Malaysia
                  </a>
                </li>
              </ul> */}

              <h4 className="font-bold my-4 text-xl">License:</h4>
              <span className="font-normal text-gray-500 dark:text-gray-400 text-base">
                Open Data Kab. Kuningan
              </span>
            </div>
          </div>

          <div className="mt-4 pt-4">
            <h4 className="font-bold text-2xl">Download</h4>
            <h4 className="font-bold text-xl mt-4">Download Dataset</h4>

            <div className="flex rounded-lg py-5 gap-4">
              <button className="border-gray-200 border hover:border-emerald-500 hover:bg-emerald-50 bg-gray-50 dark:border-zinc-700 dark:bg-zinc-800 w-[50%] px-4 py-2 gap-4 rounded-md flex items-center justify-center">
                <DocumentArrowDownIcon className="h-5 inline-block mr-2" />
                <div className="flex flex-col items-start">
                  <span>Full Dataset (CSV)</span>
                  <span className="text-base text-gray-500 dark:text-gray-400">
                    Recommended for individuals who want to analyze the data
                  </span>
                </div>
              </button>
              <button className="border-gray-200 border hover:border-emerald-500 hover:bg-emerald-50 bg-gray-50 dark:border-zinc-700 dark:bg-zinc-800 w-[50%] px-4 py-2 gap-4 rounded-md flex items-center justify-center">
                <CodeBracketIcon className="h-5 inline-block mr-2" />
                <div className="flex flex-col items-start text-base">
                  <span>Full Dataset (JSON)</span>
                  <span className="text-base text-gray-500 dark:text-gray-400">
                    Recommended for individuals who want to analyze the data
                  </span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function DatasetDetail() {
  return (
    <QueryClientProvider client={queryClient}>
      <DatasetDetailPage />
    </QueryClientProvider>
  );
}
