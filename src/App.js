import { BrowserRouter, Switch, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

import AuthForm from "./Auth/AuthForm";
import UpdateProfile from "./pages/updateProfile";
import VerifyEmail from "./Auth/VerifyEmail";
import Logout from "./Auth/Logout";
import DailyExpRedux from "./pages/DailyExpRedux";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/signup">
          <AuthForm />
        </Route>
        <Route exact path="/welcome">
          <h1>Welcome to Expense Tracker</h1>
          <a href="/profile">
            <button>go to profile page</button>
          </a>
          <VerifyEmail />
          <Logout />
          <a href="/dailyexp">
            <button>Daily Expenses</button>
          </a>
        </Route>
        <Route path="/profile">
          <UpdateProfile />
        </Route>
        <Route path="/dailyexp">
          <DailyExpRedux />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
