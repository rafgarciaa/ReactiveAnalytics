import React from "react"
import { Route, Routes } from "react-router-dom"
import { Company, MainLayout, News, Peers, Search, Stats,} from "./containers"
import { MarketSegment } from "./containers/global-types"
import { FXHistory } from "./containers/history"
import StockHistoryContainer from "./containers/history/StockHistoryContainer"
import { Stocks, Currencies } from "./containers/main-layout/Markets"

const AppRoutes = () =>{

    return (
        <Routes>
            <Route path='/' element={<MainLayout market={MarketSegment.STOCK}/>}>
                <Route path="/" element={<Stocks/> }/>
                <Route path="bond/:id?" element={<News/> }/>
                <Route path="fx/:from?:to?" element={<Currencies/> }/>
                <Route path="future/:id?" element={<News/> }/>
                <Route path="index/:id?" element={<News/> }/>
                <Route path="stock/:id?" element={<Stocks/> }/>
            </Route>
            <Route path="/(bond|crypto|fx|future|index|stock)/:id?" element={<MainLayout market={MarketSegment.STOCK}/>}/>
            <Route path="/(fx)/:from:to" element={<MainLayout market={MarketSegment.FX}/>}/>
            <Route path="/abm/:from:to" element={<FXHistory id={""}/>}/>
            <Route path="/company/:id?" element={<Company id={""}/>}/>
            <Route path="/history/:id?" element={<StockHistoryContainer id={""}/>}/>
            <Route path="/news/:id?" element={<News/>}/>
            <Route path="/peers/:id?" element={<Peers/>}/>
            <Route path="/search/:id?" element={<Search market={MarketSegment.STOCK} id={""}/>}/>
            <Route path="/stats/:id?" element={<Stats id={""}/>}/>
        </Routes>
    )
}

export default AppRoutes
