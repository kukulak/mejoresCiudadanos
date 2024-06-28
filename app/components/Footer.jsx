import { Link, NavLink } from '@remix-run/react'

export default function Footer() {
  return (
    <div className="footer flex  flex-row justify-center bg-darkest text-light p-3 font-formulaLight px-10 py-10">
      <div className="flex flex-row gap-5 flex-wrap">
        <NavLink to="/terminos_y_condiciones">
          {' '}
          <h2 className="text-xl"> Términos y Condiciones </h2>{' '}
        </NavLink>
        <NavLink to="aviso_de_privacidad">
          {' '}
          <h2 className="text-xl"> Aviso de Privacidad </h2>{' '}
        </NavLink>
        <NavLink to="/auth">
          {' '}
          <h2 className="text-xl">• </h2>{' '}
        </NavLink>
        <NavLink to="/dashboard">
          {' '}
          <h2 className="text-xl">• </h2>{' '}
        </NavLink>
        <NavLink to="/tecnologias">
          {' '}
          <h2 className="text-xl"> Tecnologías </h2>{' '}
        </NavLink>

        <NavLink to="/contacto">
          {' '}
          <h2 className="text-xl"> Contacto </h2>{' '}
        </NavLink>
      </div>
    </div>
  )
}
