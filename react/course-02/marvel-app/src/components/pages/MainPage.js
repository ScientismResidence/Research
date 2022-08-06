import { useState } from "react";

import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import ErrorBoundary from "../ui/errorBoundary/ErrorBoundary";

import decoration from '../../resources/img/vision.png';
import RandomCharInfo from "../randomCharInfo/RandomCharInfo";

const MainPage = () => {
    const [selectedCharacter, setSelectedCharacter] = useState(null);

    const onSelectCharacter = (id) => {
        setSelectedCharacter(id);
    };

    return (
        <>
            <RandomChar/>
            <RandomCharInfo />
            <div className="char__content">
                <CharList onSelectCharacter={onSelectCharacter} />
                <ErrorBoundary>
                    <CharInfo selectedCharacter={selectedCharacter} />   
                </ErrorBoundary>
            </div>
            <img className="bg-decoration" src={decoration} alt="vision" />
        </>
    )
}

export default MainPage;