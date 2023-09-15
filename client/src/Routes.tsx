import React from "react"
import { Route, Routes } from "react-router-dom"
import { MainLayout,} from "./containers"
import { MarketSegment } from "./containers/global-types"

const AppRoutes = () =>{

    return (
        <Routes>
            <Route path='/' element={<MainLayout market={MarketSegment.STOCK}/>}/>
            {/*
            <Route path="/(bond|crypto|fx|future|index|stock)/:id?" element={<MainLayout/>}/>
            <Route path="/(fx)/:from:to" element={<MainLayout/>}/>
            <Route path="/abm/:from:to" element={<FXHistory/>}/>
            <Route path="/company/:id?" element={<Company/>}/>
            <Route path="/history/:id?" element={<StockHistoryContainer/>}/>
            <Route path="/news/:id?" element={<News/>}/>
            <Route path="/peers/:id?" element={<Peers/>}/>
            <Route path="/search/:id?" element={<Search/>}/>
            <Route path="/stats/:id?" element={<Stats/>}/>
    */}
        </Routes>
    )
}

export default AppRoutes
