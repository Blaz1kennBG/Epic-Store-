import Backendless from 'backendless';
import { useEffect, useState } from 'react';
import {useParams } from 'react-router';
import style from './details.module.css'

import { useRecoilState } from 'recoil';
import { shoppingCartState, userState } from '../../store/globalState';
import { toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

import MainDisplay from './MainDisplay/MainDisplay';
import { addToCart } from '../../utils/gameService';

const Details = () => {
    const [game, setGame] = useState(undefined)
    const params = useParams()
    const [currentUser, setCurrentUser] = useRecoilState(userState)
    const [cart, setCart] = useRecoilState(shoppingCartState)
    const [checkout, setCheckout] = useState(false)
    
    
    const gameActionHandler = (action) => {
      
        const updatedUser = new Backendless.User()
        updatedUser.objectId = currentUser.objectId
        let msg = ''
        if (action === 'buy') {
            updatedUser.gamesBought = [...currentUser.gamesBought]
            updatedUser.gamesBought.push(game)
            msg = 'Game has been bought.'
            const removeFromWishList = currentUser.wishlist.filter(e => e.objectId !== game.objectId)

             if (removeFromWishList) {
                updatedUser.wishlist = removeFromWishList
            } 
            Backendless.UserService.update(updatedUser)
            .then(responseUpdate => {
            setCurrentUser(responseUpdate)
            setCheckout(!checkout)
            toast(msg)
            console.log(action)

        })
        .catch(e => toast(e)) 
        }
      if (action === 'wishlist') {
        updatedUser.wishlist = [...currentUser.wishlist]
        updatedUser.wishlist.push(game)
        msg = 'Game has been wishlisted.'

        Backendless.UserService.update(updatedUser)
        .then(responseUpdate => {
        setCurrentUser(responseUpdate)
        toast(msg)
        console.log(action)

    })
    .catch(e => toast(e))
      }
      if (action === "addtocart") {
          updatedUser.cart = [...cart]
          updatedUser.cart.push(game)
          msg = 'Game has been added to cart.'
          addToCart(game, currentUser).then(e => 
            {
                
               setCart(e)
                toast(msg)
                
            })
      }
       
    }

    useEffect(() => {
        Backendless.Data.of('Games').findById(params.id).then(g => {       
            setGame(g)
        })
    }, [])

    return (
        <>
        
            {game &&
                <div className={style["details-container"]}>

                    <div className={style["details-title"]}>
                        <p>{game.title}</p>
                    </div>
                 <MainDisplay game={game} gameActionHandler={gameActionHandler} setCheckout={() => setCheckout(!checkout)} checkout={checkout}/>
                </div>
            }
        </>
    );
}

export default Details;