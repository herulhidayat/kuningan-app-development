import { useSortable } from "@dnd-kit/sortable";
import { CSS } from '@dnd-kit/utilities';
import DragIcon from "../ui/icons/DragIcon";
import { useEffect, useState } from "react";
import TrashIcon from "../ui/icons/TrashIcon";
import { useForm } from "react-hook-form";

interface IFieldItem {
    data: any
    callbackUpdate: (v: any) => void
    callbackRemove: () => void
}
export default function FieldItem({ data, callbackUpdate, callbackRemove }: IFieldItem) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable({ id: data });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    const {
        register,
        watch,
        setValue,
        formState: { errors },
      } = useForm();

    const watchName = watch("name");
    const watchAlias = watch("alias");
    const watchType = watch("type");

    useEffect(() => {
        callbackUpdate({
            name: watchName || data?.name ,
            alias: watchAlias || data?.alias,
            type: watchType || data?.type
        })
    }, [watchName, watchAlias, watchType])

    useEffect(() => {
        if (data) {
            setValue("name", data?.name)
            setValue("alias", data?.alias)
            setValue("type", data?.type)
        }
    }, [data])

    return (
        <div ref={setNodeRef} style={style}>
            <div className="p-3 flex flex-col border-y gap-4">
                <div className="flex justify-between items-center">
                    <div className="flex gap-2 font-medium text-gray-900 dark:text-white" {...attributes} {...listeners}>
                        <DragIcon />
                        {data?.alias || data.name}
                    </div>
                    <div className="hover:text-red-600 text-gray-500" onClick={() => {
                        callbackRemove()}}>
                        <TrashIcon />
                    </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                    <div className="col-span-1">
                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nama Field</label>
                        <input {...register("name")} type="" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-emerald-500 focus:border-emerald-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-emerald-500 dark:focus:border-emerald-500" placeholder="Masukkan author" required />
                    </div>
                    <div className="col-span-1">
                        <label htmlFor="alias" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nama Alias Field</label>
                        <input {...register("alias")} type="" id="alias" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-emerald-500 focus:border-emerald-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-emerald-500 dark:focus:border-emerald-500" placeholder="Masukkan nama dataset" required />
                    </div>
                    <div className="col-span-1">
                        <label htmlFor="type" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tipe Data</label>
                        <select {...register("type")} id="type" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-emerald-500 focus:border-emerald-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-emerald-500 dark:focus:border-emerald-500">
                            <option value={"string"}>String</option>
                            <option value={"number"}>Number</option>
                            <option value={"date"}>Date</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
    );
}