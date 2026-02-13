import React, { useState } from 'react';
import './FormularioContacto.css';

function FormularioContacto({ alAgregarContacto }) {
  const [nombre, setNombre] = useState('');
  const [telefono, setTelefono] = useState('');

  const manejarEnvio = (e) => {
    e.preventDefault();
    
    // Validación simple
    if (!nombre.trim() || !telefono.trim()) {
      alert('Por favor completa todos los campos');
      return;
    }

    alAgregarContacto(nombre, telefono);
    
    // Limpiar el formulario
    setNombre('');
    setTelefono('');
  };

  return (
    <div className="formulario-contacto">
      <h2>Agregar Nuevo Contacto</h2>
      <form onSubmit={manejarEnvio}>
        <div className="grupo-formulario">
          <input
            type="text"
            placeholder="Nombre completo"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className="input-formulario"
          />
        </div>
        <div className="grupo-formulario">
          <input
            type="tel"
            placeholder="Teléfono"
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
            className="input-formulario"
          />
        </div>
        <button type="submit" className="boton-agregar">
          Agregar Contacto
        </button>
      </form>
    </div>
  );
}

export default FormularioContacto;