'use client'

import { useEffect } from 'react'

export function ServiceWorkerRegister() {
    useEffect(() => {
        if ('serviceWorker' in navigator && window.location.hostname !== 'localhost') {
            // Register SW only in production or if needed. 
            // For development, it might be annoying, but user requested PWA support.
            // Let's register it.
            navigator.serviceWorker
                .register('/sw.js')
                .then((registration) => console.log('SW Scope: ', registration.scope))
                .catch((error) => console.error('SW Registration failed: ', error))
        }
    }, [])

    return null
}
