interface StepFromProps {
    stepData: string[]
    currentStep: number
}
export default function StepFrom({stepData, currentStep}: StepFromProps) {
    return (
        <>
            <div className="flex justify-between w-full gap-4">
                {stepData.map((step: string, index: number) => (
                    <div key={index} className={`flex items-center ${index !== stepData.length - 1 && "w-full"}`}>
                        <div className={`flex h-8 w-8 items-center justify-center rounded-full border-zinc-300 ${index < currentStep ? "bg-emerald-600" : "bg-gray-500"} text-sm font-semibold text-white`}>
                            {index + 1}
                        </div>
                        <span className={`ml-4 text-sm font-semibold ${index < currentStep ? "text-black dark:text-white" : "text-gray-500"}`}>{step}</span>
                        {index !== stepData.length - 1 && (
                            <div className="ml-4 flex flex-1 items-center">
                                <div className={`h-px w-full ${index < currentStep ? "bg-emerald-600" : "bg-gray-500"}`} />
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </>
    )
}