import React from "react";

import CounterWithConnect from "./CounterWithConnect";
import CounterWithHook from "./CounterWithHook";

const App = () => {
    return (
        <>
            <CounterWithConnect />
            <CounterWithHook />
        </>
    )
}

export default App;