'use client'
import { useEffect } from 'react'

export const Redirects = () => {
  useEffect(() => {
    const { pathname, hash } = window.location
    if (
      pathname === '/app-version/main-user-interface' &&
      hash === '#user-data-directory'
    ) {
      window.location.href = '/app-version/main-user-interface'
    }
  }, [])
  return null
}
