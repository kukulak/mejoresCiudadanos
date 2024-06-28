import { redirect, useNavigate } from '@remix-run/react'
import { addComentario } from '../../data/comentario.server'
import NuevoMensaje from '../components/NuevoMensaje'
import Modal from '../util/Modal'
import nivelOdio from '../util/nivelOdio'
import { json } from '@remix-run/node'
import { getStoredNotes, storeNotes } from '../data/notes'

export default function IndexAdd() {
  const navigate = useNavigate()
  function closeHandler() {
    //navigate programmatically
    navigate('/')
  }
  return (
    <Modal onClose={closeHandler}>
      <NuevoMensaje preLoadPlaca={false} />
    </Modal>
  )
}

export async function loader({ request }) {
  const reqPlaca = request.url
  const placa = reqPlaca.split('/')
  console.log('IPIPIP', placa[4])
  return placa[4]
}

export async function action({ request }) {
  const formData = await request.formData()
  const mensajeData = Object.fromEntries(formData)

  if (!mensajeData.placa === '000000') {
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
      return {
        message: 'Las placas deben estar compuestas por números y letras'
      }
    }
  }

  mensajeData.odio = nivelOdio(mensajeData.texto)

  // Obtener la dirección IP del visitante desde la solicitud HTTP
  let ip = ''
  if (request.connection) {
    ip = request.connection.remoteAddress || ''
  }

  // Puedes devolver la dirección IP como parte de la carga útil
  // return json({ ip });
  const purePlaca = mensajeData.placa
    .toLowerCase()
    .trim()
    .replace(/[^\w]/gi, '')

  mensajeData.authorIP = ip
  mensajeData.placa = purePlaca
  await addComentario(mensajeData)

  const existingNotes = await getStoredNotes()
  mensajeData.id = new Date().toISOString()
  const updatedNotes = existingNotes.concat(mensajeData)
  await storeNotes(updatedNotes)

  return json({ placa: purePlaca }), redirect('..')
}
