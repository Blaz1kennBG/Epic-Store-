import Backendless from 'backendless';
import { useEffect, useState } from 'react';
import Article from './Article/Article';
import DummyArticle from './DummyArticles/DummyArticle';
import style from './News.module.css'
const News = () => {
    const [articles, setArticles] = useState(undefined)
    useEffect( () => {
        Backendless.Data.of('Articles').find().then(response => {
            setArticles(response)
        
        })
    }, [])
    return (
        <div className={style["news-container"]}>
            <div className={style["top-part"]}>
                <span className={style["news-title"]}>News</span>
                <div className={style["top-container"]}>

                    <div className={style["top-img"]}>
                        <img />
                    </div>
                    <span className={style["top-time"]}>7H ago</span>
                    <span className={style["top-title"]}>Hands on with Solar Ash, out now on Epic Games Store</span>
                    <span>Read more</span>
                </div>

                <div className={style["top-container"]}>
                    <div className={style["top-img"]}>
                        <img />
                    </div>
                    <span className={style["top-time"]}>7H ago</span>
                    <span className={style["top-title"]}>Hands on with Solar Ash, out now on Epic Games Store</span>
                    <span>Read more</span>
                </div>

            </div>

            <div className={style["article-list"]}>
            { articles && (articles.map(a => <Article article={a} key={Date.now()}/>))

            }
            { !articles && <DummyArticle />  }
            </div>
        </div>
    );
}

export default News;