import Backendless from 'backendless';
import { useEffect, useState } from 'react';

import { getRandomItemFromArray } from '../../utils/usefulFunctions';
import Article from './Article/Article';
import DummyArticle from './Article/DummyArticles/DummyArticle';
import BigDummyArticle from './BigArticleContainer/BigArticle/BigDummyArticle/BigDummyArticle';
import BigArticleContainer from './BigArticleContainer/BigArticleContainer';


import style from './News.module.css'
const News = () => {
    
    const [articles, setArticles] = useState(undefined)
    const [bigArticles, setBigArticles] = useState(undefined)
    useEffect( () => {
        Backendless.Data.of('Articles').find().then(response => {
           
            if (response.length > 2) { 
            setArticles(response)
            setBigArticles(getRandomItemFromArray(response))
            }
            
        })
   
    }, [])
    return (
        <div className={style["news-container"]}>
            <div className={style["top-part"]}>
                <span className={style["news-title"]}>News</span>




               {!bigArticles && <BigDummyArticle />}
                {bigArticles && <BigArticleContainer article={bigArticles} />}
               

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