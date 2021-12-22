
import { Icon } from '@iconify/react';
import { useEffect, useState } from 'react';


import style from '../ShoppingCart.module.css'
const ShoppingCartItem = ({game, removeHandler}) => {
    const [gamePrice, setGamePrice] = useState(0)

    useEffect(() => {
        if (game.discount > 0) {
        
        return   setGamePrice(game.price - (game.price * (game.discount / 100)).toFixed(2))
        }
        return setGamePrice(game.price)
    }, [])

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
            
            <div className={style["price"]}>
                {game.discount > 0 &&
                <>
                <span className={style['discount']}>{game.discount}%</span>
                <span className={style["oldPrice"]}>{(game.price).toFixed(2)}</span>
                </>
                }
                BGN {(gamePrice).toFixed(2)}</div>
            <div className={style["shopping-options"]}>
                <span>Move to wishlist</span>
                <span onClick={() => removeHandler(game)}>Remove</span>
            </div>
        </div>

    </div>
     );
}
 
export default ShoppingCartItem;