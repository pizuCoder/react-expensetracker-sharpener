import React, { useState, useEffect} from "react";
import { useSelector } from "react-redux";
// import AuthContext from "../Store/storeContext";
import classes from './updateProfile.module.css';
import { useHistory } from "react-router-dom";

function UpdateProfile() {
    const history = useHistory()
  // const authCtx = useContext(AuthContext);
  const [name, setName] = useState("");
  const [profilePictureUrl, setProfilePictureUrl] = useState("");
  const [message, setMessage] = useState('')
  const idToken = useSelector((state) => state.auth.token);
    // Fetch user account information and prefill the form fields
    useEffect(() => {
        
        const url = "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyCQ336T7-e3kArtljvrI5FIakMfAB-X6as";
        const requestBody = { idToken };
    
        fetch(url, {
          method: "POST",
          body: JSON.stringify(requestBody),
          headers: {
            "Content-Type": "application/json"
          }
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error("Failed to fetch user account information");
            }
            return response.json();
          })
          .then((data) => {
            const user = data.users[0];
            setName(user.displayName || "");
            setProfilePictureUrl(user.photoUrl || "");
          })
          .catch((error) => {
            console.log(error);
          });
      }, [idToken]);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleProfilePictureUrlChange = (event) => {
    setProfilePictureUrl(event.target.value);
  };

  const handleUpdateProfile = (event) => {
    event.preventDefault();
    // const idToken = useSelector((state) => state.auth.token)// get the Firebase Auth ID token for the user
    const url =
      "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyCQ336T7-e3kArtljvrI5FIakMfAB-X6as";
    const requestBody = {
      idToken: idToken,
      displayName: name,
      photoUrl: profilePictureUrl,
      deleteAttribute: [], // list of attributes to delete, can be empty
      returnSecureToken: true // whether or not to return an ID and refresh token
    };
    fetch(url, {
      method: "POST",
      body: JSON.stringify(requestBody),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then((response) => {
        if (!response.ok) {
          setMessage("Failed to update profile")
          throw new Error("Failed to update profile");
          
        }
        
        return response.json();
      })
      .then((data) => {
        // handle success
        console.log(data)
        setMessage("Profile Updated")
        setTimeout(() => history.replace('/welcome'), 2000)
        
      })
      .catch((error) => {
        // handle error
      });
  };

  return (
    <div style={{display: 'flex', justifyContent:'center', marginTop: '10rem'}}>
    <div className={classes.card}>
    <form onSubmit={handleUpdateProfile}>
      <label style={{ display: "block", marginBottom: "1rem" }}>
        Name:
        <input type="text" value={name} onChange={handleNameChange} style={{ marginLeft: "1rem" }} />
      </label>
      <label style={{ display: "block", marginBottom: "1rem" }}>
        Profile Picture URL:
        <input type="text" value={profilePictureUrl} onChange={handleProfilePictureUrlChange} style={{ marginLeft: "1rem" }} />
      </label>
      <button type="submit" style={{ backgroundColor: "#007aff", color: "#fff", padding: "0.5rem 1rem", borderRadius: "4px", border: "none", cursor: "pointer" }}>Update Profile</button>
      <p>{message}</p>
    </form>
    </div>
    </div>
  );
  }  

export default UpdateProfile;
