import React from "react";

const Item = ({
  id,
  title,
  price,
  image,
  amount,
  removeItem,
  increaseQuantity,
  decreaseQuantity,
}) => {
  return (
    <div className="item-card">
      <img src={image} alt={title} className="item-image" />
      <div className="item-details">
        <h3>{title}</h3>
        <p className="item-price">${price}</p>
        <p
          className="remove-item"
          onClick={() => removeItem(id)}
          style={{ cursor: "pointer", color: "red" }}
        >
          REMOVE
        </p>
      </div>
      <div className="item-counter">
        <button onClick={increaseQuantity} className="arrow-up">
          ▲
        </button>
        <p>{amount}</p>
        <button onClick={decreaseQuantity} className="arrow-down">
          ▼
        </button>
      </div>
    </div>
  );
};

export default Item;
