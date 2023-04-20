import { BrowserRouter, Switch, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import { useEffect } from "react";
import AuthForm from "./Auth/AuthForm";
import UpdateProfile from "./pages/updateProfile";
import TheNav from "./pages/theNav";
import DailyExpRedux from "./pages/DailyExpRedux";
import { useSelector } from "react-redux";

function App() {
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn)
  const isDarkTheme = useSelector(state => state.theme.isDarkTheme);

  useEffect(() => {
    const body = document.body;
    if (isDarkTheme) {
      body.classList.add('dark-theme');
    } else {
      body.classList.remove('dark-theme');
    }
  }, [isDarkTheme]);


  return (
    <div >
      
    <BrowserRouter>
    {isLoggedIn && <TheNav darkMode = {isDarkTheme}/>}
      <Switch>
        <Route path="/signup">
          <AuthForm />
        </Route>
        <Route exact path="/welcome">
          <div style={{padding: '1rem'}}>
          <h1>Welcome to Expense Tracker</h1>
          </div>
        </Route>
        <Route path="/profile">
          <UpdateProfile />
        </Route>
        <Route path="/dailyexp">
          <DailyExpRedux darkMode = {isDarkTheme}/>
        </Route>
      </Switch>
    </BrowserRouter>
    </div>
  );
}

export default App;
