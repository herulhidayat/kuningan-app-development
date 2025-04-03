import PostCatalog from "@/components/organisms/post-catalog"
import { Poppins, Seaweed_Script } from "next/font/google"
import Image from "next/image"

const poppins = Poppins({ subsets: ['latin'], weight: ['400', '500', '600', '700', '800', '900'] })
const seaweedScript = Seaweed_Script({ subsets: ['latin'], weight: ['400'] })

export default function HundredDaysOfWorks() {
    return (
        <>
            <section className="w-full h-[calc(100vh-3.5rem)] min-h-[55rem] max-h-[60rem] bg-[radial-gradient(59.1%_166.02%_at_50%_-66.02%,_#F0EDE2_0.01%,_#F9CF0C_100%)] dark:bg-[radial-gradient(59.1%_166.02%_at_50%_-66.02%,_#1C1C1C_0.01%,_#333333_100%)] border-b border-slate-200 dark:border-slate-700 relative">
                <h2 className={`${poppins.className} text-[13.33rem]/[13.33rem] md:text-[26.66rem]/[26.66rem] font-bold text-white absolute top-10 md:top-20 w-full text-center`}>100</h2>
                <div className="absolute top-[10rem] md:top-[17rem] w-full flex justify-center">
                    <Image src="/img/bg-kab-kuningan.png" alt="bg-kab-kuningan" width={965.53} height={283} />
                </div>
                <div className="absolute top-[21rem] w-full flex justify-center">
                    <Image src="/img/kepala-daerah.png" alt="kepala-daerah" width={575} height={359} />
                </div>
                <h2 className={`${poppins.className} text-6xl/[3.5rem] md:text-9xl/[8rem] font-bold text-white absolute top-[15rem] md:top-[39rem] w-full text-center drop-shadow-[0_-4px_10px_rgba(0,0,0,0.35)]`}>Hari Kerja</h2>
                <h2 className={`${seaweedScript.className} text-4xl/[2.5rem] md:text-7xl/[4.5rem] font-normal text-gray-500 dark:text-gray-400 absolute top-[17rem] md:top-[44rem] w-full text-center`}>Kabupaten Kuningan</h2>
                <div className="absolute max-sm:top-[38rem] max-md:top-[40rem] md:top-[33rem] w-full flex justify-center">
                    <div className="flex justify-between md:px-4.5 w-full max-w-screen-2xl px-3 lg:px-6">
                        <div className="border rounded-full border-gray-300 dark:border-primary-500 bg-white dark:bg-primary-950 py-2 w-[18rem] justify-center flex flex-col items-center">
                            <p className="text-xs md:text-sm font-medium text-center">Dr. H. Dian Rachmat Yanuar, M.Si.</p>
                            <p className="text-[10px] md:text-xs font-normal text-gray-700 dark:text-gray-300">Bupati Kuningan</p>
                        </div>
                        <div className="border rounded-full border-gray-300 dark:border-primary-500 bg-white dark:bg-primary-950 py-2 w-[18rem] justify-center flex flex-col items-center">
                            <p className="text-xs md:text-sm font-medium text-center">Tuti Andriani, S.H., M.Kn.</p>
                            <p className="text-[10px] md:text-xs font-normal text-gray-700 dark:text-gray-300">Wakil Bupati Kuningan</p>
                        </div>
                    </div>
                </div>
            </section>
            <section className="py-8">
                <PostCatalog />
            </section>
        </>
    )
}