export default function nivelOdio(comentario) {
  const palabrasOfensivas = [
    'asalareado',
    'cabrón',
    'caca',
    'cabron',
    'chingas',
    'chinga',
    'chinga tu madre',
    'culo',
    'de la verga',
    'decerebrado',
    'fea',
    'feo',
    'feto',
    'gorda',
    'gordo',
    'hijo de puta',
    'imbecil',
    'idiota',
    'indio',
    'joto',
    'kaka',
    'kks',
    'kakas',
    'tu mamá',
    'tu mama',
    'topil',
    'mierda',
    'me la pelas',
    'mal parido',
    'malparido',
    'mal parida',
    'malparida',
    'marica',
    'naco',
    'negro',
    'odio',
    'ofendido',
    'payaso',
    'parido',
    'parida',
    'pelana',
    'pedazo',
    'pelas',
    'pelaná',
    'pedo',
    'pendejo',
    'pinches',
    'pito',
    'popo',
    'puta',
    'puto',
    'putazo',
    'verga',
    'vrg'
  ] // Lista de palabras ofensivas

  // const quitaComas = /,/gm
  const quitaComas = /[,.?¿!¡]+/g

  const palabrasComentario = comentario
    .toLowerCase()
    .replace(quitaComas, '')
    .split(/\s+/)
  // Dividir el comentario en palabras y convertirlas a minúsculas
  console.log('PALABRAS DE ODIO', palabrasComentario)
  let ofensividad = 0 // Nivel de ofensividad del comentario

  palabrasComentario.forEach(palabra => {
    if (palabrasOfensivas.includes(palabra)) {
      // Si la palabra está en la lista de palabras ofensivas, aumenta el nivel de ofensividad
      ofensividad++
    }
  })

  if (ofensividad <= 0) {
    return 'NADA' // Clasificar como poco ofensivo si se detectan hasta 2 palabras ofensivas
  } else if (ofensividad <= 2) {
    return 'POCO' // Clasificar como medio ofensivo si se detectan hasta 5 palabras ofensivas
  } else if (ofensividad <= 3) {
    return 'MEDIO' // Clasificar como medio ofensivo si se detectan hasta 5 palabras ofensivas
  } else {
    return 'MUCHO' // Clasificar como muy ofensivo si se detectan más de 5 palabras ofensivas
  }
}

// Ejemplo de uso
const comentario =
  'Este, comentario! odio, putazo, vrg, pinches, contiene? una palabra ofensiva.'
const nivelOfensividad = nivelOdio(comentario)
console.log('Nivel de ofensividad:', nivelOfensividad)
