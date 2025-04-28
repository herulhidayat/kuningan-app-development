'use client'

import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import FormUploadImage from "../molecules/form-upload-image";
// import { RangeSlider } from "flowbite-react";

interface FormDataPostProps {
  data?: any
  callbackData?: (data: any) => void
  closeModal: () => void
}

export default function FormDataProgress({
  data,
  callbackData,
  closeModal
}: FormDataPostProps) {
  const router = useRouter()
  const schema = yup.object().shape({
    program_name: yup.string().required('Judul is required'),
    image: yup.string(),
    progress: yup.number(),
    description: yup.string(),
    target: yup.string(),
  });

  const [formModel] = useState<any>({
    program_name: "",
    image: "",
    progress: 0,
    description: "",
    target: "",
  });


  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: formModel
  });

  const handleSubmitForm = (dataForm: any) => {
    if (callbackData && dataForm) {
      if (data) {
        const newData = {
          ...data,
          ...dataForm
        }
        callbackData(newData)
      } else {
        callbackData(dataForm)
      }
    }
  }

  useEffect(() => {
    if (data?.item) {
      for (const [key, value] of Object.entries(data?.item)) {
        if (formModel.hasOwnProperty(key)) {
          setValue(key, value)
        }
      }
    }
  }, [data?.item])

  return (
    <>
          <form onSubmit={handleSubmit(handleSubmitForm)}>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="col-span-2">
                <label htmlFor="program_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nama Program</label>
                <input {...register('program_name')} type="" id="program_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Masukkan nama program" required />
              </div>
              <div className="col-span-2">
                <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Deskripsi</label>
                <textarea {...register('description')} id="description" rows={4} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Masukkan deskripsi dataset"></textarea>
              </div>
              <div className="col-span-2">
                <label htmlFor="target" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Sasaran</label>
                <input {...register('target')} type="" id="target" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Masukkan sasaran" />
              </div>
              <div className="col-span-2">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Gambar</label>
                <FormUploadImage callback={(data: any) => setValue('image', data)}/>
              </div>
            </div>
            <div className="flex justify-between">
              <button type="button" onClick={() => closeModal()} className="text-white bg-gray-500 hover:bg-gray-600 focus:ring-4 focus:outline-none focus:ring-gray-200 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-gray-500 dark:hover:bg-gray-600 dark:focus:ring-gray-700">Batal</button>
              <button type="submit" className="text-gray-800 bg-primary-500 hover:bg-primary-600 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-primary-500 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Simpan</button>
            </div>
          </form>
    </>
  )
}