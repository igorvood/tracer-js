import React from 'react';
import {Route, Routes} from "react-router-dom";
import {TracerPage} from "./pages/TracerPage";
import {HomePage} from "./pages/HomePage";
import {Navigation} from "./components/Navigation";

function App() {
    return (
        <>
            <Navigation/>
            <h1>asdfasdfsdf</h1>
            <Routes>
                <Route path="/" element={<TracerPage/>}></Route>
                <Route path="/homePage" element={<HomePage/>}></Route>

            </Routes>
        </>
    );
}

export default App;
