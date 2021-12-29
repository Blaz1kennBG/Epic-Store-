
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { uploadGame } from '../../../utils/gameService'
import style from './UploadGame.module.css'

const UploadGame = () => {

    const [title, setTitle] = useState('')
    const [developer, setDeveloper] = useState('')
    const [publisher, setPublisher] = useState('')
    const [genres, setGenres] = useState([])
    const [price, setPrice] = useState('')
    const [discount, setDiscount] = useState(0)
    const [images, setImages] = useState([])
    const [gameLogo, setGameLogo] = useState(undefined)
    const [description, setDescription] = useState('')
    const [thumbnail, setGameThumbnail] = useState(undefined)
    const [thumbnailPreview, setThumbnailPreview] = useState(undefined)
    const [isDiscounted, setIsDiscounted] = useState(false)
    const [isAvailable, setIsAvailable] = useState(true)
    const [availableDate, setAvailableDate] = useState('')
    const navigate = useNavigate()

    const submitHandler = (ev) => {
        ev.preventDefault()
       
        toast.promise(uploadGame(title,developer,description,publisher,genres,price,discount,images,gameLogo,thumbnail, isDiscounted), {
            pending: {
                render() { 
                    return "Uploading..."
                },
                icon: false
            }, 
            success: {
                render({data}) {
                  
                    navigate("/")
                    return `Game uploaded!`
                },
                icon: "🟢"
            },
            error: {
                render({data}) {
                    console.log(data)
                    return `Oops, ${data}`
                }
            }
        })

    }
    useEffect(() => {
        
        if (!thumbnailPreview) {
            setThumbnailPreview(undefined)
            return
        }
        // free memory when ever this component is unmounted
        return () => URL.revokeObjectURL(thumbnailPreview)
    }, [thumbnail])
    return (
        <>
        <div className={style['form-container']} >

            <form className={style["box"]} onSubmit={submitHandler}>

                <h1>Upload a game</h1>
                <input type="text" name="title" placeholder="title" onChange={(ev) => setTitle(ev.target.value)} value={title} required/>

                <input type="text" name="developer" placeholder="developer" onChange={(ev) => setDeveloper(ev.target.value)} value={developer} required/>
                <input type="text" name="publisher" placeholder="publisher" onChange={(ev) => setPublisher(ev.target.value)} value={publisher} required/>
                <input type="text" name="description" placeholder="description" onChange={(ev) => setDescription(ev.target.value)} value={description} required/>
                <input type="text" name="genres" placeholder="genres"  onKeyDown={(ev) => {
                    if (ev.key === ",") {
                        const _genres = [...genres]
                        _genres.push(ev.target.value)
                        setGenres(_genres)
                        console.log(ev.target.value)
                       
                    }
                }}
                    defaultValue={genres} />
                {genres.map(g => <span style={{ width: "100%" }} key={Math.random(0, 999)}>{g}</span>)}
                <input type="number" name="price" placeholder="Price 0 is free, below 0 is not released" onChange={(ev) => setPrice(ev.target.value)} value={price} required/>

                <span style={{color: "white"}}>Game is Discounted?</span>
                <input  type="checkbox" onChange={(ev) => setIsDiscounted(ev.target.checked)} />
                {isDiscounted && <input type="number" name="discount" placeholder="discount %" onChange={(ev) => setDiscount(ev.target.value)} value={discount} required/>}

                <span style={{color: "white"}}>Game is not available?</span>
                <input type="checkbox" onChange={(ev) => setIsAvailable(ev.target.checked)} />
                {!isAvailable && <input type="text" name="available" placeholder="Available date" onChange={(ev) => setAvailableDate(ev.target.value)} value={availableDate}/>}

                <span style={{color: "white"}}>Screnshots of game "max 3"</span>

                <input type="file" name="images" required onChange={(ev) => {
                    if (images.length < 3) {
                        if (ev.target.files[0] === undefined) { return }
                        const _images = [...images]
                        _images.push(ev.target.files[0])
                        return setImages(_images)
                    }
                    return toast("Maximum of 3 images only.")
                }} 
                />
                <span style={{color: "white"}}>Game Logo</span>
                <input type="file" name="gameLogo" required onChange={(ev) => setGameLogo(ev.target.files[0])}/>
                <span style={{color: "white"}}>Game Thumbnail</span>
                <input type="file" name="gameLogo" required onChange={(ev) => {
                    setGameThumbnail(ev.target.files[0])
                    const imagePreviewUrl = URL.createObjectURL(ev.target.files[0])
                    setThumbnailPreview(imagePreviewUrl)
                }
            }/>
                <input type="submit" name="submit" value="List the game" />
            </form>
            
        </div>
       <div className={style["card-list"]}>
       <div className={style['card']}>
         <div className={style['card-image']}>
 
{             <img  src={thumbnailPreview ? thumbnailPreview : ""}/>}
         </div>
         <div className={style['card-content']}>
             <span className={style['card-title']} style={{ color: "rgb(245,245,245)" }}
                 > {title}</span>
 
             <span className={style['card-description']}>{developer} | {publisher}</span>
             {discount > 0 &&
                 <div className={style['card-discount-container']}>
                     <div className={style['discount-number']}>
                         <span className={style["discount-percentage"]}>-{discount}%</span>
                     </div>
                     <div className={style["discount-prices"]}>
                         <span className={style["card-discount"]}>BGN {price} </span>
                         <span className={style["card-price"]}>BGN {(price - (price * (discount / 100))).toFixed(2)}</span>
                     </div>
 
                 </div>
             }
 
             {discount === 0 &&
                 (price > 0 ? <span className={style['card-price']}>{price} BGN</span>
                     : price === 0 ? <span className={style['card-price']}>Free</span>
                         : <span className={style['card-date']}>Available: {availableDate}</span>
                 )
             }
         </div>
     </div>
       </div>
     </>
    )
}
export default UploadGame