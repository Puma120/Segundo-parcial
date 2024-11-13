import React, { useState, useEffect } from 'react';
import Menu from './components/Menu';
import Order from './components/Order';
import Payment from './components/Payment';
import './App.css';
import { db } from "./services/firebaseConfig";
import { getOrders } from './services/orderService';
import { LoginForm } from './components/LoginForm';
import { Header } from './components/Header';

const App = () => {
  const [orderItems, setOrderItems] = useState([]);
  const [menuItems, setMenuItems] = useState([]); 
  const [isPaid, setIsPaid] = useState(false);
  const [error, setError] = useState(null); 
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState(null); // Nuevo estado para el rol del usuario

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

  // Actualiza el estado de isAdmin basado en el rol del usuario
  useEffect(() => {
    setIsAdmin(role === "admin");
  }, [role]);

  return (
    <div>
      <Header
        isAdmin={isAdmin}
        setIsAdmin={setIsAdmin}
        isAuthenticated={isAuthenticated}
        setIsAuthenticated={setIsAuthenticated}
      />
  
      {isAuthenticated ? (
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold">{isAdmin ? "Admin" : "Cliente"}</h1>
          <Menu menuItems={menuItems} addItemToOrder={addItemToOrder} />
          <Order setIsPaid={setIsPaid} isPaid={isPaid} orderItems={orderItems} isAdmin={isAdmin} />
          <button onClick={toggleAdmin}>
            Cambiar a {isAdmin ? "Cliente" : "Administrador"}
          </button>
        </div>
      ) : (
        <LoginForm
          setIsAuthenticated={setIsAuthenticated}
          setRole={setRole} // Pasar setRole para actualizar el rol
        />
      )}
    </div>
  );
};

export default App;
