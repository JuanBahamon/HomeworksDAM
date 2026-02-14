import React, { useState, useEffect } from 'react';
import Imagen2 from './assets/imagen2.jpg';
import ListaContactos from './components/ListaContactos';
import FormularioContacto from './components/FormularioContacto';
import Cargador from './components/Cargador';
import './App.css';

const contactosIniciales = [
  { id: 1, nombre: 'Juan Pérez', telefono: '3001234567' },
  { id: 2, nombre: 'María García', telefono: '3012345678' },
  { id: 3, nombre: 'Carlos López', telefono: '3023456789' },
  { id: 4, nombre: 'Ana Martínez', telefono: '3034567890' }
];

function App() {
  const [contactos, setContactos] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const cargarContactos = async () => {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setContactos(contactosIniciales);
      setCargando(false);
    };

    cargarContactos();
  }, []);

  const agregarContacto = (nombre, telefono) => {
    const nuevoContacto = {
      id: Date.now(),
      nombre,
      telefono
    };
    setContactos([...contactos, nuevoContacto]);
  };

  const eliminarContacto = (id) => {
    setContactos(contactos.filter(contacto => contacto.id !== id));
  };

  return (
    <div className="App">
      <header className="App-encabezado">
        <img src={Imagen2} alt="Logo App" width="120" />
        <h1>Gestión de Contactos</h1>
      </header>

      {cargando ? (
        <Cargador />
      ) : (
        <div className="App-contenido">
          <FormularioContacto alAgregarContacto={agregarContacto} />
          <ListaContactos 
            contactos={contactos} 
            alEliminarContacto={eliminarContacto} 
          />
        </div>
      )}
    </div>
  );
}

export default App;
