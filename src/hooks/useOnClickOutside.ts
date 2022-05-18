import { useEffect, RefObject } from "react"

export function useOnClickOutside<T extends HTMLElement = HTMLElement>( ref: RefObject<T>, 
    handler: (event: MouseEvent | TouchEvent) => void ): void {
    useEffect(() => {
        const listener = (event: MouseEvent | TouchEvent) => {
            const el = ref?.current
                // Do nothing if clicking ref's element or descendent elements
            if (!el || el.contains(event.target as Node)) return;
            handler(event)
        };
        document.addEventListener(`click`, listener)
        document.addEventListener(`touchstart`, listener)
        return () => {
            document.removeEventListener(`click`, listener)
            document.removeEventListener(`touchstart`, listener)
        }
        // Reload only if ref or handler changes
    }, [ref, handler])
};
  
