

import useAppContext from "../../context/context";
import "./randomCharInfo.scss";

const RandomCharInfo = () => {
    const state = useAppContext();
    console.log("RandomCharInfo render", state.randomCharacter.id);

    return (
        <>
            <div className="random-char__info">
                <h2>App Context/Reducer test</h2>
                <p>{state.randomCharacter.name}</p>
                <p>{state.randomCharacter.id}</p>
            </div>
        </>
    );
}

export default RandomCharInfo;