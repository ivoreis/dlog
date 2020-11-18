import { FC, useEffect } from 'react'
import Link from 'next/link'
import clsx from 'clsx'
import { useStateManager, ColorMode } from '~/hooks/stateManager'

export interface HeaderProps {
  showNav?: boolean
}

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/deck', label: 'Decks' },
].map((link) => ({
  ...link,
  key: `nav-link-${link.href}-${link.label}`,
}))

const Header: FC<HeaderProps> = (props) => {
  const { dispatch, state } = useStateManager()
  const { colorMode } = state
  const { showNav = true } = props

  useEffect(() => {
    const storedColorMode = localStorage.getItem('color-mode')
    if (
      storedColorMode &&
      storedColorMode !== '' &&
      storedColorMode !== colorMode
    ) {
      dispatch({
        type: 'COLOR_MODE',
        payload: { colorMode: storedColorMode as ColorMode },
      })
    }
  }, [])

  const toggleDarkMode = () => {
    const newColorMode: ColorMode = colorMode === 'dark' ? 'light' : 'dark'

    dispatch({
      type: 'COLOR_MODE',
      payload: { colorMode: newColorMode },
    })
  }

  return (
    <nav>
      <svg style={{ display: 'none' }}>
        <symbol viewBox="0 0 24 24" id="moon" fill="currentColor">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </symbol>
        <symbol viewBox="0 0 24 24" id="sun" fill="currentColor">
          <circle cx="12" cy="12" r="5" />
          <line x1="12" y1="1" x2="12" y2="3" />
          <line x1="12" y1="21" x2="12" y2="23" />
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
          <line x1="1" y1="12" x2="3" y2="12" />
          <line x1="21" y1="12" x2="23" y2="12" />
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
        </symbol>
      </svg>
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div
              className={clsx(
                'sm:-my-px sm:ml-6 space-x-8',
                showNav ? 'flex' : 'hidden',
              )}
            >
              {navLinks.map((l) => (
                <Link href={l.href} shallow={false} key={l.key}>
                  <a className="inline-flex items-center px-1 pt-1 border-opacity-0 text-sm font-medium leading-5 text-default">
                    {l.label}
                  </a>
                </Link>
              ))}
            </div>
          </div>
          <div className="ml-6 flex items-center">
            {colorMode === 'light' && (
              <button
                className="p-1 text-default rounded-full"
                aria-label="Dark mode"
                type="button"
                onClick={toggleDarkMode}
              >
                <svg aria-hidden="true" className="w-7 h-7">
                  <title>Dark Mode</title>
                  <use href="#moon" />
                </svg>
              </button>
            )}

            {colorMode === 'dark' && (
              <button
                className="p-1 text-default rounded-full"
                aria-label="Light mode"
                type="button"
                onClick={toggleDarkMode}
              >
                <svg aria-hidden="true" className="w-7 h-7">
                  <title>Light Mode</title>
                  <use href="#sun" />
                </svg>
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Header
