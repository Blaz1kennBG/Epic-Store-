import { Link } from 'react-router-dom';
import style from './NavBarLeft.module.css'

const NavBarLeft = () => {
    
    

    return (  
        <ul className={style['header-left-list']}>
           
        <li>
            <Link className={style['header-logo']} to="/"></Link>
        </li>
        <li>
            <Link className={style['link-item']} to="/">Store</Link>
            
        </li>
        <li>
            <Link  className={style['link-item']} to="/news">News</Link>
        </li>
   
       
    </ul>
    );
}
 
export default NavBarLeft;