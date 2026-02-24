export default function Button({
  text = 'text',
  type = 'success',
  onClickFunction,
}) {
  function handleClick() {
    onClickFunction()
  }

  const typeColor = [
    type === 'error' && 'bg-red-500 hover:bg-red-600',
    type === 'success' && 'bg-green-500 hover:bg-green-600',
    type === 'alert' && 'bg-yellow-500 hover:bg-yellow-600',
  ]

  return (
    <button
      onClick={handleClick}
      className={`cursor-pointer rounded-lg w-fit py-1 px-2 text-white transition-all mx-auto ${typeColor}`}
    >
      {text}
    </button>
  )
}
