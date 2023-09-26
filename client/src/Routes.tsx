import React from "react"
import { Route, Routes } from "react-router-dom"
import { MainLayout} from "./containers"
import { Stocks, Currencies } from "./containers/main-layout/Markets"

const AppRoutes = () =>{

    return (
        <Routes>
            <Route path='/' element={<MainLayout/>}>
                <Route path="fx/:id?" element={<Currencies/> }/>
                <Route path="stock/:id?" element={<Stocks/> }/>
            </Route>
        </Routes>
    )
}

export default AppRoutes
