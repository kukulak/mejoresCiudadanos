import {
  Link,
  Outlet,
  redirect,
  useLoaderData,
  useActionData
} from '@remix-run/react'

import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import { useRef } from 'react'

import Buscador from '../components/Buscador'
import Mensaje from '../components/Mensaje'

import { getStoredNotes, storeNotes } from '../data/notes'
import { getCensurados } from '../../data/comentario.server'

export default function Censurados() {
  gsap.registerPlugin(ScrollTrigger, useGSAP)

  const { allNotes, placa } = useLoaderData()
  const data = useActionData()
  console.log(data)

  const container = useRef()
  const circle = useRef()

  useGSAP(
    () => {
      //refs...
      // gsap.to(circle.current, { rotationY: '-=360', duration: 3 })

      gsap.to(circle.current, {
        scrollTrigger: {
          trigger: container.current,
          toggleAction: 'restart resume resume restart',
          start: 'top 10%',
          scrub: true
          // markers: true
        },
        x: 0,
        opacity: 1
      })

      // gsap.to(circle.current, {
      //   // opacity: 0,
      //   x: -100
      // })
    }
    // { scope: container }
  ) // <-- scope for selector text (optional)

  return (
    <>
      <Outlet />

      <div className="flex pb-72 items-center flex-col gap-3 sm:pt-28  min-h-screen pt-10">
        <section className=" justify-center md:w-auto 2xl:w-auto items-center sm:flex flex-wrap sm:items-start flex-row gap-3 ">
          <section className=" max-w-80 flex sm:flex-col flex-col-reverse gap-3 lg:sticky top-20 md:h-10 ">
            <Buscador />

            <section className=" bg-light p-12 py-20 rounded-xl">
              <div className=" text-xl min-w-56 flex flex-col items-center h-min m-0   text-center">
                {' '}
                Aquí encuentras los comentarios más ofensivos y censurados por
                nuestros moderadores. Proceda con cautela.
              </div>
            </section>
          </section>
          <section className="block sm:flex flex-col gap-3 max-w-80 sm:min-w-[620px]  ">
            <div className="flex flex-col gap-3 p-0  rounded-xl bg-transparent  justify-between">
              {allNotes.length >= 1 ? (
                allNotes.map((item, index) => (
                  <Mensaje
                    key={item.id}
                    texto={item.texto}
                    tipo={item.categoria}
                    fecha={item.fecha}
                    odio={item.odio}
                    placa={item.placa}
                    index={index}
                  />
                ))
              ) : (
                <div className="bg-light font-formulaLight text-dark rounded-xl text-lg  w-max py-5 px-6">
                  {' '}
                  Q Aun no hay opiniones de esta PLACA, sé el Primero
                </div>
              )}
            </div>
          </section>
        </section>
      </div>
    </>
  )
}

export async function loader({ params, request }) {
  const placa = params.id
  console.log('PLACAPARAMS', placa)
  // const placaNotes = { notes, placa }
  const allNotes = await getCensurados(placa)
  const notes = await getStoredNotes()
  return { placa, allNotes }
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
  const purePlaca = mensajeData.placa
    .toLowerCase()
    .trim()
    .replace(/[^\w]/gi, '')

  return { placas: mensajeData.placas }, redirect(`/placa/${purePlaca}`)
}
