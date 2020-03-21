import React from 'react';
import './ReviewItem.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';

const ReviewItem = (props) => {
    const { name, quantity, key, price } = props.product;
    return (
        <div className="review-item">
            <h4 className="product-name">{name}</h4>
            <p>Quantity : {quantity}</p>
            <p><small>$ {price}</small></p>            
            <button
                onClick={() => props.handleRemoveProduct(key)}
                className="add-to-cart-button">
                <FontAwesomeIcon icon={faCoffee} /> Remove
            </button>
        </div>
    );
};

export default ReviewItem;