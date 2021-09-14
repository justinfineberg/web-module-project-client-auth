import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Link, Switch} from 'react-router-dom'
import Login from './components/Login'
import FriendsList from './components/FriendsList'
import ProtectedRoute from './ProtectedRoute'

function App() {
 
  return (
    <Router>
    <div className="App">
      
       <Link to="/login">Login</Link>
       <Link to="/logout">Logout</Link>
      
      <Switch>
      <ProtectedRoute exact path="/friendsList" component={FriendsList} />
          
        
        <Route path="/login" component={Login}>
          
        </Route>
       
      </Switch>
      
    </div>
    </Router>
  );
}

export default App;
