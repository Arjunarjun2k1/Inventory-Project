import React from "react";
import {BrowserRouter,Routes,Route} from "react-router-dom"
import Inventory from "./inventory";

const App = ()=>{
    return(
        <>
            <BrowserRouter>
                <Routes>
                   <Route path="*" element={<Inventory/>} />
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default App;