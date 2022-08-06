import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { inc, dec, rnd } from "../actions";

const CounterWithHook = () => {
    const counter = useSelector(state => state.counter);
    const dispatch = useDispatch();

    return (
        <div className="jumbotron">
            <h1>{counter}</h1>
            <button onClick={() => dispatch(dec())} className="btn btn-primary">DEC</button>
            <button onClick={() => dispatch(inc())} className="btn btn-primary">INC</button>
            <button onClick={() => {
                const value = Math.floor(Math.random() * 10);
                dispatch(rnd(value));
            }} className="btn btn-primary">RND</button>
        </div>
    )
}

export default CounterWithHook;