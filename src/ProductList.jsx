import React, { useState } from 'react';
import './ProductList.css';
import CartItem from './CartItem';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice';

function ProductList({ onHomeClick }) {
    const [showCart, setShowCart] = useState(false);
    const dispatch = useDispatch();
    const cartItems = useSelector(state => state.cart.items);

    const totalCartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

    const plantsArray = [
        {
            category: "Air Purifying Plants",
            plants: [
                { name: "Snake Plant", image: "https://cdn.pixabay.com/photo/2021/01/22/06/04/snake-plant-5939187_1280.jpg", description: "Produces oxygen at night, improving air quality.", cost: 15 },
                { name: "Spider Plant", image: "https://cdn.pixabay.com/photo/2018/07/11/06/47/chlorophytum-3530413_1280.jpg", description: "Filters formaldehyde and xylene from the air.", cost: 12 },
                { name: "Peace Lily", image: "https://cdn.pixabay.com/photo/2019/06/12/14/14/peace-lilies-4269365_1280.jpg", description: "Removes mold spores and purifies the air.", cost: 18 },
            ]
        }
    ];

    const isInCart = (name) => cartItems.some(item => item.name === name);

    return (
        <div className="product-page">
            <nav className="navbar">
                <div className="nav-left" onClick={onHomeClick}>
                    <img src="https://via.placeholder.com/50" alt="logo" className="nav-logo-icon" />
                    <div>
                        <h1>Paradise Nursery</h1>
                        <p>Where Green Meets Serenity</p>
                    </div>
                </div>
                <div className="nav-center">Plants</div>
                <div className="nav-right" onClick={() => setShowCart(true)}>
                    <div className="cart-icon-wrapper">
                        <svg viewBox="0 0 24 24" className="cart-svg"><path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"/></svg>
                        <span className="cart-count-badge">{totalCartCount}</span>
                    </div>
                </div>
            </nav>

            {!showCart ? (
                <div className="product-container">
                    {plantsArray.map(cat => (
                        <div key={cat.category}>
                            <h2 className="category-title">{cat.category}</h2>
                            <div className="plants-list">
                                {cat.plants.map(plant => (
                                    <div className="plant-card" key={plant.name}>
                                        <div className="sale-tag">SALE</div>
                                        <div className="plant-name-top">{plant.name}</div>
                                        <img src={plant.image} alt={plant.name} className="plant-img-small" />
                                        <div className="plant-price-red">${plant.cost}</div>
                                        <div className="plant-description-italic">{plant.description}</div>
                                        <button 
                                            className={`add-to-cart-btn ${isInCart(plant.name) ? 'disabled-btn' : ''}`}
                                            onClick={() => dispatch(addItem(plant))}
                                            disabled={isInCart(plant.name)}
                                        >
                                            {isInCart(plant.name) ? "Added to Cart" : "Add to Cart"}
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <CartItem onContinueShopping={() => setShowCart(false)} />
            )}
        </div>
    );
}

export default ProductList;
