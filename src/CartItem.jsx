import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {

    const cart = useSelector(state => state.cart.items);
    const dispatch = useDispatch();

    const calculateTotalAmount = () => {
        let total = 0;
        cart.forEach(item => {
            total += item.cost * item.quantity;
        });
        return total.toFixed(2);
    };

    const calculateTotalCost = (item) => {
        return (item.cost * item.quantity).toFixed(2);
    };

    const handleIncrement = (item) => {
        dispatch(updateQuantity({
            name: item.name,
            quantity: item.quantity + 1
        }));
    };

    const handleDecrement = (item) => {
        if (item.quantity > 1) {
            dispatch(updateQuantity({
                name: item.name,
                quantity: item.quantity - 1
            }));
        } else {
            dispatch(removeItem(item.name));
        }
    };

    const handleRemove = (item) => {
        dispatch(removeItem(item.name));
    };

    return (
        <div className="cart-container">

            <h2 className="cart-total">
                Total Cart Amount: ${calculateTotalAmount()}
            </h2>

            {cart.map(item => (
                <div className="cart-item" key={item.name}>

                    <img
                        className="cart-image"
                        src={item.image}
                        alt={item.name}
                    />

                    <div className="cart-details">

                        <h3>{item.name}</h3>
                        <p className="price">Price: ${item.cost}</p>

                        <div className="quantity-box">
                            <button
                                className="qty-btn"
                                onClick={() => handleDecrement(item)}
                            >-</button>

                            <span className="qty-number">
                                {item.quantity}
                            </span>

                            <button
                                className="qty-btn"
                                onClick={() => handleIncrement(item)}
                            >+</button>
                        </div>

                        <p className="item-total">
                            Total: ${calculateTotalCost(item)}
                        </p>

                        <button
                            className="delete-btn"
                            onClick={() => handleRemove(item)}
                        >
                            Delete
                        </button>

                    </div>
                </div>
            ))}

            <div className="continue-btn-wrapper">
                <button
                    className="continue-btn"
                    onClick={onContinueShopping}
                >
                    Continue Shopping
                </button>
            </div>

        </div>
    );
};

export default CartItem;