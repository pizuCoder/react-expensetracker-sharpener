import { useContext } from "react";
import AuthContext from "../Store/storeContext";

export default function VerifyEmail() {
  const authCtx = useContext(AuthContext);
  function verifyEmailHandler() {
    

    const idToken = authCtx.token;
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
  return (<button onClick={verifyEmailHandler}>verify email</button>);
}
