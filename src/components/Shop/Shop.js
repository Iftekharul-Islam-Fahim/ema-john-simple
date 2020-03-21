import React, { useState, useEffect } from 'react';
import fakeData from '../../fakeData';
import './Shop.css';
import Product from '../Product/Product';
import Cart from '../Cart/Cart';
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';
import { Link } from 'react-router-dom';


const Shop = () => {
    const first10 = fakeData.slice(0, 10);
    const [products, setProducts] = useState(first10);
    const [cart, setCart] = useState([]);
    //console.log(fakeData);

    useEffect(() => {
        //get cart elements from database(local storage)
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);
        const previousCart = productKeys.map(existingKey => {
            const product = fakeData.find(product => product.key === existingKey);
            product.quantity = savedCart[existingKey];
            return product;
        });

        //console.log(previousCart);
        setCart(previousCart);


    }, []);
    const handleAddProduct = (product) => {
        //console.log("product added", product);
        const toBeAddedKey = product.key;

        const sameProduct = cart.find(pd => pd.key === toBeAddedKey);
        let count = 1;
        let newCart;
        if (sameProduct) {
            count = sameProduct.quantity + 1;
            sameProduct.quantity = count;
            const othersProduct = cart.filter(pd => pd.key !== toBeAddedKey);
            newCart = [...othersProduct, sameProduct];
        }
        else {
            product.quantity = 1;
            newCart = [...cart, product];
        }
        setCart(newCart);
        addToDatabaseCart(product.key, count);
    };
    return (
        <div className="twin-container">
            <div className="product-container">

                {
                    products.map(product =>
                        <Product
                            key={product.key}
                            showAddToCart={true}
                            handleAddProduct={handleAddProduct}
                            product={product}></Product>)
                }

            </div>
            <div className="cart-container">
                <Cart cart={cart}>
                    <Link to="/review">
                        <button className="add-to-cart-button">Review Order</button>
                    </Link>
                </Cart>
            </div>
        </div>
    );
};

export default Shop;