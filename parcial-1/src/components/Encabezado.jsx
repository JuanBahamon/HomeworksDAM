import { useState } from 'react'
import PerfilUsuario from './PerfilUsuario'

export default function Encabezado({ usuario, onLogout }) {
  const [verPerfil, setVerPerfil] = useState(false)

  return (
    <div>
      <h1>MediCare+ Admin</h1>

      <button onClick={() => setVerPerfil(true)} style={{ 
        width: '36px', 
        height: '36px', 
        borderRadius: '50%', 
         background: '#19e6ca', 
        color: 'white',
        fontWeight: 'bold'
        }}>
        {usuario.nombre.charAt(0)}
      </button>

      <button onClick={onLogout}>Cerrar sesión</button>

      {verPerfil && (
        <PerfilUsuario
          usuario={usuario}
          onCerrar={() => setVerPerfil(false)}
        />
      )}
    </div>
  )
}