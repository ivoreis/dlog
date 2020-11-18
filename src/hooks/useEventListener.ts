import { useRef, useEffect } from 'react'

export default function useEventListener(
  eventName: string,
  handler: Function,
  element = typeof window !== 'undefined' ? window : null,
) {
  const savedHandler = useRef<Function>()

  useEffect(() => {
    savedHandler.current = handler
  }, [handler])

  useEffect(() => {
    const eventListener = (event: Event) => {
      if (savedHandler && savedHandler.current !== undefined) {
        savedHandler?.current(event)
      }
    }

    if (element && element.addEventListener) {
      element.addEventListener(eventName, eventListener)
    }

    return () => {
      if (element && element.removeEventListener) {
        element.removeEventListener(eventName, eventListener)
      }
    }
  }, [eventName, element])
}
