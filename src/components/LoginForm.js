import React, { useState, useEffect } from 'react'
import axios from 'axios';

export default function LoginForm() {
  const [formData, setFormData] = useState({
    identifier: '',
    password: '',
    rememberMe: false,
  })

  useEffect(() => {
    // Retrieve session details on page load
    const savedData = localStorage.getItem('userSession') || sessionStorage.getItem('userSession')
    if (savedData) {
      const { identifier, rememberMe, timestamp } = JSON.parse(savedData)
      
      // Check expiration: 1 month (30 days * 24 hours * 60 minutes * 60 seconds * 1000 milliseconds)
      const oneMonthInMs = 30 * 24 * 60 * 60 * 1000
      if (Date.now() - timestamp > oneMonthInMs) {
        // Session expired; clear localStorage/sessionStorage
        localStorage.removeItem('userSession')
        sessionStorage.removeItem('userSession')
      } else {
        // Session valid; pre-fill data
        setFormData({ ...formData, identifier, rememberMe })
      }
    }
  }, [])

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
    setFormData({ ...formData, [e.target.name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const userSession = {
      identifier: formData.identifier,
      rememberMe: formData.rememberMe,
      timestamp: Date.now(), // Store the current timestamp
    }

    if (formData.rememberMe) {
      // Store in localStorage
      localStorage.setItem('userSession', JSON.stringify(userSession))
    } else {
      // Store in sessionStorage
      sessionStorage.setItem('userSession', JSON.stringify(userSession))
    }

    // TODO: Implement actual login logic (e.g., API call)
    console.log('Login successful:', userSession)

    axios
      .post("", formData)
      .then(() => {

    }).catch((error) => {
      console.log(error);
    })
  
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-slate-200">
      <div className="w-96 bg-white p-6 rounded-lg shadow-lg">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="identifier" className="block text-sm font-medium text-gray-700">Username or Email</label>
            <input
              type="text"
              id="identifier"
              name="identifier"
              required
              className="mt-1 p-1 block w-full rounded-md border-gray-300 bg-slate-200 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              value={formData.identifier}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              required
              className="mt-1 p-1 block w-full rounded-md border-gray-300 bg-slate-200 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="rememberMe"
              name="rememberMe"
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              checked={formData.rememberMe}
              onChange={handleChange}
            />
            <label htmlFor="rememberMe" className="ml-2 block text-sm text-gray-900">
              Remember me
            </label>
          </div>
          <button type="submit" className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Login
          </button>
        </form>
      </div>
    </div>
  )
}
