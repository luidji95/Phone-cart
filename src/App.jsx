import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Item from "./Item";

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://www.course-api.com/react-useReducer-cart-project"
        );
        const data = await response.json();
        setData(data);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchData();
  }, []);

  const totalItems = data.reduce((total, item) => total + item.amount, 0);
  const totalCost = data.reduce(
    (total, item) => total + item.amount * item.price,
    0
  );

  const removeItem = (id) => {
    setData((prevData) => prevData.filter((item) => item.id !== id));
  };

  const clearBag = () => {
    setData([]);
  };

  const increaseAmount = (id) => {
    setData((prevData) =>
      prevData.map((item) =>
        item.id === id ? { ...item, amount: item.amount + 1 } : item
      )
    );
  };

  const decreaseAmount = (id) => {
    setData((prevData) =>
      prevData.map((item) =>
        item.id === id && item.amount > 1
          ? { ...item, amount: item.amount - 1 }
          : item
      )
    );
  };

  return (
    <>
      <div className="header">
        <h1>YOUR BAG</h1>
        <div style={{ position: "relative" }}>
          {" "}
          {}
          <img
            src="https://cdn-icons-png.flaticon.com/512/1170/1170678.png"
            alt="cart"
            className="cart-icon"
          />
          <p className="cart-number">{totalItems}</p>
        </div>
      </div>

      <div className="items-list">
        {data.length > 0 ? (
          data.map((item) => (
            <Item
              key={item.id}
              id={item.id}
              title={item.title}
              price={item.price}
              image={item.img}
              amount={item.amount}
              removeItem={removeItem}
              increaseQuantity={() => increaseAmount(item.id)}
              decreaseQuantity={() => decreaseAmount(item.id)}
            />
          ))
        ) : (
          <h2>Your bag is currently empty</h2>
        )}
      </div>

      {data.length > 0 && (
        <div className="footer">
          <h2>Total Price: ${totalCost.toFixed(2)}</h2>
          <button onClick={clearBag} className="clear-bag-btn">
            Clear Bag
          </button>
        </div>
      )}
    </>
  );
}

export default App;
