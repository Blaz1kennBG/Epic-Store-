import style from '../../News.module.css'

const DummyArticle = () => {
    return (
        <>
            <div className={style["article"]}>

                <div className={style["image-container"]}>

                </div>

                <div className={style["text-container"]}>
                    <span className={style["article-time"]}>__/__/____</span>
                    <span className={style["article-title"]}>________________________________</span>
                    <span className={style["article-readmore"]}>__________</span>
                </div>


            </div>
            <div className={style["article"]}>

                <div className={style["image-container"]}>

                </div>

                <div className={style["text-container"]}>
                    <span className={style["article-time"]}>__/__/____</span>
                    <span className={style["article-title"]}>________________________________</span>
                    <span className={style["article-readmore"]}>__________</span>
                </div>


            </div>
            <div className={style["article"]}>

                <div className={style["image-container"]}>

                </div>

                <div className={style["text-container"]}>
                    <span className={style["article-time"]}>__/__/____</span>
                    <span className={style["article-title"]}>________________________________</span>
                    <span className={style["article-readmore"]}>__________</span>
                </div>


            </div>
        </>
    );
}

export default DummyArticle;