import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

interface FormDataInformasiDatasetProps {
  data: any
  callbackNext: (data: any) => void
}

export default function FormDataInformasiDataset({
  data,
  callbackNext
}: FormDataInformasiDatasetProps) {
  const router = useRouter()
  const schema = yup.object().shape({
    author: yup.string().required('Author is required'),
    data_name: yup.string().required('Data Name is required'),
    category: yup.string().required('Category is required'),
    data_source: yup.string().required('Data Source is required'),
    data_description: yup.string().required('Data Description is required'),
  });

  const [formModel] = useState<any>({
    author: "",
    data_name: "",
    category: "",
    data_source: "",
    data_description: "",
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
  
  const handleSubmitForm = (data: any) => {
    callbackNext(data)
  }

  useEffect(() => {
    if (data) {
      for (const [key, value] of Object.entries(data)) {
        if(formModel.hasOwnProperty(key)) {
          setValue(key, value)
        }
      }
    }
  }, [data])

  return (
    <>
      <div className="flex items-center justify-center">
        <div className="w-1/2 max-md:w-full">
          <form onSubmit={handleSubmit(handleSubmitForm)}>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="col-span-2">
                <label htmlFor="author" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Author</label>
                <input {...register('author')} type="" id="author" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-emerald-500 focus:border-emerald-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-emerald-500 dark:focus:border-emerald-500" placeholder="Masukkan author" required />
              </div>
              <div className="col-span-2">
                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nama Dataset</label>
                <input {...register('data_name')} type="" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-emerald-500 focus:border-emerald-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-emerald-500 dark:focus:border-emerald-500" placeholder="Masukkan nama dataset" required />
              </div>
              <div className="col-span-1">
                <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Kategori Data</label>
                <input {...register('category')} type="" id="category" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-emerald-500 focus:border-emerald-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-emerald-500 dark:focus:border-emerald-500" placeholder="Masukkan kategori data" required />
              </div>
              <div className="col-span-1">
                <label htmlFor="source" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Sumber Data</label>
                <input {...register('data_source')} type="" id="source" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-emerald-500 focus:border-emerald-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-emerald-500 dark:focus:border-emerald-500" placeholder="Masukkan sumber data" required />
              </div>
              <div className="col-span-2">
                <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Deksripsi</label>
                <textarea {...register('data_description')} id="message" rows={4} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-emerald-500 dark:focus:border-emerald-500" placeholder="Masukkan deskripsi dataset"></textarea>
              </div>
            </div>
            <div className="flex justify-between">
              <button onClick={() => router.push('/datasets')} className="text-white bg-gray-500 hover:bg-gray-600 focus:ring-4 focus:outline-none focus:ring-gray-200 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-gray-500 dark:hover:bg-gray-600 dark:focus:ring-gray-700">Cancel</button>
              <button type="submit" className="text-white bg-emerald-600 hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800">Next</button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}