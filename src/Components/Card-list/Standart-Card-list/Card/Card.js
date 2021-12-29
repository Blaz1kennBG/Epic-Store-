import { Link } from 'react-router-dom';
import style from './Card.module.css'
const Card = ({ game }) => {

  
    return (
        <div className={style['card']}>
            <div className={style['card-image']}>

                <img src={game.thumbnail} />
            </div>
            <div className={style['card-content']}>
                <Link className={style['card-title']} style={{ color: "rgb(245,245,245)" }}
                    to={`/details/${game.objectId}`}  > {game.title}</Link>

                <span className={style['card-description']}>{game.developer} | {game.publisher}</span>
                {game.discount > 0 &&
                    <div className={style['card-discount-container']}>
                        <div className={style['discount-number']}>
                            <span className={style["discount-percentage"]}>-{game.discount}%</span>
                        </div>
                        <div className={style["discount-prices"]}>
                            <span className={style["card-discount"]}>BGN {game.price} </span>
                            <span className={style["card-price"]}>BGN {(game.price - (game.price * (game.discount / 100))).toFixed(2)}</span>
                        </div>

                    </div>
                }

                {game.discount === 0 &&
                    (game.price > 0 ? <span className={style['card-price']}>{game.price} BGN</span>
                        : game.price === 0 ? <span className={style['card-price']}>Free</span>
                            : <span className={style['card-date']}>Available: {game.availableDate}</span>
                    )
                }
            </div>
        </div>

    );
}

export default Card;