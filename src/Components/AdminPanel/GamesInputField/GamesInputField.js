
import { Icon } from '@iconify/react';
import Backendless from 'backendless';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import style from '../AdminPanel.module.css'

/* Input field for Games Table */

const GamesInputField = ({table, removeGame}) => {
    
    const [title, setTitle] = useState('')
    const [price, setPrice] = useState('')
    const [developer, setDeveloper] = useState('')
    const [discount, setDiscount] = useState('')
    
    const saveChanges = async () => {
     
        if (table) {
            table.title = title
            table.price = price
            table.devloper = developer
            table.discount = discount
            try {
                const updatedGame_1 = await Backendless.Data.of("Games").save(table);
                return toast(`Updated ${table.title}.`);
            } catch (e_1) {
                console.log(e_1);
              return toast("Oops, " + e_1);
            }
        }
       /* If table is not provided, AKA empty input field */
      
       try {
                const updatedGame = await Backendless.Data.of("Games").save({
                    title,
                    price,  
                    developer,
                    discount
                });
                return toast(`Created ${title}`);
            } catch (e) {
                console.log(e);
               return toast("Oops, " + e);
            }
        

       /*  If table is provided */
    
    }
    const loadTable = () => {
        if (table)
        {
            setTitle(table.title)
            setPrice(table.price)
            setDiscount(table.discount)
            setDeveloper(table.developer)
        }
        else
        {
            setTitle("Enter title")
            setPrice("Enter price")
            setDiscount("Enter discount percentage")
            setDeveloper("Enter developer name")
        }
    }

    useEffect(() => {
        loadTable()
    }, [])

  

    return (
        <div className={style["article-row"]}>
            <div className={style["input-container"]} >
                <input type="text" onChange={(ev) => setTitle(ev.target.value)} value={title} style={{paddingLeft: "40px"}}/>
                
{table &&             <Icon icon="ic:round-delete"  className={style["icon"]} style={{left: "10px"}} onClick={(e) => { if (window.confirm('Are you sure you wish to delete this item?')) removeGame(table) } }/>
}                <Icon className={style["icon"]} icon="bi:save" onClick={saveChanges}></Icon>
            </div>

            <div className={style["input-container"]}>
                <input 

                type="text" onChange={(ev) => {
                    console.log(ev.key)
                    setPrice(ev.target.value) 
             
            
            }} value={price} />
            
                <Icon className={style["icon"]} icon="bi:save" onClick={saveChanges}></Icon>
            </div>
            <div className={style["input-container"]}>
                <input type="text" 
                onChange={(ev) => setDiscount(ev.target.value)} value={discount}/>
                <Icon className={style["icon"]} icon="bi:save" onClick={saveChanges}></Icon>
            </div>
            <div className={style["input-container"]}>
                <input type="text" onChange={(ev) => setDeveloper(ev.target.value)} value={developer}/>
                <Icon className={style["icon"]} icon="bi:save" onClick={saveChanges}></Icon>
            </div>
        </div>
    );
}

export default GamesInputField;