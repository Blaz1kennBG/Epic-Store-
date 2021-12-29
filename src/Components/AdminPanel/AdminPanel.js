import Backendless from "backendless";
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import style from "./AdminPanel.module.css"
import ArticlesTable from "./ArticlesTable";

import GamesTable from "./GamesTable";

const AdminPanel = () => {
    
    const [gamesTable, setGamesTable] = useState(undefined)
    const [articlesTable, setArticlesTable] = useState(undefined)
    const loadTable = (tableName) => {
        Backendless.Data.of(tableName).find()
            .then(response => {
                const _response = response.sort((a,b) => b.created - a.created)
                if (tableName === "Games") {
                    setArticlesTable(undefined)
                    return setGamesTable(_response)
                }
                if (tableName === "Articles") {
                    setGamesTable(undefined)
                    return setArticlesTable(_response)
                }
            })
            .catch(e => toast("Could not load tables, " + e))
    }

    const removeGame = (table) => {
        Backendless.Data.of("Games").remove(table)
        .then(response => {
            toast("Game removed.")
            loadTable("Games")
        })
        .catch(e => toast("Oops, " + e))
    }
    const removeArticle = (table) => {
        Backendless.Data.of("Articles").remove(table)
        .then(response => {
            toast("Article removed.")
            loadTable("Articles")
        })
        .catch(e => toast("Oops, " + e))
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
                        <li onClick={() => loadTable("Articles")}>
                            Articles
                        </li>
                        <li>
                            Users
                        </li>
                        <li>
                            <Link to="/profile">Profile</Link>
                        </li>
                        <li>
                            <Link to="/uploadGame">Add game</Link>
                        </li>
                        <li>
                            <Link to="/atu">Add article</Link>
                        </li>
                    </ul>
                </div>

            </div>
            <div className={style["article-table"]}>
        {gamesTable && <GamesTable data={gamesTable} removeGame={removeGame} />}
         {articlesTable && <ArticlesTable data={articlesTable} removeArticle={removeArticle}/>} 


            </div>

        </div>
    );
}

export default AdminPanel;