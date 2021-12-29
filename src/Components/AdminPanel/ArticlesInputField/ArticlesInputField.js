
import { Icon } from '@iconify/react';
import Backendless from 'backendless';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import style from '../AdminPanel.module.css'

const ArticlesInputField = ({ table, removeArticle }) => {

    const [description, setDescription] = useState("")
    const [title, setTitle] = useState("")
    const [developer, setDeveloper] = useState("")
    const [thumbnail, setThumbnail] = useState("")

    const saveChanges = async () => {

      /*  If table is provided */
        if (table) {
            
            table.title = title
            table.description = description
            table.developer = developer
            table.thumbnail = thumbnail
            try {
                const updatedGame_1 = await Backendless.Data.of("Articles").save(table);
                return toast(`Updated ${title}`);
            } catch (e_1) {
                console.log(e_1);
               return toast("Oops, " + e_1);
            }
        }

       /* If table is not provided AKA empty input field */
       try {
                const updatedGame = await Backendless.Data.of("Articles").save({
                    title,
                    description,
                    developer,
                    thumbnail
                });
               return toast(`Adding a new article with name ${title}`);
            } catch (e) {
                console.log(e);
              return toast("Oops, " + e);
            }

    }

    const loadTable = () => {
        if (table)
        {
            setTitle(table.title)
            setDeveloper(table.developer)
            setThumbnail(table.thumbnail)
            setDescription(table.description)
        }
        else
        {
            setTitle("Enter title")
            setDeveloper("Enter developer")
            setThumbnail("Enter thumbnail url")
            setDescription(["Enter description"])
        }
    }
useEffect(() => {
    loadTable()
}, [])
    return (
        <div className={style["article-row"]}>
            <div className={style["input-container"]} >
                <input type="text" style={{ paddingLeft: "40px" }} defaultValue={title} onChange={(ev) => setTitle(ev.target.value)}/>

                {table && <Icon icon="ic:round-delete" className={style["icon"]} style={{ left: "10px" }} onClick={(e) => { if (window.confirm('Are you sure you wish to delete this item?')) removeArticle(table) }} />
                }
                <Icon className={style["icon"]} icon="bi:save" onClick={saveChanges}></Icon>
            </div>

            <div className={style["input-container"]}>
                <input type="text" defaultValue={developer} onChange={(ev) => setDeveloper(ev.target.value)}/>

                <Icon className={style["icon"]} icon="bi:save" onClick={saveChanges}></Icon>
            </div>
            <div className={style["input-container"]}>
                <input type="text"  defaultValue={description} onChange={(ev) => {setDescription([ev.target.value]) 
                    console.log(description)}}/>
                <Icon className={style["icon"]} icon="bi:save" onClick={saveChanges}></Icon>
            </div>
            <div className={style["input-container"]}>
                <input type="text" defaultValue={thumbnail} onChange={(ev) => setThumbnail(ev.target.value)}/>
                <Icon className={style["icon"]} icon="bi:save" onClick={saveChanges}></Icon>
            </div>
        </div>
    )
}
export default ArticlesInputField