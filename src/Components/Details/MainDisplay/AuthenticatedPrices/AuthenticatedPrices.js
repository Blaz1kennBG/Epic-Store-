import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { userState } from "../../../../store/globalState";
import Checkout from "../../../Checkout/Checkout";
import style from "../MainDisplay.module.css"

const AuthenticatedPrices = ({ game, gameActionHandler, checkout, setCheckout }) => {
    const [isOwned, setOwned] = useState(false)
    const [isWishlisted, setWishlisted] = useState(false)
    const [currentUser, setCurrentUser] = useRecoilState(userState)
    
    useEffect(() => {
        
        currentUser.gamesBought.some(g => {
            if (g.objectId === game.objectId) {
                return setOwned(true)
            }
        })
        currentUser.wishlist.some(g => {
            if (g.objectId === game.objectId) {
                return setWishlisted(true)
            }
        })
    }, [currentUser])
    return (
        <>
      {checkout && <Checkout game={game} setCheckout={setCheckout} gameActionHandler={gameActionHandler}/>}
            <div className={style["game-prices"]}>

                {game.isDiscounted &&
                    <>
                        <span className={style["discount-percentage"]}>-{game.discount}%</span>
                        <span className={style["full-price"]}>{game.price}BGN</span>
                        <span className={style["discounted-price"]}
                        >{(game.price - (game.price * (game.discount / 100))).toFixed(2)} BGN</span>

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
                        onClick={() => /* gameActionHandler('addtocart') */
                    setCheckout(!checkout)
                    }
                        disabled={isOwned ? true : false}
                        style={{ background: isOwned ? "#2A2A2A" : "" }}
                    >{isOwned ? "You own this" : "Add to library"}</button>
                </>
            }
            {/*     If game is released and has a price */}
            {game.price > 0 &&
                <>
                    <button
                        disabled={isOwned || isWishlisted ? true : false}
                        style={{ background: isOwned ? "#2A2A2A" : "" }}
                        onClick={() => setCheckout(!checkout) }
                        className={style["buy-btn"]}>{isOwned ? "You already own this!" : "Buy now"}
                    </button>

                    <button className={style["wishlist-btn"]}
                        onClick={() => gameActionHandler('wishlist')}
                        disabled={isOwned || isWishlisted ? true : false}
                    >{isWishlisted ? "Game is wishlisted" : isOwned ? "You already own this game" : "Add to wishlist"}</button>
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
                    >{isWishlisted ? "Game is wishlisted" : "Add to wishlist"}</button>
                </>
            }
            
          

                {game.availableDate === null && game.price > 0 && <button className={style['wishlist-btn']}
                disabled={isOwned ? true : false}
                style={{ background: "black" }}
                onClick={() => gameActionHandler('addtocart') }
                 >Add to cart. </button>}
        </>
    );
}

export default AuthenticatedPrices;
