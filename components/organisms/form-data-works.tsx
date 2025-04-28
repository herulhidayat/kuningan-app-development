'use client'

import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import FormUploadImage from "../molecules/form-upload-image";
import TextEditor from "../molecules/text-editor";
// import { RangeSlider } from "flowbite-react";

interface FormDataPostProps {
  data?: any
  callbackData?: (data: any) => void
  closeModal: () => void
}

export default function FormDataWorks({
  data,
  callbackData,
  closeModal
}: FormDataPostProps) {
  const router = useRouter()
  const schema = yup.object().shape({
    author: yup.string(),
    judul: yup.string().required('Judul is required'),
    image_cover: yup.string(),
    progress: yup.number(),
    content: yup.string(),
  });

  const [formModel] = useState<any>({
    author: "",
    judul: "",
    image_cover: "",
    progress: 0,
    content: "",
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
    if (data) {
      for (const [key, value] of Object.entries(data)) {
        if (formModel.hasOwnProperty(key)) {
          setValue(key, value)
        }
      }
    }
  }, [data])

  const callbackTextEditor = useCallback((data: any) => {
    setValue('content', data)
  }, [])

  return (
    <>
          <form onSubmit={handleSubmit(handleSubmitForm)}>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="col-span-2">
                <label htmlFor="judul" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Judul Program</label>
                <input {...register('judul')} type="" id="judul" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Masukkan judul" required />
              </div>
              <div className="col-span-2">
                <label htmlFor="author" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Author</label>
                <input {...register('author')} type="" id="author" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Masukkan author" />
              </div>
              <div className="col-span-2">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Gambar</label>
                <FormUploadImage callback={(data: any) => setValue('image_cover', data)}/>
              </div>
              <div className="col-span-2">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Konten</label>
                <TextEditor content={data?.content} callbackContent={callbackTextEditor} />
              </div>
            </div>
            <div className="flex justify-between">
              <button type="button" onClick={() => {closeModal()}} className="text-white bg-gray-500 hover:bg-gray-600 focus:ring-4 focus:outline-none focus:ring-gray-200 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-gray-500 dark:hover:bg-gray-600 dark:focus:ring-gray-700">Batal</button>
              <button type="submit" className="text-gray-800 bg-primary-500 hover:bg-primary-600 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-primary-500 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Simpan</button>
            </div>
          </form>
    </>
  )
}