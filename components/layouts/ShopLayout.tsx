import { maxWidth } from '@mui/system'
import Head from 'next/head'
import { FC, ReactNode } from 'react'
import { Navbar, SideMenu } from '../ui'

interface Props {
  children?: ReactNode | undefined
  title: string
  pageDescription: string
  imageFullUrl?: string
}

export const ShopLayout: FC<Props> = ({
  children,
  title,
  pageDescription,
  imageFullUrl,
}) => {
  return (
    <>
      <Head>
        <title>{title}</title>

        <meta name="description" content={pageDescription} />

        <meta name="og:title" content={title} />
        <meta name="og:description" content={pageDescription} />
        {imageFullUrl && <meta name="og:image" content={imageFullUrl} />}
      </Head>

      <nav>
        <Navbar />
      </nav>

      <SideMenu />

      <main
        style={{ margin: '80px auto', padding: '0px 30px', maxWidth: '1440px' }}
      >
        {children}
      </main>

      <footer>{/* TODO: custom footer */}</footer>
    </>
  )
}
