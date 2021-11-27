import style from './Card-container.module.css'
import GenreList from './Genre-List/Genre-List';
import StandartCardList from './Standart-Card-list/Standart-Card-List'
const CardContainer = () => {
    return (  
        <div className={style['card-list']}>
            <GenreList />
            <StandartCardList />
        </div>
    );
}
 
export default CardContainer;