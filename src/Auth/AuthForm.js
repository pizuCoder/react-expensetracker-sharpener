import { useState, useRef } from "react";
import { useDispatch } from "react-redux";
// import AuthContext from "../Store/storeContext";
import classes from "./AuthForm.module.css";
import { useHistory } from "react-router-dom";
import { authActions } from "../redux/AuthReducer";

import store from "../redux/store";

const AuthForm = () => {
  const history = useHistory();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const confirmPasswordInputRef = useRef();
  // const authCtx = useContext(AuthContext);
  const [isLogin, setIsLogin] = useState(true);
  const [showError, setShowError] = useState("");
  const [signupInProgress, setSignupInProgress] = useState(false);
  const [signupSuccess, setSignupSuccess] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(true);

  const dispatch = useDispatch();

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    // optional: Add validation
    if (!isLogin) {
      const enteredConfirmPassword = confirmPasswordInputRef.current.value;
      if (enteredPassword !== enteredConfirmPassword) {
        setPasswordMatch(false);
        return;
      } else {
        setPasswordMatch(true);
      }
    }

    let url;
    if (isLogin) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCQ336T7-e3kArtljvrI5FIakMfAB-X6as";
    } else {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCQ336T7-e3kArtljvrI5FIakMfAB-X6as";
      setSignupInProgress(true);
      setSignupSuccess("");
      setShowError("");
    }
    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email: enteredEmail,
        password: enteredPassword,
        returnSecureToken: true,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.ok) {
          if (!isLogin) {
            setSignupSuccess("Signup Successful, you may login");
          }
          setShowError("");
          return res.json();
        } else {
          return res.json().then((data) => {
            setShowError(data.error.message);
            let errorMessage = "Authentication Failed";
            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        // authCtx.login(data.idToken);
        // authCtx.setEmail(data.email)
        // console.log(data.email)
        dispatch(
          authActions.login({
            token: data.idToken,
            email: data.email,
          })
        );
        console.log("State:", store.getState());
        if (isLogin) {
          history.replace("/welcome");
        }
      })
      .catch((err) => {
        alert(err.message);
      })
      .finally(() => {
        setSignupInProgress(false);
      });
  };

  const forgotPasswordHandler = () => {
    const enteredEmail = emailInputRef.current.value;
    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!enteredEmail || !emailRegex.test(enteredEmail)) {
      setShowError("Please enter a valid email address");
      return;
    }
    if (enteredEmail || emailRegex.test(enteredEmail)) {
      setShowError("");
      return;
    }
    const passUrl =
      "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyCQ336T7-e3kArtljvrI5FIakMfAB-X6as";
    fetch(passUrl, {
      method: "POST",
      body: JSON.stringify({
        requestType: "PASSWORD_RESET",
        email: enteredEmail,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((error) => {});
  };
const authImg = 'https://images.unsplash.com/photo-1533421644343-45b606745fb1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80'
    return (
      <div style={{display: 'flex'}}>
       
      <section className={classes.auth}>
        <h1>{isLogin ? "Login" : "Sign Up"}</h1>
        <form onSubmit={submitHandler}>
          <div className={classes.control}>
            <label htmlFor="email">Your Email</label>
            <input type="email" id="email" required ref={emailInputRef} />
          </div>
          <div className={classes.control}>
            <label htmlFor="password">Your Password</label>
            <input
              type="password"
              id="password"
              required
              ref={passwordInputRef}
            />
          </div>
          {!isLogin && (
            <div className={classes.control}>
              <label htmlFor="confirm-password">Confirm Password</label>
              <input
                type="password"
                id="confirm-password"
                required
                ref={confirmPasswordInputRef}
              />
            </div>
          )}
          {!passwordMatch && (
            <p style={{ color: "red" }}>Passwords do not match</p>
    )}
      {showError && <p style={{ color: "red" }}>{showError}</p>}
      {signupInProgress && <p>Sending Request...</p>}
      {signupSuccess && <p style={{ color: "green" }}>{signupSuccess}</p>}
      <div className={classes.actions}>
        <button>{isLogin ? "Login" : "Create Account"}</button>
        <button
          type="button"
          className={classes.toggle}
          onClick={switchAuthModeHandler}
        >
          {isLogin ? "Create new account" : "Login with existing account"}
        </button>
      { isLogin && <button
          type="button"
          className={classes.toggle}
          onClick={forgotPasswordHandler}
        >
            Forgot Password
        </button>}
      </div>
    </form>
  </section>
  <img src={authImg} alt="atm" />
  </div>
  );
  
};

export default AuthForm;
