
import LazyLoad from 'react-lazyload'
import style from '../News.module.css'
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

            <div className={style["top-img"]}>

           <LazyLoad height={300}>
               <img src={article.thumbnail} />
           </LazyLoad>
         
                
               
                
            </div>
            <span className={style["top-time"]}>{articleCreationDate}</span>
            <span className={style["top-title"]}>{article.title}</span>
            <span>Read more</span>
        </div>
    );
}

export default BigArticle;