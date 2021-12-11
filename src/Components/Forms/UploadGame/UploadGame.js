import { thumbnail } from '@cloudinary/url-gen/actions/resize'
import Backendless from 'backendless'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { uploadImage } from '../../../utils/cloudinary'
import { uploadGame } from '../../../utils/gameService'
import style from './UploadGame.module.css'

const UploadGame = () => {

    const [title, setTitle] = useState('')
    const [developer, setDeveloper] = useState('')
    const [publisher, setPublisher] = useState('')
    const [genres, setGenres] = useState([])
    const [price, setPrice] = useState(0)
    const [discount, setDiscount] = useState(0)
    const [images, setImages] = useState([])
    const [gameLogo, setGameLogo] = useState(undefined)
    const [description, setDescription] = useState('')
    const [thumbnail, setGameThumbnail] = useState(undefined)


    const submitHandler = (ev) => {
        ev.preventDefault()
       
        uploadGame(title,developer,description,publisher,genres,price,discount,images,gameLogo,thumbnail)
        .then(res => {
            toast("Game uploaded")
            console.log(res)
        })
        .catch(e => toast(e))  
     
      
        
        
      

    }

    return (
        <div className={style['modal']} >

            <form className={style["box"]} onSubmit={submitHandler}>

                <h1>Upload a game</h1>
                <input type="text" name="title" placeholder="title" onChange={(ev) => setTitle(ev.target.value)} value={title} required/>

                <input type="text" name="developer" placeholder="developer" onChange={(ev) => setDeveloper(ev.target.value)} value={developer} required/>
                <input type="text" name="description" placeholder="description" onChange={(ev) => setDescription(ev.target.value)} value={description} required/>
                <input type="text" name="publisher" placeholder="publisher" onChange={(ev) => setPublisher(ev.target.value)} value={publisher} required/>
                <input type="text" name="genres" placeholder="genres"  onKeyDown={(ev) => {
                    if (ev.key === ",") {
                        const _genres = [...genres]
                        _genres.push(ev.target.value)
                        ev.target.value = ''
                        setGenres(_genres)
                       
                    }
                }}
                    defaultValue={genres} />
                {genres.map(g => <div style={{ width: "100%" }} key={Math.random(0, 999)}>{g}</div>)}
                <input type="number" name="price" placeholder="Price 0 is free, below 0 is not released" onChange={(ev) => setPrice(ev.target.value)} value={price} required/>
                <input type="number" name="discount" placeholder="discount" onChange={(ev) => setDiscount(ev.target.value)} value={discount} required/>
                <span>Screnshots of game "max 3"</span>
                <input type="file" name="images" required onChange={(ev) => {
                    if (images.length < 3) {
                        if (ev.target.files[0] === undefined) { return }
                        const _images = [...images]
                        _images.push(ev.target.files[0])
                        return setImages(_images)
                    }
                    return toast("Maximum of 3 images only.")
                }} />
                <span>Game Logo</span>
                <input type="file" name="gameLogo" required onChange={(ev) => setGameLogo(ev.target.files[0])}/>
                <span>Game Thumbnail</span>
                <input type="file" name="gameLogo" required onChange={(ev) => setGameThumbnail(ev.target.files[0])}/>
                <input type="submit" name="submit" value="List the game" />
            </form>

        </div>
    )
}
export default UploadGame