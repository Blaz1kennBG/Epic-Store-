import style from "../MainDisplay.module.css"

const GuestPrices = ({ game }) => {
    return (
        <>
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

                        {game.price > 0 ?
                            <span className={style['discounted-price']}>{game.price} BGN</span>
                            : game.price === 0 ?
                                <span className={style['discounted-price']}>Free</span>
                                : <span className={style['discounted-price']}
                                    disabled={true}>Available: {game.availableDate}</span>

                        }
                    </>
                }


            </div>
            {game.price === 0 &&
                <>
                    <button className={style["buy-btn"]}>Login to add to wishlist</button>

                </>
            }
            {game.price > 0 &&
                <>

                    <button
                        disabled={true}
                        style={{ background: "#2A2A2A" }}

                        className={style["buy-btn"]}>Login to buy
                    </button>

                    <button
                        disabled={true}
                        className={style["wishlist-btn"]}>Login to add to wishlist
                </button>
                </>
            }
            {game.price < 0 &&
                <>
                  {/*   <button
                        style={{ background: "#2A2A2A" }}
                        disabled={true}
                        className={style["buy-btn"]}>Login to buy</button> */}
                    <button className={style["wishlist-btn"]}>Login to add to wishlist</button>
                </>
            }
        </>
    );
}

export default GuestPrices;