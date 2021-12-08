import { useEffect, useState } from 'react';
import { uploadArticle } from '../../../utils/articleService';
import style from '../../News/ArticleDetails/ArticleDetails.module.css'
import InputEdit from './EditInput';
const ArticleTemplate = () => {

    const [image, setImage] = useState()
    const [preview, setImagePreview] = useState(undefined)

    const [titleEdit, setTitleEdit] = useState(false)
    const [title, setTitle] = useState("Title")

    const [dateEdit, setDateEdit] = useState(false)
    const [date, setDate] = useState('........')

    const [developerEdit, setDeveloperEdit] = useState(false)
    const [developer, setDeveloper] = useState("XXX Company")

    const [pararaph1Edit, setParapraph1Edit] = useState(false)
    const [paragraph1, setParagraph1] = useState('Lorem ipsum blah blah blah')

    const [pararaph2Edit, setParapraph2Edit] = useState(false)
    const [paragraph2, setParagraph2] = useState('Lorem ipsum blah blah blah')

    const [pararaph3Edit, setParapraph3Edit] = useState(false)
    const [paragraph3, setParagraph3] = useState('Lorem ipsum blah blah blah')

    const editHandler = (value, type) => {
        console.log(value)
        if (type === "title") { setTitle(value); setTitleEdit(!titleEdit) }
        if (type === "date") { setDate(value); setDateEdit(!dateEdit) }
        if (type === "developer") { setDeveloper(value); setDeveloperEdit(!developerEdit)}
        if (type === "paragraph1") { setParagraph1(value); setParapraph1Edit(!pararaph1Edit)}
        if (type === "paragraph2") { setParagraph2(value); setParapraph2Edit(!pararaph2Edit)}
        if (type === "paragraph3") { setParagraph3(value); setParapraph3Edit(!pararaph3Edit)}
        if (type === "image") {
            setImage(value)
        }
    }
    const submitHandler = (ev) => {
    ev.preventDefault()
    uploadArticle(image, title, [paragraph1, paragraph2, paragraph3], developer)
    }
    useEffect(() => {
        if (!image) {
            setImage(undefined)
            return
        }
        const imagePreviewUrl = URL.createObjectURL(image)
        setImagePreview(imagePreviewUrl)
        // free memory when ever this component is unmounted
        return () => URL.revokeObjectURL(imagePreviewUrl)
    }, [image])
    return (
        <div className={style["details-container"]}>

            <div className={style["image-container"]}>
               {image && <img src={preview}/>}
                <input type="file" onChange={(ev) => editHandler(ev.target.files[0], "image")} required/>
            </div>

            <div className={style["description-container"]} >

                {titleEdit ? <InputEdit editHandler={editHandler} value={title} type={"title"} /> : <h1 onDoubleClick={() => setTitleEdit(!titleEdit)}>{title}</h1>}

                {dateEdit ? <InputEdit editHandler={editHandler} value={date} type={"date"} /> : <span onDoubleClick={() => setDateEdit(!dateEdit)} className={style["main-text"]}>{date}</span>}
                {developerEdit ? <InputEdit editHandler={editHandler} value={developer} type={"developer"}/> : <span onDoubleClick={() => setDeveloperEdit(!developerEdit)} className={style["main-text"]}>By {developer}</span>}

                <div className={style["descriptions"]}>
                    {pararaph1Edit ? <InputEdit editHandler={editHandler} value={paragraph1} type={"paragraph1"}/> : <p onDoubleClick={() => setParapraph1Edit(!pararaph1Edit)}>{paragraph1}</p>}
                    
                    {pararaph2Edit ? <InputEdit editHandler={editHandler} value={paragraph2} type={"paragraph2"}/> : <p onDoubleClick={() => setParapraph2Edit(!pararaph2Edit)}>{paragraph2}</p>}

                    {pararaph3Edit ? <InputEdit editHandler={editHandler} value={paragraph3} type={"paragraph3"}/> : <p onDoubleClick={() => setParapraph3Edit(!pararaph3Edit)}>{paragraph3}</p>}
                </div>
            </div>
            <button onClick={submitHandler}>Upload the article!</button>
        </div>
    );
}

export default ArticleTemplate;