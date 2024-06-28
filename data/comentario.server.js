import { prisma } from './database.server'

export async function addComentario(comentarioData, userId) {
  try {
    console.log({ comentarioData })
    return await prisma.Comentario.create({
      data: {
        placa: comentarioData.placa,
        categoria: comentarioData.categoria,
        texto: comentarioData.texto,
        odio: comentarioData.odio,
        etiqueta: comentarioData.etiqueta,
        authorIP: comentarioData.authorIP
      }
    })
  } catch (error) {
    // throw new Error('Adding a dream Failed.')
    throw new Error(error)
  }
}

export async function updateComentario(id, comentarioData) {
  try {
    await prisma.Comentario.update({
      where: { id },
      data: {
        placa: comentarioData.placa,
        categoria: comentarioData.categoria,
        texto: comentarioData.texto,
        etiqueta: comentarioData.etiqueta
      }
    })
  } catch (error) {
    throw new Error(error)
  }
}

export async function getComentariosDePlaca(placa) {
  try {
    const comentarios = await prisma.Comentario.findMany({
      where: { placa: placa },
      orderBy: { fecha: 'desc' }
    })

    return comentarios
  } catch (error) {
    // 'Fallo al obtener comentarios.'
    throw new Error(error)
  }
}

export async function getComentariosDeEtiqueta(etiqueta) {
  try {
    const comentarios = await prisma.Comentario.findMany({
      where: { etiqueta: etiqueta },
      orderBy: { fecha: 'desc' }
    })
    console.log('ETIQUETA!!!', comentarios)

    return comentarios
  } catch (error) {
    // 'Fallo al obtener comentarios.'
    throw new Error(error)
    // throw new Error(error)
  }
}

export async function getCensurados() {
  try {
    const censurados = await prisma.Comentario.findMany({
      where: { odio: 'MUCHO' },
      orderBy: { fecha: 'desc' }
    })
    return censurados
  } catch (error) {
    throw new Error(error)
  }
}

export async function getAllComentariosPlacas() {
  // if (placa !== '') {}
  try {
    const mensajes = await prisma.Comentario.findMany({})
    const placas = mensajes.map(comentario => comentario.placa)
    const dataArr = new Set(placas)
    // let allPlacas = [...dataArr.filter(placa => placa !== '')]
    let allPlacas = [...dataArr].filter(placa => placa !== '')
    // let allPlacas = [...dataArr]

    console.log('SOLAMENTE LAS PLACAS', allPlacas)
    return allPlacas
  } catch (error) {
    throw new Error(error)
  }
}

export async function getAllComentarios() {
  try {
    const mensajes = await prisma.Comentario.findMany({
      orderBy: { fecha: 'desc' }
    })
    const placas = mensajes.map(comentario => comentario.placa)
    console.log('SOLO LAS PLACAS', placas)
    const dataArr = new Set(placas)
    let allPlacas = [...dataArr]

    return mensajes
  } catch (error) {
    throw new Error(error)
  }
}

export async function getAllComentariosCategoria(categoria) {
  try {
    const mensajes = await prisma.Comentario.findMany({
      where: { categoria: categoria },
      orderBy: { fecha: 'desc' }
    })

    return mensajes
  } catch (error) {
    throw new Error(error)
  }
}

export async function deleteComentario(id) {
  try {
    await prisma.Comentario.delete({
      where: { id }
    })
  } catch (error) {
    throw new Error('Failed to delete dream.')
  }
}
