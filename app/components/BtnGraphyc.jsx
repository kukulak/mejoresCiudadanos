export default function BtnGraphyc({ cantidad, categoria, height, byClick }) {
  return (
    <button
      onClick={byClick}
      className="flex  flex-col items-center h-full justify-end hover:text-orange-200 "
      style={{ zIndex: cantidad }}
    >
      <div
        className="bg-light shadow-[0px_0px_500px_200px_rgba(40,40,40,0.15)] flex flex-col-reverse text-xs rounded-md  hover:bg-orange-200 text-darkest min-h-5 leading-[0px] p-5 "
        style={{ height: height + '%', fontSize: height / 3 + 'px' }}
      >
        {cantidad}
      </div>{' '}
      <p className="mt-2 text-[10px]">{categoria}</p>
    </button>
  )
}
