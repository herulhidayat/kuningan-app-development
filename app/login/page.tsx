'use client';

import { setItem } from "@/helpers/localstorage.helper";
import { API_PATH } from "@/services/_path.service";
import api from "@/services/api.service";
import { yupResolver } from "@hookform/resolvers/yup";
import { QueryClient, QueryClientProvider, useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import Cookies from "js-cookie";

function LoginPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const redirectUrl = searchParams.get('redirect')
  const schema = yup.object().shape({
    username: yup.string().required('Username is required'),
    password: yup.string().required("Password is required"),
    // remeberMe: yup.boolean()
  });

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
      const { data } = await api.post(`${API_PATH().auth.login}`, newDataset);
      setItem('token', data.auth)
      setItem('user', data.user)
      return data;
    },
    onSuccess: ( data ) => {
      const expirationDate = new Date(data?.auth?.expire);
      Cookies.set("authToken", data?.auth?.token, { expires: expirationDate });
      console.log(data, expirationDate)
      router.push(redirectUrl || '/')
    },
  });

  // Handle form submission
  const handleSubmitForm = (data: { username: string; password: string }) => {
    mutation.mutate(data);
  };

  return(
    <>
      <div className="w-full flex flex-1 justify-center items-center">
        <div className="border border-gray-300 dark:border-gray-800 rounded-xl p-8 w-[30rem] flex flex-col gap-8">
          <h1 className="text-2xl font-bold">Sign In</h1>
          <form onSubmit={handleSubmit((data) => handleSubmitForm(data))}>
            <div className="mb-5">
              <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
              <input {...register('username')} type="" id="username" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-emerald-500 focus:border-emerald-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-emerald-500 dark:focus:border-emerald-500" required />
            </div>
            <div className="mb-5">
              <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
              <input {...register('password')} type="password" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-emerald-500 focus:border-emerald-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-emerald-500 dark:focus:border-emerald-500" required />
            </div>
            {/* <div className="flex items-start mb-5">
              <div className="flex items-center h-5">
                <input id="remember" type="checkbox" value="" className="w-4 h-4 border border-gray-300 rounded-sm bg-gray-50 focus:ring-3 focus:ring-emerald-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-emerald-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" required />
              </div>
              <label htmlFor="remember" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Remember me</label>
            </div> */}
            <button type="submit" disabled={mutation.isPending} className="text-white bg-emerald-600 hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800">{mutation.isPending ? "Loading..." : "Sign In"}</button>
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
      <LoginPage />
    </QueryClientProvider>
  );
}