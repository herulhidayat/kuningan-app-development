import { useSortable } from "@dnd-kit/sortable";
import { CSS } from '@dnd-kit/utilities';
import DragIcon from "../ui/icons/DragIcon";
import { useState } from "react";
import TrashIcon from "../ui/icons/TrashIcon";

export default function FieldItem(props: any) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable({ id: props.data });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
            <div className="p-3 flex flex-col border-y gap-4">
                <div className="flex justify-between items-center">
                    <div className="flex gap-2 font-medium text-gray-900 dark:text-white">
                        <DragIcon />
                        {props.data.name}
                    </div>
                    <div className="text-red-600">
                        <TrashIcon />
                    </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                    <div className="col-span-1">
                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nama Field</label>
                        <input type="" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-emerald-500 focus:border-emerald-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-emerald-500 dark:focus:border-emerald-500" placeholder="Masukkan author" required />
                    </div>
                    <div className="col-span-1">
                        <label htmlFor="alias" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nama Alias Field</label>
                        <input type="" id="alias" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-emerald-500 focus:border-emerald-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-emerald-500 dark:focus:border-emerald-500" placeholder="Masukkan nama dataset" required />
                    </div>
                    <div className="col-span-1">
                        <label htmlFor="type" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tipe Data</label>
                        <select id="type" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            <option>String</option>
                            <option>Number</option>
                            <option>Date</option>
                            <option>Boolean</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
    );
}