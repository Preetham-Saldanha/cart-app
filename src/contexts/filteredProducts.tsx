import { createContext, ReactNode, useState } from 'react';
import type { ProductType, RatingType } from '@/pages';

const FilteredProductsContext = createContext<{
    filteredProducts: (ProductType & { rating: RatingType })[];
    setFilteredProducts: React.Dispatch<React.SetStateAction<(ProductType & { rating: RatingType })[]>>;
  }>({
    filteredProducts: [],
    setFilteredProducts: () => {},
  });

export const FilteredProductsProvider = ({ children }: { children: ReactNode }) => {

    const [filteredProducts, setFilteredProducts] = useState<(ProductType & { rating: RatingType })[]>([]);

    return <FilteredProductsContext.Provider value={{ filteredProducts, setFilteredProducts }}>
        {children}
    </ FilteredProductsContext.Provider>

}

export default FilteredProductsContext;