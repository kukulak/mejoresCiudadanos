import { useState } from 'react'
import {
  Form,
  useActionData,
  Link,
  useNavigation,
  useLoaderData
} from '@remix-run/react'

function CreateUser() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: ''
  })

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      const response = await fetch('../../data/contact.server.js', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })

      if (response?.ok) {
        alert('¡Formulario enviado con éxito!')
      } else {
        alert(
          'Error al enviar el formulario. Por favor, inténtalo de nuevo más tarde.'
        )
      }
      // Aquí puedes manejar la respuesta del servidor, por ejemplo, mostrar un mensaje de éxito al usuario.
    } catch (error) {
      console.error('Error submitting form:', error)
      // Aquí puedes manejar cualquier error que ocurra durante el envío del formulario.
    }
  }

  return (
    <div className=" h-screen flex justify-center items-center">
      <div className="flex justify-center items-center flex-col bg-light rounded-xl lg:w-1/2">
        <Form
          className=" rounded-2xl bg-light min-w-full p-6 flex-col flex gap-7 "
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col">
            <label htmlFor="name">Nombre: </label>
            <input
              className=" text-center text-2xl bg-dark text-light p-3 pt-4 rounded-xl "
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="email">Correo electrónico:</label>
            <input
              className=" text-center text-2xl bg-dark text-light  p-3 pt-4 rounded-xl "
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="password">Password:</label>
            <input
              className=" text-center text-2xl bg-dark text-light  p-3 pt-4 rounded-xl "
              type="text"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="role">Role:</label>
            <input
              className=" text-center text-2xl bg-dark text-light  p-3 pt-4 rounded-xl "
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit">Enviar</button>
        </Form>
      </div>
    </div>
  )
}

export default CreateUser
