
import { Link } from 'react-router-dom'
import style from '../News.module.css'

const Article = ({article}) => {

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
        <div className={style["article"]}>

        <div className={style["image-container"]}>
            <img src={article.thumbnail}/>
        </div>

        <div className={style["text-container"]}>
            <span className={style["article-time"]}>{articleCreationDate}</span>
            <span className={style["article-title"]}>{article.title}</span>
            <Link className={style["article-readmore"]} to={`/news/${article.objectId}`}>Read more</Link>
        </div>

    </div>
    );
}
 
export default Article;