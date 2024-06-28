function Modal({ children, onClose }) {
  return (
    <div
      className="top-0 right-0 fixed z-50 w-full h-screen bg-darkest bg-opacity-85  modal-backdrop flex justify-items-center items-cente pt-[8%] overflow-auto"
      onClick={onClose}
    >
      <dialog
        className=" w-1/2 artmodal bg-grey flex flex-row flex-wrap gap-5 bg-transparent justify-items-start mt-32 pt-5"
        open
        onClick={event => event.stopPropagation()}
      >
        {children}
      </dialog>
    </div>
  )
}

export default Modal
