import { Link, redirect, Outlet, useLoaderData } from '@remix-run/react'

import Buscador from '../components/Buscador'
import {
  getAllComentarios,
  getAllComentariosPlacas
} from '../../data/comentario.server'

import pencilIcon from '../../public/icons/Compose.svg'
import Compose from '../components/Compose'

export const meta = () => {
  return [
    { title: 'Mejores Ciudadanos' },
    {
      name: 'description',
      content:
        'La intencion es que nos enfrentemos a nuestras fallas para ser mejores ciudadanos!'
    }
  ]
}

export default function Home() {
  const placas = useLoaderData()
  return (
    <>
      <Outlet />
      <div className=" min-h-screen flex items-center flex-col gap-3 py-10 pt-10 sm:pt-28">
        <section className=" w-full sm:w-3/5 md:w-1/2 flex-wrap sm:flex-nowrap  flex flex-row gap-4 items-start justify-center">
          <div className=" max-w-80 flex flex-col gap-4 ">
            <Buscador />

            <div className="hidden sm:flex flex-col animate-placa rounded-xl bg-light p-7">
              <h2>ÚLTIMAS PLACAS</h2>
              <div className="  my-5 flex flex-wrap flex-row gap-2">
                {placas?.slice(0, 8).map(item => (
                  <Link
                    className="bg-dark w-[82px] text-[.74rem]  text-light min-h-8 flex justify-center items-center rounded-lg select-none"
                    to={`/placa/${item}`}
                    key={item}
                  >
                    {[
                      item.slice(0, 3).toUpperCase(),
                      '-',
                      item.slice(3).toUpperCase()
                    ].join('')}
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <div className="flex w-5/6 gap-4 flex-col">
            <div className=" animate-mensaje rounded-xl bg-light p-5 ">
              {' '}
              <p>
                Imagina que observas una situación en la vía pública que te
                parece inapropiada. En lugar de ignorarla, decides registrar los
                detalles y compartirlos en este espacio. La idea no es señalar
                ni criticar, sino fomentar un ambiente de mejora continua. Al
                mismo tiempo, al compartir tus observaciones, permites que más
                personas opinen al respecto, lo que puede ofrecer una
                perspectiva más amplia y comprensiva. Todos tenemos áreas en las
                que podemos crecer y aprender, y al colaborar juntos, podemos
                ser más empáticos y comprensivos. Cumplir con las reglas no se
                trata solo de evitar sanciones; se trata de promover el respeto
                y la cortesía entre todos. Juntos, podemos construir una
                comunidad más positiva y amable.
              </p>
            </div>
            <div className="sm:hidden flex flex-col animate-placa rounded-xl bg-light p-7">
              <h2>ÚLTIMAS PLACAS</h2>
              <div className=" sm:hidden flex my-5  flex-wrap flex-row gap-2">
                {placas?.map(item => (
                  <Link
                    className="bg-dark w-[82px] text-[.74rem]  text-light min-h-8 flex justify-center items-center rounded-lg select-none"
                    to={`/placa/${item}`}
                    key={item}
                  >
                    {[
                      item.slice(0, 3).toUpperCase(),
                      '-',
                      item.slice(3).toUpperCase()
                    ].join('')}
                  </Link>
                ))}
              </div>
            </div>

            <Compose />
          </div>
        </section>
        <section className="w-1/2 mt-10">
          <h2 className=" text-2xl font-formulaLight my-3">
            Recomendaciones para mejorar
          </h2>
          <div className="rounded-xl bg-light p-5">
            <div>video</div>
          </div>
        </section>
      </div>
    </>
  )
}

export async function loader() {
  const placas = await getAllComentariosPlacas()
  // const placas = comentarios.placa
  console.log(placas, 'PLACAS')
  return placas
}

export async function action({ request }) {
  const formData = await request.formData()
  const mensajeData = Object.fromEntries(formData)

  // .replace(/\s+/g, ''

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
