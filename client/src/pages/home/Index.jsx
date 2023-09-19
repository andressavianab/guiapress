import { ArticleCard } from "../../components/home/ArticleCard"

export const Index = () => {
    return(
      <div className="w-full flex flex-col justify-center p-4">
        <section className="flex flex-col items-center gap-10 pb-4">
            <p className="font-robotoslab tracking-widest uppercase text-xs text-slate-500 font-semibold">contents</p>
            <h1 className="text-white font-inclusive text-4xl font-bold tracking-wide">Articles</h1>
            <h2 className="text-slate-400 font-inclusive text-2xl">Discover the world of technology</h2>
        </section>
        <main className="flex flex-wrap gap-9 justify-center mt-4 mb-10">
            <ArticleCard />
            <ArticleCard />
            <ArticleCard />
            <ArticleCard />
            <ArticleCard />
            <ArticleCard />
        </main>
            <nav className="flex justify-between font-inclusive text-slate-400 font-black">
                <a href="#">Prev</a>
                <a href="#">Next</a>
            </nav>
        <p></p>
      </div>
    )
}