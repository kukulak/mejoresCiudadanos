import { useState } from 'react'

import {
  Form,
  Link,
  redirect,
  useNavigation,
  useActionData
} from '@remix-run/react'

import searchIcon from '../../public/icons/Search.svg'

export default function Buscador() {
  const data = useActionData()
  const navigation = useNavigation()
  const isSubmitting = navigation.state !== 'idle'

  const [placa, setPlaca] = useState('')

  const handleChange = event => {
    setPlaca(event.target.value.toUpperCase())
  }

  const handleSubmit = event => {
    setPlaca('')
  }

  return (
    <Form
      className=" animate-buscador min-w-80   max-w-96  h-min rounded-xl bg-light p-7 font-formulaLight"
      onSubmit={handleSubmit}
      method="post"
      id="placaForm"
    >
      {data?.message && <p className="text-red-500 "> {data.message} </p>}
      <p className="text-xl ">Buscar Placas</p>
      <div className="flex flex-row ">
        <input
          id="placa"
          name="placa"
          type="text"
          required
          value={placa}
          onChange={handleChange}
          placeholder=""
          className="text-2xl bg-dark text-light rounded-l-xl w-full  p-3 pt-4 pl-5 "
        />

        <button
          disabled={isSubmitting}
          className=" p-3 pt-4 pl-5 text-light text-2xl bg-darkest w-max rounded-r-xl"
        >
          {isSubmitting ? (
            '..'
          ) : (
            <img
              className="invert hover:invert-0 "
              src={searchIcon}
              alt="Buscar"
              width={35}
              height={35}
            />
          )}
        </button>
      </div>
    </Form>
  )
}
