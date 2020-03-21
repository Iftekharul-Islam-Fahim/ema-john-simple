import React from 'react';
import logo from '../../images/logo.png';
import './Header.css';
//import { useContext } from 'react';
//import { UserContext } from '../../App';
import { useState } from 'react';
import { useRef } from 'react';
import { useEffect } from 'react';
import { useAuth } from '../../Login/useAuth';

// const usePrevious = value => {
//     const previous = useRef();
//     useEffect(() => {
//         console.log(value);
//         previous.current = value;
//     }, [value]);
//     return previous.current;
// };

const Header = () => {
    // const [count, setCount] = useState(0);
    // const previous = usePrevious(count);

    //const user = useContext(UserContext);
    const auth = useAuth();
    console.log(auth.user);
    return (
        <div className="header">
            <img src={logo} alt="" />
            {/* <button onClick={() => setCount(count + 1)}> + </button>
            <h1>COUNT: {count} PREVIOUS: {previous}</h1>
            <button onClick={() => setCount(count - 1)}> - </button> */}
            <nav>
                <a href="/shop">Shop</a>
                <a href="/review">Order Review</a>
                <a href="/inventory">Manage Inventory</a>
                {
                    auth.user && <span style={{ color: 'orange' }}>Welcome {auth.user.name}</span>
                }
                {
                    auth.user
                    ? <a href="/login"> Sign Out</a>
                    : <a href="/login"> Sign In</a>

                }
            </nav>
        </div>
    );
};

export default Header;