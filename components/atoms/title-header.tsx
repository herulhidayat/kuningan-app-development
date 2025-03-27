export default function TitleHeader({ title, subtitle }: { title: string, subtitle: string}) {
    return(
        <div className="flex flex-col gap-2">
            <h2 className="text-2xl font-semibold">{title}</h2>
            <p className="text-base font-normal text-gray-500">{subtitle}</p>
        </div>
    )
}