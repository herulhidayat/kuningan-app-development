"use client"
import { Poppins } from "next/font/google";
import SearchBarRounded from "../atoms/search-bar-rounded";
import Image from "next/image";
import { useState } from "react";
import Pagination from "./pagination";
import Cookies from "js-cookie";
import { getItem } from "@/helpers/localstorage.helper";
import { useRouter } from "next/navigation";
import { Dropdown, DropdownItem } from "flowbite-react";
import MoreIcon from "../ui/icons/MoreIcon";
import EditIcon from "../ui/icons/EditIcon";
import TrashIcon from "../ui/icons/TrashIcon";

const poppins = Poppins({ subsets: ['latin'], weight: ['700'] })
export default function PostCatalog() {
    const isLoggedin = Cookies.get("authToken");
    const access = getItem("user")?.privileges?.find((item: any) => item.id === 'seratus-hari-kerja')
    const router = useRouter()

    const [showAction, setShowAction] = useState<number | null>(null)
    const [modalConfirm, setModalConfirm] = useState<any>({
        title: "",
        show: false,
        message: "",
        subMessage: "",
        data: {}
    });

    const [pagination, setPagination] = useState({
        currentPage: 1,
        itemsPerPage: 10,
        count: 9,
    });
    return(
        <>
            <div className="flex flex-col items-center gap-6 md:px-4.5 w-full max-w-screen-2xl px-3 lg:px-6">
                <h1 className="font-bold text-xl text-center">Program 100 hari kerja Bupati dan Wakil Bupati Kabupaten Kuningan</h1>
                <SearchBarRounded placeholder="Cari..." callbackSearch={(v) => console.log(v)} className="md:w-96" />
                {(isLoggedin && access?.privillages?.add) && (
                    <button onClick={() => router.push("/seratus-hari-kerja/add")} className="text-gray-800 bg-primary-500 hover:bg-primary-600 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm w-[10rem] px-5 py-2.5 text-center dark:bg-primary-500 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Tambah Postingan</button>
                )}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:gap-6 lg:gap-10 mt-6">
                    {Array.from({ length: 9 }).map((_, index) => (
                        <div className="flex flex-row gap-5 relative cursor-pointer" key={index} onClick={() => router.push(`/seratus-hari-kerja/${index}`)} onMouseEnter={() => setShowAction(index)} onMouseLeave={() => setShowAction(null)}>
                            <Image src="/img/placeholder-img.svg" alt="post-1" width={150} height={150} className="object-cover rounded-lg w-[150px] h-[150px]"/>
                            <div className="flex flex-col justify-center items-start">
                                <p className="text-sm font-medium text-primary-500">New</p>
                                <h3 className="text-lg font-semibold max-lines-2">Lorem ipsum dolor sit amet consectetur adipisicing elit.</h3>
                                <p className="text-sm font-medium text-gray-700">John Doe • 12 Januari 2025</p>
                                <p className="text-sm font-normal text-gray-500 max-lines-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quae.</p>
                            </div>
                            <div className="absolute top-2 right-2">
                                {(showAction === index) && isLoggedin && (access?.privillages?.edit || access?.privillages?.delete) && (
                                    <Dropdown 
                                    label="" 
                                    dismissOnClick={false} 
                                    renderTrigger={() => 
                                        <div className='text-gray-500 cursor-pointer'>
                                        <MoreIcon />
                                        </div>
                                    }>
                                        {access?.privillages?.update &&
                                        <DropdownItem className='flex items-center gap-2' onClick={() => router.push(`/seratus-hari-kerja/edit/${index}`)}><div className='text-blue-500'><EditIcon /></div> Ubah</DropdownItem>
                                        }
                                        {access?.privillages?.delete &&
                                        <DropdownItem className='flex items-center gap-2' onClick={() => setModalConfirm((prev:any) => ({...prev, title: "Hapus Dataset", message: "Apakah Anda yakin ingin menghapus dataset ini?", show: true, subMessage: "Dataset yang telah dihapus tidak dapat dikembalikan", data: {_id: index}}))}><div className='text-red-500'><TrashIcon /></div> Hapus</DropdownItem>
                                        }
                                    </Dropdown>
                                )}
                            </div>
                        </div>    
                    ))}
                </div>
                <Pagination
                    itemsPerPage={pagination.itemsPerPage}
                    totalItems={pagination.count}
                    currentPage={pagination.currentPage}
                    setPagination={setPagination}
                />
            </div>
        </>
    )
}