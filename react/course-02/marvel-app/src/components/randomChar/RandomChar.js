import { useEffect, useState } from "react";

import Spinner from "../ui/spinner/Spinner";
import MarvelService from "../../services/MarvelService";
import Error from "../ui/error/Error";

import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';

const RandomChar = () => {
    const [character, setCharacter] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    const marvelService = new MarvelService();

    useEffect(() => {
        updateCharacter();
    }, []);

    const onCharacterUpdate = (character) => {
        setCharacter(character);
        setIsLoading(false);
    }

    const onError = () => {
        setIsError(true);
        setIsLoading(false);
    }

    const updateCharacter = () => {
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
        setIsLoading(true);
        marvelService.getCharacter(id)
            .then(onCharacterUpdate)
            .catch(onError);
    }

    let characterContent;
    if (isLoading) {
        characterContent = <Spinner />;
    } else if (isError) {
        characterContent = <Error />;
    } else {
        characterContent = <CharacterView character={character} />
    }

    return (
        <div className="randomchar">
            {characterContent}
            <div className="randomchar__static">
                <p className="randomchar__title">
                    Random character for today!<br />
                    Do you want to get to know him better?
                </p>
                <p className="randomchar__title">
                    Or choose another one
                </p>
                <button className="button button__main" onClick={updateCharacter}>
                    <div className="inner">try it</div>
                </button>
                <img src={mjolnir} alt="mjolnir" className="randomchar__decoration" />
            </div>
        </div>
    )
}

const CharacterView = ({ character }) => {
    const { name, description, thumbnail, homepage, wiki } = character;
    const isImageNotFound = thumbnail.includes("image_not_available");

    return (
        <div className="randomchar__block">
            <img
                src={thumbnail}
                style={{ objectFit: isImageNotFound ? "contain" : "cover" }}
                alt="Random character"
                className="randomchar__img" />
            <div className="randomchar__info">
                <p className="randomchar__name">{name}</p>
                <p className="randomchar__descr">
                    {!description ? "There is no description for that character" : description}
                </p>
                <div className="randomchar__btns">
                    <a href={homepage} className="button button__main">
                        <div className="inner">Homepage</div>
                    </a>
                    <a href={wiki} className="button button__secondary">
                        <div className="inner">Wiki</div>
                    </a>
                </div>
            </div>
        </div>
    );
}

export default RandomChar;