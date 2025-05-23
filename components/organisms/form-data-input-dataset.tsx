import { useEffect, useState } from "react";
import Pagination from "./pagination";
import ReactTable from "../molecules/react-table";
import { capitalize, size } from "lodash";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "flowbite-react";
import FormDataTambahEditRow from "./form-data-tambah-edit-row";
import { columnSetter } from "../atoms/column-setter";
import Image from "next/image";

interface IFormDataInput {
    data: any
    callbackNext: () => void
    callbackBack: () => void
    callbackData: (data: any) => void
}

export default function FormDataInputDataset({data,callbackBack,callbackNext,callbackData}:IFormDataInput) {
    const [modal, setModal] = useState({
        title: "",
        show: false,
        isEdit: false,
        dataIndex: null
    });
    const [modalConfirm, setModalConfirm] = useState({
        title: "",
        show: false,
    });
    const [pagination, setPagination] = useState({
        currentPage: 1,
        itemsPerPage: 10,
        count: 10,
    });
    const [dataRow, setDataRow] = useState([]);

    const handleCloseModal = () => {
        setModal((prev:any) => ({...prev, show: false}))
    }

    useEffect(() => {
        if(size(data?.value_row) > 0) {
            setPagination((prev:any) => ({...prev, count: size(data?.value_row)}))
            setDataRow(data?.value_row?.slice((pagination.currentPage - 1) * pagination.itemsPerPage, pagination.currentPage * pagination.itemsPerPage))
        }
    }, [data?.value_row, pagination.currentPage])

    return(
        <>
            <div className="flex items-center justify-center mt-8">
                <div className="w-1/2 max-md:w-full flex flex-col gap-8">
                    <div className="w-full flex flex-col gap-3">
                        <ReactTable
                            data={dataRow} 
                            columns={columnSetter(data?.column)}   
                            noData={size(data?.value_row) > 0 ? false : true}                         
                        />
                        <button type="button" onClick={() => setModal((prev:any) => ({...prev, show: true, title: "Tambah Data"}))} className="cursor-pointer w-full h-10 rounded-lg border-dashed border border-primary-500 bg-primary-50  dark:bg-primary-950 dark:text-primary-400 text-primary-500 text-sm font-medium flex justify-center items-center">Tambah Data</button>
                        <Pagination
                            itemsPerPage={pagination.itemsPerPage}
                            totalItems={pagination.count}
                            currentPage={pagination.currentPage}
                            setPagination={setPagination}
                        />
                    </div>
                    <div className="flex justify-between">
                        <button onClick={() => callbackBack()} className="text-white bg-gray-500 hover:bg-gray-600 focus:ring-4 focus:outline-none focus:ring-gray-200 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-gray-500 dark:hover:bg-gray-600 dark:focus:ring-gray-700">Back</button>
                        <button onClick={() => setModalConfirm((prev:any) => ({...prev, show: true, title: "Simpan Data"}))} className="text-gray-800 bg-primary-500 hover:bg-primary-600 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-primary-500 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Next</button>
                    </div>
                </div>
            </div>

            <Modal show={modal.show} position="center" onClose={handleCloseModal}>
                <FormDataTambahEditRow 
                    modalProps={modal}
                    column={data?.column} 
                    closeModal={handleCloseModal}
                    callbackData={(data:any) => callbackData(data)}
                />
            </Modal>

            <Modal show={modalConfirm.show} position="center" onClose={() => setModalConfirm((prev:any) => ({...prev, show: false}))}>
                <ModalHeader>{modalConfirm.title}</ModalHeader>
                <ModalBody>
                    <div className="flex flex-col justify-center items-center gap-3">
                        <Image src="/img/data-check.png" alt="success" width={300} height={300} className="object-cover" />
                        <p className="text-lg font-semibold leading-relaxed text-center text-gray-800 dark:text-white">
                            Proses ini akan menyimpan data ke dalam database, apakah anda yakin?
                        </p>
                        <p className="text-base text-center text-gray-500 dark:text-gray-400">Kamu bisa untuk memeriksa kembali data guna menghindari kesalahan data, jika kamu yakin data sudah benar, kamu bisa klik lanjutkan.</p>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <div className="flex justify-between w-full">
                        <button onClick={() => setModalConfirm((prev:any) => ({...prev, show: false}))} className="text-white bg-gray-500 hover:bg-gray-600 focus:ring-4 focus:outline-none focus:ring-gray-200 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-gray-500 dark:hover:bg-gray-600 dark:focus:ring-gray-700">Batal</button>
                        <button onClick={() => {callbackNext(); setModalConfirm((prev:any) => ({...prev, show: false}))}} className="text-gray-800 bg-primary-500 hover:bg-primary-600 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-primary-500 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Lanjutkan</button>
                    </div>
                </ModalFooter>
            </Modal>
        </>
    )
}