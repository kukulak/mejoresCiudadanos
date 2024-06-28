// import DreamForm from '~/components/dreams/DreamForm'
import ArtModal from '../util/Modal'
import { useNavigate } from '@remix-run/react'
import {
  updateComentario,
  deleteComentario
} from '../../data/comentario.server'

import NuevoMensaje from '../components/NuevoMensaje'

import { redirect } from '@remix-run/node'
// import { validateArtInput } from '../data/validation.server'
// import ArtForm from '../components/arts/ArtForm'

export const meta = () => {
  return [
    { title: 'Se a borrado o editado una entrada' },
    {
      name: 'description',
      content: 'Este espacio está protegido con password,  '
    }
  ]
}

export default function DashboardUpdateArtPage() {
  const navigate = useNavigate()
  function closeHandler() {
    //navigate programmatically
    navigate('/dashboard')
  }
  return (
    <>
      <p className="bg-dark text-light ">No existance what a strange thing.</p>
      <ArtModal onClose={closeHandler}>
        <NuevoMensaje />
      </ArtModal>
    </>
  )
}

export async function action({ params, request }) {
  const mensajeId = params.id
  console.log('---PARAMSFROM ART---', params)
  if (request.method === 'PATCH') {
    const formData = await request.formData()
    const artData = Object.fromEntries(formData)

    // try {
    //   validateArtInput(artData)
    // } catch (error) {
    //   return error
    // }

    await updateComentario(mensajeId, artData)
    return redirect('/dashboard')
  } else if (request.method === 'DELETE') {
    await deleteComentario(mensajeId)
    return redirect('/dashboard')
  }
}
