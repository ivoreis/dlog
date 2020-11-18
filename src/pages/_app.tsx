import { Fragment } from 'react'
import { AppProps } from 'next/app'
import Head from 'next/head'
import { AnimatePresence, motion } from 'framer-motion'
import MDXProvider from '~/providers/MDXProvider'
import StateManager, {
  defaultState,
  Config,
  defaultConfig,
} from '~/hooks/stateManager'
import { Direction } from '~/utils/router'

import '../tailwind.css'

const CustomApp = (props: AppProps) => {
  const { Component, pageProps, router } = props
  const { config } = pageProps
  const { transitions } = (config || defaultConfig) as Config

  const offset =
    transitions.timing * (router.query?.direction === Direction.NEXT ? -1 : 1)

  return (
    <MDXProvider>
      <StateManager initialState={defaultState}>
        <Fragment>
          <Head>
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1, shrink-to-fit=no"
            />
          </Head>
          {transitions && transitions.enabled ? (
            <AnimatePresence exitBeforeEnter initial={false}>
              <div className="w-full relative mx-auto px-6 h-full">
                <motion.div
                  className="h-full"
                  key={router.asPath}
                  initial={{ x: -offset, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: offset, opacity: 0 }}
                >
                  <Component {...pageProps} />
                </motion.div>
              </div>
            </AnimatePresence>
          ) : (
            <div className="w-full relative mx-auto px-6">
              <Component {...pageProps} />
            </div>
          )}
        </Fragment>
      </StateManager>
    </MDXProvider>
  )
}

export default CustomApp
