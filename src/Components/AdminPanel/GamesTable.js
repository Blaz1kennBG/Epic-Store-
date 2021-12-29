import { Icon } from "@iconify/react"
import style from "./AdminPanel.module.css"
import GamesInputField from "./GamesInputField/GamesInputField"

const GamesTable = ({data, removeGame}) => {
 
return (
   <>
    <div className={style["heading-table"]}>
        <div className={style["header-row"]}>Title - string</div>
        <div className={style["header-row"]}>Price - number</div>
        <div className={style["header-row"]}>Discount - number</div>
        <div className={style["header-row"]}>Developer - string</div>
    </div>

    {data.map(e => <GamesInputField key={e.objectId} table={e} removeGame={removeGame} />)}
    <GamesInputField />
    <div className={style["article-row"]}>
        <div className={style["input-container"]}>
           
    
        </div>
    </div>
</>
)
}
export default GamesTable