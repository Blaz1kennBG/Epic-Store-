import style from "./AdminPanel.module.css"
import ArticlesInputField from "./ArticlesInputField/ArticlesInputField"
const ArticlesTable = ({data, removeArticle}) => {

    return (
        <>
        <div className={style["heading-table"]}>
            <div className={style["header-row"]}>Title</div>
            <div className={style["header-row"]}>Developer</div>
            <div className={style["header-row"]}>Description</div>
            <div className={style["header-row"]}>Thumbnail URL</div>
        </div>
    
        {data.map(e => <ArticlesInputField key={e.objectId} table={e} removeArticle={removeArticle}/>)}
        <ArticlesInputField />
        <div className={style["article-row"]}>
            <div className={style["input-container"]}>
                

            </div>
        </div>
        </>
    )
}
export default ArticlesTable