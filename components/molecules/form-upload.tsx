import UploadIcon from "../ui/icons/UploadIcon";

export default function FormUpload() {
    return(
        <div className="cursor-pointer h-32 w-full rounded-lg border-dashed border-2 border-emerald-500 bg-emerald-50 text-sm font-normal flex justify-center items-center">
            <div className="flex gap-3 justify-center items-center">
                <div className="text-emerald-500">
                    <UploadIcon />
                </div>
                <div className="flex flex-col gap-1">
                    <span>Geser File mu Disini atau</span>
                    <span className="text-emerald-500 font-medium">Cari</span>
                    <span className="text-gray-500">.xlsx dan .csv</span>
                </div>
            </div>
        </div>
    )
}