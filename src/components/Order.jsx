import React, { useEffect, useState } from 'react';
import { getOrders, createOrder } from '../services/orderService';
import Payment from './Payment';

const Order = ({ orderItems, isPaid, setIsPaid, isAdmin }) => {
  const [orders, setOrders] = useState([]);
  const total = orderItems.reduce((acc, item) => acc + item.price * (item.quantity || 1), 0);

  const loadOrders = async () => {
    try {
      const data = await getOrders();
      const sortedOrders = data.sort((a, b) => a.date.seconds - b.date.seconds);
      setOrders(sortedOrders);
    } catch (error) {
      console.error("Error al cargar las órdenes:", error);
    }
  };

  useEffect(() => {
    loadOrders();
  }, [orders]);

  const handlePayment = async () => {
    try {
      const orderId = await createOrder(orderItems, total);
      console.log("Orden creada con ID:", orderId);
      setIsPaid(true);
      
      setOrders(prevOrders => [
        {
          id: orderId,
          items: orderItems,
          payment: "cash",
          total,
          date: { seconds: Date.now() / 1000 }
        },
        ...prevOrders
      ]);
    } catch (error) {
      console.error("Error al realizar el pago:", error);
    }
  };

  return (
    <div className="order">
      <h2>Orden Actual</h2>
      {orderItems.map((item, index) => (
        <div className="order-item" key={index}>
          <span>{item.name} - ${item.price}  {item.quantity}</span>
        </div>
      ))}
      <div className="order-total">
        Total: ${total}
      </div>

      <Payment handlePayment={handlePayment} isPaid={isPaid} />      

      {/* Mostrar historial de órdenes solo si el usuario es administrador */}
      {isAdmin && (
        <div>
          <h2>Historial de órdenes</h2>
          <ul>
            {orders.map((order, id) => {
              const orderDate = new Date(order.date.seconds * 1000).toLocaleString();
              return (
                <div className="orders-past" key={id}>
                  <h3>Orden #{id + 1}</h3>
                  <div>Fecha: {orderDate}</div>
                  {order.items.map((item, idx) => (
                    <div key={idx}>
                      <span>{item.name} - ${item.price} x {item.quantity}</span>
                    </div>
                  ))}
                  <div>Pago: {order.payment}</div>
                  <div>Total: ${order.total}</div>
                </div>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Order;
