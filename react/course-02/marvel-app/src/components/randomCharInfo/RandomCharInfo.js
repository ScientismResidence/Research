

import useAppContext, { AppActionType } from "../../context/context";
import "./randomCharInfo.scss";

const RandomCharInfo = () => {
    const { isSomething, dispatch } = useAppContext();

    return (
        <>
            <div className="random-char__info">
                <h2>App Context/Reducer test</h2>
                <p>{isSomething.toString()}</p>
                <button onClick={() => dispatch({ type: AppActionType.ToggleIsSomething })}>Toggle</button>
            </div>
        </>
    );
}

export default RandomCharInfo;