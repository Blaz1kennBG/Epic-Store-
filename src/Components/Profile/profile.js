import { useRecoilState } from 'recoil';
import { userState } from '../../store/globalState';
import style from './profile.module.css'
import ProfileGameLibrary from './ProfileGameLibrary';
import ProfileWishlistLibrary from './ProfileWishlistLibrary';
const Profile = () => {
    const [currentUser, setCurrentUser] = useRecoilState(userState)

    return (
        
        <div className={style["profile-container"]}>

            <div className={style["top-part"]}>
                <div className={style["top-part-image-container"]}>
                    <span className="iconify" data-icon="healthicons:ui-user-profile-outline"></span>
                </div>
                {currentUser && <div className={style["games-count"]}>Username: {currentUser.username}</div>}
                
            
            </div>

            {currentUser &&  <ProfileGameLibrary games={currentUser.gamesBought} />}
            {!currentUser && <h1 style={{color: "rgb(245,245,245)", margin: "6px 56px"}}>Loading game library. . .</h1>}
            {currentUser && <ProfileWishlistLibrary games={currentUser.wishlist} />}
            {!currentUser && <h1 style={{color: "rgb(245,245,245)", margin: "6px 56px"}}>Loading Wishlist. . .</h1>}
        </div>
        
      
    );
}

export default Profile;