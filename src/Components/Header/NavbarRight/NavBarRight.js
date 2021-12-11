import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import Register from '../../Forms/Register/Register';
import style from './NavBarRight.module.css'
import { userState } from '../../../store/globalState'
import Login from '../../Forms/Login/Login';
import Backendless from 'backendless';

const NavBarRight = ({notify}) => {
    const [currentUser, setCurrentUser] = useRecoilState(userState)
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
    useEffect( () => {
        Backendless.UserService.isValidLogin().then(e => {
           Backendless.UserService.getCurrentUser().then(u => {
            if (u !== null) {
                
            setCurrentUser(u)
        
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
          
            
        </>

    );
}

export default NavBarRight;