import React from 'react'
import { useEffect, useState } from 'react'
import { useAuthStore } from '../store/useAuthStore'

export default function useHydration() {
    const [hydrated, setHydrated] = useState(false)

    useEffect(() => {

        const unsub = useAuthStore.persist.onFinishHydration(() => {
            setHydrated(true)
        })

        setHydrated(useAuthStore.persist.hasHydrated())

        return unsub
    }, [])


  return hydrated
}
