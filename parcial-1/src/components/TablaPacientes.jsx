import { useState } from 'react'

export default function TablaPacientes({ pacientes, onEditar, onEliminar }) {
  const [pacienteAEliminar, setPacienteAEliminar] = useState(null)

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Nombre completo</th>
            <th>DNI</th>
            <th>Teléfono</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {pacientes.map(p => (
            <tr key={p.id}>
              <td>{p.nombre} {p.apellido}</td>
              <td>{p.dni}</td>
              <td>{p.telefono}</td>
              <td>
                <button onClick={() => onEditar(p)}>Editar</button>
                <button onClick={() => setPacienteAEliminar(p)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {pacienteAEliminar && (
        <div>
          <p>¿Seguro que querés eliminar a {pacienteAEliminar.nombre}?</p>
          <button onClick={() => {
            onEliminar(pacienteAEliminar.id)
            setPacienteAEliminar(null)
          }}>Sí, eliminar</button>
          <button onClick={() => setPacienteAEliminar(null)}>Cancelar</button>
        </div>
      )}
    </div>
  )
}