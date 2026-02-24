import { useState, useEffect } from 'react'

export const useScroll = (initialLimit = 10, step = 10) => {
  const [limit, setLimit] = useState(initialLimit)

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop + 1 >=
        document.documentElement.scrollHeight
      ) {
        setLimit((prevLimit) => prevLimit + step)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [step])

  return { limit }
}
