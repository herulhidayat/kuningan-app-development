import { NextRequest, NextResponse } from 'next/server'
import logout from './helpers/logout.helper'
 
// 1. Specify protected and public routes
const protectedRoutes = ['/datasets/add', '/administrator/user-management', '/administrator/role']
 
export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname
  const isProtectedRoute = protectedRoutes.includes(path)
  const authToken =  req.cookies.get("authToken") // Perbaikan: baca cookie dari `req.cookies`

  // Debugging logs
  console.log("Path:", path)
  console.log("isProtectedRoute:", isProtectedRoute)
  console.log("authToken:", authToken)

  if (isProtectedRoute && !authToken) {
    const callbackUrl = encodeURIComponent(req.nextUrl.pathname)
    return NextResponse.redirect(new URL(`/login?redirect=${callbackUrl}`, req.nextUrl))
  }
 
  return NextResponse.next()
}
 
// Routes Middleware should not run on
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}