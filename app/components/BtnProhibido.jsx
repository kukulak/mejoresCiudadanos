const BtnProhibido = ({ handleClick, texto, color, nivel, show }) => {
  const shows = { backgroundColor: color, display: 'block' }
  const hidde = { display: 'none' }
  return (
    <button
      onClick={handleClick}
      className={`z-0 select-none bg-dark ${nivel} text-light py-2 text-justify `}
      style={show ? shows : hidde}
      // style={{ backgroundColor: 'rgb(126 26 26)' }}
    >
      {texto} {texto} {texto} {texto} {texto}
    </button>
  )
}

export default BtnProhibido
