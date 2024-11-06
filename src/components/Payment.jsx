import React from 'react';

const Payment = ({ handlePayment, isPaid }) => {
  
  return (
    <div className="payment">
      <button  onClick={handlePayment}  >Pagar</button>
      
      {isPaid && <>
      <p className="payment-message">Pago Realizado.</p>
      <p className="payment-message">Gracias por su compra C:</p></>} 
    </div>
  );
};

export default Payment;