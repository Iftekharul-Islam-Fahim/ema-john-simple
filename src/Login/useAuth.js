import React from 'react';
// Firebase App (the core Firebase SDK) is always required and must be listed first
import * as firebase from "firebase/app";
// Add the Firebase products that you want to use
import "firebase/auth";
import firebaseConfig from "../firebase.config";
import { useState, createContext } from "react";
import { useContext } from 'react';
import { useEffect } from 'react';
import {Route, Redirect} from 'react-router-dom';


// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const AuthContext = createContext();
export const AuthContextProvider = (props) => {
    const auth = Auth();
    return <AuthContext.Provider value={auth}>{props.children}</AuthContext.Provider>
};
export const useAuth = () => useContext(AuthContext);

// A wrapper for <Route> that redirects to the login
// screen if you're not yet authenticated.
export const PrivateRoute = ({ children, ...rest }) => {
    const auth = useAuth();
    return (
      <Route
        {...rest}
        render={({ location }) =>
          auth.user ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: location }
              }}
            />
          )
        }
      />
    );
  }

const getUser = user => {
    const { displayName, email, photoURL } = user;
    return { name: displayName, email, photo: photoURL };
};

const Auth = () => {
    const [user, setUser] = useState(null);

    const signInWithGoogle = () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        return firebase.auth().signInWithPopup(provider)
            .then(response => {
                //console.log(response);
                const signedInUser = getUser(response.user);
                setUser(signedInUser);
                return response.user;
            })
            .catch(error => {
                console.log(error);
                setUser(null);
                return error.message;
            })
    };

    const signOut = () => {
        return firebase.auth().signOut()
            .then(response => {
                setUser(null);
                return true;
            })
            .catch(error => {
                console.log(error.message);
                return false;
            })
    };

    useEffect(() => {
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
              // User is signed in.
             //console.log(user);
             const currentUser = getUser(user);
             setUser(currentUser);
            } else {
              // No user is signed in.
            }
          });
          
    }, []);

    return { user, signInWithGoogle, signOut };
};
export default Auth;
