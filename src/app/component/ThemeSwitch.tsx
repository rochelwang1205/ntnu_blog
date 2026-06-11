'use client'

import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'
import { Switch } from '@headlessui/react'
import { SunIcon, MoonIcon } from '@heroicons/react/24/solid' 

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export default function ThemeSwitch() {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {

    return <div className="w-11 h-6" />
  }

  const isLight = resolvedTheme === 'light'

  return (
    <Switch
      checked={isLight}
      onChange={() => setTheme(isLight ? 'dark' : 'light')}
      className={classNames(
        isLight ? 'bg-gray-300' : 'bg-yellow-600',
        'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out'
      )}
    >
      <span className="sr-only">切換深色模式</span>
      <span
        className={classNames(
          isLight ? 'translate-x-5' : 'translate-x-0',
          'pointer-events-none relative inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
        )}
      >
        <span
          className={classNames(
            isLight ? 'opacity-100' : 'opacity-0',
            'absolute inset-0 flex h-full w-full items-center justify-center transition-opacity duration-200'
          )}
          aria-hidden="true"
        >
          <SunIcon className="h-3 w-3 text-yellow-500" />
        </span>
        <span
          className={classNames(
            isLight ? 'opacity-0' : 'opacity-100',
            'absolute inset-0 flex h-full w-full items-center justify-center transition-opacity duration-200'
          )}
          aria-hidden="true"
        >

          <SunIcon className="h-3 w-3 text-yellow-600" />
        </span>
      </span>
    </Switch>
  )
}