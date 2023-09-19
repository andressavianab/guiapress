import { Route, Routes } from "react-router-dom"
import { Default } from "./layouts/home/Default"
import { Index } from "./pages/home"

export const Router = () => {
    return(
        <Routes>
            <Route path="/" element={<Default />}>
                <Route path="/" element={<Index />} />
            </Route>
        </Routes>
    )
}