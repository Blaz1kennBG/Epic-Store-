import Backendless  from "backendless"
import { toast } from "react-toastify"
import Card from "../Components/Card-list/Standart-Card-list/Card/Card"

export async function getAllGames() {
    const temp = []
    Backendless.Data.of('Games').find().then(gamesList => {
       
        gamesList.sort((a,b) => b.created - a.created)
        for (let game of gamesList) {
            game.genres = game.genres.split(', ')
            temp.push(<Card game={game} key={game.objectId}/>)
        }    
        toast("Welcome!")
    })
    return temp
}
