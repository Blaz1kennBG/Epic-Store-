import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';

import style from './NavBarRight.module.css'
import { shoppingCartState, userState } from '../../../store/globalState'

import Backendless from 'backendless';
import { loadCart } from '../../../utils/gameService';
import { priceReducer } from '../../../utils/reducers';

const NavBarRight = ({ notify }) => {
    const [currentUser, setCurrentUser] = useRecoilState(userState)
    const [cart, setCart] = useRecoilState(shoppingCartState)
    let navigate = useNavigate()

    const logoutHandler = () => {
        Backendless.UserService.logout().then(u => {
            setCurrentUser(undefined)
            navigate("/")
            notify("Logged out!")
        })
            .catch(e => {
                navigate("/")
            })
    }
    useEffect(() => {
        Backendless.UserService.isValidLogin().then(e => {
            
            Backendless.UserService.getCurrentUser().then(u => {
                if (u !== null) {
                
                    setCurrentUser(u)
                    loadCart(u).then(res => setCart(res))

                }
            })
        }).catch(e => console.log(e))
        
       
    }, [])

    return (
        <>
            <ul className={style['header-right-list']}>
                {currentUser &&
                    <li className={style["cart-list-item"]}>
                        <div className={style["cart-item"]}>
                cart <Link to="/cart" className={style["cart-number"]}>[ {cart.length} ], BGN {cart.reduce(priceReducer, 0)}</Link>
                        </div>
                    </li>
                    }
                {!currentUser &&
                    <>
                        <li className={style['register-list-item']} >
                            <div className={style['register-item']} >
                                <Link to="/register">Register</Link>
                            </div>
                        </li>
                        <li className={style['singin-item-list-item']} >
                            <div className={style['singin-item']}>
                                <Link to="/login">Sign in</Link>
                            </div>
                        </li>
                    </>
                }
                {currentUser &&
                    <>
                        <li className={style['singin-item-list-item']} >
                            <div className={style['singin-item']}>
                                <Link to="/profile">{currentUser.username}</Link>
                            </div>
                        </li>
                        <li className={style['register-list-item']} >
                            <div className={style['register-item']}>
                                <span onClick={logoutHandler}>Logout</span>
                            </div>
                        </li>
                    </>
                }

            </ul>


        </>

    );
}

export default NavBarRight;