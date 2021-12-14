import style from "./Register.module.css"
import {
    useRecoilState,
} from 'recoil'
import { useEffect, useState } from "react"
import Backendless from "backendless"
import { userState } from "../../../store/globalState"
import { useLocation, useNavigate } from "react-router"
import { Icon } from "@iconify/react"
import { Link } from "react-router-dom"
import { toast } from "react-toastify"
import { registerUser } from "../../../utils/userService"


const Register = () => {
    const [currentUser, setCurrentUser] = useRecoilState(userState)
    let navigate = useNavigate()
    let location = useLocation()
    const [password, setPassword] = useState('')
    const [username, setUsername] = useState('')

    console.log(location)
    useEffect(() => {

        return () => {

        }
    }, [])

    const submitHandler = (e) => {
        e.preventDefault()

        const user = new Backendless.User()
        user.username = username
        user.password = password
        
        toast.promise(registerUser(user), {
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
                    return `You have been registered. You can log in now.`
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
                        <Icon icon="simple-icons:epicgames" className={style['iconify']} />
                        <label>Sign up now.</label>
                    </div>
                    <form onSubmit={submitHandler}>
                        <div className={style["input-container"]}>
                            <input className={style["inputChild"]} type="text" onChange={(ev) => setUsername(ev.target.value)} value={username} />
                            <label className={style["inputLabel"]}>Username</label>
                        </div>

                        <div className={style["input-container"]}>
                            <input className={style["inputChild"]} type="password" onChange={(ev) => setPassword(ev.target.value)} value={password} />
                            <label className={style["inputLabel"]}>Password</label>
                        </div>
                        <button>Register now</button>
                        <div className={style["text-container"]}>
                            <p>Have an account already? <Link to="/login">Sign in now</Link></p>
                        </div>
                    </form>
                </div>
            </div>


        </>

    );
}

export default Register;