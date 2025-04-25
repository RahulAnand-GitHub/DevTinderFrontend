import { useEffect, useState } from 'react'
import UserCard from './UserCard'
import { useDispatch } from 'react-redux'
import { addUser } from '../utils/userSlice'
import toast, { Toaster } from 'react-hot-toast'
import axios from 'axios'
import { BASE_URL } from '../utils/constants'

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName)
  const [lastName, setlastName] = useState(user.lastName)
  const [photoUrl, setPhotoUrl] = useState(
    user.photoUrl || 'https://geographyandyou.com/images/user-profile.png'
  )
  const [age, setAge] = useState(user.age || '')
  const [gender, setGender] = useState(user.gender)
  const [about, setAbout] = useState(user.about)
  const [error, setError] = useState('')

  const dispatch = useDispatch()
  const saveProfile = async () => {
    try {
      const res = await axios.patch(
        BASE_URL + '/profile/edit',
        {
          firstName,
          lastName,
          photoUrl,
          age,
          gender,
          about,
        },
        { withCredentials: true }
      )
      dispatch(addUser(res?.data?.data))
      toast.success(res?.data)
    } catch (e) {}
  }

  return (
    user && (
      <>
        <Toaster />
        <div className="flex justify-center my-10">
          <div className="flex items-center mx-10 flex-col">
            <div className="card bg-base-300 text-neutral-content w-96">
              <div className="card-body">
                <label htmlFor="firstName">First Name</label>
                <input
                  type="text"
                  value={firstName}
                  className="input input-primary input-sm"
                  onChange={(e) => setFirstName(e.target.value)}
                />
                <label htmlFor="lastName">Last Name</label>
                <input
                  type="text"
                  value={lastName}
                  className="input input-primary input-sm"
                  onChange={(e) => setlastName(e.target.value)}
                />
                <label htmlFor="photoUrl">Profile Picture(URL)</label>
                <input
                  type="text"
                  value={photoUrl}
                  className="input input-primary input-sm"
                  onChange={(e) => setPhotoUrl(e.target.value)}
                />
                <label htmlFor="age">Age</label>
                <input
                  type="text"
                  value={age}
                  className="input input-primary input-sm"
                  onChange={(e) => setAge(Number(e.target.value))}
                />
                <label htmlFor="gender">Gender</label>
                <select
                  defaultValue="Pick a text editor"
                  className="select select-primary"
                  onChange={(e) => setGender(e.target.value)}
                >
                  <option disabled={true}>Select</option>
                  <option>M</option>
                  <option>F</option>
                </select>
                <label htmlFor="about">About</label>
                <textarea
                  type="text"
                  value={about}
                  className="textarea textarea-primary textarea-md"
                  onChange={(e) => setAbout(e.target.value)}
                />
              </div>
              <div className="card-actions justify-end m-2">
                <button className="btn btn-primary" onClick={saveProfile}>
                  Save Profile
                </button>
              </div>
            </div>
          </div>
          <UserCard
            user={{
              firstName,
              lastName,
              age,
              gender,
              about,
              photoUrl,
              showButtons: false,
            }}
          />
        </div>
      </>
    )
  )
}

export default EditProfile
