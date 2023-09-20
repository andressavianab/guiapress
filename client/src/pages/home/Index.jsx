import { ArticleCard } from "../../components/home/ArticleCard"
import { useState, useEffect } from "react";
import axios from 'axios';

export const Index = () => {
    const [ articles, setAticles ] = useState([]);

    const getArticles = async() => {
        try {
            const response = await axios.get('http://localhost:8080/articles');
            console.log(response);
            const data = response.data.articles;
            setAticles(data);                  
        } catch (error) {
            console.log(error)
        } 
    }

    useEffect(() => {
        getArticles();
    }, []);

    return(
      <div className="w-full flex flex-col justify-center p-4">
        <section className="flex flex-col items-center gap-10 pb-4">
            <p className="font-robotoslab tracking-widest uppercase text-xs text-slate-500 font-semibold">contents</p>
            <h1 className="text-white font-inclusive text-4xl font-bold tracking-wide">Articles</h1>
            <h2 className="text-slate-400 font-inclusive text-2xl">Discover the world of technology</h2>
        </section>
        <main className="flex flex-wrap gap-9 justify-center mt-4 mb-10">
            {articles.map((article) => (
                <ArticleCard title={article.title} key={article.id} />
            ))}
        </main>
            <nav className="flex justify-between font-inclusive text-slate-400 font-black">
                <a href="#">Prev</a>
                <a href="#">Next</a>
            </nav>
        <p></p>
      </div>
    )
}