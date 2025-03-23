"use client";

import Table from "@/components/molecules/table";
import Pagination from "@/components/organisms/pagination";
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
import { useState } from "react";

const queryClient = new QueryClient();

const DatasetDetailPage = () => {
  const [pagination, setPagination] = useState({
    currentPage: 1,
    itemsPerPage: 10,
    count: 0,
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

  const metadataDatasets = [
    {
      name: "Age",
      variable: "Age of the population",
      definition:
        "Either all age groups overall or five-year age groups e.g. 0-4, 5-9, 10-14, etc. 85+ is the oldest category.",
    },
    {
      name: "Sex",
      variable: "Gender of the population",
      definition:
        "Either both sexes ('both'), male ('male') or female ('female').",
    },
    {
      name: "Date",
      variable: "Date of the population",
      definition: "The date of the population estimate.",
    },
    {
      name: "Ethnicity",
      variable: "Ethnicity of the population",
      definition: "Description of the ethnic background of the population.",
    },
    {
      name: "Population",
      variable: "Population count",
      definition: "Total number of individuals in the population.",
    },
  ];

  return (
    <div>
      <div className="flex flex-col h-full w-full justify-center items-center dark:bg-zinc-900 text-[16px]/7 ">
        <div className="md:px-4.5 dark:divide-washed-dark h-full w-full max-w-screen-2xl px-3 lg:px-6 min-h-screen divide-y">
          <div className="mt-4">
            <h4 className="font-bold text-[1.5em] my-4">Datasets Detail</h4>
            <span className="font-normal text-gray-500 dark:text-gray-400 text-[1em]">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
              Curabitur pretium tincidunt lacus. Nulla gravida orci a odio.
              Nullam varius, turpis et commodo pharetra.
            </span>
          </div>

          <div className="mt-4 md:mx-36 text-[1em]">
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
          </div>

          <div className="mt-4 pt-4">
            <h4 className="font-bold text-[1.5em]">Metadata</h4>
            <div className="flex flex-col w-full dark:bg-zinc-800 rounded-lg py-4 px-6 mt-4">
              <h4 className="font-bold text-[1.25em]">Dataset Description</h4>
              <span className="font-normal text-gray-500 dark:text-gray-400 mt-2 text-[1em]">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
                Curabitur pretium tincidunt lacus. Nulla gravida orci a odio.
                Nullam varius, turpis et commodo pharetra.
              </span>

              <h4 className="font-bold mt-4 text-[1.25em]">
                Variable Description
              </h4>
              <table className="table-auto text-left text-[1em]">
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
              </table>

              <h4 className="font-bold my-4 text-[1.25em]">Last Updated:</h4>
              <span className="font-normal text-gray-500 dark:text-gray-400 text-[1em]">
                {new Date().toLocaleDateString()}
              </span>

              <h4 className="font-bold my-4 text-[1.25em]">Next Update:</h4>
              <span className="font-normal text-gray-500 dark:text-gray-400 text-[1em]">
                {new Date(
                  new Date().setDate(new Date().getDate() + 1)
                ).toLocaleDateString()}
              </span>

              <h4 className="font-bold my-4 text-[1.25em]">Source:</h4>
              <ul className="font-normal text-gray-500 dark:text-gray-400 text-[1em] list-disc list-inside">
                <li>Department of Statistics Malaysia</li>
                <li>Ministry of Health Malaysia</li>
                <li>Ministry of Education Malaysia</li>
              </ul>

              <h4 className="font-bold my-4 text-[1.25em]">
                Urls to Datasets:
              </h4>
              <ul className="font-normal text-gray-500 dark:text-gray-400 text-[1em] list-disc list-inside">
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
              </ul>

              <h4 className="font-bold my-4 text-[1.25em]">License:</h4>
              <span className="font-normal text-gray-500 dark:text-gray-400 text-[1em]">
                Open Data License Malaysia
              </span>
            </div>
          </div>

          <div className="mt-4 pt-4">
            <h4 className="font-bold text-[1.5em]">Download</h4>
            <h4 className="font-bold text-[1.25em] mt-4">Download Dataset</h4>

            <div className="flex rounded-lg py-5 gap-4">
              <button className="dark:bg-zinc-800 w-[50%] px-4 py-2 gap-4 rounded-md flex items-center justify-center">
                <DocumentArrowDownIcon className="h-5 inline-block mr-2" />
                <div className="flex flex-col items-start">
                  <span>Full Dataset (CSV)</span>
                  <span className="text-[1em] text-gray-500 dark:text-gray-400">
                    Recommended for individuals who want to analyze the data
                  </span>
                </div>
              </button>
              <button className="dark:bg-zinc-800 w-[50%] px-4 py-2 gap-4 rounded-md flex items-center justify-center">
                <CodeBracketIcon className="h-5 inline-block mr-2" />
                <div className="flex flex-col items-start text-[1em]">
                  <span>Full Dataset (JSON)</span>
                  <span className="text-[1em] text-gray-500 dark:text-gray-400">
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
