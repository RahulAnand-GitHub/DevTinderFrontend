const UserCard = ({ user }) => {
  const {firstName, lastName, photoUrl, age, about} = user
  return (
    <>
      <div className="card bg-neutral w-96 shadow-xl">
        <figure>
          <img src={photoUrl} alt={firstName + lastName} />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{`${firstName} ${lastName}`}</h2>
          <p>{about}</p>
          <div className="card-actions justify-center my-2">
            <button className="btn btn-primary">Ignore</button>
            <button className="btn btn-secondary">Interested</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default UserCard
