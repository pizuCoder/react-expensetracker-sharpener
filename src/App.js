import { BrowserRouter, Switch, Route } from "react-router-dom";

import AuthForm from "./Auth/AuthForm";

function App() {
  return (
    <BrowserRouter>
    <Switch>
      <Route path='/signup'>
        <AuthForm />
      </Route>
    </Switch>
    </BrowserRouter>
  );
}

export default App;
