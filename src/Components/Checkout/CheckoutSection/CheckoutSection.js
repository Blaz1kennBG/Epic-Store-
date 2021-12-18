import { Icon } from '@iconify/react'
import style from '../Checkout.module.css'

const CheckoutSection = () => {
    return (
        <>
            <div className={style["checkout-section"]}>
                <span>Checkout</span>
                <div className={style["coupon"]}>
                    <span>epic Coupons</span>
                    <span>No Eligible Coupons</span>
                </div>

                <div className={style["payment-methods"]}>
                    <span>Other payment methods</span>
                    <div className={style["method"]}>
                        <input type="radio" name='payment' />
                        <Icon className={style["iconify"]} icon="ri:bank-card-fill"></Icon>
                        <span>Credit Card</span>
                    </div>

                    <div className={style["method"]}>
                        <input type="radio" name='payment' />
                        <Icon className={style["iconify"]} icon="logos:paypal"></Icon>
                        <span>Paypal</span>
                    </div>

                </div>
            </div>
        </>

    );
}

export default CheckoutSection;
