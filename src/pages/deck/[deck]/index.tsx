import { NextPageContext } from 'next'

const Noop = () => {
  return null
}

export const getStaticPaths = async () => {
  return {
    paths: [],
    fallback: true,
  }
}

export const getStaticProps = async () => {
  return {
    redirect: {
      destination: '/deck',
      permanent: true,
    },
    revalidate: 1,
  }
}

export default Noop
