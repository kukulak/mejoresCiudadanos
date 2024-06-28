import { Link, redirect, Outlet, useLoaderData } from '@remix-run/react'

import pencilIcon from '../../public/icons/Compose.svg'

const Compose = ({ url }) => {
  return (
    <>
      <Link to={url ? url : './add'}>
        <div className=" min-w-[321px] flex flex-row p-0 sm:w-2/3 rounded-xl  bg-darkest justify-between">
          {' '}
          <div className=" font-formulaLight text-light rounded-l-xl text-lg  w-max py-5 px-6">
            {' '}
            ¿Tienes algo qué decir?
          </div>
          <div className="text-light flex rounded-r-2xl bg-dark hover:bg-darkest  w-max p-3 py-5 px-6">
            <img
              className=" "
              alt="Escribir opinion"
              src={pencilIcon}
              width={35}
              height={35}
            />
          </div>
        </div>
      </Link>
    </>
  )
}

export default Compose
