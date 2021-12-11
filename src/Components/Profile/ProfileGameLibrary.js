
import { useRecoilState } from 'recoil';
import style from './profile.module.css'
import {userState} from '../../store/globalState'
import Backendless from 'backendless';
import { toast } from 'react-toastify';
const ProfileGameLibrary = ({ games }) => {
    const [currentUser, setCurrentUser] = useRecoilState(userState)
    const notify = (text) => toast(text)
    const deleteGameHandler = (selectedGame) => {
        const updatedUser = new Backendless.User()
        updatedUser.objectId = currentUser.objectId
        updatedUser.gamesBought = [...currentUser.gamesBought].filter(g => g.objectId !== selectedGame.objectId)
        Backendless.UserService.update(updatedUser)
        .then(responseUpdateUser => {setCurrentUser(responseUpdateUser)
        notify("Game has been removed from your library.")
        })
    }
    return (
    
        <div className={style["game-library"]}>
 
            <div className={style["games-header"]}>Game in library: {games.length}</div>
            {
                games.length === 0 && <h1 style={{ color: "rgb(245,245,245)", margin: "6px 56px" }}>No games in the library.</h1>
            }
            {games.length > 0 &&

                games.map(game => {
                    return (
                        <div className={style["smallcard"]}>
                            <div className={style["smallcard-image"]}>
                                <img src={game.thumbnail} />
                            </div>
                            <div className={style["smallcard-bottom"]}>
                                <div className={style["smallcard-text"]}>
                                    {game.title}
                                </div>
                                <div className={style["delete-btn"]} onClick={() => deleteGameHandler(game)}>
                                    Delete
                                </div>
                            </div>
                        </div>
                    )
                })

            }

        </div>
    );
}

export default ProfileGameLibrary;