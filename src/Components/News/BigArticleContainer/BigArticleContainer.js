
import Backendless from 'backendless';
import { useEffect } from 'react';
import BigArticle from '../BigArticle/BigArticle';
const BigArticleContainer = ({article}) => {
   
    
    return (
        article.map(a => <BigArticle key={a.objectId} article={a}/>)
      );
}
 
export default BigArticleContainer;