
import { createContext, ReactNode, useState } from 'react';

const SearchContext = createContext<{ query: string, setQuery: React.Dispatch<React.SetStateAction<string>> }>({
    query: "",
    setQuery: () => { }
});

export const SearchQueryProvider = ({ children }: { children: ReactNode }) => {

    const [query, setQuery] = useState<string>("")

    return < SearchContext.Provider value={{ query, setQuery }}>
        {children}
    </ SearchContext.Provider>

}

export default SearchContext;