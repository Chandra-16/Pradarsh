import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Mail, Lock, Eye, EyeOff, ArrowLeft } from 'lucide-react'
import authService from '../../services/authService'

export default function LoginForm() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '' })
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.email || !form.password) {
      setError('Please fill in all fields.')
      return
    }
    setLoading(true)
    setError('')
    try {
      await authService.signInWithEmail(form.email, form.password)
      navigate('/')
    } catch (err) {
      setError(err.message || 'Invalid email or password.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-white rounded-2xl shadow-card p-8">
        {/* Navigation / Brand Row */}
        <div className="flex items-center justify-between mb-6 pb-5 border-b border-gray-100">
          <Link to="/" className="flex items-center gap-2 group">
            <svg
              className="w-6.5 h-6.5 group-hover:scale-105 transition-transform duration-300 drop-shadow-[0_0_6px_rgba(139,92,246,0.3)]"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="logoGradFormLogin" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#8B5CF6" />
                  <stop offset="50%" stopColor="#EC4899" />
                  <stop offset="100%" stopColor="#06B6D4" />
                </linearGradient>
              </defs>
              <path
                d="M6 8C6 6.89543 6.89543 6 8 6H16C21.5228 6 26 10.4772 26 16C26 21.5228 21.5228 26 16 26H8C6.89543 26 6 25.1046 6 24V8Z"
                stroke="url(#logoGradFormLogin)"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12 12C12 10.8954 12.8954 10 14 10H16C19.3137 10 22 12.6863 22 16C22 19.3137 19.3137 22 16 22H14C12.8954 22 12 21.1046 12 20V12Z"
                fill="url(#logoGradFormLogin)"
                opacity="0.85"
              />
              <circle cx="16" cy="16" r="2" fill="#FFFFFF" />
            </svg>
            <span className="font-black text-sm bg-gradient-to-r from-violet-600 via-primary-500 to-cyan-500 bg-clip-text text-transparent tracking-tight-premium">
              Pradarsh
            </span>
          </Link>
          <Link
            to="/"
            className="flex items-center gap-1.5 text-xs font-medium text-gray-500 hover:text-primary-600 transition-colors group/back"
          >
            <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover/back:-translate-x-0.5" />
            Back to Home
          </Link>
        </div>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Welcome back</h1>
          <p className="text-gray-500 text-sm">Sign in to continue to Pradarsh.</p>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-100 text-red-600 text-sm">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full pl-10 pr-10 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl text-white font-semibold text-sm transition-all duration-200
              bg-gradient-to-r from-primary-500 to-accent-500 hover:from-primary-600 hover:to-accent-600
              disabled:opacity-60 disabled:cursor-not-allowed shadow-glow hover:shadow-glow-pink"
          >
            {loading ? 'Signing in…' : 'Login'}
          </button>
        </form>

        {/* Footer link */}
        <p className="mt-6 text-center text-sm text-gray-500 border-t border-gray-50 pt-6">
          New to Pradarsh?{' '}
          <Link to="/register" className="text-primary-600 font-medium hover:text-primary-700">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  )
}
