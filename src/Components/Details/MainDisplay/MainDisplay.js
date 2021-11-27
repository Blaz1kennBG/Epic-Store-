import { useRecoilValue } from "recoil";
import { userState } from "../../../store/globalState";
import DeveloperPublisher from "./DeveloperPublisher/DeveloperPublisher";
import GenresFeatures from "./GenresFeatures/GenresFeatures";
import ImageCarousel from "./ImageCarousel/ImageCarousel";
import style from "./MainDisplay.module.css"

const  MainDisplay  = ({game, gameActionHandler}) => {
    const currentUser = useRecoilValue(userState)
    return (  
        <div className={style["main-display-container"]}>
        <div className={style["media-and-description-container"]}>

            <div className={style["media-and-description"]}>
            <ImageCarousel game={game}/>
            </div>

            <div className={style["details-description"]}>
                {game.description}
            </div>
         
         <GenresFeatures game={game}/>
        </div>
        <div className={style["game-info-container"]}>
            <div className={style["game-info-image"]}>
                <img src={game.gameLogo} />
            </div>
            <div className={style["game-prices"]}>

                {game.isDiscounted &&
                    <>
                        <span className={style["discount-percentage"]}>-{game.discountedPrice}%</span>
                        <span className={style["full-price"]}>{game.price}BGN</span>
                        <span className={style["discounted-price"]}

                        >{(game.price - (game.price * (game.discountedPrice / 100))).toFixed(2)} BGN</span>
                    </>
                }
                {game.isDiscounted === false &&
                    (game.price > 0 ? <span className={style['discounted-price']}>{game.price} BGN</span>
                        : game.price === 0 ? <span className={style['discounted-price']}>Free</span>
                            : <span className={style['discounted-price']}>Available: {game.availableDate}</span>
                    )
                }


            </div>
            {game.price === 0 &&
                <>
                    <button className={style["buy-btn"]}>Add to library</button>

                </>
            }
            {game.price > 0 &&
                <>
                    <button
                        disabled={currentUser ? false : true}
                        style={{ background: !currentUser ? "#2A2A2A" : "" }}
                        onClick={gameActionHandler}
                        className={style["buy-btn"]}>Buy Now</button>
                    <button
                        disabled={currentUser ? false : true}
                        className={style["wishlist-btn"]}>Add to wishlist</button>
                </>
            }
            {game.price < 0 &&
                <>
                    <button

                        style={{ background: "#2A2A2A" }}
                        disabled={true}
                        className={style["buy-btn"]}>Buy Now</button>
                    <button className={style["wishlist-btn"]}>Add to wishlist</button>
                </>
            }
           <DeveloperPublisher game={game}/>

        </div>
    </div>
    );
}
 
export default  MainDisplay ;