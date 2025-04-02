import { API_PATH } from "@/services/_path.service";
import api from "@/services/api.service";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ModalBody, ModalFooter, ModalHeader } from "flowbite-react";
import { orderBy } from "lodash";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

interface IFormDataUser {
  onClose: () => void
  modalProps?: any
  refetch: () => void
}
export default function FormDataUser({ onClose, modalProps, refetch }: IFormDataUser) {
  const searchParams = useSearchParams()
  const router = useRouter()
  const idUser = searchParams.get('id')
  const schema = yup.object().shape({
    email: yup.string().required('Email is required'),
    fullname: yup.string().required('Fullname is required'),
    password: yup.string().required('Password is required'),
    roleId: yup.string(),
    status: yup.string().required('Status is required'),
    username: yup.string().required('Username is required'),
  });

  const [formModel] = useState<any>({
    email: '',
    fullname: '',
    password: '',
    roleId: '',
    status: '',
    username: ''
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

  const addUser = useMutation({
    mutationFn: async (user: any) => {
      const res = await api.post(`/${API_PATH().user.add}`, user);
      return res.data;
    },
    onSuccess: () => {
      // Setelah sukses, refetch data agar data terbaru muncul
      refetch()
      onClose()
    },
  });

  const editUser = useMutation({
    mutationFn: async (user: any) => {
      const res = await api.put(`/${API_PATH().user.update}`, user);
      return res.data;
    },
    onSuccess: () => {
      // Setelah sukses, refetch data agar data terbaru muncul
      refetch()
      if(idUser) router.replace('/administrator/user-management')
      onClose()
    },
  });

  const getDataUser = useQuery({
    queryKey: ["user", idUser],
    queryFn: async () => {
      const { data } = await api.get(
        `/${API_PATH().user.getOne}`,
        {params: {id: idUser}}
      );

      for (const [key, value] of Object.entries(data?.data)) {
        if(formModel.hasOwnProperty(key)) {
          setValue(key, value)
        }
      }

      return data;
    },
    enabled: !!idUser
  });

  const getAllRole = useQuery({
    queryKey: ["roles"],
    queryFn: async () => {
        const { data } = await api.post(
            `/${API_PATH().role.getAll}`,
            {
                page: 1,
                size: 100,
                orderBy: "createdAt",
                order: "ASC"
            }
        );
        return data;
    },
});

  const handleSubmitForm = (data: any) => {
    if(idUser) {
      const dataUser = {
        _id: getDataUser.data?.data?._id,
        ...data,
        password: undefined
      }
      editUser.mutate(dataUser)
    } else {
      addUser.mutate(data)
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit(handleSubmitForm)}>
        <ModalHeader>{modalProps.title}</ModalHeader>
        <ModalBody>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="col-span-2">
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
              <input {...register('email')} type="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Masukkan email" required />
            </div>
            <div className="col-span-2">
              <label htmlFor="fullname" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nama Lengkap</label>
              <input {...register('fullname')} type="text" id="fullname" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Masukkan fullname" required />
            </div>
            <div className="col-span-2">
              <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
              <input {...register('username')} type="text" id="username" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Masukkan username" required />
            </div>
            {!idUser && (
              <div className="col-span-2">
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                <input {...register('password')} type="password" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Masukkan password" required />
              </div>
            )}
            <div className="col-span-2">
              <label htmlFor="roleId" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Role</label>
              <select {...register('roleId')} id="roleId" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                <option value="">-- Pilih Role --</option>
                {getAllRole.data?.data.map((role: any) => (
                  <option key={role._id} value={role._id}>{role.name}</option>
                ))}
              </select>
            </div>
            <div className="col-span-2">
              <label htmlFor="status" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Status</label>
              <select {...register('status')} id="status" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                <option value="">-- Pilih Status --</option>
                <option value="active">Aktif</option>
                <option value="inactive">Tidak Aktif</option>
              </select>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <div className="flex justify-between w-full">
            <button onClick={() => {onClose(); if(idUser) router.replace('/administrator/user-management')}} className="text-white bg-gray-500 hover:bg-gray-600 focus:ring-4 focus:outline-none focus:ring-gray-200 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-gray-500 dark:hover:bg-gray-600 dark:focus:ring-gray-700">Batal</button>
            <button type="submit" className="text-gray-800 bg-primary-500 hover:bg-primary-600 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-primary-500 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Simpan</button>
          </div>
        </ModalFooter>
      </form>
    </>
  )
}