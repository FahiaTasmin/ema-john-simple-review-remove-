import React, { useEffect, useState } from 'react';
import { getDatabaseCart, processOrder, removeFromDatabaseCart } from '../../utilities/databaseManager';
import fakeData from '../../fakeData';
import ReviewItem from '../ReviewItem/ReviewItem';
import Cart from '../Cart/Cart';
import happyImage from '../../images/giphy.gif'

const Review = () => {
    const [cart, setCart] = useState([]);
    const [orderPlaced, setOrderPlaced] = useState(false);

    const handlePlaceOrder = () => {
        console.log('order placed');
        setCart([]);
        setOrderPlaced(true);
        processOrder();
    }
    const removeProduct =(productKey) => {
        //console.log('remove clicked', productKey);
        const newCart = cart.filter (pd => pd.key !== productKey)
        setCart(newCart);
        removeFromDatabaseCart(productKey);

    }

    useEffect(() =>{
        //cart
        
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);
        //console.log(productKeys);
        const cartProducts = productKeys.map(key =>{
            const product = fakeData.find(pd => pd.key ===key);
            product.quantity = savedCart[key];
            return product;
            

        });
       
        //console.log(cartProducts);
        setCart(cartProducts);
        //console.log(setCart)
    }, []);

    let thankYou;
    if(orderPlaced) {
        thankYou = <img src = {happyImage} alt = "" />
    }
    return (
        <div className="shop-container">
           <div className = "product-container"> <h1>Cart Item :{cart.length}</h1>
                {
                    cart.map(pd => <ReviewItem
                        product = {pd}
                        key = {pd.key}
                        removeProduct = {removeProduct}
                        ></ReviewItem>)
                }
                {thankYou}
            </div>
            <div className="cart-container">
                <Cart cart = {cart}>
                <button onClick = {handlePlaceOrder} className = "main-button">Place Order</button>
                </Cart>
            </div>
        </div>
    );
};
export default Review;