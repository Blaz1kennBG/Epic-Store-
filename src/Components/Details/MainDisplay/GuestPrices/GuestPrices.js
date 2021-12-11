import style from "../MainDisplay.module.css"

const GuestPrices = ({game}) => {
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
                            : <span className={style['discounted-price']}
                                disabled={true}
                                style={{ background: "#2A2A2A" }}
                            >Available: {game.availableDate}</span>

                    }
                </>
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
                    disabled={true}
                    style={{ background: "#2A2A2A" }}
                  
                    className={style["buy-btn"]}>Buy Now
                    </button>
                
                <button
                    disabled={true}
                    className={style["wishlist-btn"]}>Add to wishlist
                </button>
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
    </>
    );
}
 
export default GuestPrices;