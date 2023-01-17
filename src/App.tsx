import React from 'react'
import {
    BrowserRouter as Router,
    Routes,
    Route,
    useRoutes,
} from "react-router-dom";
import {HomePage} from './pages/HomePage'

import {TracerPage} from "./pages/TracerPage";
import {Navigation} from "./components/Navigation";


const AppRoutes = () => {
    let routes = useRoutes([
        { path: "/", element: < TracerPage /> },
        { path: "favourites", element: <HomePage /> },
        // ...
    ]);
    return routes;
};



    const App = () => {
        return (<>
                <Navigation />
            <Router>
                <AppRoutes />
            </Router>
            </>
        );
    };


export default App
