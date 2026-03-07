import { useState } from 'react'

export default function PerfilUsuario({ usuario, onCerrar }) {

  return (
    <div>
      <h3>Mi perfil</h3>

      <span>{usuario.nombre.charAt(0)}</span>

      <p>{usuario.nombre}</p>
      <p>{usuario.rol}</p>

      <button onClick={onCerrar}>Cerrar</button>
    </div>
  )
}