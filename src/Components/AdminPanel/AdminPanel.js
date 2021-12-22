import Backendless from "backendless";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import style from "./AdminPanel.module.css"
import InputField from "./InputField/InputField";
const AdminPanel = () => {
    const [data, setData] = useState(undefined)
    const [text, setText] = useState('')
    const loadTable = (tableName) => {
        Backendless.Data.of(tableName).find()
            .then(response => setData(response))
            .catch(e => console.log(e))
    }

    return (
        <div className={style["admin-panel-container"]}>
            <div className={style["side-bar"]}>
                <div className={style["profile"]}>
                    <div className={style["avatar"]}>
                        <img src="../assets/images/1200-80x pic.jpg" />
                    </div>
                    <span>Username</span>
                    <span>Administrator</span>
                </div>
                <div className={style["side-bar-list"]}>
                    <ul>
                        <li onClick={() => loadTable("Games")}>
                            Games
                        </li>
                        <li>
                            Articles
                        </li>
                        <li>
                            Users
                        </li>
                        <li>
                            <Link to="/profile">Profile</Link>
                        </li>
                    </ul>
                </div>

            </div>
            <div className={style["article-table"]}>
                <div className={style["heading-table"]}>
                    <div className={style["header-row"]}>Title</div>
                    <div className={style["header-row"]}>Price</div>
                    <div className={style["header-row"]}>Discount</div>
                    <div className={style["header-row"]}>Developer</div>
                </div>

                {data && data.map(e => <InputField key={e.objectId} table={e} />)}
                <div className={style["article-row"]}>
                    <div className={style["input-container"]}>
                        <input type="text" onChange={(ev) => setText(ev.target.value)} value={text}/>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminPanel;