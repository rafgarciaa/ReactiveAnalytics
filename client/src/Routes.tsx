import React from "react"
import { Route, Routes } from "react-router-dom"
import { MainLayout} from "./containers"
import { Stocks, Currencies } from "./containers/main-layout/Markets"
import { MarketSegment } from "./containers/global-types"

const AppRoutes = () =>{

    return (
        <Routes>
            <Route path='/' element={<MainLayout market={MarketSegment.STOCK}/>}>
                <Route path="stock/:id?" element={<Stocks/> }/>
            </Route>
            <Route path='/fx/' element={<MainLayout market={MarketSegment.FX}/>}>
                <Route path=":id?" element={<Currencies/> }/>
            </Route>
        </Routes>
    )
}

export default AppRoutes
