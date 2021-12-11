import { useEffect, useState } from "react";
import style from "../MainDisplay.module.css"

const AuthenticatedPrices = ({ game, currentUser, gameActionHandler }) => {
    const [isOwned, setOwned] = useState(false)
    const [isWishlisted, setWishlisted] = useState(false)
    useEffect(() => {
        
        currentUser.gamesBought.some(g => {
            if (g.objectId === game.objectId) { 
                return setOwned(true) }
        })
        currentUser.wishlist.some(g => {
            if (g.objectId === game.objectId) {
                return setWishlisted(true)
            }
        })
    })
    return (
        <>
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
                    <>

                        {game.price > 0 ? <span className={style['discounted-price']}>{game.price} BGN</span>
                            : game.price === 0 ? <span className={style['discounted-price']}>Free</span>
                                : 
                                <span className={style['discounted-price']}
                                    disabled={currentUser ? false : true}
                                    style={{ background: !currentUser ? "#2A2A2A" : "" }}
                                >Available: {game.availableDate}
                                </span>

                        }
                    </>
                }


            </div>
          {/*   if game is free */}
            {game.price === 0 &&
                <>
                    <button className={style["buy-btn"]} 
                    onClick={() => gameActionHandler('buy')}
                    disabled={isOwned ? true : false}
                    style={{ background: isOwned ? "#2A2A2A" : "" }}
                    >{isOwned ? "You own this" : "Add to library"}</button>
                </>
            }
        {/*     If game is released and has a price */}
            {game.price > 0 &&
                <>
                           <button
                           disabled={isOwned ? true : false}
                           style={{ background: isOwned ? "#2A2A2A" : "" }}
                           onClick={() => gameActionHandler('buy')}
                           className={style["buy-btn"]}>{isOwned ? "You already own this!" : "Buy now"}
                            </button>
                    
                    <button className={style["wishlist-btn"]} 
                    onClick={() => gameActionHandler('wishlist')}
                    disabled={isWishlisted ? true : false}
                    >{isWishlisted ? "Game is wishlisted" : "Add to wishlist"}</button>
                </>
            }
           {/*  If game is not released yet */}
            {game.price < 0 &&
                <>
                    <button

                        style={{ background: "#2A2A2A" }}
                        disabled={true}
                        className={style["buy-btn"]}>Buy Now</button>

                    <button className={style["wishlist-btn"]} 
                    onClick={() => gameActionHandler('wishlist')}
                    disabled={isWishlisted ? true : false}
                    >{isWishlisted ? "Game is wishlisted" : "Add to library"}</button>
                </>
            }
        </>
    );
}

export default AuthenticatedPrices;
