'use client';

import { deleteItem, getItem, setItem } from "@/helpers/localstorage.helper";
import { API_PATH } from "@/services/_path.service";
import api from "@/services/api.service";
import { yupResolver } from "@hookform/resolvers/yup";
import { QueryClient, QueryClientProvider, useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import Cookies from "js-cookie";
import { Poppins } from "next/font/google";
import { CursorArrowRaysIcon, EyeIcon, EyeSlashIcon } from "@heroicons/react/20/solid";
import Image from "next/image";


const poppins = Poppins({ subsets: ['latin'], weight: ['400', '500', '600', '700', '800', '900'] })

function LoginPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const redirectUrl = searchParams.get('redirect')
  const schema = yup.object().shape({
    username: yup.string().required('Username is required'),
    password: yup.string().required("Password is required"),
    // remeberMe: yup.boolean()
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const [formModel] = useState<any>({
    username: "",
    password: "",
    // remeberMe: false
  });


  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: formModel
  });

  const mutation = useMutation({
    mutationFn: async (newDataset: { username: string; password: string }) => {
      const { data } = await axios.post(`api/${API_PATH().auth.login}`, newDataset);
      setItem('token', data.auth)
      setItem('user', data.user)
      return data;
    },
    onSuccess: (data) => {
      const expirationDate = new Date(data?.auth?.expire);
      Cookies.set("authToken", data?.auth?.token, { expires: expirationDate });
      router.push(redirectUrl || '/')
    },
    onError: (error: any) => {
      setErrorMessage(error.response.data.message);
    }
  });

  // Handle form submission
  const handleSubmitForm = (data: { username: string; password: string }) => {
    mutation.mutate(data);
  };

  useEffect(() => {
    if(getItem('token')) {
      deleteItem('token')
    } 
    if(getItem('user')) {
      deleteItem('user')
    }
  }, [])

  return (
    <>
      <div className="w-full flex flex-1 justify-center items-center">
        <div className="border border-gray-300 dark:border-gray-800 rounded-xl p-8 w-[25rem] flex flex-col items-center gap-8">
          <div className="flex flex-col gap-2 justify-center items-center w-[15rem]">
            <div className="flex gap-2 mb-5">
              {/* <div className="flex w-8 items-center justify-center text-primary-600">
                <CursorArrowRaysIcon />
              </div>
              <div className='flex flex-col gap-0 justify-center'>
                <h4 className={`${poppins.className} text-lg/5 font-semibold`}>Bidak</h4>
                <h5 className={`${poppins.className} text-xs/3 font-normal text-gray-500 text-nowrap`}>Big Data Kuningan</h5>
              </div> */}
              <Image src="/logo-bidak.png" alt="logo-bidak" width={120} height={120} />
            </div>
            <h1 className="text-2xl font-medium text-center">Masuk ke Akunmu</h1>
            <h3 className="text-center w-full text-gray-500">selamat datang kembali, silakan masukkan detail Anda</h3>
          </div>
          {mutation.isError && (
            <div className="flex items-center p-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-red-950 dark:text-red-400" role="alert">
              <div>
                <span className="font-medium">Login gagal!</span> {errorMessage}
              </div>
            </div>
          )}
          <form className="w-full" onSubmit={handleSubmit((data) => handleSubmitForm(data))}>
            <div className="mb-5">
              <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
              <input {...register('username')} placeholder="Masukkan username" type="" id="username" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" required />
            </div>
            <div className="mb-5 relative">
              <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
              <input {...register('password')} placeholder="Masukkan password" type={showPassword ? "text" : "password"} id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" required />
              <span className="absolute top-7 inset-y-0 end-0 grid w-10 place-content-center" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <EyeIcon className="w-4 h-4 text-gray-500" /> : <EyeSlashIcon className="w-4 h-4 text-gray-500" />}
              </span>
            </div>
            {/* <div className="flex items-start mb-5">
              <div className="flex items-center h-5">
                <input id="remember" type="checkbox" value="" className="w-4 h-4 border border-gray-300 rounded-sm bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-500 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" required />
              </div>
              <label htmlFor="remember" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Remember me</label>
            </div> */}
            <button type="submit" disabled={mutation.isPending} className="mt-3 text-gray-800 bg-primary-500 hover:bg-primary-600 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm w-full px-5 py-3 text-center dark:bg-primary-500 dark:hover:bg-primary-700 dark:focus:ring-primary-800">{mutation.isPending ? "Loading..." : "Masuk"}</button>
          </form>
        </div>
      </div>
    </>
  )
}

const queryClient = new QueryClient();

export default function Login() {
  return (
    <QueryClientProvider client={queryClient}>
      <Suspense>
        <LoginPage />
      </Suspense>
    </QueryClientProvider>
  );
}