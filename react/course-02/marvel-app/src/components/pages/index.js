import { lazy } from "react";

const MainPage = lazy(() => import("../pages/MainPage")); 
const ComicsPage = lazy(() => import("../pages/ComicsPage"));
const ComicDetailsPage = lazy(() => import("../pages/ComicDetailsPage"));
const NoMatchPage = lazy(() => import("../pages/NoMatchPage"));

export { MainPage, ComicsPage, ComicDetailsPage, NoMatchPage };