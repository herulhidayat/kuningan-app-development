"use client"

import SuccessMessage from "@/components/atoms/success-message"
import FormDataInformasiDataset from "@/components/organisms/form-data-informasi-dataset"
import FormDataInputDataset from "@/components/organisms/form-data-input-dataset"
import FormDataKonfigurasiDataset from "@/components/organisms/form-data-konfigurasi-dataset"
import Hero from "@/components/organisms/hero"
import StepFrom from "@/components/organisms/step-from"
import { API_PATH } from "@/services/_path.service"
import api from "@/services/api.service"
import { QueryClient, QueryClientProvider, useMutation, useQuery } from "@tanstack/react-query"
import { useParams, useRouter } from "next/navigation"
import { use, useCallback, useEffect, useState } from "react"

function FormDataset() {
	const router = useRouter()
    const params = useParams();

	const [currentStep, setCurrentStep] = useState<number>(1)
	const step = ["Infomasi Data", "Konfigurasi Data", "Masukkan Data", "Selesai"]

  const [dataMain, setDataMain] = useState<any>({});

  const mutation = useMutation({
    mutationFn: async (dataset: any) => {
      const res = await api.put(`/${API_PATH().dataset.update}`, dataset);
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

  const dataLists = useQuery({
    queryKey: ["datasets", "detail"],
    queryFn: async () => {
      const response = await api.get(
        `/${API_PATH().dataset.getOne}`,
        {params: {id: params.id}}
      );
      return response.data;
    },
  });

  useEffect(() => {
    if(dataLists.data) {
        setDataMain(dataLists.data?.data);
    }
  }, [dataLists.data])

  const handleSaveData = () => {
	mutation.mutate(dataMain);
  }


	return (
		<>
			<Hero
        title="Edit Dataset"
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
										<button onClick={() => router.push('/datasets')} className="text-gray-800 bg-primary-500 hover:bg-primary-600 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-primary-500 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Finish</button>
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