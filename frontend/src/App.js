import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import MuseumPage from './pages/MuseumPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ResetPasswordPage from './pages/ResetPasswordPage';

function App() {
  return (
    <Router>
      <Switch> {/* Switch: Wraps multiple Route components. Only picks the first matching route among all the routes */}
        <Route path="/register" exact> {/* Only if the path is an exact match will it call the RegisterPage. Example: http://localhost:3000/register */}
          <RegisterPage />
        </Route>
        <Route path="/" exact>
          <LoginPage />
        </Route>
        <Route path="/museum" exact>
          <MuseumPage />
        </Route>
        <Route path="/forgotpassword" exact>
          <ForgotPasswordPage />
        </Route>
        <Route path='/reset/:id'>
          <ResetPasswordPage />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
