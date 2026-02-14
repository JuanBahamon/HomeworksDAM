import React from 'react';
import ItemContacto from './ItemContacto';
import './ListaContactos.css';

function ListaContactos({ contactos, alEliminarContacto }) {
  if (contactos.length === 0) {
    return (
      <div className="lista-contactos">
        <p className="mensaje-vacio">No hay contactos. ¡Agrega uno nuevo!</p>
      </div>
    );
  }

  return (
    <div className="lista-contactos">
      <h2>Lista de Contactos ({contactos.length})</h2>
      <div className="cuadricula-contactos">
        {contactos.map(contacto => (
          <ItemContacto
            key={contacto.id}
            contacto={contacto}
            alEliminar={alEliminarContacto}
          />
        ))}
      </div>
    </div>
  );
}

export default ListaContactos;