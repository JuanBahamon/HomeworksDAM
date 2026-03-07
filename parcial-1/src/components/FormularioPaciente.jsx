import { useState, useEffect } from 'react'

export default function FormularioPaciente({ pacienteAEditar, onGuardar }) {
  const [nombre, setNombre] = useState('')
  const [apellido, setApellido] = useState('')
  const [dni, setDni] = useState('')
  const [telefono, setTelefono] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    if (pacienteAEditar) {
      setNombre(pacienteAEditar.nombre)
      setApellido(pacienteAEditar.apellido)
      setDni(pacienteAEditar.dni)
      setTelefono(pacienteAEditar.telefono)
    } else {
      setNombre('')
      setApellido('')
      setDni('')
      setTelefono('')
    }
  }, [pacienteAEditar])

  function guardar() {
    if (!nombre || !apellido || !dni) {
      setError('Nombre, apellido y DNI son obligatorios')
      return
    }
    if (!/^\d{7,8}$/.test(dni)) {
      setError('El DNI debe tener entre 7 y 8 números')
      return
    }
    setError('')
    onGuardar({ id: pacienteAEditar?.id || Date.now(), nombre, apellido, dni, telefono })
  }

  return (
    <div>
      <h3>{pacienteAEditar ? 'Editar paciente' : 'Nuevo paciente'}</h3>

      <div>
        <label>Nombre</label>
        <input value={nombre} onChange={e => setNombre(e.target.value)} />
      </div>
      <div>
        <label>Apellido</label>
        <input value={apellido} onChange={e => setApellido(e.target.value)} />
      </div>
      <div>
        <label>DNI</label>
        <input value={dni} onChange={e => setDni(e.target.value)} />
      </div>
      <div>
        <label>Teléfono</label>
        <input value={telefono} onChange={e => setTelefono(e.target.value)} />
      </div>

      {error && <p>{error}</p>}

      <button onClick={guardar}>Guardar</button>
    </div>
  )
}