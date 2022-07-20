import { NextFetchEvent, NextRequest, NextResponse } from 'next/server'
// import { jwt } from '../../utils'

// TODO: Este middleware no funciona correctamente por un problema de incompatibilidad entre Next.js y crypto
export async function middleware(req: NextRequest, ev: NextFetchEvent) {
  return NextResponse.next()

  // const { token = '' } = req.cookies

  // try {
  //   console.log('Antes del JWT')
  //   await jwt.isValidToken(token)
  //   console.log('Después del JWT')
  //   return NextResponse.next()
  // } catch (error) {
  //   console.log('En el catch')
  //   const requestPage = req.page.name
  //   return NextResponse.redirect(`/auth/login?p=${requestPage}`)
  // }
}
