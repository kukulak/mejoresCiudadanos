import {
  Form,
  Link,
  useActionData,
  useFetcher,
  useLoaderData
} from '@remix-run/react'
import {
  getAllComentarios,
  getAllComentariosCategoria
} from '../../data/comentario.server'

import gsap from 'gsap/gsap-core'

import { useGSAP } from '@gsap/react'
import { useRef } from 'react'

export default function MensajeDashboard({
  id,
  categoria,
  placa,
  texto,
  odio,
  etiqueta,
  index,
  fecha
}) {
  const anim1 = useRef()

  const comentarios = useLoaderData()
  const idData = useActionData()
  const fetcher = useFetcher()

  function deleteMensajeHandler() {
    const proceed = confirm('AreYouSure Do You whant to delete this dream?')

    if (!proceed) {
      return
    }

    fetcher.submit(null, {
      method: 'delete',
      action: `/dashboard/${id}`
    })
  }

  useGSAP(() => {
    gsap.from(anim1.current, {
      scale: 0.8,
      duration: 0.5,
      y: 20,
      opacity: 0,
      delay: index / 1000
    })
  })

  if (fetcher.state !== 'idle') {
    return (
      <article className=" mt-16 gap-5 flex flex-row flex-wrap">
        <p>Deleting...</p>
      </article>
    )
  }

  return (
    <div
      ref={anim1}
      className="flex flex-col my-10 bg-light  rounded-md  w-5/6 sm:w-[800px]"
      key={id}
    >
      <div className=" mt-14 my-5 mx-10 flex flex-row justify-between ">
        {' '}
        <p> Categoria: {categoria?.toUpperCase()}</p>
        <p>
          {' '}
          {new Date(fecha).toLocaleDateString('es-MX', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
          })}
        </p>
      </div>

      {placa.length >= 4 && (
        <div className="my-5 mx-10">
          Placa: <Link to={`/placa/${placa}`}> {placa?.toUpperCase()}</Link>
        </div>
      )}
      <p className="my-5 mx-10 bg-medium  p-10 min-h-40 rounded-md   tracking-wide  leading-7">
        {texto}
      </p>
      <p className="my-5 mx-10"> Ofensivo: {odio}</p>

      {etiqueta && (
        <p className="my-5 mx-10"> Etiqueta: {etiqueta?.toUpperCase()}</p>
      )}
      {/* <div className="w-11/12 bg-dark h-1 mt-10 mb-2 self-center"></div> */}

      <div className="flex justify-around p-10 bg-darkest m-5  ">
        <button
          className="bg-light   px-10 py-4 text-black rounded-lg"
          onClick={deleteMensajeHandler}
          type="submit"
        >
          Eliminar
        </button>
        <Link
          className="bg-light  px-10 py-4 text-black rounded-lg"
          to={`../dashboard/${id}`}
        >
          {' '}
          Editar
        </Link>
      </div>
    </div>
  )
}

export async function loader({ request }) {
  const comentarios = await getAllComentarios()
  // const comentarios = await getAllComentariosCategoria('Observación')
  console.log({ comentarios })

  return comentarios
}

export async function action({ request }) {
  const formData = await request.formData()
  const mensajesData = Object.fromEntries(formData)
  console.log({ mensajesData })

  return mensajesData
}
