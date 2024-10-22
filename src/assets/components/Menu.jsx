import React from 'react';

const Menu = ({ menuItems, addItemToOrder }) => {
  return (
    <div className="menu">
      {menuItems.length > 0 ? (
        menuItems.map((item) => (
          <div key={item.id} className="menu-item">
            <p>{item.name} - ${item.price}</p>
            <button onClick={() => addItemToOrder(item)}>Agregar</button>
          </div>
        ))
      ) : (
        <p>Cargando menú...</p> 
      )}
    </div>
  );
};

export default Menu;
