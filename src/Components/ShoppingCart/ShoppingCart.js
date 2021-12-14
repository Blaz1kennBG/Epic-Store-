import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useRecoilState } from 'recoil';
import { shoppingCartState, userState } from '../../store/globalState';
import { buyGamesInCart, emptyCart, loadCart, removeItemFromCart } from '../../utils/gameService';
import { priceReducer } from '../../utils/reducers';
import EmptyShoppingCart from './EmptyShoppingCart';
import style from './ShoppingCart.module.css'
import ShoppingCartItem from './ShoppingCartItem/ShoppingCartItem';

const ShoppingCart = () => {
    const [cart, setCart] = useRecoilState(shoppingCartState)
    const [currentUser, setCurrentUser] = useRecoilState(userState)
    const [totalPrice, setTotalPrice] = useState(0)
    const removeHandler = (game) => {
        removeItemFromCart(currentUser, game).then(res => setCart(res))
    }
    const buyHandler = () => {
        buyGamesInCart(currentUser, cart)
        .then(updatedUser => {

            emptyCart(updatedUser)
            .then(updatedCart => setCart(updatedCart))
            
            setCurrentUser(updatedUser)
            toast("Games has been bought.")
        })
       
    }
    useEffect(() => {
            const _totalPrice = cart.reduce(priceReducer, 0)
            setTotalPrice(_totalPrice.toFixed(2))
      

    },[cart])
    return (
        <div className={style["shopping-cart-container"]}>
            <h1>My cart</h1>
            <div className={style["big-container"]}>
                {cart.length > 0 &&
                    <>
                        <div className={style["cart-items"]}>
                            {cart && cart.map(g => <ShoppingCartItem key={g.objectId} game={g} removeHandler={removeHandler}/>)}
                        </div>


                        <div className={style["purchase-info"]}>
                            <span>Games and Apps Summary</span>
                            <div className={style["purchase-price"]}>
                                <span>Price</span>
                                <span>BGN {totalPrice}</span>
                              
                            </div>
                            <div className={style["purchase-price"]}>
                                <span>Tax</span>
                                <span style={{ color: "rgba(245, 245, 245, 0.6)" }}>Calculated at checkout</span>
                            </div>
                            <div className={style["purchase-price"]}>
                                <span>Subtotal</span>
                                <span>BGN {totalPrice}</span>
                            </div>
                            <button onClick={buyHandler} style={{width: "100%", backgroundColor: "rgb(0, 125, 252)", border: "none", borderRadius: "5px"}}>Checkout</button>
                        </div>
                    </>
                }
            {cart.length === 0 && <EmptyShoppingCart />}
            </div>

        </div>
    );
}

export default ShoppingCart;