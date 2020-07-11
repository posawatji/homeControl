import React from "react";
import "../App.css";
import "./css/profile.css";
import ImagePro from "../asset/Posawat.jpg";
import {useAuth} from '../context/auth'
import {Redirect} from 'react-router-dom'


function Profile() {
  const {setAuthTokens} = useAuth()
  const logout =() => {
    localStorage.clear();
    window.location.href = '/'
  }

  
  let profileArr = localStorage.getItem("tokens")
  let profile = JSON.parse(profileArr);
  // console.log(profile[0].username," xxxxxxx")
  // Actually use profile[0].username
  return (
    

      <div className="Profile">
        {/* <div className="profileBoard">
            <div className="imgProfile"><img src={ImagePro} alt="ImagePro" width="100%"></img> </div>
        </div> */}

        <div className="profileDetail">
            <div>Username : {profile[0].username}</div>
            {/* actually use {profile[0].username} */}
            <div>Email : {profile[0].email}</div>
            {/* actually use {profile[0].email} */}
        </div>
        <div className="signOut">
            <button className="signOutButton" onClick={logout}>Sign out</button>
        </div>
      </div>
    

  );
}

export default Profile;
