import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Mail, Lock, Eye, EyeOff, User, ArrowLeft } from 'lucide-react'
import authService from '../../services/authService'

export default function RegisterForm() {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    setError('')
    setSuccess('')
  }

  const validate = () => {
    if (!form.fullName.trim()) return 'Full name is required.'
    if (!form.email.trim()) return 'Email is required.'
    if (form.password.length < 8) return 'Password must be at least 8 characters.'
    if (form.password !== form.confirmPassword) return 'Passwords do not match.'
    return null
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const validationError = validate()
    if (validationError) { setError(validationError); return }

    setLoading(true)
    setError('')
    try {
      await authService.signUpWithEmail(form.email, form.password, form.fullName)
      setSuccess('Account created! Please check your email to confirm your account.')
    } catch (err) {
      setError(err.message || 'Registration failed. Please try again.')
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
                <linearGradient id="logoGradFormRegister" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#8B5CF6" />
                  <stop offset="50%" stopColor="#EC4899" />
                  <stop offset="100%" stopColor="#06B6D4" />
                </linearGradient>
              </defs>
              <path
                d="M6 8C6 6.89543 6.89543 6 8 6H16C21.5228 6 26 10.4772 26 16C26 21.5228 21.5228 26 16 26H8C6.89543 26 6 25.1046 6 24V8Z"
                stroke="url(#logoGradFormRegister)"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12 12C12 10.8954 12.8954 10 14 10H16C19.3137 10 22 12.6863 22 16C22 19.3137 19.3137 22 16 22H14C12.8954 22 12 21.1046 12 20V12Z"
                fill="url(#logoGradFormRegister)"
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
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Create your account</h1>
          <p className="text-gray-500 text-sm">Start showcasing your projects in minutes.</p>
        </div>

        {/* Error / Success */}
        {error && (
          <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-100 text-red-600 text-sm">
            {error}
          </div>
        )}
        {success && (
          <div className="mb-4 p-3 rounded-lg bg-green-50 border border-green-100 text-green-700 text-sm">
            {success}
          </div>
        )}

        {!success && (
          <>
            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Full Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    name="fullName"
                    value={form.fullName}
                    onChange={handleChange}
                    placeholder="Aarav Mehta"
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm
                      focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                  />
                </div>
              </div>

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
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm
                      focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
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
                    placeholder="At least 8 characters"
                    className="w-full pl-10 pr-10 py-2.5 border border-gray-200 rounded-xl text-sm
                      focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
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

              {/* Confirm Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type={showConfirm ? 'text' : 'password'}
                    name="confirmPassword"
                    value={form.confirmPassword}
                    onChange={handleChange}
                    placeholder="Repeat password"
                    className="w-full pl-10 pr-10 py-2.5 border border-gray-200 rounded-xl text-sm
                      focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm(!showConfirm)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
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
                {loading ? 'Creating account…' : 'Create Account'}
              </button>
            </form>
          </>
        )}

        {/* Footer link */}
        <p className="mt-6 text-center text-sm text-gray-500 border-t border-gray-50 pt-6">
          Already have an account?{' '}
          <Link to="/login" className="text-primary-600 font-medium hover:text-primary-700">
            Login
          </Link>
        </p>
      </div>
    </div>
  )
}
