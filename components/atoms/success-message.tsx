import Image from "next/image";

export default function SuccessMessage() {
    return(
        <>
            <div className="flex flex-col justify-center items-center gap-5">
                <Image src="/img/success.png" alt="success" width={300} height={300} className="object-cover" />
                <div className="flex flex-col gap-2 text-center">
                    <span className="text-2xl font-medium">Data Berhasil Ditambah!</span>
                    <span className="text-lg text-gray-500">Data Berhasil Ditambah, klik tombol selesai untuk kembali ke Halaman Entry Data</span>
                </div>
            </div>
        </>
    )
}