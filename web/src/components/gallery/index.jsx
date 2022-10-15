import { GlobalContext } from '../../context/Context';
import { useContext } from "react";

let Gallery = () => {

    let { state, dispatch } = useContext(GlobalContext);
return(
    <div>
        I am Gallery Component {state.myNum}

        <button onClick={()=>{
            dispatch({
                type: "SUB"
            })
        }}>Minus</button>
    </div>
)
};

export default Gallery;