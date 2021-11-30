import { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { userState } from "../../../store/globalState";
import DeveloperPublisher from "./DeveloperPublisher/DeveloperPublisher";
import GenresFeatures from "./GenresFeatures/GenresFeatures";
import ImageCarousel from "./ImageCarousel/ImageCarousel";
import style from "./MainDisplay.module.css"
import AuthenticatedPrices from "./AuthenticatedPrices/AuthenticatedPrices";
import GuestPrices from './GuestPrices/GuestPrices'
const MainDisplay = ({ game, gameActionHandler }) => {
    const currentUser = useRecoilValue(userState)

    return (
        <div className={style["main-display-container"]}>
            <div className={style["media-and-description-container"]}>

                <div className={style["media-and-description"]}>
                    <ImageCarousel game={game} />
                </div>

                <div className={style["details-description"]}>
                    {game.description}
                </div>

                <GenresFeatures game={game} />
            </div>

            <div className={style["game-info-container"]}>
                <div className={style["game-info-image"]}>
                    <img src={game.gameLogo} />
                </div>
               {currentUser && <AuthenticatedPrices game={game} currentUser={currentUser} gameActionHandler={gameActionHandler}/> }
               {!currentUser && <GuestPrices game={game} />}
                <DeveloperPublisher game={game} />

            </div>
        </div>
    );
}

export default MainDisplay;