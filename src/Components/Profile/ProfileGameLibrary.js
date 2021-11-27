
import style from './profile.module.css'

const ProfileGameLibrary = ({ games }) => {

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
                                <img src={game.image} />
                            </div>
                            <div className={style["smallcard-text"]}>
                                {game.title}
                            </div>
                        </div>
                    )
                })
            
            }

        </div>
    );
}

export default ProfileGameLibrary;