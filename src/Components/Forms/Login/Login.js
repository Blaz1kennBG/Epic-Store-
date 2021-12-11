import Backendless from "backendless"
import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router"
import { Link } from "react-router-dom"
import { useRecoilState } from "recoil"
import { userState } from "../../../store/globalState"
import style from "./Login.module.css"
import {Icon} from '@iconify/react'
import { toast } from "react-toastify"
import { loginUser } from "../../../utils/userService"



const Login = () => {
    const [currentUser, setCurrentUser] = useRecoilState(userState)
    const [password, setPassword] = useState('')
    const [username, setUsername] = useState('')
    let navigate = useNavigate()
    useEffect(() => {

        return () => {
        }
    }, [])

    const submitHandler = (e) => {
        e.preventDefault()
  
            toast.promise(loginUser(username,password), {
                pending: {
                    render() { 
                        return "Loading..."
                    },
                    icon: false
                }, 
                success: {
                    render({data}) {
                        setCurrentUser(data)
                        navigate("/")
                        return `Hello, ${username}`
                    },
                    icon: "🟢"
                },
                error: {
                    render({data}) {
                        console.log(data)
                        return `Oops, ${data}`
                    }
                }
                
            }
        
        )
    }
    


return (
    <>
        <div className={style["form-background"]}>
            <div className={style["form-container"]}>
                <div className={style["icon-and-label"]}>
                <Icon icon="simple-icons:epicgames" className={style['iconify']}/>
                    <label>Sign in with a epic games account</label>
                </div>
                <form onSubmit={submitHandler}>
                    <div className={style["input-container"]}>
                        <input className={style["inputChild"]} type="text" onChange = {(ev) => setUsername(ev.target.value)} value={username}/>
                            <label className={style["inputLabel"]}>Username</label>
                    </div>

                    <div className={style["input-container"]}>
                <input className={style["inputChild"]} type="password" onChange = {(ev) => setPassword(ev.target.value)} value={password}/>
                <label className={style["inputLabel"]}>Password</label>
               </div>
               <button>Login now</button>
               <div className={style["text-container"]}>
                <p>Don't have an account? <Link to="/register">Sign up now</Link></p>
               </div>
            </form>
            </div>
        </div>


    </>

);
}

export default Login;