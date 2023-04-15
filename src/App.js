import { BrowserRouter, Switch, Route } from "react-router-dom";

import AuthForm from "./Auth/AuthForm";
import UpdateProfile from "./pages/updateProfile";

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
        </Route>
        <Route path="/profile">
          <UpdateProfile />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
