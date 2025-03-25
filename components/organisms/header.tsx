'use client'

import Link from 'next/link'
import { Bars2Icon, CursorArrowRaysIcon, XMarkIcon } from '@heroicons/react/20/solid'
import { useState } from 'react'
import ThemeToggle from '../atoms/theme-toggle'
import { useRouter } from 'next/navigation'

export default function Header() {
  const [visible, setVisible] = useState(false)
  const router = useRouter()

  function handleClick() {
    setVisible(!visible)
  }

  const menus: { id: number; title: string; href: string }[] = [
    {
      id: 1,
      title: 'Beranda',
      href: '/',
    },
    {
      id: 2,
      title: 'Dasbor',
      href: '/dashboards',
    },
    {
      id: 3,
      title: 'Dataset',
      href: '/datasets',
    },
    {
      id: 4,
      title: 'Dokumentasi API',
      href: '/docs',
    },
  ]

  return (
    <div className="bg-white dark:bg-zinc-900 text-black dark:text-white fixed left-0 top-0 z-30 w-full border-b border-b-gray-200 dark:border-b-zinc-800">
      <div className="flex h-full w-full justify-center">
        <div className="md:px-4.5 h-full w-full max-w-screen-2xl divide-y px-3 lg:px-6 flex items-center gap-4 py-[11px]">
          <div className="flex w-full items-center gap-4">
            <Link href="/">
              <div className="flex cursor-pointer gap-2">
                <div className="flex w-6 items-center justify-center text-emerald-600">
                  <CursorArrowRaysIcon />
                </div>
                <h4 className="font-bold">data.kuningankab.go.id</h4>
              </div>
            </Link>
            <div className="flex w-full items-center justify-end lg:justify-between">
              <div className="hidden w-fit gap-1 lg:flex">
                {menus.map((menu) => {
                  return (
                    <Link
                      key={menu.id}
                      href={menu.href}
                      className="hover:bg-gray-100 dark:hover:bg-zinc-800 flex items-center gap-2 rounded-none px-2 py-2 text-sm font-semibold transition hover:cursor-pointer md:rounded-md md:py-[6px]"
                    >
                      {menu.title}
                    </Link>
                  )
                })}
              </div>
              <div className="hidden w-fit gap-4 lg:flex">
                <ThemeToggle />
                <div className="space-y-3 w-fit">
                  <div className="relative text-sm">
                    <button onClick={() => router.push('/login')} className="shadow-button flex items-center gap-1.5 rounded-md px-3 py-1.5 text-start text-sm font-medium text-black dark:text-white active:bg-washed hover:dark:bg-washed-dark/50 active:dark:bg-washed-dark select-none bg-white dark:bg-zinc-900 border-outline dark:border-zinc-800 hover:border-outlineHover hover:dark:border-outlineHover-dark border outline-none w-fit hover:bg-emerald-600 hover:text-white dark:hover:bg-emerald-800 dark:hover:text-white">
                      Sign in
                    </button>
                  </div>
                </div>
              </div>
              <div className="flex w-full items-center justify-end gap-3 lg:hidden">
                <ThemeToggle />
                <div className="space-y-3 w-fit">
                  <div className="relative text-sm">
                    <button onClick={() => router.push('/login')} className="shadow-button flex items-center gap-1.5 rounded-md px-3 py-1.5 text-start text-sm font-medium text-black dark:text-white active:bg-washed hover:dark:bg-washed-dark/50 active:dark:bg-washed-dark select-none bg-white dark:bg-zinc-900 border-outline dark:border-washed-dark hover:border-outlineHover hover:dark:border-outlineHover-dark border outline-none w-fit hover:bg-emerald-600 hover:text-white dark:hover:bg-emerald-600 dark:hover:text-white">
                      Sign in
                    </button>
                  </div>
                </div>
                <div onClick={handleClick} className="box-content block h-5 w-5 text-black dark:text-white lg:hidden">
                  {visible ? <XMarkIcon /> : <Bars2Icon />}
                </div>
              </div>
              {visible && (
                <div className="dark:bg-black shadow-floating fixed left-0 top-[57px] w-full flex-col gap-0 divide-y bg-white px-4 py-2 backdrop-blur-md dark:bg-black/80 lg:hidden lg:gap-1 lg:divide-y-0 lg:p-1">
                  {menus.map((menu) => {
                    return (
                      <Link
                        key={menu.id}
                        href={menu.href}
                        onClick={handleClick}
                        className="hover:bg-gray-50 dark:hover:bg-zinc-800 dark:border-zinc-800 flex items-center gap-2 rounded-none px-2 py-2 text-sm font-semibold transition hover:cursor-pointer md:rounded-md md:py-[6px]"
                      >
                        {menu.title}
                      </Link>
                    )
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
