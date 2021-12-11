import style from './Standart-Card-List.module.css'
import Card from './Card/Card'
import { useState, useEffect } from 'react'
import Backendless from 'backendless'
import { useRecoilState,  } from 'recoil'
import { gamesState,  originalGamesState } from '../../../store/globalState'

const StandartCardList = () => {
    const [games, setGames] = useRecoilState(gamesState)
    const [backupGames, setBackupGames] = useRecoilState(originalGamesState)
    const [isLoading, setLoader] = useState(true)

    useEffect( () => {
        Backendless.Data.of('Games').find().then(gamesList => {
            const temp = []
            gamesList.sort((a,b) => b.created - a.created)
            for (let game of gamesList) {
             
                temp.push(<Card game={game} key={game.objectId}/>)
            }
            setGames(temp)
            setBackupGames(temp)
            
            setLoader(false)
           
        })
        }, [])
    return ( 
        <div className={style['standart-card-list']}>
            {isLoading && <h1>isLoading</h1>}
            {!isLoading && 
            <>
            {games}
            </>
            }
        </div>
     );
}
 
export default StandartCardList;