import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addRequest, removeRequest } from '../utils/requestSlice'
import { BASE_URL } from '../utils/constants'

const Requests = () => {
  const dispatch = useDispatch()
  const request = useSelector((store) => store.requests)

  const reviewRequest = async (status, _id) => {
    try {
      const res = await axios.post(
        BASE_URL + '/request/review/' + status + '/' + _id,
        {},
        { withCredentials: true }
      )
      dispatch(removeRequest(_id))
      console.log('Request Accepted!')
    } catch (err) {}
  }

  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + '/user/requests/received', {
        withCredentials: true,
      })
      // console.log(res.data.data)
      console.log('store updated')
      dispatch(addRequest(res.data.data))
    } catch (error) {}
  }
  useEffect(() => {
    fetchRequests()
  }, [])

  if (!request) return
  if (request.length === 0)
    return <h1 className="flex justify-center my-10">No Request Found</h1>
  return (
    <div className="flex justify-center">
      <div className="w-1/2 my-10">
        <h1 className="text-center text-3xl font-bold">Connection Requests</h1>
        {request.map((request) => {
          const { _id, firstName, lastName, age, gender, about, photoUrl } =
            request.fromUserId
          return (
            <div
              className="flex justify-between items-center bg-base-300 m-4 p-4 rounded-lg"
              key={_id}
            >
              <div>
                <img
                  src={photoUrl}
                  alt="photo"
                  className="avatar w-16 h-16 object-cover mx-auto mt-4 rounded-full"
                />
              </div>
              <div className="text-left mx-4">
                <h1 className="font-bold text-xl">{`${firstName} ${lastName}`}</h1>
                {age ||
                  (gender && (
                    <p className="font-semibold text-sm">
                      {age + ', ' + gender}
                    </p>
                  ))}
                <p className="text-sm">{about}</p>
              </div>
              <div className="flex ">
                <button
                  className="btn btn-soft btn-accent mx-2"
                  onClick={() => reviewRequest('accepted', request._id)}
                >
                  Accept
                </button>
                <button
                  className="btn btn-soft btn-secondary"
                  onClick={(e) => reviewRequest('rejected', request._id)}
                >
                  Reject
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Requests
