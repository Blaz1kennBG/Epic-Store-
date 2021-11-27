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
            <a  className={style['link-item']}>News</a>
        </li>
        <li>
            <a className={style['link-item']}>FAQ</a>
        </li>
        <li>
            <a className={style['link-item']}>Help</a>
        </li>
       
    </ul>
    );
}
 
export default NavBarLeft;