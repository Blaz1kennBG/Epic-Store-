import style from '../News.module.css'

const Article = ({article}) => {
    return (  
        <div className={style["article"]}>

        <div className={style["image-container"]}>
            <img src={article.thumbnail}/>
        </div>

        <div className={style["text-container"]}>
            <span className={style["article-time"]}>{article.createdAt}</span>
            <span className={style["article-title"]}>{article.title}</span>
            <span className={style["article-readmore"]}>Read more</span>
        </div>

    </div>
    );
}
 
export default Article;