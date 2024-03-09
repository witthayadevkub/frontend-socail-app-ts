import React, { } from 'react'
import { useSelector } from 'react-redux';
import { logOut } from '../../functions/Auth';
import { useNavigate } from 'react-router-dom';
import { userReducer } from '../../store/slices/userSlice';
const Header: React.FC = () => {
  const user = useSelector(userReducer)

  const navigate = useNavigate();

  const removetoken = async () => {
    await logOut()
    navigate('/')
    window.location.reload();
  }
  // console.log(user.user)
  return (
    <div className="flex justify-between items-center h-full px-3 bg-white rounded-b-sm">
      <div className="flex items-center gap-3 ">
        <h1 className="text-4xl text-blue-400 font-bold">Socail</h1>
        <div className='hidden md:block'>
          <label className="input input-bordered input-sm  flex items-center gap-2">
            <input type="text" className="grow outline-none" placeholder="Search...." />
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clipRule="evenodd" /></svg>
          </label>
        </div>

      </div>

      <div className="flex gap-5 justify-center items-center">
        <p className="">User: {user.user.name}</p>
        <button onClick={removetoken} className="btn btn-outline btn-accent">LogOut</button>

      </div>
    </div>
  )
}

export default Header