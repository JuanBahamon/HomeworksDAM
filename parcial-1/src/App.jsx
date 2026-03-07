import { useState, useEffect } from 'react'
import FormularioLogin from './components/FormularioLogin'
import Encabezado from './components/Encabezado'
import Tablero from './pages/Tablero'

const usuarios = [
  { id: 1, email: 'recepcion@medicare.com', password: '1234', nombre: 'Laura Gómez', rol: 'recepcionista' },
  { id: 2, email: 'medico@medicare.com', password: '1234', nombre: 'Dr. Carlos Ruiz', rol: 'medico' },
  { id: 3, email: 'admin@medicare.com', password: '1234', nombre: 'Admin Medicare', rol: 'admin' },
]

export default function App() {
  const [usuario, setUsuario] = useState(null)

  useEffect(() => {
    const guardado = localStorage.getItem('medicare_usuario')
    if (guardado) {
      setUsuario(JSON.parse(guardado))
    }
  }, [])

  function iniciarSesion(email, password) {
    const encontrado = usuarios.find(u => u.email === email && u.password === password)

    if (encontrado) {
      localStorage.setItem('medicare_usuario', JSON.stringify(encontrado))
      setUsuario(encontrado)
      return true
    }
    return false
  }

  function cerrarSesion() {
    localStorage.removeItem('medicare_usuario')
    setUsuario(null)
  }

  function actualizarAvatar(urlAvatar) {
    const actualizado = { ...usuario, avatar: urlAvatar }
    localStorage.setItem('medicare_usuario', JSON.stringify(actualizado))
    setUsuario(actualizado)
  }

  if (!usuario) {
    return <FormularioLogin onLogin={iniciarSesion} />
  }

  return (
    <div>
      <Encabezado usuario={usuario} onLogout={cerrarSesion} onActualizarAvatar={actualizarAvatar} />
      <main style={{ padding: '24px' }}>
        <Tablero usuario={usuario} />
      </main>
    </div>
  )
}