import { capitalize } from "lodash"

export const columnSetter = (dataColumn:any) => {
    const columns = dataColumn?.map((item:any, index:number) => ({
        id: item.name || index,
        header: capitalize(item.name),
        accessorKey: item.name,
        disableFilters: false,
    }))

    console.log(columns)
    return columns
}