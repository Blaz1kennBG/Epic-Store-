import Backendless from "backendless"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router"
import { useRecoilState } from "recoil"
import {userState } from "../../../store/globalState"
import style from "./Login.module.css"




const Login = ({ modal, loginModalHandler, notify }) => {
    const [currentUser, setCurrentUser] = useRecoilState(userState)
    const [password, setPassword] = useState('')
    const [username, setUsername] = useState('')
    let navigate = useNavigate()
   
    useEffect(() => {

        return () => {
            console.log('Clean up!')
        }
    }, [])
    const showHideModal = (e) => {
        e.preventDefault()
        if (e.target.tagName == "DIV") {
            loginModalHandler()
        }
    }
    const submitHandler = (e) => {
        e.preventDefault()
        Backendless.UserService.login(username, password, true)
        .then(u => {
            setCurrentUser(u)
            console.log('User logged in!', u)
            notify("Logged in!")
            loginModalHandler()
            navigate("/")
            
           
        }).catch(e => notify(e.message))
    }
    return (
        <>
            
            {modal &&
           
                <div className={style['modal']} onClick={showHideModal}>
                     
                    <form className={style["box"]}>
                        <h1>Login</h1>
                        <input type="text" name="username" placeholder="Username" onChange={(ev) => setUsername(ev.target.value)} />
                        <input type="password" name="password" placeholder="Password" onChange={(ev) => setPassword(ev.target.value)} />
                        <input type="submit" name="login" value="Login" onClick={submitHandler} />
                   
                    </form>
                  
                </div>
                
            }

        </>
        
    );
}

export default Login;