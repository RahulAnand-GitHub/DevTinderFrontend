import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { BASE_URL } from '../utils/constants'
import toast from 'react-hot-toast'
import axios from 'axios'
import { removeUser } from '../utils/userSlice'
import { removeFeed } from '../utils/feedSlice'

const Navbar = () => {
  const user = useSelector((store) => store.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      const res = await axios.post(
        BASE_URL + '/logout',
        {},
        { withCredentials: true }
      )
      dispatch(removeUser())
      dispatch(removeFeed())
      toast.success(res?.data)
      return navigate('/login')
    } catch (e) {
      //DESIGN ERROR PAGE
      console.log(e)
    }
  }
  return (
    <div>
      <div className="navbar bg-base-300 shadow-sm px-[5%]">
        <div className="flex-1">
          <Link to="/" className="btn btn-ghost text-xl">
            Dev Tinder
          </Link>
        </div>
        {user && (
          <div className="flex items-center text-white">
            <div className="text-sm font-semibold mx-2">
              Welcome, {user.firstName}
            </div>
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-7 rounded-full">
                  <img
                    // alt="Tailwind CSS Navbar component"
                    // src="https://cdn-icons-png.flaticon.com/512/10628/10628938.png "
                    src={user.photoUrl}
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-300 rounded-box z-1 mt-3 w-52 p-2 shadow"
              >
                <li>
                  <Link to="/profile" className="justify-between">
                    Profile
                    <span className="badge">New</span>
                  </Link>
                </li>
                <li>
                  <Link to="/connections">Connections</Link>
                </li>
                <li>
                  <Link to="/requests">Requests</Link>
                </li>
                <li>
                  <a onClick={handleLogout}>Logout</a>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Navbar
