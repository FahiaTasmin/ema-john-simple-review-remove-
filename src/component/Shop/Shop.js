//import React from 'react';
import fakeData from '../../fakeData';
import React, { useEffect, useState } from 'react';
import './Shop.css';
import Product from '../Product/Product';
import Cart from '../Cart/Cart';
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';
import { Link } from 'react-router-dom';

//<Product></Product>
const Shop = () => {
    const first10 = fakeData.slice(0,10);
    const [products] = useState(first10);  
    const [cart, setCart] = useState([]);

    useEffect(()=>{ 
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);
        
            const previousCart = productKeys.map( existingKey => {
                const product = fakeData.find( pd => pd.key === existingKey);
                product.quantity = savedCart[existingKey];
                return product;
            } );
            setCart(previousCart);
            console.log(previousCart);
        
    }, []);
     
    const handleAddProduct = (product) =>{
      //  console.log('product added', product);
        const toBeAddedKey = product.key;
        const sameProduct = cart.find(pd => pd.key === toBeAddedKey);
        let count = 1;
        let newCart;
        if(sameProduct){
            count = sameProduct.quantity + 1;
            sameProduct.quantity = count;
            const others = cart.filter(pd => pd.key !== toBeAddedKey);
            newCart = [...others, sameProduct];
        }
        else{
            product.quantity = 1;
            newCart = [...cart,product];
        }
        setCart(newCart);
        //const count = sameProduct.length;
        addToDatabaseCart(product.key, count);
    }
    //console.log(fakeData);
    return (
        <div className = "shop-container">
            <div className = 'product-container'>
                    {
                        products.map(element =><Product
                           key = {element.key} 
                            product = {element} 
                            showAddToCart = {true} 
                            handleAddProduct = {handleAddProduct}
                             ></Product>)
                    }
            </div>
            <div className= "cart-container">
                <Cart cart = {cart}>
                <Link to = "/review"><button className = "main-button">Review</button></Link>
                </Cart>
            </div>
            
        </div>
    );
};

export default Shop;