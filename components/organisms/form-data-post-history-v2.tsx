'use client'

import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter, useSearchParams } from "next/navigation";
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
// import { RangeSlider } from "flowbite-react";

interface FormDataPostProps {
  data?: any
  callbackData?: (data: any) => void
}

export default function FormDataPostHistoryV2({
  data,
  callbackData
}: FormDataPostProps) {
  const router = useRouter()
  const paramsUrl = useSearchParams();

  const [formModel] = useState<any>({
    location: "",
    program_name: "",
    progress: 0,
    output: "",
    supporting_evidence: "",
  });
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
  const [onFormHistory, setOnFormHistory] = useState<{
    location: string,
    program_name: string,
    progress: number,
    output: string,
    supporting_evidence: string
  }>({
    location: "",
    program_name: "",
    progress: 0,
    output: "",
    supporting_evidence: ""
  })

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

  const addProgress = () => {
    let detailProgress = data?.detail_progress
    detailProgress[parseInt(paramsUrl.get("index") || "")] = {
      ...detailProgress[parseInt(paramsUrl.get("index") || "")],
      progress: onFormHistory?.progress,
      detail_program: [
        ...(detailProgress[parseInt(paramsUrl.get("index") || "")].detail_program || []),
        onFormHistory,
      ]
    }
    const dataProgress = {
      ...data,
      detail_progress: detailProgress
    }

    if(callbackData) callbackData(dataProgress)
    
    setModal((prev: any) => ({...prev, show: false, isEdit: false}))
    setOnFormHistory({
        location: "",
        program_name: "",
        progress: 0,
        output: "",
        supporting_evidence: ""
    })
  }

  const editProgress = (index: number) => {
    const dataDetailProgress = data?.detail_progress
    dataDetailProgress[parseInt(paramsUrl.get("index") || "")].detail_program[index] = onFormHistory

    const dataProgress = {
      ...data,
      detail_progress: dataDetailProgress
    }

    if(callbackData) callbackData(dataProgress)

    setModal((prev: any) => ({...prev, show: false, isEdit: false}))
    setOnFormHistory({
        location: "",
        program_name: "",
        progress: 0,
        output: "",
        supporting_evidence: ""
    })
  }

  const deleteProgress = (index: string) => {
    const dataProgress = {
      ...data,
      detail_progress: data?.detail_progress?.filter((item: any, idx: number) => idx !== Number(index))
    }

    if(callbackData) callbackData(dataProgress)
    setModalConfirm((prev:any) => ({...prev, show: false}))
  }

  return (
    <>
      <div className="flex flex-col gap-5">
        <h3 className="text-lg font-semibold">Progres Pengerjaan:</h3>
        {!Boolean(data?.detail_progress?.[parseInt(paramsUrl.get("index") || "")]?.detail_program) && (
          <div className='px-6 py-4 text-center font-semibold text-gray-500'>
            <span>Belum ada progres pengerjaan, silahkan tambah progres</span>
          </div>
        )}
        <div className="flex flex-col gap-5">
          {data?.detail_progress?.[parseInt(paramsUrl.get("index") || "")]?.detail_program?.map((item: any, index: number) => (
            <div key={index} className="flex flex-row gap-5 relative cursor-pointer border rounded-lg border-gray-200 p-5">
              <div className="flex flex-col justify-center items-start w-full">
                <table>
                  <tr>
                    <td className="text-base font-medium text-gray-700">Nama Program</td>
                    <td className="text-base font-normal text-gray-700">:</td>
                    <td className="text-base font-normal text-gray-700">{item?.program_name}</td>
                  </tr>
                  <tr>
                    <td className="text-base font-medium text-gray-700">Lokasi</td>
                    <td className="text-base font-normal text-gray-700">:</td>
                    <td className="text-base font-normal text-gray-700">{item?.location}</td>
                  </tr>
                  <tr>
                    <td className="text-base font-medium text-gray-700">Output</td>
                    <td className="text-base font-normal text-gray-700">:</td>
                    <td className="text-base font-normal text-gray-700">{item?.output}</td>
                  </tr>
                  <tr>
                    <td className="text-base font-medium text-gray-700">Bukti Dukung</td>
                    <td className="text-base font-normal text-gray-700">:</td>
                    <td className="text-base font-normal text-gray-700">{item?.supporting_evidence}</td>
                  </tr>
                </table>
                <div className="flex gap-6 w-full items-center mt-2">
                  <div className="flex-grow">
                    <Progress progress={item?.progress || 0} theme={progressBarTheme} color="default" />
                  </div>
                  <p className="text-sm font-medium text-gray-500">{item?.progress || 0}%</p>
                </div>
              </div>
              <div className="absolute top-6 right-4">
                <Dropdown
                  label=""
                  dismissOnClick={false}
                  renderTrigger={() =>
                    <div className='text-gray-500 cursor-pointer hover:text-gray-700 px-3'>
                      <MoreIcon />
                    </div>
                  }>
                    <DropdownItem className='flex items-center gap-2' onClick={() => { 
                      setModal((prev: any) => ({ ...prev, title: "Ubah Data", show: true, isEdit: true, data: { index: index } }))
                      setOnFormHistory(item)
                    }}><div className='text-blue-500'><EditIcon /></div> Ubah</DropdownItem>
                    <DropdownItem className='flex items-center gap-2' onClick={() => setModalConfirm((prev: any) => ({ ...prev, title: "Hapus Progres", message: "Apakah Anda yakin ingin menghapus progres ini?", show: true, subMessage: "Data yang telah dihapus tidak dapat dikembalikan", data: { index: index } }))}><div className='text-red-500'><TrashIcon /></div> Hapus</DropdownItem>
                </Dropdown>
              </div>
            </div>
          ))}
          <button type="button" onClick={() => setModal((prev: any) => ({ ...prev, show: true, title: "Tambah Progres" }))} className="cursor-pointer w-full h-10 rounded-lg border-dashed border border-primary-500 bg-primary-50  dark:bg-primary-950 dark:text-primary-400 text-primary-500 text-sm font-medium flex justify-center items-center">Tambah Progres</button>
        </div>
      </div>

      <Modal show={modal.show} position="center" onClose={() => {
        setModal((prev: any) => ({ ...prev, show: false, isEdit: false }))
        setOnFormHistory({
            location: "",
            program_name: "",
            progress: 0,
            output: "",
            supporting_evidence: ""
        })
      }}>
        <ModalHeader>{modal.title}</ModalHeader>
        <ModalBody>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="col-span-2">
                <label htmlFor="program_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nama Program</label>
                <input defaultValue={onFormHistory?.program_name} onChange={(e) => setOnFormHistory((prev: any) => ({ ...prev, program_name: e.target.value }))} type="" id="program_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Masukkan nama program" />
              </div>
              <div className="col-span-2">
                <label htmlFor="location" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Lokasi</label>
                <input defaultValue={onFormHistory?.location} onChange={(e) => setOnFormHistory((prev: any) => ({ ...prev, location: e.target.value }))} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Masukkan nama program" />
              </div>
              <div className="col-span-2">
                <label htmlFor="output" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Output</label>
                <input defaultValue={onFormHistory?.output} onChange={(e) => setOnFormHistory((prev: any) => ({ ...prev, output: e.target.value }))} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Masukkan output" />
              </div>
              <div className="col-span-2">
                <label htmlFor="supporting_evidence" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Bukti Dukung</label>
                <input defaultValue={onFormHistory?.supporting_evidence} onChange={(e) => setOnFormHistory((prev: any) => ({ ...prev, supporting_evidence: e.target.value }))} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Masukkan bukti dukung" />
              </div>
              <div className="col-span-2">
                <label htmlFor="judul" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Progres</label>
                <div className="w-full flex gap-4">
                  <RangeSlider onChange={(e) => setOnFormHistory((prev: any) => ({ ...prev, progress: parseInt(e.target.value) }))} className="flex-grow" id="lg-range" sizing="lg" defaultValue={onFormHistory?.progress || data?.progress || 0} max={100} min={0} step={10} />
                  <p className="font-medium text-gray-700">{onFormHistory?.progress || data?.progress || 0}%</p>
                </div>
                <p className="text-xs text-gray-500">Geser slider untuk menentukan progres</p>
              </div>
            </div>
        </ModalBody>
        <ModalFooter>
          <div className="flex justify-between w-full">
            <button onClick={() => {
              setModal((prev: any) => ({ ...prev, show: false, isEdit: false }))
              setOnFormHistory({
                location: "",
                program_name: "",
                progress: 0,
                output: "",
                supporting_evidence: ""
              })
            }} className="text-white bg-gray-500 hover:bg-gray-600 focus:ring-4 focus:outline-none focus:ring-gray-200 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-gray-500 dark:hover:bg-gray-600 dark:focus:ring-gray-700">Batal</button>
            <button onClick={() => {
              if(modal.isEdit) editProgress(modal.data.index) 
              else addProgress()
            }} className="text-gray-800 bg-primary-500 hover:bg-primary-600 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-primary-500 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Tambahkan</button>
          </div>
        </ModalFooter>
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
                <button onClick={() => {deleteProgress(modalConfirm.data.index);setModalConfirm((prev:any) => ({...prev, show: false}))}} className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">Hapus</button>
            </div>
        </ModalFooter>
      </Modal>
    </>
  )
}