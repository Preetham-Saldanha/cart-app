import IsFirstRenderContext from "@/contexts/IsFirstCartRender";
import { useContext } from "react"

const  getFirstRenderState= ()=> {

    const { isFirstRender, setIsFirstRender }: any = useContext(IsFirstRenderContext)

    return { isFirstRender, setIsFirstRender }
}

export default getFirstRenderState;