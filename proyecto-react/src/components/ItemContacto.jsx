import React from 'react';
import './ItemContacto.css';

function ItemContacto({ contacto, alEliminar }) {
  const manejarEliminar = () => {
    if (window.confirm(`¿Estás seguro de eliminar a ${contacto.nombre}?`)) {
      alEliminar(contacto.id);
    }
  };

  return (
    <div className="item-contacto">
      <div className="avatar-contacto">
        {contacto.nombre.charAt(0).toUpperCase()}
      </div>
      <div className="info-contacto">
        <h3>{contacto.nombre}</h3>
        <p>{contacto.telefono}</p>
      </div>
      <button 
        className="boton-eliminar" 
        onClick={manejarEliminar}
        aria-label="Eliminar contacto"
      >
        Eliminar
      </button>
    </div>
  );
}

export default ItemContacto;