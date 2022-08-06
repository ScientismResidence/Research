import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as actions from "../actions";

const CounterWithConnect = ({counter, inc, dec, rnd}) => {
    return (
        <div className="jumbotron">
            <h1>{counter}</h1>
            <button onClick={dec} className="btn btn-primary">DEC</button>
            <button onClick={inc} className="btn btn-primary">INC</button>
            <button onClick={() => {
                const value = Math.floor(Math.random() * 10);
                rnd(value);
            }} className="btn btn-primary">RND</button>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        counter: state.counter
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(actions, dispatch);
}

// Or we can use shortest variant directly passing actions instead of function
// This variant will automatically bind actions with dispatch
// export default connect(mapStateToProps, actions)(Counter);

export default connect(mapStateToProps, mapDispatchToProps)(CounterWithConnect);