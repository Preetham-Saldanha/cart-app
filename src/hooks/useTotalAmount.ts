import { useContext} from "react";
import TotalAmountContext from "@/contexts/totalAmountContext";



const getTotalAmountContext = ()=>{
    const { totalAmount, setTotalAmount} : any = useContext(TotalAmountContext);
 return {totalAmount, setTotalAmount}
}

export default getTotalAmountContext;