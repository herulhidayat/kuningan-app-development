"use client";

import QueryProvider from "@/components/atoms/query-provider";
import SearchBar from "@/components/atoms/search-bar";
import TitleHeader from "@/components/atoms/title-header";
import ReactTable from "@/components/molecules/react-table";
import FormDataRole from "@/components/organisms/form-data-role";
import Pagination from "@/components/organisms/pagination";
import EditIcon from "@/components/ui/icons/EditIcon";
import MoreIcon from "@/components/ui/icons/MoreIcon";
import TrashIcon from "@/components/ui/icons/TrashIcon";
import { API_PATH } from "@/services/_path.service";
import api from "@/services/api.service";
import { Query, QueryClient, QueryClientProvider, useMutation, useQuery } from "@tanstack/react-query";
import { Dropdown, DropdownItem, Modal, ModalBody, ModalFooter, ModalHeader } from "flowbite-react";
import { size } from "lodash";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useMemo, useState } from "react";

function Role() {
    const router = useRouter();
    const [pagination, setPagination] = useState({
        currentPage: 1,
        itemsPerPage: 10,
        count: 0,
    });

    const [params, setParams] = useState<any>({
        "order": "DESC",
        "orderBy": "createdAt",
    })

    const [modal, setModal] = useState<any>({
        title: "",
        show: false,
    });

    const [modalConfirm, setModalConfirm] = useState<any>({
        title: "",
        show: false,
        message: "",
        subMessage: "",
        data: {}
    });

    const queryDataset = useQuery({
        queryKey: ["roles", pagination.currentPage, params],
        queryFn: async () => {
            const response = await api.post(
                `/${API_PATH().role.getAll}`,
                {
                    ...params,
                    page: pagination.currentPage,
                    size: pagination.itemsPerPage
                }
            );

            setPagination((prev) => ({
                ...prev,
                count: response.data.metaData.pagination.totalElements,
            }));
            return response.data;
        },
    });

    const mutation = useMutation({
        mutationFn: async (id: any) => {
            const res = await api.delete(`/${API_PATH().role.delete}`, { params: { id: id } });
            return res.data;
        },
        onSuccess: () => {
            // Setelah sukses, refetch data agar data terbaru muncul
            queryDataset.refetch();
        },
    });

    const handleSearch = useCallback((search: any) => {
        if (search) {
            setParams((prev: any) => ({
                ...prev,
                search: search,
                searchBy: ["name", "description"],
            }))
        } else {
            setParams((prev: any) => ({
                ...prev,
                search: undefined,
                searchBy: undefined,
            }))
        }
    }, []);

    const dataColumn = [
        {
            id: 1,
            accessorKey: "name",
            header: "Name",
            disableFilters: false,
        },
        {
            id: 2,
            accessorKey: "description",
            header: "Description",
            disableFilters: false,
        },
        {
            id: 3,
            accessorKey: "action",
            header: "Action",
            disableFilters: false,
            cell: ({ row }: any) => <ActionButton item={row.original} />,
        },
    ]

    const ActionButton = (data: any) => {
        return (
            <Dropdown
                label=""
                dismissOnClick={false}
                renderTrigger={() =>
                    <div className='text-gray-500 cursor-pointer'>
                        <MoreIcon />
                    </div>
                }>
                <DropdownItem className='flex items-center gap-2' onClick={() => {setModal((prev: any) => ({ ...prev, title: "Ubah Data", show: true})); router.replace(`/administrator/role?id=${data?.item?.action}`)}}><div className='text-blue-500'><EditIcon /></div> Ubah</DropdownItem>
                <DropdownItem className='flex items-center gap-2' onClick={() => setModalConfirm((prev: any) => ({ ...prev, title: "Hapus Dataset", message: "Apakah Anda yakin ingin menghapus dataset ini?", show: true, subMessage: "Dataset yang telah dihapus tidak dapat dikembalikan", data: data?.item?.action }))}><div className='text-red-500'><TrashIcon /></div> Hapus</DropdownItem>
            </Dropdown>
        )
    }

    const renderTable = useMemo(() => {
        const data = queryDataset?.data?.data.map((item: any, index: number) => ({
            id: index,
            name: item?.name,
            description: item?.description,
            action: item?._id
        }))
        return (
            <ReactTable
                data={data}
                columns={dataColumn}
                noData={size(queryDataset?.data?.data) > 0 ? false : true}
            />
        )
    }, [queryDataset.data])

    return (
        <>
            <div className="flex flex-col gap-4">
                <TitleHeader title="Role" subtitle="Kelola pengguna berdasarkan posisi dan tentukan hak akses mereka sesuai dengan peran dan tanggung jawabnya." />
                <div className="flex w-full justify-between">
                    <SearchBar callbackSearch={handleSearch} />
                    <button className="text-white bg-emerald-600 hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm w-fit px-5 py-2.5 text-center dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800" onClick={() => setModal((prev: any) => ({ ...prev, show: true, title: "Tambah Role" }))}>Tambah Role</button>
                </div>
                <div className="w-full flex flex-col gap-3">
                    {renderTable}
                    <Pagination
                        itemsPerPage={pagination.itemsPerPage}
                        totalItems={pagination.count}
                        currentPage={pagination.currentPage}
                        setPagination={setPagination}
                    />
                </div>
            </div>

            <Modal show={modal.show} position="center" onClose={() => {setModal((prev: any) => ({ ...prev, show: false }));router.replace('/administrator/role')}}>
                <FormDataRole modalProps={modal} onClose={() => setModal((prev: any) => ({ ...prev, show: false }))} refetch={queryDataset.refetch} />
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
                        <button onClick={() => { mutation.mutate(modalConfirm?.data); setModalConfirm((prev: any) => ({ ...prev, show: false })) }} className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">Hapus</button>
                    </div>
                </ModalFooter>
            </Modal>
        </>
    )
}

const queryClient = new QueryClient();
export default function RoleManagement() {
    return (
        <QueryClientProvider client={queryClient}>
            <Role />
        </QueryClientProvider>
    )
}