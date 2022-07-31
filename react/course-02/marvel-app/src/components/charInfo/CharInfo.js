import { Component } from "react";
import PropTypes from "prop-types";

import Spinner from "../ui/spinner/Spinner";
import Error from "../ui/error/Error";
import Skeleton from "../skeleton/Skeleton";
import MarvelService from "../../services/MarvelService";

import './charInfo.scss';

class CharInfo extends Component {
    state = {
        character: null,
        isLoading: false,
        isError: false
    };

    marvelService = new MarvelService();

    componentDidMount() {
        this.updateCharacter();
    }

    componentDidUpdate(prevProps) {
        if (this.props.selectedCharacter !== prevProps.selectedCharacter) {
            this.updateCharacter();
        }
    }

    onCharacterUpdate = (character) => {
        this.setState({ character, isLoading: false });
    }

    onError = () => {
        this.setState({ isError: true, isLoading: false });
    }

    updateCharacter = () => {
        const { selectedCharacter } = this.props;
        if (!selectedCharacter) {
            return;
        }

        this.setState({ isLoading: true });
        this.marvelService.getCharacter(selectedCharacter)
            .then(this.onCharacterUpdate)
            .catch(this.onError);
    }

    render() {
        const { character, isLoading, isError } = this.state;

        let characterContent = null;
        if (isLoading) {
            characterContent = <Spinner />;
        } else if (isError) {
            characterContent = <Error />;
        } else if (character) {
            characterContent = <CharacterView character={character} />
        } else {
            characterContent = <Skeleton />
        }

        return (
            <div className="char__info">
                {characterContent}
            </div>
        )
    }
}

const CharacterView = ({ character }) => {
    const { name, description, thumbnail, homepage, wiki, comics } = character;
    const isImageNotFound = thumbnail.includes("image_not_available");

    let comicsElements = comics.map(value => {
        return (
            <li className="char__comics-item" key={value.resourceURI}>
                {value.name}
            </li>
        );
    });

    if (comicsElements.length === 0) {
        comicsElements = <p>There is no comics for that character</p>
    }

    return (
        <>
            <div className="char__basics">
                <img src={thumbnail} alt={name} style={{ objectFit: isImageNotFound ? "contain" : "cover" }} />
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">Homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">
                {description}
            </div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">
                {comicsElements}
            </ul>
        </>
    );
}

CharInfo.propTypes = {
    selectedCharacter: PropTypes.number
}

export default CharInfo;