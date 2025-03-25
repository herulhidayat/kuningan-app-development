"use client"

import SuccessMessage from "@/components/atoms/success-message"
import FormDataInformasiDataset from "@/components/organisms/form-data-informasi-dataset"
import FormDataInputDataset from "@/components/organisms/form-data-input-dataset"
import FormDataKonfigurasiDataset from "@/components/organisms/form-data-konfigurasi-dataset"
import Hero from "@/components/organisms/hero"
import StepFrom from "@/components/organisms/step-from"
import { yupResolver } from "@hookform/resolvers/yup"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import * as yup from "yup";

function AddDataset() {
	const router = useRouter()
	const [currentStep, setCurrentStep] = useState<number>(1)
	const step = ["Infomasi Data", "Konfigurasi Data", "Masukkan Data", "Selesai"]

  const [dataMain, setDataMain] = useState<any>({
    generalInfo: {}
  });


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
								callbackNext={() => setCurrentStep(2)}
								data={dataMain.generalInfo}
								setData={(data: any) => setDataMain((prev: any) => ({ ...prev, generalInfo: data }))}
							/>
						)}
						{currentStep === 2 && (
							<FormDataKonfigurasiDataset
								callbackNext={() => setCurrentStep(3)}
								callbackBack={() => setCurrentStep(1)}
							/>
						)}
						{currentStep === 3 && (
							<FormDataInputDataset
								callbackNext={() => setCurrentStep(4)}
								callbackBack={() => setCurrentStep(2)}
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

export default AddDataset