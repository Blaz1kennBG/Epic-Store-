import { useRecoilState, useRecoilValue } from 'recoil';
import { gamesState, originalGamesState } from '../../../store/globalState';
import style from './Genre-List.module.css'
const GenreList = () => {

    const [games, setGames] = useRecoilState(gamesState)
    const backupGames = useRecoilValue(originalGamesState)

    const genreHandler = (selectedGenre) => {
        if (games) {
            if (selectedGenre !== "on_sale") {
                const filtered = backupGames.filter(item => {
                    return item.props.game.genres.includes(selectedGenre)
                },
                )
                console.log(filtered)
                return setGames(filtered)
            }
            const filtered = backupGames.filter(item => {
                return item.props.game.discount > 0

            })
            return setGames(filtered)
        }
    }
    const setActive = (ev) => {
       /*  if (!ev.target.classList.contains(style["active"])) { return ev.target.classList.add(style["active"]) }
        return ev.target.classList.remove(style["active"]) */
    }


    return (
        <div className={style['genre-list-container']}>
            <ul className={style['genre-list']}>
                <li className={style['genre-list-header']}>Filters</li>
                <li className={style['genre-clear']} onClick={() => setGames(backupGames)}>Clear filters</li>
                <li className={style['genre-list-item']} onClick={(ev) => { genreHandler("Action"); setActive(ev) }}>Action</li>
                <li className={style['genre-list-item']} onClick={(ev) => { genreHandler("Adventure"); setActive(ev) }} >Adventure</li>
                <li className={style['genre-list-item']} onClick={(ev) => { genreHandler("Indie"); setActive(ev) }} >Indie</li>
                <li className={style['genre-list-item']} onClick={(ev) => { genreHandler("RPG"); setActive(ev) }} >RPG</li>
                <li className={style['genre-list-item']} onClick={(ev) => { genreHandler("Open-World"); setActive(ev) }} >Open World</li>
                <li className={style['genre-list-item']} onClick={(ev) => { genreHandler("Shooter"); setActive(ev) }} >Shooter</li>
                <li className={style['genre-list-item']} onClick={(ev) => { genreHandler("Casual"); setActive(ev) }} >Casual</li>
                <li className={style['genre-list-item']} onClick={(ev) => { genreHandler("on_sale"); setActive(ev) }} >On sale</li>
            </ul>
        </div>
    );
}

export default GenreList;