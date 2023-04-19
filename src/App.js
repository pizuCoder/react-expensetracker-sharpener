import { BrowserRouter, Switch, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'

import AuthForm from "./Auth/AuthForm";
import UpdateProfile from "./pages/updateProfile";
import TheNav from "./pages/theNav";
import DailyExpRedux from "./pages/DailyExpRedux";
import { useSelector } from "react-redux";

function App() {
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn)
  const isDarkTheme = useSelector(state => state.theme.isDarkTheme);

  return (
    <div className={isDarkTheme ? "App dark" : "App"}>
      
    <BrowserRouter>
    {isLoggedIn && <TheNav />}
      <Switch>
        <Route path="/signup">
          <AuthForm />
        </Route>
        <Route exact path="/welcome">
          <h1>Welcome to Expense Tracker</h1>
        </Route>
        <Route path="/profile">
          <UpdateProfile />
        </Route>
        <Route path="/dailyexp">
          <DailyExpRedux />
        </Route>
      </Switch>
    </BrowserRouter>
    </div>
  );
}

export default App;
