import style from './DeveloperPublisher.module.css'
const DeveloperPublisher = ({game}) => {
    return (  
        <div className={style["dev-info"]}>
        <div className={style["devleoper"]}>

        </div>
        <div className={style["publisher"]}>
            <span className={style["dev-gray"]}>Developer</span>
            <span className={style["dev-white"]}>{game.developer}</span>
        </div>
        <div className={style["available"]}>
            <span className={style["dev-gray"]}>Publisher</span>
            <span className={style["dev-white"]}>{game.publisher}</span>
        </div>
        <div className={style["platform"]}>
            <span className={style["dev-gray"]}>Platform</span>
            <span className={style["dev-white"]}>Windows</span>
        </div>
    </div>
    );
}
 
export default DeveloperPublisher;