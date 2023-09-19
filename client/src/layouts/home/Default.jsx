import { Outlet } from 'react-router-dom'
import { Header } from "../../components/home/Header"

export const Default = () => {
    return(
        <>
            <div className="w-full h-screen bg-slate-900">  
                <Header />  
                <div className="max-w-5xl m-auto h-screen">
                    <Outlet />
                </div>
            </div>        
        </>
    )
}