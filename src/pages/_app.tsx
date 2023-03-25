import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { TotalAmountProvider } from '@/contexts/totalAmountContext'
import { IsFirstCartRenderProvider } from '@/contexts/IsFirstCartRender'
import { LatestItemsContextProvider } from '@/contexts/latestItems'




export default function App({ Component, pageProps }: AppProps) {


  return<LatestItemsContextProvider>
   <IsFirstCartRenderProvider>
    <TotalAmountProvider>
      <Component {...pageProps} />
    </TotalAmountProvider>
  </IsFirstCartRenderProvider>
  </LatestItemsContextProvider>

}
