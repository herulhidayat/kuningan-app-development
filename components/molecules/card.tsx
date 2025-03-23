import Skeleton from 'react-loading-skeleton'
import CardInformation from './card-information'
import { Dataset } from '@/app/datasets/page'

const Card = ({ dataSet, isSkeleton }: { dataSet?: Dataset['results'][0]; isSkeleton?: boolean }) => {
  return (
    <>
      <div className="flex flex-col py-2 px-4 my-2 h-[28rem] md:h-[15rem] gap-10 md:gap-2 rounded-md transition-colors justify-between text-[16px] border-outline hover:border-emerald-600 hover:bg-emerald-100/10 dark:hover:bg-washed-dark/50 dark:border-zinc-800 dark:hover:border-outlineHover-dark border">
        <div className="grid grid-cols-4">
          <div className="col-span-4 md:col-span-3 md:flex md:flex-col md:gap-4">
            <h4 className="font-bold text-[1.25em] hover:cursor-pointer hover:underline">
              {dataSet?.title}
              {isSkeleton && <Skeleton height={30} />}
            </h4>
            <div className="max-h-36 md:max-h-32 overflow-y-auto no-arrow-scrollbar">
              <span className="text-[1em] text-gray-500 dark:text-gray-400">
                {dataSet?.notes}
                {isSkeleton && <Skeleton height={20} count={3} />}
              </span>
            </div>
          </div>
          <CardInformation className="hidden md:flex" isSkeleton={isSkeleton} />
        </div>
        <div className="flex flex-col items-start md:flex-row-reverse md:items-end justify-between text-[1em]">
          {!isSkeleton ? (
            <>
              <span className="">{dataSet?.author}</span>
              <span className="bg-emerald-600 rounded-xl px-2 py-1.5 text-white">
                {dataSet?.resources?.[0]?.format}
              </span>
            </>
          ) : (
            <>
              <Skeleton width={50} height={35} />
              <Skeleton width={250} height={20} />
            </>
          )}

          <CardInformation className="md:hidden" isSkeleton={isSkeleton} />
        </div>
      </div>
      {/* )} */}
    </>
  )
}

export default Card
