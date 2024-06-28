import {
  Form,
  Link,
  Outlet,
  useActionData,
  useFetcher,
  useLoaderData
} from '@remix-run/react'
import {
  getAllComentarios,
  getAllComentariosCategoria
} from '../../data/comentario.server'

import BtnGraphyc from '../components/BtnGraphyc'

import MensajeDashboard from '../components/MensajeDashBoard'
import { useState } from 'react'
import { requireUserSession } from '../../data/auth.server'

export default function Dashboard() {
  const {
    userId,
    comentarios,
    observacion,
    felicitacion,
    sugerencia,
    propuesta,
    queja,
    agradecimiento
  } = useLoaderData()

  const [toDisplay, setToDisplay] = useState(comentarios)

  const heightObservacion = 5 * observacion.length
  const heightFelicitacion = 5 * felicitacion.length
  const heightSugerencia = 5 * sugerencia.length
  const heightQueja = 5 * queja.length
  const heightAgradecimiento = 5 * agradecimiento.length
  const heightPropuesta = 5 * propuesta.length

  const handleDisplay = categoria => {
    setToDisplay(categoria)
  }

  return (
    <div className="min-h-screen pb-72 bg-dark py-5">
      <Outlet />
      <h1 className="m-10 text-2xl text-light"> DASHBOARD</h1>
      <div className="mx-10">
        <p className=" text-lg text-light">Hola {userId.userName}</p>
        <Form method="post" action="/logout" id="logout-form">
          <button
            className="text-md text-light my-5 border-2 border-gray-500  py-3 px-4 "
            type="submit"
          >
            Cerrar Sesión
          </button>
        </Form>
      </div>
      <div className="flex flex-col m-20 text-light">
        <button
          className="mb-10 text-left"
          onClick={() => handleDisplay(comentarios)}
        >
          Total de mensajes:
          {comentarios.length}
        </button>

        <div className="mb-5">Mensajes por categoria:</div>
        <div className="sm:flex hidden items-end justify-center gap-5 h-auto overflow-hidden   bg-darkest p-20 justify-evenly max-w-4xl place-self-center">
          <div className="flex items-end gap-5 h-72 flex-nowrap  bg-darkest  justify-evenly">
            <BtnGraphyc
              categoria={observacion[1].categoria}
              height={heightObservacion}
              cantidad={observacion.length}
              byClick={() => handleDisplay(observacion)}
            />
            <BtnGraphyc
              categoria={felicitacion[1].categoria}
              height={heightFelicitacion}
              cantidad={felicitacion.length}
              byClick={() => handleDisplay(felicitacion)}
            />

            <BtnGraphyc
              categoria={sugerencia[1].categoria}
              height={heightSugerencia}
              cantidad={sugerencia.length}
              byClick={() => handleDisplay(sugerencia)}
            />

            <BtnGraphyc
              categoria={queja[1].categoria}
              height={heightQueja}
              cantidad={queja.length}
              byClick={() => handleDisplay(queja)}
            />
            <BtnGraphyc
              categoria={agradecimiento[1].categoria}
              height={heightAgradecimiento}
              cantidad={agradecimiento.length}
              byClick={() => handleDisplay(agradecimiento)}
            />
            <BtnGraphyc
              categoria={propuesta[0].categoria}
              height={heightPropuesta}
              cantidad={propuesta.length}
              byClick={() => handleDisplay(propuesta)}
            />
          </div>
        </div>
      </div>
      <div className=" overflow-hidden w-screen flex justify-center items-center flex-col">
        {toDisplay.map((item, index) => (
          <MensajeDashboard
            key={item.id}
            id={item.id}
            categoria={item.categoria}
            placa={item.placa}
            texto={item.texto}
            odio={item.odio}
            etiqueta={item.etiqueta}
            fecha={item.fecha}
            index={index}
          />
        ))}
      </div>
    </div>
  )
}

export async function loader({ request }) {
  const userId = await requireUserSession(request)
  const comentarios = await getAllComentarios()
  const observacion = await getAllComentariosCategoria('Observación')
  const felicitacion = await getAllComentariosCategoria('Felicitación')
  const sugerencia = await getAllComentariosCategoria('Sugerencia')
  const queja = await getAllComentariosCategoria('Queja')
  const agradecimiento = await getAllComentariosCategoria('Agradecimiento')
  const propuesta = await getAllComentariosCategoria('Propuesta')

  return {
    comentarios,
    observacion,
    felicitacion,
    sugerencia,
    queja,
    agradecimiento,
    propuesta,
    userId
  }
}

export async function action({ request }) {
  const formData = await request.formData()
  const mensajesData = Object.fromEntries(formData)
  console.log({ mensajesData })

  return mensajesData
}
