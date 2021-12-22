import style from './Checkout.module.css'

import { useEffect, useState } from 'react';
import CheckoutSection from './CheckoutSection/CheckoutSection';
const Checkout = ({ game, setCheckout, gameActionHandler }) => {
    const [gamePrice, setGamePrice] = useState(0)
    useEffect(() => {
        if (game.isDiscounted) {
            const _price = game.price - (game.price * (game.discount / 100)).toFixed(2)
            return setGamePrice(_price)
        }
        return setGamePrice(game.price)
    }, [])
    return (
        <>

            <div className={style["modal"]}>
                <div className={style["checkout-container"]}>

                    <CheckoutSection />

                    <div className={style["order-summary"]}>

                        <span>Order summary</span>

                        <div className={style["img-container"]}>
                            <img src={game.thumbnail} />
                        </div>

                        <div className={style["text-container"]}>
                            <span className={style["game-title"]}>{game.name}</span>
                            <span className={style["developer"]}>{game.developer}</span>

                            <div className={style["price"]}>
                                <span>Price</span>
                                <span>BGN {gamePrice}</span>
                            </div>

                            <div className={style["price"]}>
                                <span>Tax</span>
                                <span>BGN +{((gamePrice / 100) * 20).toFixed(2)}</span>
                            </div>

                            <span className={style["vat"]}>Vat 20% included if applicable</span>

                            <div className={style["price"]}>
                                <span>Total</span>
                                <span>{(gamePrice + (gamePrice / 100) * 20).toFixed(2)}</span>
                            </div>

                            <div style={{ display: "flex", flexDirection: "row" }}>
                                <button
                                    onClick={() => { gameActionHandler("buy"); }}
                                    className={style["btn"]}>Checkout</button>
                                <button className={style["btn"]}
                                    style={{ backgroundColor: "black" }}
                                    onClick={setCheckout}
                                >Close</button>
                            </div>


                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}


export default Checkout;