"use client"
import { getItem } from "@/helpers/localstorage.helper";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AdministratorLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathName = usePathname();
  const access = getItem("user")?.privileges

  return (
    <>
      <div className="flex flex-col h-full w-full items-center">
        <div className="md:px-4.5 dark:divide-washed-dark h-full w-full max-w-screen-2xl px-3 lg:px-6 mt-8 flex flex-col gap-4">
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-3">
              <div className="flex flex-col gap-3">
                {access?.find((item: any) => item?.id === "user-management")?.privillages?.view && 
                  <Link className={`${pathName === "/administrator/user-management" ? "text-emerald-600 bg-emerald-50 rounded-e-lg border-s-4 border-emerald-500 dark:bg-emerald-900 dark:text-emerald-400" : ""} px-4 py-2`} href="/administrator/user-management">User Management</Link>
                }
                {access?.find((item: any) => item?.id === "role")?.privillages?.view &&
                  <Link className={`${pathName === "/administrator/role" ? "text-emerald-600 bg-emerald-50 rounded-e-lg border-s-4 border-emerald-500 dark:bg-emerald-900 dark:text-emerald-400" : ""} px-4 py-2`} href="/administrator/role">Role</Link>
                }
              </div>
            </div>
            <div className="col-span-9">
              {children}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}