"use client"

import SuccessMessage from "@/components/atoms/success-message"
import FormDataInformasiDataset from "@/components/organisms/form-data-informasi-dataset"
import FormDataInputDataset from "@/components/organisms/form-data-input-dataset"
import FormDataKonfigurasiDataset from "@/components/organisms/form-data-konfigurasi-dataset"
import Hero from "@/components/organisms/hero"
import StepFrom from "@/components/organisms/step-from"
import { API_PATH } from "@/services/_path.service"
import api from "@/services/api.service"
import { yupResolver } from "@hookform/resolvers/yup"
import { QueryClient, QueryClientProvider, useMutation } from "@tanstack/react-query"
import axios from "axios"
import { useRouter } from "next/navigation"
import { use, useCallback, useState } from "react"
import { useForm } from "react-hook-form"
import * as yup from "yup";

function FormDataset() {
	const router = useRouter()
	const [currentStep, setCurrentStep] = useState<number>(1)
	const step = ["Infomasi Data", "Konfigurasi Data", "Masukkan Data", "Selesai"]

  const [dataMain, setDataMain] = useState<any>({});

  const mutation = useMutation({
    mutationFn: async (dataset: any) => {
      const res = await api.post(`/${API_PATH().dataset.add}`, dataset);
      return res.data;
    },
    onSuccess: () => {
      // Setelah sukses, refetch data agar data terbaru muncul
	  setCurrentStep(4)
    },
  });

  const handleCallbackFormConfig = useCallback((data: any, next: number) => {
	setDataMain((prev: any) => ({ ...prev, ...data }));
	setCurrentStep(next);
  }, []);

  const handleCallbackRow = useCallback((data: any) => {
	if(data?.isEdit) {
		setDataMain((prev: any) => ({ 
			...prev, 
			value_row: prev?.value_row.map((item: any, i: number) => i === data?.dataIndex ? data?.row : item) 
		}));
	} else {
		setDataMain((prev: any) => ({ 
			...prev, 
			value_row: Boolean(prev?.value_row) ? [...prev?.value_row, data?.row] : [data?.row]
		}));
	}
  }, []);

  const handleSaveData = () => {
	mutation.mutate(dataMain);
  }


	return (
		<>
			<Hero
        title="Input Dataset"
        description="Harap lengkapi data langkah demi langkah"
      />

			<div className="flex flex-col h-full w-full items-center">
				<div className="md:px-4.5 dark:divide-washed-dark h-full w-full max-w-screen-2xl px-3 lg:px-6">
					<div className="flex flex-col gap-4 py-10">
						<StepFrom stepData={step} currentStep={currentStep} />
						{currentStep === 1 && (
							<FormDataInformasiDataset
								data={dataMain}
								callbackNext={(data: any) => handleCallbackFormConfig(data, 2)}
							/>
						)}
						{currentStep === 2 && (
							<FormDataKonfigurasiDataset
								data={dataMain}
								callbackNext={(data: any) => handleCallbackFormConfig(data, 3)}
								callbackBack={() => setCurrentStep(1)}
							/>
						)}
						{currentStep === 3 && (
							<FormDataInputDataset
								data={dataMain}
								callbackNext={() => handleSaveData()}
								callbackBack={() => setCurrentStep(2)}
								callbackData={handleCallbackRow}
							/>
						)}
						{currentStep === 4 && (
							<>
								<div className="mt-8 flex flex-col gap-5">
									<SuccessMessage />
									<div className="flex justify-center">
										<button onClick={() => router.push('/datasets')} className="text-white bg-emerald-600 hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800">Finish</button>
									</div>
								</div>
							</>
						)}
					</div>
				</div>
			</div>
		</>
	)
}

const queryClient = new QueryClient();

export default function AddDataset() {
  return (
    <QueryClientProvider client={queryClient}>
      <FormDataset />
    </QueryClientProvider>
  );
}