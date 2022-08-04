import { Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AppContextProvider } from "../../context/context";

import AppHeader from "../appHeader/AppHeader";
import { MainPage, ComicsPage, NoMatchPage, ComicDetailsPage } from "../pages";
import Spinner from "../ui/spinner/Spinner";

const App = () => {
    console.log("App render");

    return (
        <Router>
            <AppContextProvider>
                <div className="app">
                    <AppHeader />
                    <main>
                        <Suspense fallback={<Spinner />}>
                            <Routes>
                                <Route path="/" element={<MainPage />} />
                                <Route path="/comics" element={<ComicsPage />} />
                                <Route path="/comics/:id" element={<ComicDetailsPage />} />
                                <Route path="*" element={<NoMatchPage />} />
                            </Routes>
                        </Suspense>
                    </main>
                </div>
            </AppContextProvider>
        </Router>
    )
}

export default App;