import { getToken } from 'next-auth/jwt'
import { NextFetchEvent, NextRequest, NextResponse } from 'next/server'
// import { jwt } from '../../utils'

// TODO: Este middleware no funciona correctamente por un problema de incompatibilidad entre Next.js y crypto
export async function middleware(req: NextRequest, ev: NextFetchEvent) {
  const session = await getToken({req, secret: process.env.NEXTAUTH_SECRET})

  // console.log({session})

  if (!session) {
    const { origin } = req.nextUrl.clone()
    const requestPage = req.page.name
    return NextResponse.redirect(`${origin}/auth/login?p=${requestPage}`)
  }
  return NextResponse.next()

  // const { token = '' } = req.cookies

  // try {
  //   await jwt.isValidToken(token)
  //   return NextResponse.next()
  // } catch (error) {
  //   const requestPage = req.page.name
  //   return NextResponse.redirect(`/auth/login?p=${requestPage}`)
  // }
}
