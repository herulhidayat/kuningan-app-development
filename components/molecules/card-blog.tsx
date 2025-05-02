"use client";

import { Dropdown, DropdownItem, Modal, ModalBody, ModalFooter, ModalHeader, Progress } from "flowbite-react";
import moment from "moment";
import Image from "next/image";
import MoreIcon from "../ui/icons/MoreIcon";
import { useState } from "react";
import EditIcon from "../ui/icons/EditIcon";
import TrashIcon from "../ui/icons/TrashIcon";
import WorksPage from "../pages/formpage-works";

interface CardBlogProps {
  item: any;
  isLoggedin: boolean;
  access: any;
  router: any;
  callbackDelete: (id: any) => void;
  refresh: () => void
}
export default function CardBlog({ item, isLoggedin, access, router, callbackDelete, refresh }: CardBlogProps) {
  const [showAction, setShowAction] = useState<boolean>(false)
  const [modalConfirm, setModalConfirm] = useState<any>({
    title: "",
    show: false,
    message: "",
    subMessage: "",
    data: {}
  });
  const [modal, setModal] = useState<any>({
    title: "",
    show: false,
  });

  const progressBarTheme = {
    "base": "w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700",
    "label": "mb-1 flex justify-between font-medium dark:text-white",
    "bar": "space-x-2 rounded-full text-center font-medium leading-none text-primary-300 dark:text-primary-100",
    "color": {
      "default": "bg-primary-600",
    },
    "size": {
      "sm": "h-1.5",
      "md": "h-2.5",
      "lg": "h-4",
      "xl": "h-6"
    }
  } 

  return(
    <>
      <div className="flex flex-row gap-5 relative cursor-pointer" onMouseEnter={() => setShowAction(true)} onMouseLeave={() => setShowAction(false)}>
        <Image src={item?.image_cover ? `https://srv602602.hstgr.cloud:9088/blog${item?.image_cover}` : "/img/placeholder-img.svg"} alt="post-1" width={150} height={150} className="object-cover rounded-lg w-[150px] h-[150px]" />
        <div className="flex flex-col justify-center items-start w-full" onClick={() => router.push(`/seratus-hari-kerja/${item?._id}`)}>
          {/* {moment().diff(moment(item?.createdAt), 'days') < 7 &&
            <p className="text-sm font-medium text-primary-500">New</p>
          } */}
          <h3 className="text-lg font-semibold max-lines-2" title={item?.judul}>{item?.judul}</h3>
          <p className="text-sm font-medium text-gray-700 max-lines-1" title={`${item?.author} • ${moment(item?.createdAt).format("DD MMMM YYYY")}`}>{item?.author} • {moment(item?.createdAt).format("DD MMMM YYYY")}</p>
          <p className="text-sm font-normal text-gray-500 max-lines-2">{item?.content?.replace(/<[^>]*>/g, '')}</p>
          {/* <div className="flex gap-6 w-full items-center mt-2">
            <div className="flex-grow">
              <Progress progress={item?.progress || 0} theme={progressBarTheme} color="default" />
            </div>
            <p className="text-sm font-medium text-gray-500">{item?.progress || 0}%</p>
          </div> */}
        </div>
        <div className="absolute top-0 right-0">
          {showAction && isLoggedin && (access?.privillages?.update || access?.privillages?.delete) && (
            <Dropdown
              label=""
              dismissOnClick={false}
              renderTrigger={() =>
                <div className='text-gray-500 cursor-pointer hover:text-gray-700 px-3'>
                  <MoreIcon />
                </div>
              }>
              {access?.privillages?.update &&
                // <DropdownItem className='flex items-center gap-2' onClick={() => router.push(`/seratus-hari-kerja/edit/${item?._id}`)}><div className='text-blue-500'><EditIcon /></div> Ubah</DropdownItem>
                <DropdownItem className='flex items-center gap-2' onClick={() => {router.replace(`/?id=${item?._id}`); setModal((prev: any) => ({ ...prev, title: "Ubah Program Kerja", show: true}))}}><div className='text-blue-500'><EditIcon /></div> Ubah</DropdownItem>
              }
              {access?.privillages?.delete &&
                <DropdownItem className='flex items-center gap-2' onClick={() => setModalConfirm((prev: any) => ({ ...prev, title: "Hapus Postingan", message: "Apakah Anda yakin ingin menghapus postingan ini?", show: true, subMessage: "Data yang telah dihapus tidak dapat dikembalikan", data: { _id: item?._id } }))}><div className='text-red-500'><TrashIcon /></div> Hapus</DropdownItem>
              }
            </Dropdown>
          )}
        </div>
      </div>

      <Modal show={modal.show} position="center" onClose={() => {setModal((prev: any) => ({ ...prev, show: false }));router.replace('/')}}>
        <ModalHeader>{modal.title}</ModalHeader>
        <ModalBody>
          <WorksPage closeModal={() => setModal((prev: any) => ({ ...prev, show: false }))} refresh={refresh} />
        </ModalBody>
      </Modal>
    
      <Modal show={modalConfirm.show} position="center" onClose={() => setModalConfirm((prev:any) => ({...prev, show: false}))}>
        <ModalHeader>{modalConfirm.title}</ModalHeader>
        <ModalBody>
            <div className="flex flex-col justify-center items-center gap-3">
                <Image src="/img/remove.png" alt="success" width={300} height={300} className="object-cover" />
                <p className="text-lg font-semibold leading-relaxed text-center text-gray-800 dark:text-white">
                    {modalConfirm.message}
                </p>
                <p className="text-base text-center text-gray-500 dark:text-gray-400">{modalConfirm.subMessage}</p>
            </div>
        </ModalBody>
        <ModalFooter>
            <div className="flex justify-between w-full">
                <button onClick={() => setModalConfirm((prev:any) => ({...prev, show: false}))} className="text-white bg-gray-500 hover:bg-gray-600 focus:ring-4 focus:outline-none focus:ring-gray-200 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-gray-500 dark:hover:bg-gray-600 dark:focus:ring-gray-700">Batal</button>
                <button onClick={() => {callbackDelete(modalConfirm.data._id);setModalConfirm((prev:any) => ({...prev, show: false}))}} className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">Hapus</button>
            </div>
        </ModalFooter>
      </Modal>
    </>
  )
}