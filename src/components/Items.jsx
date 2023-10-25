import React, { useState, useEffect } from 'react';
import itemData from "../data/item.json";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

function Items() {
  // Load the cart data from localStorage when the component mounts
  const initialCartData = JSON.parse(localStorage.getItem('cartData')) || {};

  // Create a state variable to store the cart data
  const [cartData, setCartData] = useState(initialCartData);
  const [count, setCount] = useState()
  // Save the cart data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cartData', JSON.stringify(cartData));
  }, [cartData]);

  // Function to handle adding an item to the cart
  const addItemToCart = (itemId) => {
    const updatedCartData = { ...cartData };
    updatedCartData[itemId] = (updatedCartData[itemId] || 0) + 1;
    setCartData(updatedCartData);
  };

  // Function to handle removing an item from the cart
  const removeItemFromCart = (itemId) => {
    const updatedCartData = { ...cartData };
    if (updatedCartData[itemId] && updatedCartData[itemId] > 0) {
      updatedCartData[itemId] -= 1;
    }
    setCartData(updatedCartData);
  };

  return (
    <div className="container">
      <h3 style={{ padding: "20px" }}>Products</h3>
      <div className="product-Container">
        {itemData.map((item) => (
          <div className="item" key={item.id}>
            <img className="itemImg" src={item.image} alt={item.id} />
            <p>Price: {item.price}</p>
            {cartData[item.id] === undefined || cartData[item.id] === 0 ? (
              <button onClick={() => addItemToCart(item.id)}>Add to Cart</button>
            ) : (
              <>
                <button onClick={() => removeItemFromCart(item.id)}>-</button>
                <div>Count: {cartData[item.id]}</div>
                <button onClick={() => addItemToCart(item.id)}>+</button>
              </>
            )}
          </div>
        ))}

        <div className="cart">
          <ShoppingCartIcon />
          <div className="count">
            {Object.values(cartData).reduce((acc, val) => acc + val, 0)}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Items;
