import { getToken } from 'next-auth/jwt'
import { NextFetchEvent, NextRequest, NextResponse } from 'next/server'

export async function middleware(req: NextRequest, ev: NextFetchEvent) {
  const session: any = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  })
  const { origin } = req.nextUrl.clone()

  if (!session) {
    const requestPage = req.page.name
    return NextResponse.redirect(`${origin}/auth/login?p=${requestPage}`)
  }

  const validRoles = ['admin', 'super-user']
  if (!validRoles.includes(session.user.role)) return NextResponse.redirect(origin)

  return NextResponse.next()
}
