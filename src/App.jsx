import React, { useState, useEffect } from 'react'; 
import Menu from './assets/components/Menu';
import Order from './assets/components/Order';
import Payment from './assets/components/Payment';
import './App.css';

const App = () => {
  const [orderItems, setOrderItems] = useState([]);
  const [menuItems, setMenuItems] = useState([]); 
  const [isPaid, setIsPaid] = useState(false);
  const [error, setError] = useState(null); 

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

  const addItemToOrder = (item) => {
    setOrderItems([...orderItems, item]);
    setIsPaid(false); 
  };

  const handlePayment = () => {
    clearOrder(); 
    setIsPaid(true); 
  };

  const clearOrder = () => {
    setOrderItems([]);
  };

  return (
    <div className="app-container">
      {error && <p className="error-message">{error}</p>}
      <Menu menuItems={menuItems} addItemToOrder={addItemToOrder} />
      <Order orderItems={orderItems} />
      <Payment clearOrder={clearOrder} handlePayment={handlePayment} isPaid={isPaid} /> 
    </div>
  );
};

export default App;
