
import { useRecoilState } from 'recoil';
import style from './profile.module.css'
import {userState} from '../../store/globalState'
import Backendless from 'backendless';
import { toast } from 'react-toastify';

const ProfileWishlistLibrary = ({games}) => {

  const [currentUser, setCurrentUser] = useRecoilState(userState)
    const notify = (text) => toast(text)
    const deleteGameHandler = (selectedGame) => {
        const updatedUser = new Backendless.User()
        updatedUser.objectId = currentUser.objectId
        updatedUser.wishlist = [...currentUser.wishlist].filter(g => g.objectId !== selectedGame.objectId)
        Backendless.UserService.update(updatedUser)
        .then(responseUpdateUser => {setCurrentUser(responseUpdateUser)
        notify("Game has been removed from your wishlist.")
        })
    }
    return (
    
        <div className={style["game-library"]}>
 
            <div className={style["games-header"]}>Wishlist: {games.length}</div>
            {
                games.length === 0 && <h1 style={{ color: "rgb(245,245,245)", margin: "6px 56px" }}>No games in the wishlist.</h1>
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
 
export default ProfileWishlistLibrary;