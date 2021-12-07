import { useEffect, useState } from 'react';
import style from '../News.module.css'

const Article = ({article}) => {
    const [image, setImage] = useState(undefined)
    useEffect(() => {
        const _image = new Image(200, 90)
        _image.src = article.thumbnail
        setImage(_image.src)
    })
    return (  
        <div className={style["article"]}>

        <div className={style["image-container"]}>
            <img src={image}/>
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