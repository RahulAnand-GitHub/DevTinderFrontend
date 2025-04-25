import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
// import Signup from './Signup'
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { addUser } from '../utils/userSlice'
import { BASE_URL } from '../utils/constants'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [isLoginForm, setIsLoginForm] = useState(true)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        BASE_URL + '/login',
        {
          email,
          password,
        },
        { withCredentials: true }
      )
      dispatch(addUser(res?.data))
      toast.success('Login Successful!')
      return navigate('/')
    } catch (err) {
      setError(err?.response?.data || 'Something went wrong')
    }
  }
  const handleSignUp = async () => {
    try {
      const res = await axios.post(
        BASE_URL + '/signup',
        { firstName, lastName, email, password },
        { withCredentials: true }
      )
      console.log(res.data.data)
      dispatch(addUser(res.data.data))
      toast.success(res.data.message)
      return navigate('/profile')
    } catch (err) {}
  }

  return (
    <div className="flex justify-center mt-20">
      <Toaster />
      <div className="card bg-base-300 text-neutral-content w-96">
        <div className="card-body">
          <div className="flex justify-center">
            <h2 className="text-3xl font-bold">
              {isLoginForm ? 'Login' : 'Sign Up '}
            </h2>
          </div>
          {!isLoginForm && (
            <>
              <input
                type="text"
                placeholder="First Name"
                value={firstName}
                className="input input-md validator"
                onChange={(e) => setFirstName(e.target.value)}
              />
              <input
                type="text"
                placeholder="Last Name"
                value={lastName}
                className="input input-md validator"
                onChange={(e) => setLastName(e.target.value)}
              />
            </>
          )}
          <label className="input validator">
            <svg
              className="h-[1em] opacity-50"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2.5"
                fill="none"
                stroke="currentColor"
              >
                <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
              </g>
            </svg>
            <input
              type="email"
              placeholder="johndoe@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="form-input"
            />
          </label>
          <div className="validator-hint hidden">Enter valid email address</div>

          <label className="input validator">
            <svg
              className="h-[1em] opacity-50"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2.5"
                fill="none"
                stroke="currentColor"
              >
                <path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"></path>
                <circle cx="16.5" cy="7.5" r=".5" fill="currentColor"></circle>
              </g>
            </svg>
            {/* //password */}

            <input
              type="password"
              value={password}
              required
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              minLength="8"
              pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
              title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
              className="form-input"
            />
          </label>
          <p className="validator-hint hidden">
            Must be more than 8 characters, including
            <br />
            At least one number
            <br />
            At least one lowercase letter
            <br />
            At least one uppercase letter
          </p>
          <div className="mt-2">
            <button
              className="btn btn-soft btn-primary btn-block"
              onClick={isLoginForm ? handleLogin : handleSignUp}
            >
              {isLoginForm ? 'Login' : 'Sign Up'}
            </button>
          </div>
          <div className="text-lg text-center mt-2">
            {isLoginForm ? (
              <>
                Don't have account?{' '}
                <button
                  className="border-none font-bold cursor-pointer"
                  onClick={() => setIsLoginForm((value) => !value)}
                >
                  Sign Up
                </button>
              </>
            ) : (
              <>
                Existing user?{' '}
                <button
                  className="border-none font-bold cursor-pointer"
                  onClick={() => setIsLoginForm((value) => !value)}
                >
                  Log In
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
