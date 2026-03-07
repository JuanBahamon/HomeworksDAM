import { useState, useEffect } from 'react'
import FormularioPaciente from '../components/FormularioPaciente'
import TablaPacientes from '../components/TablaPacientes'

export default function Tablero({ usuario }) {
  const [pacientes, setPacientes] = useState([])
  const [pacienteAEditar, setPacienteAEditar] = useState(null)
  const [busqueda, setBusqueda] = useState('')

  useEffect(() => {
    const guardados = localStorage.getItem('medicare_pacientes')
    if (guardados) {
      setPacientes(JSON.parse(guardados))
    }
  }, [])

  function guardarPaciente(paciente) {
    let nuevaLista

    if (pacienteAEditar) {
      nuevaLista = pacientes.map(p => p.id === paciente.id ? paciente : p)
    } else {
      nuevaLista = [...pacientes, paciente]
    }

    localStorage.setItem('medicare_pacientes', JSON.stringify(nuevaLista))
    setPacientes(nuevaLista)
    setPacienteAEditar(null)
  }

  function eliminarPaciente(id) {
    const nuevaLista = pacientes.filter(p => p.id !== id)
    localStorage.setItem('medicare_pacientes', JSON.stringify(nuevaLista))
    setPacientes(nuevaLista)
  }

  const pacientesFiltrados = pacientes.filter(p =>
    p.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
    p.apellido.toLowerCase().includes(busqueda.toLowerCase()) ||
    p.dni.includes(busqueda)
  )

  return (
    <div>
      <h2>Bienvenido, {usuario.nombre}</h2>

      {usuario.rol !== 'recepcionista' && (
        <div>
          <h3>Estadísticas</h3>
          <p>Total de pacientes: {pacientes.length}</p>
        </div>
      )}

      {usuario.rol !== 'medico' && (
        <FormularioPaciente
          pacienteAEditar={pacienteAEditar}
          onGuardar={guardarPaciente}
        />
      )}

      <input
        type="text"
        placeholder="Buscar por nombre, apellido o DNI"
        value={busqueda}
        onChange={e => setBusqueda(e.target.value)}
      />

      <TablaPacientes
        pacientes={pacientesFiltrados}
        onEditar={setPacienteAEditar}
        onEliminar={eliminarPaciente}
      />
    </div>
  )
}