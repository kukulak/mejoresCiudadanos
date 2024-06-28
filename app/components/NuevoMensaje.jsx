import {
  Form,
  useActionData,
  Link,
  useNavigation,
  useLoaderData,
  useParams,
  useMatches
} from '@remix-run/react'
import { createRef } from 'react'
import { useEffect, useState } from 'react'

const styles = {
  radioButton: {
    padding: '12px 16px',
    background: '#fff',
    maxWidth: '50%',
    borderRadius: '15px',
    cursor: 'pointer',
    transition: 'all .3s ease-in-out',
    minWidth: '220px',
    color: '#4f555f',
    border: 'solid 1px #4f555f'
  },
  selected: {
    background: '#4f555f',
    color: '#fff',
    boderColor: '#007Bff'
  },
  plate: {
    height: '0px',
    padding: '0px'
    // transition: 'all .3s ease-in-out',
    // transitionDelay: '1s'
  },
  inputPlacas: {
    height: '50px'
    // transition: 'all .3s ease-in-out',
    // transitionDelay: '1s'
  }
}

const OpcionesPlaca = ({ label, onSelect, selected, plate }) => {
  console.log('JUST PRINT ME MAN', onSelect)
  return (
    <div
      style={{
        ...styles.radioButton,
        ...(selected ? styles.selected : {}),
        ...(plate && selected ? styles.plate : {})
      }}
      onClick={onSelect}
    >
      {label}
    </div>
  )
}

