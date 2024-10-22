import React from 'react';

const Order = ({ orderItems }) => {
  const total = orderItems.reduce((acc, item) => acc + item.price, 0);

  return (
    <div className="order">
      <h2>Orden Actual</h2>
      {orderItems.map((item, index) => (
        <div className="order-item" key={index}>
          <span>{item.name} - ${item.price}</span>
        </div>
      ))}
      <div className="order-total">
        Total: ${total}
      </div>
    </div>
  );
};

export default Order;
