
import './App.css';
import CardContainer from './Components/Card-list/Card-container';
import Navbar from './Components/Header/NavBar';
import TestComponent from './Components/Test/test';
import {
  BrowserRouter as Router,
  Routes as Switch,
  Route,
  Navigate,

} from "react-router-dom";
import Details from './Components/Details/details';
import Register from './Components/Forms/Register/Register';
import { RecoilRoot, useRecoilValue } from 'recoil';
import Login from './Components/Forms/Login/Login';
import Profile from './Components/Profile/profile';
import { userState } from './store/globalState';
import News from './Components/News/News'
import ArticleDetails from './Components/News/ArticleDetails/ArticleDetails';
import ArticleTemplate from './Components/Forms/Article-Template/ArticleTemplate';
import UploadGame from './Components/Forms/UploadGame/UploadGame';
import ShoppingCart from './Components/ShoppingCart/ShoppingCart';
import ErrorPage from './Components/ErrorPage/ErrorPage';
import AdminPanel from './Components/AdminPanel/AdminPanel';
import { useEffect, useState } from 'react';

function GuardedRoute({ children }) {
  const user = useRecoilValue(userState)
  return user ? children : <Login />
}
function UnGuardedRoute({ children }) {
  const user = useRecoilValue(userState)
  return !user ? children : <Profile />
}
function AdminGuard({children}) {
  const user = useRecoilValue(userState)
  if (user) {return user.objectId === "E93FA418-D2E5-4ECA-A136-EE0423FA3971" ? children : ""}
  return <Navigate to="/login"/>
}
function App() {

  const [isReady, setReady] = useState(false)

  useEffect(() => {
    setTimeout(() => setReady(true), 1000)
  }, [])

  return (
   
  <RecoilRoot>
      <Router>
        { isReady && 
        <>
        <div 
        
        className="container animate-bottom">
        <Navbar />

          <Switch>
            <Route exact path="/" element={<CardContainer />} />
          
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

            <Route path="/uploadGame" element={<UploadGame />} />
            <Route path="/cart" element={
              <GuardedRoute>
                <ShoppingCart />
              </GuardedRoute>} />
              <Route path="adminPanel" element={
                <AdminGuard>
                  <AdminPanel />
                </AdminGuard> }/>

              
            <Route path="*" element={<ErrorPage />} />
          </Switch>

        </div>
        </>}
      </Router>
    </RecoilRoot> 
  );
}

export default App;
