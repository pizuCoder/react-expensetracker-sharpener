import { useContext } from "react";
import { useHistory } from "react-router-dom";
import AuthContext from "../Store/storeContext";

export default function Logout(){
    const authCtx = useContext(AuthContext)
    const history = useHistory()

    const logoutHandler = () => {
        authCtx.logout();
        history.replace('/signup')
      };
    
return(
    <button onClick={logoutHandler}>Logout</button>
)
}