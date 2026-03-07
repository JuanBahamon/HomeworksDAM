import { useState } from 'react'

export default function FormularioLogin({ onLogin }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  function manejarEnvio(e) {
    e.preventDefault()
    const ok = onLogin(email, password)
    if (!ok) {
      setError('Usuario o contraseña incorrectos')
    }
  }

  return (
    <div>
      <h2>MediCare+ Admin</h2>
      <form onSubmit={manejarEnvio}>
        <div>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label>Contraseña</label>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>
        {error && <p>{error}</p>}
        <button type="submit">Ingresar</button>
      </form>
    </div>
  )
}