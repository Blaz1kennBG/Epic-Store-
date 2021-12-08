import LazyLoad from 'react-lazyload'
import { Link } from 'react-router-dom'
import style from '../../News.module.css'
const BigArticle = ({ article }) => {
 
    const d = new Date(article.created)
    let month = '' + (d.getMonth() + 1)
    let day = '' + d.getDate()
    let year = d.getFullYear();
    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;
    const articleCreationDate = [year, month, day].join('/');






    return (
        <div className={style["top-container"]}>

            <LazyLoad>
            <div className={style["top-img"]}> 
               <img src={article.thumbnail} />             
            </div>
            </LazyLoad>
            <span className={style["top-time"]}>{articleCreationDate}</span>
            <span className={style["top-title"]}>{article.title}</span>
            <Link to={`/news/${article.objectId}`}>Read more</Link>
        </div>
    );
}

export default BigArticle;