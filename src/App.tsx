import React from 'react'
import {Route, Routes, useRoutes,} from "react-router-dom";
import {HomePage} from './pages/HomePage'

import {TracerPage} from "./pages/TracerPage";
import {Navigation} from "./components/Navigation";


const AppRoutes = () => {
    let routes = useRoutes([
        {path: "/", element: < TracerPage/>},
        {path: "favourites", element: <HomePage/>},
        // ...
    ]);
    return routes;
};

// const App = () => {
//         return (<>
//                 <Navigation />
//             <Router>
//                 <AppRoutes />
//             </Router>
//             </>
//         );
//     };


function App() {
    return (
        <>
            <Navigation/>
            <Routes>
                <Route path="/" element={<TracerPage/>}/>
                <Route path="/favourites" element={<HomePage/>}/>
            </Routes>
        </>
    )
}


export default App
