import filteredProductsContext from "@/contexts/filteredProducts";
import SearchContext from "@/contexts/searchQuery";
import { useContext } from "react"
import type { ProductType, RatingType } from '@/pages';

const getFilteredProducts = () => {

    const { filteredProducts, setFilteredProducts }: {
        filteredProducts: (ProductType & { rating: RatingType })[];
        setFilteredProducts: React.Dispatch<React.SetStateAction<(ProductType & { rating: RatingType })[]>>;
    } = useContext(filteredProductsContext)


    const {query,setQuery} = useContext(SearchContext)

    return { filteredProducts, setFilteredProducts , query,setQuery}
}

export default getFilteredProducts;