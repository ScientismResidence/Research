import { Component } from "react";

import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import ErrorBoundary from "../ui/errorBoundary/ErrorBoundary";

import decoration from '../../resources/img/vision.png';

class App extends Component {
    state = {
        selectedCharacter: null
    }

    onSelectCharacter = (id) => {
        this.setState({
            selectedCharacter: id
        });
    }

    render() {
        const { selectedCharacter } = this.state;

        return (
            <div className="app">
                <AppHeader />
                <main>
                    <RandomChar />
                    <div className="char__content">
                        <CharList onSelectCharacter={this.onSelectCharacter} />
                        <ErrorBoundary>
                            <CharInfo selectedCharacter={selectedCharacter} />
                        </ErrorBoundary>
                    </div>
                    <img className="bg-decoration" src={decoration} alt="vision" />
                </main>
            </div>
        )
    }
}

export default App;