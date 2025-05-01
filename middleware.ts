import { NextRequest, NextResponse } from 'next/server'
import logout from './helpers/logout.helper'
 
// 1. Specify protected and public routes
const protectedRoutes = ['/datasets/add', '/administrator/user-management', '/administrator/role']
// const publicRoutes = ['/login', '/register']
 
export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname
  const isProtectedRoute = protectedRoutes.includes(path)
  // const isPublicRoute = publicRoutes.includes(path)
  const authToken =  req.cookies.get("authToken")

  // if (isPublicRoute) {
  //   return NextResponse.next()
  // }

  if (isProtectedRoute && !authToken) {
  // if (!authToken) {
    const callbackUrl = encodeURIComponent(req.nextUrl.pathname)
    return NextResponse.redirect(new URL(`/login?redirect=${callbackUrl}`, req.nextUrl))
  }
 
  return NextResponse.next()
}
 
// Routes Middleware should not run on
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}