import { BrowserRouter, Switch, Route } from "react-router-dom";

import AuthForm from "./Auth/AuthForm";

function App() {
  return (
    <BrowserRouter>
    <Switch>
      <Route path='/signup'>
        <AuthForm />
      </Route>
      <Route path='/welcome'>
        <h1>Welcome to Expense Tracker</h1>
      </Route>
    </Switch>
    </BrowserRouter>
  );
}

export default App;
