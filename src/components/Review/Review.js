import React, { useEffect, useState } from 'react';
import { getDatabaseCart, removeFromDatabaseCart, processOrder } from '../../utilities/databaseManager';
import fakeData from '../../fakeData';
import ReviewItem from '../ReviewItem/ReviewItem';
import Cart from '../Cart/Cart';
import happyImage from '../../images/giphy.gif';
import { Link } from 'react-router-dom';
import { useAuth } from '../../Login/useAuth';

const Review = () => {
    const [cart, setCart] = useState([]);
    const [orderPlaced, setOrderPlaced] = useState(false);
    const auth = useAuth();
    const handleOrderPlaced = () => {
        //console.log("Order Placed");
        setCart([]);
        setOrderPlaced(true);
        processOrder();
    }; 
    const handleRemoveProduct = (productKey) => {
        console.log("remove clicked!", productKey);
        const newCart = cart.filter(product => product.key !== productKey);
        setCart(newCart);
        removeFromDatabaseCart(productKey);
    };
    useEffect(() => {
        //get cart elements from database(local storage)
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);
        //const productKeys = Object.values(savedCart);
        //const count = productKeys.map(keys => savedCart[]);
        const cartProducts = productKeys.map(key => {
            const product = fakeData.find(product => product.key === key);
            product.quantity = savedCart[key];
            return product;
        });

        //console.log(productKeys);
        //console.log(cartProducts);
        setCart(cartProducts);

    }, []);

    let thankyou;
    if(orderPlaced){
        thankyou = <img src={happyImage} alt=""/>
    }
    return (
        <div className="twin-container">
            <div className="product-container">
                {
                    cart.map(product => 
                    <ReviewItem 
                    key={product.key}
                    handleRemoveProduct={handleRemoveProduct}
                    product={product}></ReviewItem>)
                }
                {thankyou}
                {
                    !cart.length && <h1>Your cart is empty. <a style={{color: 'orange'}} href="/shop">Keep Shopping</a></h1>
                }
            </div>
            <div className="cart-container">
                <Cart cart={cart}>
                    <Link to="shipment">
                        {
                            auth.user
                            ? <button className="add-to-cart-button">Proceed Checkout</button>
                            : <button className="add-to-cart-button">Login to Proceed</button>
                        }
                    </Link>
                </Cart>
            </div>
        </div>
    );
};

export default Review;