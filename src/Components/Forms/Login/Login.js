import Backendless from "backendless"
import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router"
import { Link } from "react-router-dom"
import { useRecoilState } from "recoil"
import { userState } from "../../../store/globalState"
import style from "./Login.module.css"




const Login = ({ modal, loginModalHandler, notify, show }) => {
    const [currentUser, setCurrentUser] = useRecoilState(userState)
    const [password, setPassword] = useState('')
    const [username, setUsername] = useState('')
    let navigate = useNavigate()
    const [showMe, setShow] = useState(show)
    useEffect(() => {

        return () => {

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
                notify("Logged in!")
                loginModalHandler()
                navigate("/")

            }).catch(e => notify(e.message))
    }
    return (
        <>

            {modal ? (

                <div className={style['modal']} onClick={showHideModal}>

                    <form className={style["box"]}>
                        <h1>Login</h1>
                        <input type="text" name="username" placeholder="Username" onChange={(ev) => setUsername(ev.target.value)} />
                        <input type="password" name="password" placeholder="Password" onChange={(ev) => setPassword(ev.target.value)} />
                        <input type="submit" name="login" value="Login" onClick={submitHandler} />
                        <h2>Dont have an account? <Link to="/register" state={{ show: true }} onClick={loginModalHandler}>Sing up!</Link></h2>
                    </form>

                </div>
            )
                : showMe ?
                    <div className={style['modal']} onClick={(e) => {
                        if (e.target.tagName == "DIV") { 
                            e.target.display = "none"
                            navigate('/') }
                    }}>

                        <form className={style["box"]}>
                            <h1>Login</h1>
                            <input type="text" name="username" placeholder="Username" onChange={(ev) => setUsername(ev.target.value)} />
                            <input type="password" name="password" placeholder="Password" onChange={(ev) => setPassword(ev.target.value)} />
                            <input type="submit" name="login" value="Login" onClick={submitHandler} />
                            <h2>Dont have an account? <Link to="/register" state={{ show: true }} onClick={(e) => setShow(false)}>Sing up!</Link></h2>
                        </form>

                    </div>
                    : ""
            }

        </>

    );
}

export default Login;