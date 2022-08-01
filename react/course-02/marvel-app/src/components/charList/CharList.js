import { useEffect, useState } from "react";

import MarvelService from "../../services/MarvelService";

import './charList.scss';

const CharList = ({ onSelectCharacter }) => {
    const [characters, setCharacters] = useState([]);
    const [offset, setOffset] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [isCharactersAdding, setIsCharactersAdding] = useState(false);
    const [activeCharacter, setActiveCharacter] = useState(null);

    useEffect(() => {
        updateCharacters();
    }, []);

    const marvelService = new MarvelService();

    const onCharactersUpdate = (characters) => {
        setCharacters(characters);
        setOffset(characters.length);
        setIsLoading(false);
    }

    const onError = () => {
        setIsError(true);
        setIsLoading(false);
    }

    const updateCharacters = () => {
        setIsLoading(true);
        marvelService.getCharacters()
            .then(onCharactersUpdate)
            .catch(onError);
    }

    const onCharactersAdded = (newCharacters) => {
        setCharacters((characters) => ([...characters, ...newCharacters]));
        setIsCharactersAdding(false);
        setOffset((offset) => (offset + newCharacters.length));
    }

    const addCharacters = () => {
        setIsCharactersAdding(true);
        marvelService.getCharacters(offset)
            .then(onCharactersAdded)
            .catch(onError);
    }

    const selectCharacter = (id) => {
        setActiveCharacter(id);
        onSelectCharacter(id);
    }

    const characterElements = characters.map((value) => {
        const isImageNotFound = value.thumbnail.includes("image_not_available");

        return (
            <li
                tabIndex={0}
                className={`char__item ${activeCharacter === value.id ? "char__item_selected" : ""}`}
                key={value.id}
                onClick={() => selectCharacter(value.id)}
                onKeyPress={(event) => {
                    if (event.key === ' ' || event.key === "Enter") {
                        selectCharacter(value.id);
                    }
                }}
            >
                <img src={value.thumbnail} alt="abyss" style={{ objectFit: isImageNotFound ? "contain" : "cover" }} />
                <div className="char__name">{value.name}</div>
            </li>)
    });

    return (
        <div className="char__list">
            <ul className="char__grid">
                {characterElements}
            </ul>
            <button
                className="button button__main button__long"
                disabled={isCharactersAdding}
                onClick={addCharacters}
            >
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default CharList;