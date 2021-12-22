
import { Icon } from '@iconify/react';
import { useEffect, useState } from 'react';
import style from '../AdminPanel.module.css'

const InputField = ({table}) => {
    const [title, setTitle] = useState('')
    const [price, setPrice] = useState('')
    const [developer, setDeveloper] = useState('')
    const [discount, setDiscount] = useState('')

    useEffect(() => {
        setTitle(table.title)
        setPrice(table.price)
        setDiscount(table.discount)
        setDeveloper(table.developer)
    }, [])

  

    return (
        <div className={style["article-row"]}>
            <div className={style["input-container"]}>
                <input type="text" onChange={(ev) => setTitle(ev.target.value)} value={title}/>
                <Icon className={style["icon"]} icon="bi:save" ></Icon>
            </div>

            <div className={style["input-container"]}>
                <input 

                type="number" onChange={(ev) => {
                    console.log(ev.key)
                    setPrice(ev.target.value) 
             
            
            }} value={price} />
                <Icon className={style["icon"]} icon="bi:save" ></Icon>
            </div>
            <div className={style["input-container"]}>
                <input type="number" 
                onChange={(ev) => setDiscount(ev.target.value)} value={discount}/>
                <Icon className={style["icon"]} icon="bi:save" ></Icon>
            </div>
            <div className={style["input-container"]}>
                <input type="text" onChange={(ev) => setDeveloper(ev.target.value)} value={developer}/>
                <Icon className={style["icon"]} icon="bi:save" ></Icon>
            </div>
        </div>
    );
}

export default InputField;