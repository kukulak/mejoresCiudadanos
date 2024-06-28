import { cssBundleHref } from '@remix-run/css-bundle'
import type {
  ActionFunctionArgs,
  LinksFunction,
  createCookieSessionStorage
} from '@remix-run/node'
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration
} from '@remix-run/react'

import styles from './tailwind.css'

export const links: LinksFunction = () => [{ rel: 'stylesheet', href: styles }]

import Header from './components/Header'
import Footer from './components/Footer'

// import Geo from './util/Geolocalizacion'

// export const links: LinksFunction = () => [
//   ...(cssBundleHref ? [{ rel: 'stylesheet', href: cssBundleHref }] : [])
// ]

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
        {/* <Geo /> */}
      </head>
      <body className=" bg-medium font-formula">
        <Header />
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
        <Footer />
      </body>
    </html>
  )
}

// export async function action({ request }: ActionFunctionArgs) {
//   const coords = await request.json()
//   const session  = await getSession(request)
//   getSession
// }
