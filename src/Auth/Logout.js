import { useContext } from "react";
import { useHistory } from "react-router-dom";
// import AuthContext from "../Store/storeContext";
import { useDispatch } from "react-redux";
import { authActions } from "../redux/AuthReducer";

export default function Logout(){
    // const authCtx = useContext(AuthContext)
    const dispatch = useDispatch()

    const history = useHistory()

    const logoutHandler = () => {
        // authCtx.logout();
        dispatch(authActions.logout())
        history.replace('/signup')
      };
    
return(
    <button onClick={logoutHandler}>Logout</button>
)
}