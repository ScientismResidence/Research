import { useState } from "react";

import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import ErrorBoundary from "../ui/errorBoundary/ErrorBoundary";

import decoration from '../../resources/img/vision.png';
import ComicsList from "../comicsList/ComicsList";

const App = () => {
    const [selectedCharacter, setSelectedCharacter] = useState(null);

    const onSelectCharacter = (id) => {
        setSelectedCharacter(id);
    }

    return (
        <div className="app">
            <AppHeader />
            <main>
                <RandomChar />
                <div className="char__content">
                    <CharList onSelectCharacter={onSelectCharacter} />
                    <ErrorBoundary>
                        <CharInfo selectedCharacter={selectedCharacter} />
                    </ErrorBoundary>
                </div>
                <div className="char_content">
                    <ComicsList/>
                </div>
                <img className="bg-decoration" src={decoration} alt="vision" />
            </main>
        </div>
    )

}

export default App;