import React, { Component } from 'react';
import _ from 'lodash';

class SearchBar extends Component {
    constructor(props){
        super(props);
    }

    render() {
        const debounced = _.debounce((term) => this.props.onSearchTermChange(term), 1000);

        return (
            <div className="search-bar">
                <input 
                    onChange={(event) => debounced(event.target.value)}/>
            </div>
        );
    }
}

export default SearchBar;