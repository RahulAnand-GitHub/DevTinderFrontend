import toast, { Toaster } from 'react-hot-toast'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addFeed } from '../utils/feedSlice'
import { useEffect } from 'react'
import axios from 'axios'
import UserCard from './UserCard'

const Feed = () => {
  const dispatch = useDispatch()
  const feed = useSelector((store) => store.feed)

  const getFeed = async () => {
    if (feed) return
    try {
      const res = await axios.get(BASE_URL + '/feed', { withCredentials: true })
      dispatch(addFeed(res?.data))
    } catch (err) {}
  }
  useEffect(() => {
    getFeed()
  }, [])
  if (!feed) return

  if (feed.length <= 0)
    return <h1 className="flex justify-center my-10">No new users found!</h1>

  return (
    feed && (
      <div className="flex justify-center items-center my-10 ">
        <Toaster />
        <UserCard user={feed[0]} />
      </div>
    )
  )
}
export default Feed
