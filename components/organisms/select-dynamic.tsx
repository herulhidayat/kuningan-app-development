import api from "@/services/api.service";
import { useQuery } from "@tanstack/react-query";
import { get } from "lodash";
import { useState } from "react";

interface Props {
  name: string
  pathUrl: string
  fieldPath: string
  callback: (selected: string) => void
}

export default function SelectDynamic({ name, pathUrl, fieldPath, callback }: Props) {
  const [params, setParams] = useState<any>({
    "order": "DESC",
    "orderBy": "createdAt",
  })

  const getList = useQuery({
    queryKey: [name],
    queryFn: async () => {
      const response = await api.post(
        `/${pathUrl}`,
        {
          ...params,
          page: 1,
          size: 1000
        }
      );

      const data = response.data?.data?.map((item: any) => {
        return {
          label: get(item, fieldPath),
          value: get(item, fieldPath)
        }
      })

      return data;
    },
  });

  return (
    <select
      name={name}
      id={name}
      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full min-w-16 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
      onChange={(e) => callback(e.target.value)}
    >
      <option className="dark:bg-zinc-700" value="">
        Pilih {name}
      </option>
      {getList.data?.map((item: any, index: number) => (
        <option
          key={index}
          value={item.value}
          className="dark:bg-zinc-700"
        >
          {item.label}
        </option>
      ))}
    </select>
  )
}