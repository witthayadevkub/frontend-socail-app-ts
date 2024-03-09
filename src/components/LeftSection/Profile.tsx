import React from 'react'
import { userReducer } from '../../store/slices/userSlice'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { RiUserSettingsLine } from "react-icons/ri";


const Profile: React.FC = () => {
  const currentUser = useSelector(userReducer)
  const user = currentUser.user

  return (
    <div>

      <Link to={`/Profile/${user.id}`}>
        <div className="bg-white p-5 rounded-lg flex justify-between items-center">
          <div className="flex items-center  gap-5">
            <img src={user.avatar} alt="" className="size-20" />
            <p className="font-semibold text-2xl">{user.name}</p>
          </div>
          <div>
            <RiUserSettingsLine className="text-2xl" />
          </div>
        </div>
      </Link>

    </div>
  )
}

export default Profile