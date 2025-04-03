import { API_PATH } from "@/services/_path.service";
import api from "@/services/api.service";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ModalBody, ModalFooter, ModalHeader } from "flowbite-react";
import { capitalize } from "lodash";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

interface IFormDataUser {
  onClose: () => void
  modalProps?: any
  refetch: () => void
}
export default function FormDataRole({ onClose, modalProps, refetch }: IFormDataUser) {
  const searchParams = useSearchParams()
  const router = useRouter()
  const idRole = searchParams.get('id')
  const schema = yup.object().shape({
    description: yup.string(),
    name: yup.string().required('Name is required'),
    privileges: yup.array(),
  });

  const PRIVILLAGE = [
    {
      name: 'Dataset',
      id: 'dataset',
      privillages: {
        add: false,
        update: false,
        delete: false
      }
    },
    {
      name: '100 Hari Kerja',
      id: 'seratus-hari-kerja',
      privillages: {
        add: false,
        update: false,
        delete: false
      }
    },
    {
      name: 'User Management',
      id: 'user-management',
      privillages: {
        view: false,
        add: false,
        update: false,
        delete: false
      }
    },
    {
      name: 'Role',
      id: 'role',
      privillages: {
        view: false,
        add: false,
        update: false,
        delete: false
      }
    }
  ]

  const [formModel] = useState<any>({
    description: '',
    name: '',
    privileges: PRIVILLAGE,
  });


  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: formModel
  });

  const addRole = useMutation({
    mutationFn: async (role: any) => {
      const res = await api.post(`/${API_PATH().role.add}`, role);
      return res.data;
    },
    onSuccess: () => {
      // Setelah sukses, refetch data agar data terbaru muncul
      refetch()
      onClose()
    },
  });

  const editRole = useMutation({
    mutationFn: async (role: any) => {
      const res = await api.put(`/${API_PATH().role.update}`, role);
      return res.data;
    },
    onSuccess: () => {
      // Setelah sukses, refetch data agar data terbaru muncul
      refetch()
      if(idRole) router.replace('/administrator/role')
      onClose()
    },
  });

  const getDataRole = useQuery({
    queryKey: ["role", idRole],
    queryFn: async () => {
      const { data } = await api.get(
        `/${API_PATH().role.getOne}`,
        {params: {id: idRole}}
      );

      for (const [key, value] of Object.entries(data?.data)) {
        if(formModel.hasOwnProperty(key)) {
          setValue(key, value)
        }
      }

      return data;
    },
    enabled: !!idRole
  });

  const handleSubmitForm = (data: any) => {
    if(idRole) {
      const dataRole = {
        _id: getDataRole.data?.data?._id,
        ...data
      }
      editRole.mutate(dataRole)
    } else {
      addRole.mutate(data)
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit(handleSubmitForm)}>
        <ModalHeader>{modalProps.title}</ModalHeader>
        <ModalBody>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="col-span-2">
              <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
              <input {...register('name')} type="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Masukkan name" required />
            </div>
            <div className="col-span-2">
              <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
              <textarea {...register('description')} id="description" rows={4} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Masukkan deskripsi role"></textarea>
            </div>
            <div className="col-span-2">
              <label htmlFor="privileges" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Privileges</label>
              <div className="flex flex-col gap-2">
                {PRIVILLAGE.map((item, index) => (
                    <div key={index} className="w-full flex justify-between p-2 rounded-lg border dark:border-gray-600">
                      <p className="text-sm">{item.name}</p>
                      <div className="flex gap-2">
                        {Object.keys(item.privillages).map((key, idx) => (
                        <div className="flex items-center" key={idx}>
                          <input {...register(`privileges.${index}.privillages.${key}`)} id={`${item.id}.${key}`} type="checkbox" className="mr-2 rounded text-primary-500 focus:ring-primary-500 dark:focus:ring-primary-500 dark:ring-offset-gray-800 dark:bg-gray-700" />
                          <label htmlFor={`${item.id}.${key}`} className="text-sm">{capitalize(key)}</label>
                        </div>
                        ))}
                      </div>
                    </div>
                ))}
              </div>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <div className="flex justify-between w-full">
            <button onClick={() => {onClose(); if(idRole) router.replace('/administrator/role')}} className="text-white bg-gray-500 hover:bg-gray-600 focus:ring-4 focus:outline-none focus:ring-gray-200 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-gray-500 dark:hover:bg-gray-600 dark:focus:ring-gray-700">Batal</button>
            <button type="submit" className="text-gray-800 bg-primary-500 hover:bg-primary-600 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-primary-500 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Simpan</button>
          </div>
        </ModalFooter>
      </form>
    </>
  )
}