// src/pages/Register.tsx

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabaseClient } from '../supabaseClient'

export default function Register() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')

  const navigate = useNavigate()

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setMessage('')

    const { data, error } = await supabaseClient.auth.signUp({
      email,
      password,
    })

    if (error) {
      setError(error.message)
      return
    }

    /**
     * CASE 1: Email confirmation ON (default)
     * data.session === null
     */
    if (!data.session) {
      setMessage('Check your email to confirm your account')
      return
    }

    /**
     * CASE 2: Email confirmation OFF
     * User is logged in immediately
     */
    navigate('/')
  }

  return (
    <div className="flex flex-col items-center justify-center gap-6 min-h-screen bg-indigo-100">
      <h2 className="font-bold text-4xl">Register</h2>

      <form onSubmit={handleRegister} className="w-2/3 h-full flex flex-col gap-4">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="p-2 bg-indigo-50 rounded-md"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="p-2 bg-indigo-50 rounded-md"
        />

        <button type="submit" className="p-2 bg-indigo-500 tracking-wider text-zinc-50 font-semibold rounded-md hover:bg-indigo-600 cursor-pointer">
          Sign Up
        </button>

        {error && <p className="text-red-500">{error}</p>}
        {message && <p className="text-green-600">{message}</p>}
      </form>
    </div>
  )
}
