import { CircleStackIcon } from '@heroicons/react/20/solid'
import Skeleton from 'react-loading-skeleton'

const CardInformation = ({ className, isSkeleton }: { className?: string; isSkeleton?: boolean }) => {
  return (
    <div className={`col-span-1 flex-col items-end ${className}`}>
      {!isSkeleton ? (
        <>
          <button className="bg-red-600 text-white px-2 py-1.5 rounded-md flex items-center">
            <CircleStackIcon className="h-5 mr-1" />
            Prioritas 2024
          </button>
          <button className="bg-emerald-600 text-white px-2 py-1.5 rounded-md mt-2 flex">Terbuka</button>
        </>
      ) : (
        <>
          <Skeleton width={150} height={35} />
          <Skeleton width={100} height={35} />
        </>
      )}
    </div>
  )
}

export default CardInformation
