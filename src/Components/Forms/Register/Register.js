import style from "./Register.module.css"
import {
    useRecoilState,
} from 'recoil'
import { useEffect, useState } from "react"
import Backendless from "backendless"
import { userState } from "../../../store/globalState"
import { useLocation, useNavigate } from "react-router"


const Register = ({ modal, registerModalHandler, notify }) => {
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
    const showHideModal = (e) => {
        e.preventDefault()
        if (e.target.tagName == "DIV") {
            registerModalHandler()

        }
    }
    const submitHandler = (e) => {
        e.preventDefault()

        const user = new Backendless.User()
        user.username = username
        user.password = password
        Backendless.UserService.register(user)
            .then(u => {
                console.log("Pre updated user >>> ", u)
                const tempUser = new Backendless.User()
                tempUser.objectId = u.objectId
                tempUser.gamesBought = []
                tempUser.wishlist = []
                console.log(tempUser, u)

                Backendless.UserService.update(tempUser)
                    .then(updatedUserResponse => {
                        console.log("Updated user >>> ", u)
                        setCurrentUser(updatedUserResponse)
                        notify("Register successful! You can now login.")
                        registerModalHandler()
                        navigate("/")

                    })
            })
            .catch(e => {

                notify(e.message)
            })

    }
    return (
        <>

            {modal ?
                <div className={style['modal']} onClick={showHideModal}>

                    <form className={style["box"]}>

                        <h1>Register</h1>
                        <input type="text" name="username" placeholder="Username" onChange={(ev) => setUsername(ev.target.value)} />

                        <input type="password" name="password" placeholder="Password" onChange={(ev) => setPassword(ev.target.value)} />
                        <input type="submit" name="login" value="Register" onClick={submitHandler} />
                    </form>

                </div>
              : location.state.show ? 
                 <div className={style['modal']} onClick={(e) => {
                    if (e.target.tagName == "DIV") { 
                      
                        navigate('/') } }}>

                    <form className={style["box"]}>

                        <h1>Register</h1>
                        <input type="text" name="username" placeholder="Username" onChange={(ev) => setUsername(ev.target.value)} />

                        <input type="password" name="password" placeholder="Password" onChange={(ev) => setPassword(ev.target.value)} />
                        <input type="submit" name="login" value="Register" onClick={submitHandler} />
                    </form>

                </div>
                : ""
            }

        </>
    );
}

export default Register;