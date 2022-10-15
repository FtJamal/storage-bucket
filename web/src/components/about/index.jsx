import { GlobalContext } from '../../context/Context';
import { useContext } from "react";

let About = () => {

    let { state, dispatch } = useContext(GlobalContext);
    return (
        <div>
            I am About Component  {state.myNum}

            <button onClick={() => {
                dispatch({
                    type: "ADD"
                })
            }}> Add </button>

        </div>
    )
};

export default About;