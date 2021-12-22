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
               
                return setGames(filtered)
            }
            const filtered = backupGames.filter(item => {
                return item.props.game.discount > 0

            })
            return setGames(filtered)
        }
    }


    return (
        <div className={style['genre-list-container']}>
            <ul className={style['genre-list']}>
                <li className={style['genre-list-header']}>Filters</li>
                <li className={style['genre-clear']} onClick={() => setGames(backupGames)}>Clear filters</li>
                <li className={style['genre-list-item']} onClick={(ev) => { genreHandler("Action") }}>Action</li>
                <li className={style['genre-list-item']} onClick={(ev) => { genreHandler("Adventure") }} >Adventure</li>
                <li className={style['genre-list-item']} onClick={(ev) => { genreHandler("Indie") }} >Indie</li>
                <li className={style['genre-list-item']} onClick={(ev) => { genreHandler("RPG") }} >RPG</li>
                <li className={style['genre-list-item']} onClick={(ev) => { genreHandler("Open-World") }} >Open World</li>
                <li className={style['genre-list-item']} onClick={(ev) => { genreHandler("Shooter") }} >Shooter</li>
                <li className={style['genre-list-item']} onClick={(ev) => { genreHandler("Casual") }} >Casual</li>
                <li className={style['genre-list-item']} onClick={(ev) => { genreHandler("on_sale") }} >On sale</li>
            </ul>
        </div>
    );
}

export default GenreList;