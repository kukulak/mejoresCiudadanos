import { prisma } from './database.server'

import nodemailer from 'nodemailer'

export async function post(req, res) {
  const { name, email, subject, message } = req.body

  try {
    // Guardar los datos del formulario en la base de datos
    await prisma.contactForm.create({
      data: {
        name,
        email,
        subject,
        message
      }
    })

    // Enviar correo electrónico de notificación
    const transporter = nodemailer.createTransport({
      // Configuración del servicio de correo electrónico (por ejemplo, SMTP)
      host: 'smtpout.secureserver.net',
      port: 465, // Puerto seguro SSL/TLS
      secure: true, // Usa SSL/TLS
      auth: {
        user: 'yaeshora@ahorraahora.com', // Dirección de correo electrónico de GoDaddy
        pass: 'tu_contraseña' // Contraseña de la cuenta de correo de GoDaddy
      }
    })

    const mailOptions = {
      from: 'yaeshora@ahorraahora.com',
      to: 'yaeshora@ahorraahora.com',
      subject: 'Nuevo mensaje de mejoresCiudadanos',
      text: `Has recibido un nuevo mensaje de contacto de ${name} (${email}). Asunto: ${subject}. Mensaje: ${message}`
    }

    await transporter.sendMail(mailOptions)

    // Enviar respuesta al cliente
    res
      .status(200)
      .json({ message: 'Formulario de contacto recibido con éxito' })
  } catch (error) {
    console.error('Error procesando formulario:', error)
    // Si ocurre un error, devuelve un mensaje de error al cliente
    res
      .status(500)
      .json({ message: 'Ocurrió un error al procesar el formulario' })
  }
}
