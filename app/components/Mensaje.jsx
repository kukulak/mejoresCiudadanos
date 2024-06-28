import { Link } from '@remix-run/react'
import { useRef, useState } from 'react'
import BtnProhibido from './BtnProhibido'

import gsap from 'gsap/gsap-core'

import { useGSAP } from '@gsap/react'

export default function Mensaje({ index, placa, tipo, fecha, texto, odio }) {
  const anim1 = useRef()

  const tipoClass = tipo
    ?.toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
  console.log('tipoCALSS', tipoClass)

  const [showBotton, setShowBotton] = useState(true)

  const handleClick = () => {
    setShowBotton(!showBotton)
  }

  useGSAP(() => {
    gsap.from(anim1.current, { y: 20, opacity: 0, delay: index / 20 })
  })

  return (
    <div
      ref={anim1}
      className={` overflow-hidden rounded-xl bg-light p-5 ${tipoClass} grid`}
    >
      <div className="col-start-1 row-start-1 grid w-10/12 -rotate-12">
        {' '}
        {odio === 'POCO' && (
          <>
            <BtnProhibido
              handleClick={handleClick}
              color={'rgb(153 27 27)'}
              texto="Texto ofensivo. Nivel 1."
              nivel="poco"
              show={showBotton}
            />
          </>
        )}
        {odio === 'MEDIO' && (
          <>
            {/* {showBotton && ( */}
            <BtnProhibido
              nivel="medio"
              handleClick={handleClick}
              color={'rgb(153 27 27)'}
              texto="Texto ofensivo. Nivel 2. Texto con odio."
              show={showBotton}
            />
            {/* )} */}
            {/* {showBotton && ( */}
            <BtnProhibido
              nivel="mucho"
              handleClick={handleClick}
              color={'rgb(97 47 45)'}
              texto="Texto con odio. Nivel 2. Odio."
              show={showBotton}
            />
            {/* )} */}
          </>
        )}
        {odio === 'MUCHO' && (
          <>
            <BtnProhibido
              handleClick={handleClick}
              color={'rgb(153 27 27)'}
              texto="Aquí hay mucho odio. Nivel 3. Odio."
              nivel="poco"
              show={showBotton}
            />
            <BtnProhibido
              handleClick={handleClick}
              color={'rgb(97 47 45)'}
              texto="Odio, mucho odio. Nivel 3. Odio. Nivel 3."
              nivel="medio"
              show={showBotton}
            />
            <BtnProhibido
              handleClick={handleClick}
              color={'rgb(200 23 10)'}
              texto="Texto ofensivo. Nivel 3. Mucho odio."
              nivel="mucho"
              show={showBotton}
            />
          </>
        )}
      </div>
      <div className=" col-start-1 row-start-1">
        <header className="flex justify-between mb-5 font-formulaLight">
          <div className="flex flex-row gap-5">
            {placa && (
              <Link
                to={`../placa/${placa}`}
                className="text-light p-3 pb-2 bg-dark rounded-lg"
              >
                {' '}
                {placa.toUpperCase()}{' '}
              </Link>
            )}{' '}
            <p> {tipo} </p>
          </div>
          <p>
            {' '}
            {new Date(fecha).toLocaleDateString('es-MX', {
              day: 'numeric',
              month: 'short',
              year: 'numeric'
            })}
          </p>
        </header>
        <p className="tracking-wide  leading-7">{texto}</p>
      </div>
    </div>
  )
}
