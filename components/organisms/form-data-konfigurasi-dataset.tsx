import { useEffect, useState } from "react";
import DocumentIcon from "../ui/icons/DocumentIcon";
import ScrollIcon from "../ui/icons/ScrollIcon";
import FormDataField from "../molecules/form-data-field";
import UploadIcon from "../ui/icons/UploadIcon";
import FormUpload from "../molecules/form-upload";

interface IFormDataKonfig {
    data: any
    callbackNext: (v:any) => void
    callbackBack: () => void
}
export default function FormDataKonfigurasiDataset({ data, callbackNext, callbackBack }:IFormDataKonfig) {
    const [type, setType] = useState<"table" | "file">()
    const [dataField, setDataField] = useState<any>([]);

    const handleCallbackData = () => {
        const data = {
            column: dataField,
            data_table: type === "table" ? true : false,
            upload_file: type === "file" ? true : false
        }

        callbackNext(data)
    }

    useEffect(() => {
        if (data.column) {
            setDataField(data.column)
        }
        if (data.data_table || data.upload_file) {
            setType(data.data_table || !data.upload_file ? "table" : "file")
        }
    }, [data])
    return(
        <>
            <div className="flex items-center justify-center">
                <div className="w-1/2 max-md:w-full flex flex-col gap-8">
                    <div className="flex gap-5 w-full mt-8">
                        <div onClick={() => setType("table")} className={`${type === "table" ? "border-primary-500 bg-primary-50 dark:bg-primary-950" : "border-gray-300 dark:border-gray-800"} cursor-pointer border hover:border-primary-500 transition duration-300 ease-in-out rounded-xl p-4 w-full`}>
                            <div className="flex gap-4">
                                <div className="w-10 h-10 rounded-full bg-primary-100 text-primary-500 flex items-center justify-center">
                                    <ScrollIcon />
                                </div>
                                <div className="flex flex-col gap-1">
                                    <span className="text-sm">Buat Tabel Data</span>
                                    <span className="text-xs text-gray-500 dark:text-gray-400">Memasukkan data dengan membuat table dan mengedit tabel.</span>
                                </div>
                            </div>
                        </div>
                        <div onClick={() => setType("file")} className={`${type === "file" ? "border-primary-500 bg-primary-50 dark:bg-primary-950" : "border-gray-300 dark:border-gray-800"} cursor-pointer border hover:border-primary-500 transition duration-300 ease-in-out rounded-xl p-4 w-full`}>
                            <div className="flex flex-row gap-4">
                                <div className="w-10 h-10 rounded-full bg-primary-100 text-primary-500 flex items-center justify-center">
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
                        <FormDataField dataField={dataField} setDataField={setDataField} />
                    )}
                    {type === 'file' && (
                        <FormUpload />
                    )}
                    <div className="flex justify-between">
                        <button onClick={() => callbackBack()} className="text-white bg-gray-500 hover:bg-gray-600 focus:ring-4 focus:outline-none focus:ring-gray-200 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-gray-500 dark:hover:bg-gray-600 dark:focus:ring-gray-700">Back</button>
                        <button onClick={handleCallbackData} className="text-gray-800 bg-primary-500 hover:bg-primary-600 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-primary-500 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Next</button>
                    </div>
                </div>
            </div>

        </>
    )
}