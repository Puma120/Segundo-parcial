import React from 'react';

const Payment = ({ clearOrder, isPaid, handlePayment }) => {
  return (
    <div className="payment">
      <button onClick={handlePayment}>Pagar</button>
      {isPaid && <p className="payment-message">Pago Realizado. Gracias por su compra C:</p>} 
    </div>
  );
};

export default Payment;
