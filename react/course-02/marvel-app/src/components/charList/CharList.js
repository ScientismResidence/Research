import { Component } from "react";

import MarvelService from "../../services/MarvelService";

import './charList.scss';

class CharList extends Component {
    state = {
        characters: [],
        offset: 0,
        isLoading: true,
        isCharactersAdding: false,
        activeCharacter: null
    };

    marvelService = new MarvelService();

    componentDidMount() {
        this.updateCharacters();
    }

    onCharactersUpdate = (characters) => {
        this.setState({
            characters: characters,
            offset: characters.length,
            isLoading: false
        });
    }

    onError = () => {
        this.setState({ isError: true, isLoading: false });
    }

    updateCharacters = () => {
        this.setState({ isLoading: true });
        this.marvelService.getCharacters()
            .then(this.onCharactersUpdate)
            .catch(this.onError);
    }

    onCharactersAdded = (newCharacters) => {
        this.setState(({ characters, offset }) => ({
            characters: [...characters, ...newCharacters],
            isCharactersAdding: false,
            offset: offset + newCharacters.length
        }));
    }

    addCharacters = () => {
        const { offset } = this.state;
        this.setState({ isCharactersAdding: true });
        this.marvelService.getCharacters(offset)
            .then(this.onCharactersAdded)
            .catch(this.onError);
    }

    onSelectCharacter = (id) => {
        this.setState({ activeCharacter: id });
        this.props.onSelectCharacter(id);
    }

    render() {
        const { characters, isCharactersAdding, activeCharacter } = this.state;

        const characterElements = characters.map((value, index) => {
            const isImageNotFound = value.thumbnail.includes("image_not_available");

            return (
                <li 
                    tabIndex={0}
                    className={`char__item ${activeCharacter === value.id ? "char__item_selected" : ""}`}
                    key={value.id}
                    onClick={() => this.onSelectCharacter(value.id)}
                    onKeyPress={(event) => {
                        if (event.key === ' ' || event.key === "Enter") {
                            this.onSelectCharacter(value.id);
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
                    onClick={this.addCharacters}
                >
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}

export default CharList;