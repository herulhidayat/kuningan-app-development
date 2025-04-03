"use client"

import { debounce } from "lodash";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";

export default function SearchBar({placeholder = "Cari...", callbackSearch, className} : {placeholder?: string, callbackSearch: (search: string) => void, className?: string}) {
    const debounceSearch = debounce(callbackSearch, 1000);
    return(
        <div className={`relative ${className}`}>
            <label htmlFor="Search" className="sr-only">
            {" "}
            Search{" "}
            </label>

            <input
            type="text"
            id="Search"
            placeholder={placeholder}
            className="w-full rounded-full border-gray-200 py-2.5 ps-10 shadow-xs sm:text-sm dark:bg-gray-800 dark:border-gray-700"
            onChange={(e: any) => debounceSearch(e.target.value)}
            />
            <span className="absolute md:top-0 inset-y-0 start-0 grid w-10 place-content-center">
                <button
                    type="button"
                    className="text-gray-600 hover:text-gray-700"
                >
                    <span className="sr-only">Search</span>

                    <MagnifyingGlassIcon className="h-5 w-5" />
                </button>
            </span>

        </div>
    )
}