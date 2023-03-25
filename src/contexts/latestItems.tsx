import { createContext, ReactNode, useState } from 'react';

 const LatestItemsContext = createContext({});

export const LatestItemsContextProvider = ({ children }: { children: ReactNode }) => {

  const [latestItems, setLatestModifiedItems] = useState<{}>({});

  return <LatestItemsContext.Provider value={{ latestItems, setLatestModifiedItems}}>
    {children}
  </ LatestItemsContext.Provider>

}

export default LatestItemsContext;