import { useState } from "react";
import DocumentIcon from "../ui/icons/DocumentIcon";
import ScrollIcon from "../ui/icons/ScrollIcon";
import FormDataField from "../molecules/form-data-field";
import UploadIcon from "../ui/icons/UploadIcon";
import FormUpload from "../molecules/form-upload";

interface IFormDataKonfig {
    callbackNext: () => void
    callbackBack: () => void
}
export default function FormDataKonfigurasiDataset({ callbackNext, callbackBack }:IFormDataKonfig) {
    const [type, setType] = useState<"table" | "file">()
    return(
        <>
            <div className="flex items-center justify-center">
                <div className="w-1/2 max-md:w-full flex flex-col gap-8">
                    <div className="flex gap-5 w-full mt-8">
                        <div onClick={() => setType("table")} className={`${type === "table" ? "border-emerald-500 bg-emerald-50" : "border-gray-300 dark:border-gray-800"} border hover:border-emerald-600 transition duration-300 ease-in-out rounded-xl p-4 w-full`}>
                            <div className="flex gap-4">
                                <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                                    <ScrollIcon />
                                </div>
                                <div className="flex flex-col gap-1">
                                    <span className="text-sm">Buat Tabel Data</span>
                                    <span className="text-xs text-gray-500 dark:text-gray-400">Memasukkan data dengan membuat table dan mengedit tabel.</span>
                                </div>
                            </div>
                        </div>
                        <div onClick={() => setType("file")} className={`${type === "file" ? "border-emerald-500 bg-emerald-50" : "border-gray-300 dark:border-gray-800"} border hover:border-emerald-600 transition duration-300 ease-in-out rounded-xl p-4 w-full`}>
                            <div className="flex gap-4">
                                <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                                    <DocumentIcon />
                                </div>
                                <div className="flex flex-col gap-1">
                                    <span className="text-sm">Upload File</span>
                                    <span className="text-xs text-gray-500 dark:text-gray-400">Memasukkan data dengan cara upload file Excel atau CSV.</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    {type === 'table' && (
                        <div className="flex flex-col gap-4">
                            <div className="flex flex-col gap-2">
                                <FormDataField />
                            </div>
                            <div className="cursor-pointer w-full h-10 rounded-lg border-dashed border border-emerald-500 bg-emerald-50 text-emerald-500 text-sm font-medium flex justify-center items-center">Tambah Kolom</div>
                        </div>
                    )}
                    {type === 'file' && (
                        <FormUpload />
                    )}
                    <div className="flex justify-between">
                        <button onClick={() => callbackBack()} className="text-white bg-gray-500 hover:bg-gray-600 focus:ring-4 focus:outline-none focus:ring-gray-200 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-gray-500 dark:hover:bg-gray-600 dark:focus:ring-gray-700">Back</button>
                        <button onClick={() => callbackNext()} className="text-white bg-emerald-600 hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800">Next</button>
                    </div>
                </div>
            </div>

        </>
    )
}