import { createContext, ReactNode, useState } from 'react';

 const IsFirstRenderContext = createContext({});

export const IsFirstCartRenderProvider = ({ children }: { children: ReactNode }) => {

  const [ isFirstRender, setIsFirstRender] = useState<boolean>(true);

  return <IsFirstRenderContext.Provider value={{ isFirstRender, setIsFirstRender }}>
    {children}
  </ IsFirstRenderContext.Provider>

}

export default IsFirstRenderContext;