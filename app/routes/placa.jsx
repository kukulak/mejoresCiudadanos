import { Link, Outlet, redirect, useLoaderData } from '@remix-run/react'

import Buscador from '../components/Buscador'
import Mensaje from '../components/Mensaje'

import { getStoredNotes, storeNotes } from '../data/notes'

export default function Placa() {
  const url = useLoaderData()

  return (
    <div className=" min-h-screen pb-72">
      {!url ? (
        'Hola que haciendo por aquí? busca algo o regresa al home'
      ) : (
        <Outlet />
      )}
    </div>
  )
}

export async function loader({ request, params }) {
  // const notes = await getStoredNotes()
  const url = params.id
  console.log(url, 'URL')
  return url || null

  // const data = await db.message.findMany({
  //   select: {
  //     message: true,
  //     id: true,
  //   }
  // })
}

export async function action({ request }) {
  const formData = await request.formData()
  const mensajeData = Object.fromEntries(formData)

  if (
    mensajeData.placa.trim().replace(/[^\w]/gi, '').length <= 5 ||
    mensajeData.placa.trim().replace(/[^\w]/gi, '').length >= 8
  ) {
    return { message: 'Las placas deben tener entre 6 y 7 caracteres' }
  }

  const existingNotes = await getStoredNotes()
  mensajeData.id = new Date().toISOString()
  const updatedNotes = existingNotes.concat(mensajeData)
  await storeNotes(updatedNotes)

  return redirect('/placa')
}
