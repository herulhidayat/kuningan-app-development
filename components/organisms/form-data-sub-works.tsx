'use client'

import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import TextEditor from "../molecules/text-editor";
import { Dropdown, DropdownItem, Modal, ModalBody, ModalFooter, ModalHeader, Progress, RangeSlider } from "flowbite-react";
import Image from "next/image";
import moment from "moment";
import MoreIcon from "../ui/icons/MoreIcon";
import EditIcon from "../ui/icons/EditIcon";
import TrashIcon from "../ui/icons/TrashIcon";
import { debounce, update } from "lodash";
import { on } from "process";
import { callback } from "chart.js/helpers";
import FormDataProgress from "./form-data-progress";
import SearchBarRounded from "../atoms/search-bar-rounded";
import NoResult from "../ui/illustrations/NoResult";
// import { RangeSlider } from "flowbite-react";

interface FormDataPostProps {
  data?: any
  callbackData?: (data: any) => void
}

export default function FormDataSubWorks({
  data,
  callbackData
}: FormDataPostProps) {
  const router = useRouter()

  const [modal, setModal] = useState<any>({
    title: "",
    show: false,
    isEdit: false,
    data: {}
  })
  const [modalConfirm, setModalConfirm] = useState<any>({
    title: "",
    show: false,
    message: "",
    subMessage: "",
    data: {}
  });
  // const [onFormHistory, setOnFormHistory] = useState<{
  //   progress: number,
  //   content: string,
  //   image: string
  // }>({
  //   progress: 0,
  //   content: "",
  //   image: ""
  // })
  const [dataProgam, setDataProgram] = useState<any>([])

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

  const addProker = (item: any) => {
    const dataProgress = {
      ...data,
      progress: item?.progress,
      detail_progress: [
        ...(data?.detail_progress || []),
        item
      ]
    }

    if (callbackData) callbackData(dataProgress)

    setModal((prev: any) => ({ ...prev, show: false, isEdit: false }))
  }

  const editProgress = ({index, item}: {index: number, item: any}) => {
    const dataDetailProgress = data?.detail_progress
    dataDetailProgress[index] = item

    const dataProgress = {
      ...data,
      progress: item?.progress,
      detail_progress: dataDetailProgress
    }

    if (callbackData) callbackData(dataProgress)

    setModal((prev: any) => ({ ...prev, show: false, isEdit: false }))
  }

  const deleteProgress = (index: string) => {
    const dataProgress = {
      ...data,
      detail_progress: data?.detail_progress?.filter((item: any, idx: number) => idx !== Number(index))
    }

    if (callbackData) callbackData(dataProgress)
    setModalConfirm((prev: any) => ({ ...prev, show: false }))
  }

  const callbackProker = useCallback((item: any) => {
    if (modal?.isEdit) {
      editProgress({index: modal?.data?.index, item})
    } else {
      addProker(item)
    }
  }, [])

  useEffect(() => {
    setDataProgram(data?.detail_progress)
  },[data?.detail_progress])

  const serachData = useCallback((search:any) => {
    if(search) {
      const filterSearch = data?.detail_progress?.filter((item:any) => item?.program_name?.includes(search))
      setDataProgram(filterSearch)
    } else {
      setDataProgram(data?.detail_progress)
    }
  },[])

  return (
    <>
      <div className="flex flex-col gap-5">
        <div className="flex flex-col justify-center items-center gap-6 md:px-4.5 w-full max-w-screen-2xl px-3 lg:px-6">
          <h3 className="text-lg font-semibold text-center">Detail Program Kerja</h3>
          <SearchBarRounded placeholder="Cari..." callbackSearch={serachData} className="md:w-96" />
          <button type="button" onClick={() => setModal((prev: any) => ({ ...prev, show: true, title: "Tambah Program Kerja" }))} className="text-gray-800 bg-primary-500 hover:bg-primary-600 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm w-[13rem] px-5 py-2.5 text-center dark:bg-primary-500 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Tambah Program Kerja</button>
        </div>
        {!Boolean(dataProgam) && (
          <div className='px-6 py-4 text-center font-semibold text-gray-500'>
            <div className='flex justify-center w-full text-primary-500'>
              <NoResult />
            </div>
            <span>Belum ada detail program kerja, silahkan tambahkan</span>
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:gap-6 lg:gap-10 mt-6">
          {dataProgam.map((item: any, index: number) => (
            <div key={index} className="flex flex-row gap-5 relative cursor-pointer">
              <Image src={item?.image || "/img/placeholder-img.svg"} alt="post-1" width={150} height={150} className="object-cover rounded-lg w-[150px] h-[150px]" />
              <div className="flex flex-col justify-center items-start w-full" onClick={() => router.push(`/seratus-hari-kerja/${data?._id}/detail?${new URLSearchParams({index: index.toString()}).toString()}`)}>
                {/* {moment().diff(moment(item?.createdAt), 'days') < 7 &&
                  <p className="text-sm font-medium text-primary-500">New</p>
                } */}
                <p className="text-base font-normal text-gray-700">{item?.program_name}</p>
                <p className="text-sm font-medium text-gray-700 max-lines-1" title={`${item?.target}`}>{item?.target}</p>
                <p className="text-sm font-normal text-gray-500 max-lines-2">{item?.description}</p>
                <div className="flex gap-6 w-full items-center mt-2">
                  <div className="flex-grow">
                    <Progress progress={item?.progress || 0} theme={progressBarTheme} color="default" />
                  </div>
                  <p className="text-sm font-medium text-gray-500">{item?.progress || 0}%</p>
                </div>
              </div>
              <div className="absolute top-0 right-0">
                <Dropdown
                  label=""
                  dismissOnClick={false}
                  renderTrigger={() =>
                    <div className='text-gray-500 cursor-pointer hover:text-gray-700 px-3'>
                      <MoreIcon />
                    </div>
                  }>
                  <DropdownItem className='flex items-center gap-2' onClick={() => {
                    setModal((prev: any) => ({ ...prev, title: "Ubah Data", show: true, isEdit: true, data: { index: index, item } }))
                  }}><div className='text-blue-500'><EditIcon /></div> Ubah</DropdownItem>
                  <DropdownItem className='flex items-center gap-2' onClick={() => setModalConfirm((prev: any) => ({ ...prev, title: "Hapus Program Kerja", message: "Apakah Anda yakin ingin menghapus program kerja ini?", show: true, subMessage: "Data yang telah dihapus tidak dapat dikembalikan", data: { index: index } }))}><div className='text-red-500'><TrashIcon /></div> Hapus</DropdownItem>
                </Dropdown>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Modal show={modal.show} position="center" onClose={() => {
        setModal((prev: any) => ({ ...prev, show: false, isEdit: false }))
      }}>
        <ModalHeader>{modal.title}</ModalHeader>
        <ModalBody>
          <FormDataProgress data={modal.data} callbackData={callbackProker} closeModal={() => setModal((prev: any) => ({ ...prev, show: false, isEdit: false }))}/>
        </ModalBody>
      </Modal>

      <Modal show={modalConfirm.show} position="center" onClose={() => setModalConfirm((prev: any) => ({ ...prev, show: false }))}>
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
            <button onClick={() => setModalConfirm((prev: any) => ({ ...prev, show: false }))} className="text-white bg-gray-500 hover:bg-gray-600 focus:ring-4 focus:outline-none focus:ring-gray-200 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-gray-500 dark:hover:bg-gray-600 dark:focus:ring-gray-700">Batal</button>
            <button onClick={() => { deleteProgress(modalConfirm.data.index); setModalConfirm((prev: any) => ({ ...prev, show: false })) }} className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">Hapus</button>
          </div>
        </ModalFooter>
      </Modal>
    </>
  )
}