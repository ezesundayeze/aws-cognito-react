import './App.css';
import { Route, Switch } from 'react-router-dom'
import PrivateRandom from './Components/PrivateRandom';
import PublicRandom from './Components/PublicRandom';
import ProtectedRoute from './Components/ProtectedRoute';
import Home from './Components/Home';
import NotFound from './Components/NotFound';
import Signup from './Components/Signup';
import Login from './Components/Login';
import ConfirmUser from './Components/ConfirmUser';


function App() {
  return (
    <Switch>
      <Route exact path='/' component={Home} />
      <ProtectedRoute exact path='/private' component={PrivateRandom} />
      <Route exact path='/public' component={PublicRandom} />
      <Route exact path='/login' component={Login} />
      <Route exact path='/signup' component={Signup} />
      <Route exact path='/confirm' component={ConfirmUser} />

      <Route path='*' component={NotFound}></Route>
    </Switch>
  );
}

export default App;
