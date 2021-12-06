import Backendless from 'backendless';
import { useEffect, useState } from 'react';
import { getRandomItemFromArray } from '../../utils/usefulFunctions';
import Article from './Article/Article';
import BigArticle from './BigArticle/BigArticle';
import BigDummyArticle from './BigDummyArticle/BigDummyArticle';
import DummyArticle from './DummyArticles/DummyArticle';
import style from './News.module.css'
const News = () => {
    const [articles, setArticles] = useState(undefined)
    const [bigArticles, setBigArticles] = useState(undefined)
    useEffect( () => {
        Backendless.Data.of('Articles').find().then(response => {
           /*  const _bigArticles = []
            const firstRandomArticle = response.splice(0, Math.floor(Math.random() * response.length+1))
            const secondArticle = response.splice(0, Math.floor(Math.random() * response.length+1)) */
            setArticles(response)
            setBigArticles(getRandomItemFromArray(response))
        
        })
    }, [])
    return (
        <div className={style["news-container"]}>
            <div className={style["top-part"]}>
                <span className={style["news-title"]}>News</span>
               {!bigArticles && <BigDummyArticle />}
                {bigArticles && (bigArticles.map(ba => <BigArticle article={ba} key={ba.objectId}/>))}
               

            </div>

            <div className={style["article-list"]}>
            { articles && (articles.map(a => <Article article={a} key={a.objectId}/>))

            }
            { !articles && <DummyArticle />  }
            </div>
        </div>
    );
}

export default News;