import LatestItemsContext from "@/contexts/latestItems";
import { useContext } from "react"

const LatestItems = ()=>{
const { latestItems,setLatestModifiedItems}: any = useContext(LatestItemsContext);
return {latestItems, setLatestModifiedItems}


}

export default LatestItems;