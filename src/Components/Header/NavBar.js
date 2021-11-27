import style from './NavBar.module.css'
import NavBarLeft from './NavbarLeft/NavBarLeft'
import NavBarRight from './NavbarRight/NavBarRight'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Navbar = () => {
    const notify = (text) => toast(text)
    return (
        
        <div className={style.header}>
            <NavBarLeft />
            <ToastContainer />
            <NavBarRight notify={notify}/>
        </div>
    );
}

export default Navbar;