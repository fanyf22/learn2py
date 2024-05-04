import { Roboto_Slab } from 'next/font/google'
import '@/styles/global.css'

const roboto_slab_light = Roboto_Slab({
  weight: ['300'],
  subsets: ['latin-ext'],
})

const roboto_slab_heavy = Roboto_Slab({
  weight: ['500'],
  subsets: ['latin-ext'],
})

export default function App({ Component, pageProps }) {
  return (
    <>
      <style jsx global>{`
        :root {
          --font-roboto-slab-light: ${roboto_slab_light.style.fontFamily};
          --font-roboto-slab-heavy: ${roboto_slab_heavy.style.fontFamily};
        }
      `}</style>
      <Component {...pageProps} />
    </>
  )
}
