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

import pencilIcon from '../../public/icons/Compose.svg'

import { getStoredNotes, storeNotes } from '../data/notes'
import { getComentariosDePlaca } from '../../data/comentario.server'
import Compose from '../components/Compose'

export default function PlacaId() {
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

      {/* <div className="flex items-center flex-col gap-3 pt-28 pb-72 ">
       */}
      <div className=" min-h-screen pb-72 flex items-center flex-col gap-3 pt-10 sm:pt-28  ">
        {/* <section className=" w-3/4 2xl:w-1/2 flex flex-row gap-3 "> */}
        <section className=" justify-center md:w-auto 2xl:w-auto items-center sm:flex flex-wrap sm:items-start flex-row gap-3 ">
          <section className="max-w-80 flex sm:flex-col flex-col-reverse gap-3 lg:sticky top-20 lg:h-10 ">
            <Buscador />

            <section className="bg-light p-12 py-20 rounded-xl">
              <div className=" text-xl min-w-56 flex flex-col items-center h-min m-0   text-center">
                {' '}
                {allNotes.length > 0 && (
                  <>
                    {' '}
                    Estás viendo las sugerencias, quejas y observaciones del
                    número de placa:
                    <div className="">
                      <div className=" font-formulaLight bg-dark text-light mt-10 rounded-xl w-max pt-3 pb-2 px-6  text-3xl shadow-2xl shadow-white ">
                        {[
                          placa.slice(0, 3).toUpperCase(),
                          '-',
                          placa.slice(3).toUpperCase()
                        ].join('')}
                      </div>
                    </div>
                  </>
                )}
                {allNotes.length <= 0 && (
                  <>
                    <div className="block sm:flex flex-col gap-3 max-w-80 sm:min-w-[620px] ">
                      <div className=" font-formulaLight bg-dark text-light mb-10 rounded-xl w-max pt-3 pb-2 px-6  text-3xl ">
                        {[
                          placa.slice(0, 3).toUpperCase(),
                          '-',
                          placa.slice(3).toUpperCase()
                        ].join('')}
                      </div>
                    </div>{' '}
                    Aun no tiene sugerencias, quejas ni observaciones, se el
                    primero.
                  </>
                )}
              </div>
            </section>
            <div style={{ opacity: 0 }} ref={circle} className="box -z-10">
              <Compose />
            </div>
          </section>
          <section className=" block sm:flex flex-col gap-3 max-w-80 min-w-[620px]  ">
            <div ref={container}>
              <Compose />
            </div>
            <div className="flex flex-col gap-3 p-0  rounded-xl bg-transparent  justify-between mb-20">
              {allNotes.length >= 1 ? (
                allNotes.map((item, index) => (
                  <Mensaje
                    key={item.id}
                    texto={item.texto}
                    tipo={item.categoria}
                    fecha={item.fecha}
                    odio={item.odio}
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
  const allNotes = await getComentariosDePlaca(placa)
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
  if (
    /\d/.test(mensajeData.placa) === false ||
    /[a-zA-Z]/.test(mensajeData.placa) === false
  ) {
    return { message: 'Las placas deben estar compuestas por números y letras' }
  }
  const purePlaca = mensajeData.placa
    .toLowerCase()
    .trim()
    .replace(/[^\w]/gi, '')

  return { placas: mensajeData.placas }, redirect(`/placa/${purePlaca}`)
}
