import { useEffect, useState } from "react"

export default function useIsSmall() {
    const [isSmall, setIsSmall] = useState(false)
    useEffect(() => {
      const mq = window.matchMedia('(max-width: 639px)')
      const update = () => setIsSmall(mq.matches)
      update()
      mq.addEventListener('change', update)
      return () => mq.removeEventListener('change', update)
    }, [])
    return isSmall
  }