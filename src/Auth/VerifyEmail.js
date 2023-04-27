// import { useContext } from "react";
// import AuthContext from "../Store/storeContext";
import { useSelector } from 'react-redux';
import  Button  from 'react-bootstrap/Button';
// import { authActions } from '../redux/AuthReducer';

export default function VerifyEmail() {
  // const authCtx = useContext(AuthContext);
  const idToken = useSelector((state) => state.auth.token)

  function verifyEmailHandler() {
    

    
    const url =
      "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyCQ336T7-e3kArtljvrI5FIakMfAB-X6as";
    const requestBody = {
      requestType: "VERIFY_EMAIL",
      idToken: idToken,
    };
    fetch(url, {
      method: "POST",
      body: JSON.stringify(requestBody),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          console.log("Failed to verify email");
          throw new Error("Failed to update profile");
        }
        if(response.ok){
          window.alert('verification mail sent')
        }
        return response.json();
      })
      .then((data) => {
        // handle success
        console.log(data);
        console.log("Profile Updated");
      })
      .catch((error) => {
        // handle error
      });
  }
  const verifyImg = 'https://images.unsplash.com/photo-1554224154-26032ffc0d07?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1126&q=80'
    return (
      <div>
        <div
          style={{
            position: "fixed",
            width: "100%",
            height: "100%",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundSize: "cover",
            display: "grid",
            placeItems: "center",
            backgroundImage: `url(${verifyImg})`,
            
          }}
        >
          <div style={{ color: "white", padding: '1rem', borderRadius: '1rem',backgroundColor: 'black'}}>
            {/* <h1 style={{ fontWeight: "bolder", fontSize: '90px', marginBottom: '1rem' }}>The Expense Tracker</h1> */}
            <h4 style={{marginBottom: '1rem'}}>
                Click to verify your email address
              </h4>
              <Button onClick={verifyEmailHandler}>Verify Email</Button>
          </div>
        </div>
      </div>
    );
}
