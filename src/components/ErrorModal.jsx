import { useNavigate } from 'react-router'
import XIcon from '../assets/icons/XIcon'
import Button from './Button'

export default function ErrorModal({ message = 'Error' }) {
  const redirect = useNavigate()

  function closeModal() {
    redirect('/')
  }

  return (
    <dialog
      open
      className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  p-4 rounded-lg flex flex-col w-80 h-40 justify-between"
    >
      <button
        onClick={closeModal}
        className="cursor-pointer place-self-end hover:scale-115 transition-all"
      >
        <XIcon />
      </button>
      <p className="text-center">Error: {message}</p>
      <Button
        type="error"
        text="Reintentar"
        onClickFunction={() => window.location.reload()}
      />
    </dialog>
  )
}
