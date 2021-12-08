import Backendless from 'backendless';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';

import { parseDate } from '../../../utils/datePrase';
import style from './ArticleDetails.module.css'

const ArticleDetails = () => {
    const [article, setArticle] = useState(undefined)
    const params = useParams()
    const [articleCreatedAt, setArticleDate] = useState('')

    useEffect(() => {
        Backendless.Data.of("Articles").findById(params.id)
            .then(a => {
                setArticleDate(parseDate(a.created))
                setArticle(a)
            })
    }, [])
    return (
        <>
            { article &&
                <div className={style["details-container"]}>

                    <div className={style["image-container"]}>
                        <img src={article.thumbnail} />
                    </div>

                    <div className={style["description-container"]}>

                        <h1>{article.title}</h1>
                        <span className={style["main-text"]}>{articleCreatedAt}</span>
                        <span className={style["main-text"]}>By {article.developer}</span>
                        <div className={style["descriptions"]}>
                            {article.description.map(a => <p>{a}</p>)}
                        </div>
                    </div>

                </div>
            }
            {!article && <h1>Loading...</h1>}
        </>
    );
}

export default ArticleDetails;