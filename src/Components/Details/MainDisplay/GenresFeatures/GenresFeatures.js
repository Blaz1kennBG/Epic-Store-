import style from './GenresFeatures.module.css'
const GenresFeatures = ({ game }) => {
    return (
        <div className={style["genre-features"]}>
            <div className={style["genres"]}>
                <div>      <span className={style["genre-title"]}>Genres</span></div>

                <ul className={style["genre-list"]}>
                    {game.genres.map((g, i) => <li className={style["genre-item"]} key={i}>{g}</li>)}

                </ul>
            </div>
            <div className={style["features"]}>
                <div className={style["feature-title"]}>Features</div>
                <ul className={style["feature-list"]}>
                    <li className={style["feature-item"]}>Single-Player</li>
                </ul>
            </div>
        </div>
    );
}

export default GenresFeatures;