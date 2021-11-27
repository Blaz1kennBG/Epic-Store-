import { useRecoilState, useRecoilValue } from 'recoil';
import { gamesState, originalGamesState } from '../../../store/globalState';
import style from './Genre-List.module.css'
const GenreList = () => {
 
    const [games, setGames] = useRecoilState(gamesState)
    const backupGames = useRecoilValue(originalGamesState)
    const genreHandler = (selectedGenre) => {
        if (games) {
         const filtered = backupGames.filter(item => {
            return item.props.game.genres.includes(selectedGenre)
        },
        ) 
        console.log(filtered)
        setGames(filtered)
    }
    }


    return (  
        <div className={style['genre-list-container']}>
        <ul className={style['genre-list']}>
            <li className={style['genre-list-header']}>Genre</li>
            <li className={style['genre-clear']} onClick={() => setGames(backupGames)}>Clear filters</li>
            <li className={style['genre-list-item']} onClick={() => genreHandler("Action")}>Action</li>
            <li className={style['genre-list-item']} onClick={() => genreHandler("Adventure")} >Adventure</li>
            <li className={style['genre-list-item']} onClick={() => genreHandler("Indie")} >Indie</li>
            <li className={style['genre-list-item']} onClick={() => genreHandler("RPG")} >RPG</li>
            <li className={style['genre-list-item']} onClick={() => genreHandler("Open-World")} >Open World</li>
            <li className={style['genre-list-item']} onClick={() => genreHandler("Shooter")} >Shooter</li>
            <li className={style['genre-list-item']} onClick={() => genreHandler("Casual")} >Casual</li>
        </ul>
</div>
    );
}
 
export default GenreList;