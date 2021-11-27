import { Link } from 'react-router-dom';
import style from './Card.module.css'
const Card = ({ game }) => {

  
    return (
        <div className={style['card']}>
            <div className={style['card-image']}>
                {/*   <img src={"./GamePortraits/ValorantPortrait.png"} /> */}
                <img src={game.image} />
            </div>
            <div className={style['card-content']}>
                <Link className={style['card-title']} style={{ color: "rgb(245,245,245)" }}
                    to={`/details/${game.objectId}`}  > {game.title}</Link>

                <span className={style['card-description']}>{game.developer} | {game.publisher}</span>
                {game.isDiscounted &&
                    <div className={style['card-discount-container']}>
                        <div className={style['discount-number']}>
                            <span className={style["discount-percentage"]}>{game.discountedPrice}%</span>
                        </div>
                        <div className={style["discount-prices"]}>
                            <span className={style["card-discount"]}>BGN {game.price} </span>
                            <span className={style["card-price"]}>BGN {(game.price - (game.price * (game.discountedPrice / 100))).toFixed(2)}</span>
                        </div>

                    </div>
                }

                {game.isDiscounted === false &&
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