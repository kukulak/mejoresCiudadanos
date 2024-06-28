import { Link, NavLink } from '@remix-run/react'

export default function Header() {
  return (
    <div className="flex flex-wrap flex-row justify-between bg-darkest text-light p-3 font-formulaLight px-10 sm:px-20 py-10">
      <NavLink to="/">
        {' '}
        <h2 className="mb-10 sm:mb-0 text-2xl"> mejoresCiudadanos.mx</h2>{' '}
      </NavLink>
      <div className="flex flex-row gap-5">
        <NavLink to="/objetivo">
          {' '}
          <h2 className="text-xl"> Objetivo </h2>{' '}
        </NavLink>

        <NavLink to="/general">
          {' '}
          <h2 className="text-xl"> Generales </h2>{' '}
        </NavLink>

        <NavLink to="/propuestas">
          {' '}
          <h2 className="text-xl"> Propuestas </h2>{' '}
        </NavLink>
        <NavLink to="/censurados">
          {' '}
          <h2 className="text-xl"> Censurados </h2>{' '}
        </NavLink>
      </div>
    </div>
  )
}
