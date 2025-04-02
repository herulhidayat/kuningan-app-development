import Link from 'next/link'
import { ElementType } from 'react'
import DateDataToggle from '../ui/date-data-toggle'
import Skeleton from 'react-loading-skeleton'
import NoResult from '../ui/illustrations/NoResult'

interface SectionPropsInterface {
  title: string
  date: string
  description: string
  cards: any
  callbackTimeframe: (value: string) => void
}

export default function HomepageSection({ title, date, description, cards, callbackTimeframe}: SectionPropsInterface) {
  return (
    <section className="py-8 lg:py-12 dark:border-zinc-800">
      <div className="flex flex-col gap-6 lg:gap-8">
        <div className="flex flex-col gap-y-3">
          <div className="flex flex-col flex-wrap items-start gap-2 lg:flex-row lg:items-center lg:justify-between">
            <h4 className="font-bold text-lg">{title}</h4>
            <span className="text-dim text-right text-sm text-gray-500 dark:text-gray-400">
              Data terupdate pada {date}
            </span>
          </div>
          <div className="text-dim flex w-full flex-wrap justify-between gap-y-3 md:flex-nowrap md:items-start gap-x-6">
            <p className="whitespace-pre-line text-base md:max-w-[70%] text-gray-500 dark:text-gray-400">
              {description}
            </p>
            <div className="flex w-full gap-3 md:w-auto md:justify-end">
              <ul className="flex flex-wrap">
                <DateDataToggle callbackSelected={callbackTimeframe}/>
              </ul>
            </div>
          </div>
        </div>
        <div>
          {/* <div className="flex flex-wrap items-end justify-between gap-3">
            <div></div>
            <div className="flex-wrap items-center justify-between gap-2.5 hidden">
              <div className="flex flex-wrap">
                <button onClick={() => callbackTimeframe('today')} className="group flex flex-row rounded-full px-[10px] py-1 text-sm outline-none transition-colors bg-outline dark:bg-washed-dark font-medium text-black dark:text-white">
                  Today
                </button>
                <button onClick={() => callbackTimeframe('all-time')} className="group flex flex-row rounded-full px-[10px] py-1 text-sm outline-none transition-colors text-dim bg-transparent hover:text-black dark:hover:text-white">
                  All-time
                </button>
              </div>
            </div>
          </div> */}
          <div className="w-full">
            <div className="overflow-visible">
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
                {cards?.isError && (
                  <div className='px-6 py-4 text-center font-semibold text-gray-500'>
                    <div className='flex justify-center w-full text-primary-500'>
                      <NoResult />
                    </div>
                    <span>Maaf, data tidak ditemukan</span>
                  </div>
                )}
                {cards?.isLoading && 
                  Array.from({ length: 5 }, (_, index) => (
                    <Skeleton key={index} height={100} />
                  ))
                }
                {cards?.data?.data?.map((card:any, index: number) => {
                  return (
                    <Link key={index} href={`/datasets/${card._id}`}>
                      <div className="border-outline hover:border-primary-500 hover:bg-primary-50 dark:hover:bg-primary-950 dark:border-zinc-800 dark:hover:border-primary-500 group w-full space-y-2 rounded-xl border p-3 transition-colors">
                        <div className="relative flex items-center gap-3 text-primary-600">
                          {/* <card.icon height={20} width={20} /> */}
                          <p className="text-dim font-semibold text-sm text-gray-500 capitalize">{card.category}</p>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            aria-hidden="true"
                            data-slot="icon"
                            className="text-dim absolute right-2 h-5 w-5 opacity-0 transition-[opacity_transform] duration-0 group-hover:translate-x-2 group-hover:opacity-100 group-hover:duration-300"
                          >
                            <path
                              fillRule="evenodd"
                              d="M5.22 14.78a.75.75 0 0 0 1.06 0l7.22-7.22v5.69a.75.75 0 0 0 1.5 0v-7.5a.75.75 0 0 0-.75-.75h-7.5a.75.75 0 0 0 0 1.5h5.69l-7.22 7.22a.75.75 0 0 0 0 1.06Z"
                              clipRule="evenodd"
                            ></path>
                          </svg>
                        </div>
                        <div className="relative overflow-hidden">
                          <p className="truncate font-medium dark:text-white">{card.data_name}</p>
                          <p className="text-dim font-medium text-gray-500 transition-transform group-hover:translate-y-6">
                            {card.count_access} Dilihat
                          </p>
                          <p className="text-primary-600 dark:text-primary-500 absolute -bottom-6 whitespace-nowrap transition-transform group-hover:-translate-y-6 group-hover:duration-300">
                            Tekan untuk jelajahi
                          </p>
                        </div>
                      </div>
                    </Link>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
