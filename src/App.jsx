import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [totalItem, setTotalItem] = useState(0);
  const [itemCounter, setItemCounter] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
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

  return (
    <div className="App">
      <h1>Podaci sa API-ja</h1>
      <ul>
        {data.map((item) => (
          <li key={item.id}>
            <h3>{item.name}</h3>
            <p>{item.description}</p>
            <p>Cena: {item.price} $</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
