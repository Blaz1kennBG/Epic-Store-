
import { Icon } from '@iconify/react';
import style from '../ShoppingCart.module.css'
const ShoppingCartItem = ({game}) => {
    return ( 
        <div className={style["cart-item-container"]}>

        <div className={style["cart-item-image"]}>
            <img src={game.thumbnail} />
        </div>

        <div className={style["cart-item-title-and-platform"]}>
            <div>Base Game
            </div>

            <span>{game.title}</span>
            <Icon className={style["iconify"]} icon="mdi:microsoft-windows"></Icon>
        </div>

        <div className={style["prices-and-options"]}>
            <div className={style["price"]}>BGN {game.price}</div>
            <div className={style["options"]}>
                <span>Move to wishlist</span>
                <span>Remove</span>
            </div>
        </div>

    </div>
     );
}
 
export default ShoppingCartItem;