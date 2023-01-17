import React from 'react'
import {
    BrowserRouter as Router,
    Routes,
    Route,
    useRoutes,
} from "react-router-dom";
import {HomePage} from './pages/HomePage'

import {TracerPage} from "./pages/TracerPage";


const AppRoutes = () => {
    let routes = useRoutes([
        { path: "/", element: < TracerPage /> },
        { path: "favourites", element: <HomePage /> },
        // ...
    ]);
    return routes;
};



    const App = () => {
        return (
            <Router>
                <AppRoutes />
            </Router>
        );
    };


export default App
