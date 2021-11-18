import React, { Component } from 'react';

class SearchBar extends Component {
    constructor(props){
        super(props);

        this.state = { term: '' };
    }

    onInputChange(event) {
        this.setState({ term: event.target.value });
    }

    render() {
        console.log(this.state.term);
        return <input onChange={(event) => this.onInputChange(event)}/>
    }
}

export default SearchBar;