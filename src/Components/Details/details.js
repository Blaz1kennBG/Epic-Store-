import Backendless from 'backendless';
import { useEffect, useState } from 'react';
import {useParams } from 'react-router';
import style from './details.module.css'

import { useRecoilState } from 'recoil';
import { userState } from '../../store/globalState';
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

import MainDisplay from './MainDisplay/MainDisplay';

const Details = () => {
    const [game, setGame] = useState(undefined)
    const params = useParams()
    const [currentUser, setCurrentUser] = useRecoilState(userState)
    const notify = () => toast("Game has been bought.!")
    
    const gameActionHandler = () => {
      
        const updatedUser = new Backendless.User()
        updatedUser.objectId = currentUser.objectId
        updatedUser.gamesBought = [...currentUser.gamesBought]
        updatedUser.gamesBought.push(game)
        Backendless.UserService.update(updatedUser)
            .then(responseUpdate => {
            setCurrentUser(responseUpdate)
            notify()
        })
            .catch(e => console.log(e))
    }

    useEffect(() => {
        Backendless.Data.of('Games').findById(params.id).then(g => {
            g.genres = g.genres.split(', ')
            setGame(g)
        })
    }, [])

    return (
        <>
        <ToastContainer />
            {game &&
                <div className={style["details-container"]}>

                    <div className={style["details-title"]}>
                        <p>{game.title}</p>
                    </div>
                 <MainDisplay game={game} gameActionHandler={gameActionHandler}/>
                </div>
            }
        </>
    );
}

export default Details;