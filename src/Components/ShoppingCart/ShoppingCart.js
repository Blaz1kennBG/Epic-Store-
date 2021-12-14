import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { shoppingCartState } from '../../store/globalState';
import EmptyShoppingCart from './EmptyShoppingCart';
import style from './ShoppingCart.module.css'
import ShoppingCartItem from './ShoppingCartItem/ShoppingCartItem';

const ShoppingCart = () => {
    const [cart, setCart] = useRecoilState(shoppingCartState)
    useEffect(() => {

    })
    return (
        <div className={style["shopping-cart-container"]}>
            <h1>My cart</h1>
            <div className={style["big-container"]}>
                {cart.length > 0 &&
                    <>
                        <div className={style["cart-items"]}>
                            {cart && cart.map(g => <ShoppingCartItem key={g.objectId} game={g} />)}
                        </div>


                        <div className={style["purchase-info"]}>
                            <span>Games and Apps Summary</span>
                            <div className={style["purchase-price"]}>
                                <span>Price</span>
                                <span>BGN {cart.length !== 0 && cart.reduce((initialPrice, game) => initialPrice.price + game.price)}</span>
                            </div>
                            <div className={style["purchase-price"]}>
                                <span>Tax</span>
                                <span style={{ color: "rgba(245, 245, 245, 0.6)" }}>Calculated at checkout</span>
                            </div>
                            <div className={style["purchase-price"]}>
                                <span>Subtotal</span>
                                <span>BGN {cart.length !== 0 && cart.reduce((initialPrice, game) => initialPrice.price + game.price)}</span>
                            </div>
                        </div>
                    </>
                }
            {cart.length === 0 && <EmptyShoppingCart />}
            </div>

        </div>
    );
}

export default ShoppingCart;