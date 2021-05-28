import React, { useEffect, useState } from "react";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import { firAuth, firAuthFB, firAuthGG } from '../../../Store/Firebase';

export default function Login() {
    const [isSignedIn, setIsSignedIn] = useState(false);
    const uiConfig = {
        signInFlow: "popup",
        signInOptions: [
          firAuthFB,
          firAuthGG
        ],
        callbacks: {
          signInSuccess: () => false
        }
      }
    useEffect(()=>{
        firAuth.onAuthStateChanged(user => {
            setIsSignedIn(!!user); // nếu user là 1 object: true
            console.log("user", user)
        })
    })
    return (
        <div className="App">
            {
                isSignedIn ? (
                    <span>
                        <div>Signed In!</div>
                        <button onClick={() => firAuth.signOut()}>Sign out!</button>
                        <h1>Welcome { firAuth.currentUser.displayName }</h1>
                        <img
                            alt="profile"
                            src={ firAuth.currentUser.photoURL }
                        />
                    </span>
                ):(
                    <StyledFirebaseAuth
                        uiConfig={ uiConfig }
                        firebaseAuth={ firAuth }
                    />
                )
            }
        </div>
    )
}
