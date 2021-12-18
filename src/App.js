
import './App.css';
import CardContainer from './Components/Card-list/Card-container';
import Navbar from './Components/Header/NavBar';
import TestComponent from './Components/Test/test';
import {
  BrowserRouter as Router,
  Routes as Switch,
  Route,

} from "react-router-dom";
import Details from './Components/Details/details';
import Register from './Components/Forms/Register/Register';
import { RecoilRoot, useRecoilValue } from 'recoil';
import Login from './Components/Forms/Login/Login';
import Profile from './Components/Profile/profile';
import { userState } from './store/globalState';
import News from './Components/News/News'
import UploadArticle from './Components/Forms/UploadArticle/UploadArticle';
import ArticleDetails from './Components/News/ArticleDetails/ArticleDetails';
import ArticleTemplate from './Components/Forms/Article-Template/ArticleTemplate';
import UploadGame from './Components/Forms/UploadGame/UploadGame';
import ShoppingCart from './Components/ShoppingCart/ShoppingCart';
function GuardedRoute({ children }) {
  const user = useRecoilValue(userState)

  return user ? children : <Login />
}
function UnGuardedRoute({ children }) {
  const user = useRecoilValue(userState)

  return !user ? children : <Profile />
}


function App() {



  return (
    <RecoilRoot>
      <Router>
        <Navbar />
        <div className="container">

          <Switch>
            <Route exact path="/" element={<CardContainer />} />
           {/*  <Route path="/test" element={<TestComponent />} /> */}
            <Route path="/details/:id" element={<Details />} />
            <Route path="/register" element={
              <UnGuardedRoute>
                <Register />
              </UnGuardedRoute>} />
            <Route path="/login" element={
              <UnGuardedRoute>
                <Login />
              </UnGuardedRoute>
            } />
            <Route path="/news" element={<News />} />
            <Route path="/news/:id" element={<ArticleDetails />} />
            <Route path="/atu" element={<ArticleTemplate />} />
            <Route path="/profile"
              element={<GuardedRoute>
                <Profile />
              </GuardedRoute>} />
            <Route path="/uploadArticle" element={<UploadArticle />} />
            <Route path="/uploadGame" element={<UploadGame />} />
            <Route path="/cart" element={
              <GuardedRoute>
                <ShoppingCart />
              </GuardedRoute>} />
            <Route path="*" element={<CardContainer />} />
          </Switch>

        </div>
      </Router>
    </RecoilRoot>
  );
}

export default App;
