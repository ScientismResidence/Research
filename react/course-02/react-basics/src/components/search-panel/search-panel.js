import { Component } from "react";
import "./search-panel.css";

class SearchPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchTerm: ""
        };
    }

    onSearchTermUpdate = (event) => {
        const searchTerm = event.target.value;
        this.setState({searchTerm})
        const {onSearchTermUpdate} = this.props;
        onSearchTermUpdate(searchTerm);
    }

    render() {
        return (
            <input
                type="text"
                className="form-control search-input"
                placeholder="Search employee"
                onChange={this.onSearchTermUpdate}
            />
        );
    }
}

export default SearchPanel;