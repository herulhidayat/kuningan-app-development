import Skeleton from 'react-loading-skeleton'
import CardInformation from './card-information'
import { Dataset } from '@/app/datasets/page'
import moment from 'moment';
import { useState } from 'react';
import MoreIcon from '../ui/icons/MoreIcon';
import { Dropdown, DropdownItem } from 'flowbite-react';
import EditIcon from '../ui/icons/EditIcon';
import TrashIcon from '../ui/icons/TrashIcon';
import { Modal, ModalBody, ModalFooter, ModalHeader } from "flowbite-react";
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import Image from 'next/image';

const Card = ({ dataSet, isSkeleton, handleDelete }: { dataSet?: Dataset; isSkeleton?: boolean, handleDelete?: (id: any) => void }) => {
  const router = useRouter();
  const [showAction, setShowAction] = useState<boolean>(false)
  const [modalConfirm, setModalConfirm] = useState<any>({
    title: "",
    show: false,
    message: "",
    subMessage: "",
    data: {}
  });
  const isLoggedin = Cookies.get("authToken");

  return (
    <>
      {/* <div className="flex flex-col py-2 px-4 my-2 h-[28rem] md:h-[15rem] gap-10 md:gap-2 rounded-md transition-colors justify-between text-[16px] border-outline hover:border-emerald-600 hover:bg-emerald-100/10 dark:hover:bg-washed-dark/50 dark:border-zinc-800 dark:hover:border-outlineHover-dark border">
        <div className="grid grid-cols-4">
          <div className="col-span-4 md:col-span-3 md:flex md:flex-col md:gap-4">
            <h4 className="font-bold text-[1.25em] hover:cursor-pointer hover:underline">
              {dataSet?.data_name}
              {isSkeleton && <Skeleton height={30} />}
            </h4>
            <div className="max-h-36 md:max-h-32 overflow-y-auto no-arrow-scrollbar">
              <span className="text-[1em] text-gray-500 dark:text-gray-400">
                {dataSet?.data_description}
                {isSkeleton && <Skeleton height={20} count={3} />}
              </span>
            </div>
          </div>
          <CardInformation className="hidden md:flex" isSkeleton={isSkeleton} />
        </div>
        <div className="flex flex-col items-start md:flex-row-reverse md:items-end justify-between text-[1em]">
          {!isSkeleton ? (
            <>
              <span className="">{dataSet?.author}</span>
              <span className="bg-emerald-600 rounded-xl px-2 py-1.5 text-white">
                {dataSet?.data_source}
              </span>
            </>
          ) : (
            <>
              <Skeleton width={50} height={35} />
              <Skeleton width={250} height={20} />
            </>
          )}

          <CardInformation className="md:hidden" isSkeleton={isSkeleton} />
        </div>
      </div> */}
      <div onMouseEnter={() => setShowAction(true)} onMouseLeave={() => setShowAction(false)} className='border border-gray-200 dark:border-zinc-800 rounded-xl hover:border-emerald-500 hover:shadow-sm hover:shadow-emerald-500/10 transition delay-100 ease-in py-5 px-4 flex justify-between'>
        <div className='flex flex-col gap-2 flex-grow cursor-pointer' onClick={() => router.push(`/datasets/${dataSet?._id}`)}>
          <h4 className='text-lg font-bold text-gray-900 dark:text-gray-100 max-lines-1' title={dataSet?.data_name}>{dataSet?.data_name}</h4>
          <p className='text-sm text-gray-700 dark:text-gray-300 max-lines-1' title={dataSet?.data_description}>{dataSet?.data_description}</p>
          <p className='text-sm font-medium text-gray-500 dark:text-gray-400'>{dataSet?.data_source} • <span className='font-normal'>{moment(dataSet?.createdAt).format('DD MMMM YYYY, HH:mm')}</span></p>
        </div>
        <div>
          {showAction && isLoggedin && (
            <Dropdown 
              label="" 
              dismissOnClick={false} 
              renderTrigger={() => 
                <div className='text-gray-500 cursor-pointer'>
                  <MoreIcon />
                </div>
              }>
                <DropdownItem className='flex items-center gap-2'><div className='text-blue-500'><EditIcon /></div> Ubah</DropdownItem>
                <DropdownItem className='flex items-center gap-2' onClick={() => setModalConfirm((prev:any) => ({...prev, title: "Hapus Dataset", message: "Apakah Anda yakin ingin menghapus dataset ini?", show: true, subMessage: "Dataset yang telah dihapus tidak dapat dikembalikan", data: dataSet}))}><div className='text-red-500'><TrashIcon /></div> Hapus</DropdownItem>
            </Dropdown>
          )}
        </div>
      </div>

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
                  <button onClick={() => {if(handleDelete) handleDelete(modalConfirm?.data?._id);setModalConfirm((prev:any) => ({...prev, show: false}))}} className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">Hapus</button>
              </div>
          </ModalFooter>
      </Modal>
    </>
  )
}

export default Card
