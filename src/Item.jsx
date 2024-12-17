import React, { useState } from "react";

const Item = ({ id, title, price, image, amount, updateCart, removeItem }) => {
  const [quantity, setQuantity] = useState(amount);

  // Povećaj količinu
  const increaseQuantity = () => {
    setQuantity((prev) => prev + 1);
    updateCart(1, price);
  };

  // Smanji količinu
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
      updateCart(-1, price);
    }
  };

  // Ukloni ceo item
  const handleRemove = () => {
    removeItem(id, quantity, price); // Prosleđuje ID, količinu i cenu
  };

  return (
    <div className="item-card">
      <img src={image} alt={title} className="item-image" />
      <div className="item-details">
        <h3>{title}</h3>
        <p className="item-price">${price}</p>
        <p
          className="remove-item"
          onClick={handleRemove}
          style={{ cursor: "pointer", color: "red" }}
        >
          REMOVE
        </p>
      </div>
      <div className="item-counter">
        <button onClick={increaseQuantity} className="arrow-up">
          ▲
        </button>
        <p>{quantity}</p>
        <button onClick={decreaseQuantity} className="arrow-down">
          ▼
        </button>
      </div>
    </div>
  );
};

export default Item;
