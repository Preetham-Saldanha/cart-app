
import { createContext, ReactNode, useState } from 'react';

 const TotalAmountContext = createContext({});

export const TotalAmountProvider = ({ children }: { children: ReactNode }) => {

  const [totalAmount, setTotalAmount] = useState<number>(0);

  return <TotalAmountContext.Provider value={{ totalAmount, setTotalAmount }}>
    {children}
  </TotalAmountContext.Provider>

}

export default TotalAmountContext;