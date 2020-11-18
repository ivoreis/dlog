import { Fragment } from 'react'

import Header from '~/components/Header'
import Grid from '~/components/spinners/Grid'

const Index = () => (
  <Fragment>
    <Header showNav />
    <div className="text-center pt-24">
      <Grid color="var(--color-text)" className="w-80 h-80 md:w-96 md:h-96" />
    </div>
  </Fragment>
)

export default Index
