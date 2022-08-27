import { useEffect, useState } from "react";
import useMarvelService from "../../services/MarvelService";

import './charList.scss';

const CharList = ({ onSelectCharacter }) => {
    const [characters, setCharacters] = useState([]);
    const [offset, setOffset] = useState(0);
    const [activeCharacter, setActiveCharacter] = useState(null);

    const {isLoading, getCharacters} = useMarvelService();

    useEffect(() => {
        updateCharacters();
    }, []);

    const onCharactersUpdate = (characters) => {
        setCharacters(characters);
        setOffset(characters.length);
    }

    const updateCharacters = () => {
        getCharacters().then(onCharactersUpdate);
    }

    const onCharactersAdded = (newCharacters) => {
        setCharacters((characters) => ([...characters, ...newCharacters]));
        setOffset((offset) => (offset + newCharacters.length));
    }

    const addCharacters = () => {
        getCharacters(offset).then(onCharactersAdded);
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
                disabled={isLoading}
                onClick={addCharacters}
            >
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default CharList;