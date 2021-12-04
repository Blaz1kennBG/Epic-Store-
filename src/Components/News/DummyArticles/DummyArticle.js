import style from '../News.module.css'

const DummyArticle = () => {
    return (
        <>
        <div className={style["article"]}>

            <div className={style["image-container"]}>

            </div>

            <div className={style["text-container"]}>
                <span className={style["article-time"]}></span>
                <span className={style["article-title"]}></span>
                <span className={style["article-readmore"]}></span>
            </div>

        </div>
           <div className={style["article"]}>

           <div className={style["image-container"]}>

           </div>

           <div className={style["text-container"]}>
               <span className={style["article-time"]}></span>
               <span className={style["article-title"]}></span>
               <span className={style["article-readmore"]}></span>
           </div>

       </div>
          <div className={style["article"]}>

          <div className={style["image-container"]}>

          </div>

          <div className={style["text-container"]}>
              <span className={style["article-time"]}></span>
              <span className={style["article-title"]}></span>
              <span className={style["article-readmore"]}></span>
          </div>

      </div>
      </>
    );
}

export default DummyArticle;