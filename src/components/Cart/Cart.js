import React from 'react';
import { useAuth } from '../../Login/useAuth';
//import { useContext } from 'react';
//import { UserContext } from '../../App';

const Cart = (props) => {
    const cart = props.cart;
    //const user = useContext(UserContext);
    // console.log(user);
    const auth = useAuth();
    console.log(auth.user);
    //---total price calculation using reduce---
    //const totalPrice = cart.reduce((total, product) => total + product.price, 0);

    //---total price using for loop
    let totalPrice = 0;
    for (let i = 0; i < cart.length; i++) {
        const product = cart[i];
        totalPrice = totalPrice + (product.price * product.quantity);
    }

    let shipping = 0;

    if (totalPrice > 35) {
        shipping = 0
    }
    else if (totalPrice > 15) {
        shipping = 4.99;
    }
    else if (totalPrice > 0) {
        shipping = 12.99;
    }

    const tax = (totalPrice * 0.1).toFixed(2);
    const grandTotal = (totalPrice + shipping + Number(tax)).toFixed(2);
    const formatNumber = num => {
        const precision = num.toFixed(2);
        return Number(precision);
    };
    return (
        <div>
            <h4>Order Summary</h4>
            <p>Items Ordered: {cart.length} </p>
            <p>Product Price: {formatNumber(totalPrice)}</p>
            <p>Shipping Cost: {shipping}</p>
            <p>Tax + VAT: {tax}</p>
            <p>Total Price: {grandTotal}</p>
            <br/>
            {
                props.children
            }
            {/* <p>{user}</p> */}
        </div>
    );
};

export default Cart;