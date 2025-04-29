import { ModalBody, ModalFooter, ModalHeader } from "flowbite-react";
import { useForm } from "react-hook-form";

interface IFormDataTambahEditRow {
  modalProps: any
  column: any
  closeModal: () => void
  callbackData: (data: any) => void
}
export default function FormDataTambahEditRow({ modalProps, column, closeModal, callbackData }: IFormDataTambahEditRow) {

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const handleSubmitForm = (data: any) => {
    const dataRow = {
      row: data,
      dataIndex: modalProps?.dataIndex || undefined,
      isEdit: modalProps.isEdit
    }

    callbackData(dataRow)
    closeModal()
  }

  return (
    <>
      <form onSubmit={handleSubmit(handleSubmitForm)}>
        <ModalHeader>{modalProps.title}</ModalHeader>
        <ModalBody>
          <div className="grid grid-cols-1 gap-4 mb-4">
            {column?.map((item: any, index: number) => (
              <div key={index} className="col-span-1">
                <label htmlFor={item.name} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{item.name}</label>
                <input {...register(item.name)} type="" id="author" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder={`Masukkan ${item.name}`} />
              </div>
            )
            )}
          </div>
        </ModalBody>
        <ModalFooter>
          <div className="flex justify-between w-full">
            <button onClick={() => closeModal()} className="text-white bg-gray-500 hover:bg-gray-600 focus:ring-4 focus:outline-none focus:ring-gray-200 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-gray-500 dark:hover:bg-gray-600 dark:focus:ring-gray-700">Batal</button>
            <button type="submit" className="text-gray-800 bg-primary-500 hover:bg-primary-600 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-primary-500 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Tambahkan ke tabel</button>
          </div>
        </ModalFooter>
      </form>
    </>
  )
}