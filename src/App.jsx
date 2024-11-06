import React, { useState, useEffect } from 'react'; 
import Menu from './components/Menu';
import Order from './components/Order';
import Payment from './components/Payment';
import './App.css';
import { db } from "./services/firebaseConfig";
import { getOrders } from './services/orderService';

const App = () => {
  const [orderItems, setOrderItems] = useState([]);
  const [menuItems, setMenuItems] = useState([]); 
  const [isPaid, setIsPaid] = useState(false);
  const [error, setError] = useState(null); 
  const [isAdmin, setIsAdmin] = useState(false); // Nuevo estado para controlar el modo de usuario

  useEffect(() => {
    fetch('https://api-menu-9b5g.onrender.com/menu')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error fetching menu');
        }
        return response.json();
      })
      .then((data) => setMenuItems(data)) 
      .catch((error) => {
        console.error('Error:', error);
        setError('Failed to load menu');
      });
  }, []);

  useEffect(() => {
    if (isPaid) {
      clearOrder();
    }
  }, [isPaid]);

  const addItemToOrder = (item) => {
    setOrderItems([...orderItems, item]);
    setIsPaid(false); 
  };

  const clearOrder = () => {
    setOrderItems([]);
  };

  // Función para alternar entre cliente y administrador
  const toggleAdmin = () => {
    setIsAdmin(!isAdmin);
  };

  return (
    <div className="app-container">
      {error && <p className="error-message">{error}</p>}
      
      <Menu menuItems={menuItems} addItemToOrder={addItemToOrder} />
      <Order setIsPaid={setIsPaid} isPaid={isPaid} orderItems={orderItems} isAdmin={isAdmin} />
      <button onClick={toggleAdmin}>
        Cambiar a {isAdmin ? "Cliente" : "Administrador"}
      </button>
    </div>
  );
};

export default App;