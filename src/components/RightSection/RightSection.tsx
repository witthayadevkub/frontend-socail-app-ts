import React, { useEffect, useState } from 'react'
import { allUser } from '../../functions/Auth'
import { User } from '../../interface/interface'
import { Link } from 'react-router-dom';
import { IoPersonAdd } from "react-icons/io5";
import { FaAngleDown } from "react-icons/fa6";
import { userReducer } from '../../store/slices/userSlice';
import { useSelector } from 'react-redux';

const RightSection: React.FC = () => {
    const auth = useSelector(userReducer)
    const [show, setShow] = useState(true);
    const [user, setUser] = useState<User[]>([])

    const allUsers = async () => {
        try {
            const user = await allUser()
            setUser(user)
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        if (auth.user) {
            allUsers()
        }
    }, [])

    return (
        <div className="sticky top-[90px]  w-full h-fit hover:overflow-y-auto">
            <div className="bg-white rounded-lg p-5 ">
                <div className="border-b-2 flex items-center gap-5 justify-between" onClick={() => setShow(!show)}>Other User <FaAngleDown /></div>
                {show && <div className="grid gap-5 pt-5">
                    {user?.map(user => (
                        <div key={user.id} className="flex items-center  justify-between">
                            <Link to={`/Profile/${user.id}`}>
                                <div className="flex items-center gap-5 text-xl font-semibold">
                                    <img src={user.avatar} alt="avatar" className='size-16' />
                                    <p className="">{user.name}</p>
                                </div>
                            </Link>
                            <div className="text-xl"><IoPersonAdd className="text-gray-300 cursor-no-drop" /></div>
                        </div>
                    ))}
                </div>}
            </div>
        </div>

    )
}

export default RightSection