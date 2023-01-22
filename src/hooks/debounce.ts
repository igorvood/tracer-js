import {useEffect, useState} from 'react'

export function useDebounce(initState: string, delay = 1000): string {
    const [debounced, setDebounced] = useState(initState)

    useEffect(() => {
        const handler = setTimeout(() => setDebounced(initState), delay)
        return () => clearTimeout(handler)
    }, [initState, delay])

    return debounced
}