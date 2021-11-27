
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
import {RecoilRoot} from 'recoil';
import Login from './Components/Forms/Login/Login';
import Profile from './Components/Profile/profile';



function App() {

  return (
    <RecoilRoot>
      <Router>
        <Navbar />
        <div className="container">

          <Switch>
            <Route exact path="/" element={<CardContainer />} />
            <Route path="/test" element={<TestComponent />} />
            <Route path="/details/:id" element={<Details />} />
            <Route path="/register" element={<Register />} />\
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
          </Switch>

        </div>
      </Router>
    </RecoilRoot>
  );
}

export default App;
