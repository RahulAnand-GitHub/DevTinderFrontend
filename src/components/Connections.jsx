import { useEffect } from 'react'
import { BASE_URL } from '../utils/constants'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { addConnection } from '../utils/connectionSlice'
import UserCard from './UserCard'

const Connections = () => {
  const dispatch = useDispatch()
  const connection = useSelector((store) => store.connection)

  const fetchConnection = async () => {
    try {
      const res = await axios.get(BASE_URL + '/user/connections', {
        withCredentials: true,
      })

      console.log(res.data.data)
      dispatch(addConnection(res.data.data))
    } catch (e) {
      console.log(e)
    }
  }
  useEffect(() => {
    fetchConnection()
  }, [])

  if (!connection) return
  if (connection.length === 0)
    return <h1 className="flex justify-center my-10">No Connection Found</h1>
  return (
    <div className="flex justify-center">
      <div className="w-2/5 my-10">
        <h1 className="text-center text-3xl font-bold">Connections</h1>
        {connection.map((connection) => {
          const { _id, firstName, lastName, age, gender, about, photoUrl } =
            connection
          return (
            <div
              className="flex flex-row items-center bg-base-300 m-4 p-4 rounded-lg"
              key={_id}
            >
              <div className="w-20">
                <img
                  src={photoUrl}
                  alt="photo"
                  className="w-16 h-16 object-cover rounded-full"
                />
              </div>
              <div className="text-left mx-4">
                <h1 className="font-bold text-xl">{`${firstName} ${lastName}`}</h1>
                {age && gender && (
                  <p className="font-semibold text-sm">{age + ', ' + gender}</p>
                )}
                <p className="text-sm text-start">{about}</p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Connections
