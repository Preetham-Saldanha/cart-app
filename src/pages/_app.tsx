import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { TotalAmountProvider } from '@/contexts/totalAmountContext'
import { IsFirstCartRenderProvider } from '@/contexts/IsFirstCartRender'
import { LatestItemsContextProvider } from '@/contexts/latestItems'
import { FilteredProductsProvider } from '@/contexts/filteredProducts'
import { SearchQueryProvider } from '@/contexts/searchQuery'




export default function App({ Component, pageProps }: AppProps) {


  return <FilteredProductsProvider>
    <SearchQueryProvider>
      <LatestItemsContextProvider>
        <IsFirstCartRenderProvider>
          <TotalAmountProvider>
            <Component {...pageProps} />
          </TotalAmountProvider>
        </IsFirstCartRenderProvider>
      </LatestItemsContextProvider>
    </SearchQueryProvider>
  </FilteredProductsProvider>
}
