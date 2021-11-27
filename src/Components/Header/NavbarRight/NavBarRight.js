import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import Register from '../../Forms/Register/Register';
import style from './NavBarRight.module.css'
import { userState } from '../../../store/globalState'
import Login from '../../Forms/Login/Login';
import Backendless from 'backendless';

const NavBarRight = ({notify}) => {
    const [registerModal, showRegisterModal] = useState(false)
    const [loginModal, showLoginModal] = useState(false)
    const [currentUser, setCurrentUser] = useRecoilState(userState)
    let navigate = useNavigate()
    const registerModalHandler = (e) => {
        showRegisterModal(!registerModal)
    }
    const loginModalHandler = (e) => {
        showLoginModal(!loginModal)
    }
    const logoutHandler = () => {
        Backendless.UserService.logout().then(u => {
            setCurrentUser(undefined)
            console.log('User logged out!')
            navigate("/")
            notify("Logged out!")
        })
            .catch(e => {
                navigate("/")    
                console.log(e)
            })
    }
    useEffect( () => {
        Backendless.UserService.isValidLogin().then(e => {
           Backendless.UserService.getCurrentUser().then(u => {
            if (u !== null) {
                
            setCurrentUser(u)
            console.log(u)
            }
        })
        }
        )
    }, [])

    return (
        <>
            <ul className={style['header-right-list']}>
                
                { !currentUser &&
                <>
                <li className={style['register-list-item']} onClick={registerModalHandler}>
                <div className={style['register-item']} >
                    <span >Register</span>
                </div>
            </li>
                <li className={style['singin-item-list-item']} onClick={loginModalHandler}>
                    <div className={style['singin-item']}>
                        <Link to="/login">Sign in</Link>
                        
                    </div>
                    </li>
                    </>
                }
                { currentUser  && 
                <>
                <li className={style['singin-item-list-item']} >
                    <div className={style['singin-item']}>
                        <Link to="/profile">Profile, {currentUser.username}</Link>
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
            {registerModal && <Register modal={registerModal} registerModalHandler={registerModalHandler} notify={notify}/>}
            {loginModal && <Login modal={loginModal} loginModalHandler={loginModalHandler} notify={notify}/>}
        </>

    );
}

export default NavBarRight;