import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Navbar = () => {
  const user = useSelector((store) => store.user)
  

  return (
    <div>
      <div className="navbar bg-base-300 shadow-sm pl-[5%] pr-[5%]">
        <div className="flex-1">
          <Link to='/' className="btn btn-ghost text-xl">Dev Tinder</Link>
        </div>
        {user && (
          <div className="flex items-center">
            <div className="text-sm font-semibold">
              Welcome {user?.user?.firstName}
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
                    src="https://cdn-icons-png.flaticon.com/512/10628/10628938.png "
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
              >
                <li>
                  <Link to='/profile' className="justify-between">
                    Profile
                    <span className="badge">New</span>
                  </Link>
                </li>
                <li>
                  <a>Settings</a>
                </li>
                <li>
                  <a>Logout</a>
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

//https://cdn-icons-png.flaticon.com/512/10628/10628938.png
