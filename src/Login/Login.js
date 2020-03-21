import React from 'react';
import Auth from './useAuth';

const Login = () => {
    const auth = Auth();
    //console.log(auth.user);
    const handleSignIn = () => {
        auth.signInWithGoogle()
        .then(response => {
            //console.log("redirect now");
            window.location.pathname = '/review';
        })
    };
    const handleSignOut = () => {
        auth.signOut()
        .then(response => {
            window.location.pathname = '/';
        })
    };
    return (
        <div>
            <h1>Join the Party!!!</h1>
            {
                auth.user
                    ? <button onClick={handleSignOut}>Sign Out</button>
                    : <button onClick={handleSignIn}>Sign In With Google</button>
            }
        </div>
    );
};

export default Login;