export default function NuevoMensaje({ preLoadPlaca, url }) {
  const lData = useLoaderData()
  const data = useActionData()
  const navigation = useNavigation()
  const isSubmitting = navigation.state !== 'idle'

  const [changeValue, setChangeValue] = useState('')
  const [placaValue, setPlacaValue] = useState()
  const [selectedValue, setSelectedValue] = useState(null)

  const handleChange = event => {
    let index = event.target.selectedIndex
    setChangeValue(event.target.options[index].value)
  }

  const params = useParams()
  const placaInput = createRef()

  useEffect(() => {
    selectedValue === 'option2' && !preLoadPlaca && placaInput?.current.focus()
  }, [placaInput, selectedValue, preLoadPlaca])

  useEffect(() => {
    preLoadPlaca ? setSelectedValue('option2') : setSelectedValue('option1')
  }, [])

  useEffect(() => {
    let prePlaca
    if (preLoadPlaca) {
      prePlaca = lData.toUpperCase()
    } else if (selectedValue === 'option1') {
      prePlaca = 'general'
      // etiqueta = 'general'
    } else {
      prePlaca = ''
    }

    // preLoadPlaca ? (prePlaca = lData.toUpperCase()) : (prePlaca = '')
    // selectedValue === 'option1' && setPlacaValue('000000')
    console.log('lData: ', lData)
    setPlacaValue(prePlaca)
  }, [preLoadPlaca, lData, selectedValue])

  const handleChangePlaca = event => {
    setPlacaValue(event.target.value.toUpperCase())
  }

  const matches = useMatches()

  const { comentarios } = matches.find(
    match =>
      match.id === 'routes/dashboard' ||
      match.id === 'routes/home' ||
      match.id === 'routes/general' ||
      match.id === 'routes/placa' ||
      match.id === 'routes/propuestas'
  ).data

  const mensajeData =
    comentarios && comentarios.find(mensaje => mensaje.id === params.id)

  console.log('MiNSAJEDATA', params.id)
  const defaultValues = mensajeData
    ? {
        placa: mensajeData.placa,
        texto: mensajeData.texto,
        etiqueta: mensajeData.etiqueta,
        categoria: mensajeData.categoria
      }
    : {
        placa: '',
        texto: '',
        etiqueta: lData === 'propuestas' ? 'Propuesta' : 'general',
        categoria: ''
      }

  return (
    <Form
      className=" rounded-2xl bg-light min-w-full p-5 md:p-16 md:pt-18 flex-col flex gap-7 "
      // method="post"
      method={mensajeData ? 'patch' : 'post'}
      id="message-form"
    >
      <p className="flex flex-col">
        {/* <label htmlFor="categoria">Motivo</label> */}
        {lData !== 'propuestas' && !defaultValues.categoria && (
          <select
            className=" bg-medium   w-[220px] p-3 rounded-xl "
            id="categoria"
            name="categoria"
            required
            onChange={handleChange}
            value={changeValue}
            defaultValue={defaultValues.categoria}
          >
            <option value=""> Escoga un motivo </option>
            <option value="Sugerencia"> Sugerencia</option>
            <option value="Queja">Queja </option>
            <option value="Observación"> Observación</option>
            <option value="Felicitación"> Felicitación</option>
            <option value="Agradecimiento"> Agradecimiento </option>
            <option value="Propuesta"> Propuesta </option>
          </select>
        )}
      </p>

      {lData !== 'propuestas' && !defaultValues.categoria && (
        <div className="flex flex-row gap-4 md:items-start flex-wrap items-center justify-start ">
          {/* justify-center */}
          <OpcionesPlaca
            plate={false}
            label="Para todos los ciudadanos"
            selected={selectedValue === 'option1'}
            onSelect={() => setSelectedValue('option1')}
          />
          <div className="flex flex-col">
            <OpcionesPlaca
              // plate={true}
              label="Placa específica"
              selected={selectedValue === 'option2'}
              onSelect={() => setSelectedValue('option2')}
            />
          </div>
        </div>
      )}

      {!defaultValues.categoria && (
        <div className="">
          {(selectedValue === 'option2' || selectedValue === 'option1') && (
            <div className="flex flex-row gap-4 items-start   ">
              {selectedValue === 'option2' ? (
                <p className="flex flex-col">
                  <label htmlFor="placa">Placas</label>
                  {data?.message && <p className="py-5">{data.message}</p>}
                  <input
                    ref={placaInput}
                    // style={{
                    //   ...(selectedValue === 'option2'
                    //     ? styles.inputPlacas
                    //     : styles.plate)
                    // }}
                    className=" animate-especifica text-center text-2xl bg-dark text-light w-[160px] p-3 pt-4 rounded-xl "
                    type="text"
                    id="placa"
                    name="placa"
                    onChange={handleChangePlaca}
                    // value={lData.toUpperCase()}
                    value={placaValue}
                    required
                    defaultValue={defaultValues.placa}
                  />
                </p>
              ) : (
                <>
                  <p className="">
                    {' '}
                    Se publicará en la sección{' '}
                    <span>
                      {' '}
                      {lData === 'propuestas' ? 'Propuestas' : 'General'}
                    </span>{' '}
                  </p>
                  <input
                    // ref={placaInput}
                    className=" text-center text-2xl bg-dark text-light w-[160px] p-3 pt-4 rounded-xl "
                    type="hidden"
                    id="placa"
                    name="placa"
                    // onChange={handleChangePlaca}
                    value=""
                    // value={placaValue}
                    required
                    // defaultValue={defaultValues.placa}
                  />
                  <input
                    // ref={placaInput}
                    className=" text-center text-2xl bg-dark text-light w-[160px] p-3 pt-4 rounded-xl "
                    type="hidden"
                    id="etiqueta"
                    name="etiqueta"
                    onChange={handleChangePlaca}
                    // value={lData.toUpperCase()}
                    value={lData === 'propuestas' ? 'Propuesta' : 'general'}
                    required
                    defaultValue={defaultValues.etiqueta}
                  />
                </>
              )}
            </div>
          )}
        </div>
      )}
      {/* <OpcionesPlaca
        label="Para todos los ciudadanos"
        selected={selectedValue === 'option3'}
        onSelect={() => setSelectedValue('option3')}
      /> */}

      <p className="flex flex-col min-w-full">
        {!defaultValues.texto && (
          <label htmlFor="texto">
            Escriba su{' '}
            {/* {lData !== 'propuestas' ? changeValue.toLowerCase() : 'Propuesta'} */}
            {lData === 'propuestas' || lData === 'general'
              ? lData
              : changeValue.toLowerCase()}
          </label>
        )}
        <textarea
          className=" bg-medium min-h-80  p-3 rounded-xl  "
          id="texto"
          name="texto"
          required
          defaultValue={defaultValues.texto}
        />
      </p>
      <div className=" mt-5 flex md:justify-end flex-wrap justify-center flex-row gap-5">
        <Link
          className=" bg-light border-orange-300 border-2 px-10 py-3 text-dark rounded-lg hover:bg-darkest  hover:border-light    "
          to=".."
        >
          Cancelar
        </Link>
        <button
          className=" bg-dark px-10 py-3 text-light hover:text-orange-300 rounded-lg"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Publicando...' : 'Publicar'}
        </button>
      </div>
    </Form>
  )
}
