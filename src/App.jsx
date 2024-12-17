import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Item from "./Item";

function App() {
  const [data, setData] = useState([]);
  const [cartNum, setCartNum] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  // Fetch podataka
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://www.course-api.com/react-useReducer-cart-project"
        );
        const data = await response.json();
        setData(data);

        // Početne vrednosti
        const totalItems = data.reduce((total, item) => total + item.amount, 0);
        const totalCost = data.reduce(
          (total, item) => total + item.amount * item.price,
          0
        );
        setCartNum(totalItems);
        setTotalPrice(totalCost);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchData();
  }, []);

  // Ažuriranje ukupne količine i cene
  const updateCart = (changeInQuantity, price) => {
    setCartNum((prev) => prev + changeInQuantity);
    setTotalPrice((prev) => prev + changeInQuantity * price);
  };

  // Brisanje celog itema
  const removeItem = (id, quantity, price) => {
    setData((prevData) => prevData.filter((item) => item.id !== id)); // Uklanja item
    setCartNum((prev) => prev - quantity);
    setTotalPrice((prev) => prev - quantity * price);
  };

  // Brisanje svih itema
  const clearBag = () => {
    setData([]); // Briše sve iteme
    setCartNum(0); // Resetuje ukupan broj artikala
    setTotalPrice(0); // Resetuje ukupnu cenu
  };

  return (
    <>
      <div className="header">
        <h1>YOUR BAG</h1>
        <div style={{ position: "relative" }}>
          {" "}
          {/* Pozicija kontejnera za korpu */}
          <img
            src="https://cdn-icons-png.flaticon.com/512/1170/1170678.png"
            alt="cart"
            className="cart-icon"
          />
          <p className="cart-number">{cartNum}</p>
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
              updateCart={updateCart}
              removeItem={removeItem}
            />
          ))
        ) : (
          <h2>Your bag is currently empty</h2>
        )}
      </div>

      {data.length > 0 && (
        <div className="footer">
          <h2>Total Price: ${totalPrice.toFixed(2)}</h2>
          <button onClick={clearBag} className="clear-bag-btn">
            Clear Bag
          </button>
        </div>
      )}
    </>
  );
}

export default App;
