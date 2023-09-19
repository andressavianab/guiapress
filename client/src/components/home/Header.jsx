export const Header = () => {
    return(
        <header className="border-b border-slate-800">
                <div className="max-w-7xl mx-auto py-4 relative flex justify-between items-center">
                    <div>
                        <a href="#" className="text-white text-3xl font-bebasneue">Guia Press</a>
                    </div>
                    <div className="font-inclusive font-bold">
                        <select name="" id="" className="border text-sm rounded-lg focus:bg-slate-800 block w-full p-2.5 hover:bg-slate-800 bg-slate-800/70 border-slate-800/70 text-slate-500  focus:border-slate-800/70 ">
                            <option selected className="font-inclusive font-bold">Filter</option>
                            <option value="" className="text-white font-inclusive font-bold">Front End</option>
                            <option value="" className="text-white font-inclusive font-bold">Back End</option>
                            <option value="" className="text-white font-inclusive font-bold">Data Science</option>
                        </select>
                    </div>
                </div>
            </header>
    )
}