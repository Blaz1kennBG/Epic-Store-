import style from './ShoppingCart.module.css'
const EmptyShoppingCart = () => {
    return ( 
        <div className={style["empty-cart"]}>
        <span>Your cart is empty.</span>
        <span>Shop for Games and Apps</span>
       </div>
     );
}
 
export default EmptyShoppingCart;