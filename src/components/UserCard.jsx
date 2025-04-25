import { BASE_URL } from '../utils/constants'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { removeFeed } from '../utils/feedSlice'
const UserCard = ({ user }) => {
  const {
    _id,
    firstName,
    lastName,
    photoUrl,
    age,
    gender,
    about,
    showButtons = true,
  } = user
  console.log(user)
  const dispatch = useDispatch()

  const handleSendRequest = async (status, userId) => {
    try {
      const res = await axios.post(
        BASE_URL + '/request/send/' + status + '/' + userId,
        {},
        { withCredentials: true }
      )
      toast.success(res?.data?.message)
      dispatch(removeFeed(userId))
    } catch (error) {}
  }
  return (
    <>
      <div className="card bg-neutral w-80 shadow-xl">
        <figure>
          <img
            src={photoUrl}
            alt={firstName + lastName}
            className="w-72 h-72 object-cover mx-auto mt-4 rounded-lg"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{`${firstName} ${lastName}`}</h2>
          <p className="">{`${age}, ${gender}`}</p>
          <p>{about}</p>
          {showButtons && (
            <div className="card-actions justify-center my-2">
              <button
                className="btn btn-primary"
                onClick={() => {
                  handleSendRequest('ignored', _id)
                }}
              >
                Ignore
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => {
                  handleSendRequest('interested', _id)
                }}
              >
                Interested
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default UserCard
