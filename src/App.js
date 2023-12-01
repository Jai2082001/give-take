import {useEffect} from 'react';
import './App.css';
import Home from './components/Home/Home';
import {Switch, Route, Redirect} from 'react-router';
import Give from './components/Give/Give';
import Take from './components/Take/Take';
import SignUp from './components/SignUp/SignUp';
import { useSelector, useDispatch } from 'react-redux';
import { userActions } from './Store/UserSlice';
import Login from './components/Login/Login';
import Profile from './components/Profile/Profile';
import Aboutus from './components/Aboutus/Aboutus';
import ChooseTaker from './components/ChooseTaker/ChooseTaker';
import ContactUs from './components/ContactUs/ContactUs';

function App() {

  const userState = useSelector((state)=>{
    return state.user.user
  })

  const dispatch = useDispatch();

  console.log(userState);

  useEffect(()=>{
    console.log('here')
    fetch(`${process.env.REACT_APP_FETCH_LINK}/checkUser`).then((response)=>{
      return response.json()
    }).then((response)=>{
      console.log(response);
      dispatch(userActions.changeUser(response))
    })
  }, []) 

  return (
    <div className="App">
      <Switch>
        <Route path='/' exact>
          <Redirect to='/home'></Redirect>
        </Route>
        <Route path='/home' exact>
            <Home></Home>
        </Route>
        <Route path='/give'>
          <Give></Give>
        </Route>
        <Route path='/take'>
          <Take></Take>
        </Route>
        <Route path='/login'>
          <Login></Login>
        </Route>
        <Route path='/signup'>
          <SignUp></SignUp>
        </Route>
        <Route path={'/profile'}>
          <Profile></Profile>
        </Route>
        <Route path={'/aboutus'}>
          <Aboutus></Aboutus>
        </Route>
        <Route path={'/contact'}>
          <ContactUs></ContactUs>
        </Route>
        <Route path={'/chooseTaker/:productId'}>
          <ChooseTaker></ChooseTaker>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
