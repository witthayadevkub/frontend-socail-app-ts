import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { userById } from '../../functions/Auth';
import { User } from '../../interface/interface';
import PostSection from '../mainSection/PostSection';
import { userReducer } from '../../store/slices/userSlice';
import { useSelector } from 'react-redux';
import { AiFillHome } from "react-icons/ai";
import { Link } from 'react-router-dom';

const Profile: React.FC = () => {
    const current = useSelector(userReducer)
    const { id } = useParams();
    const [loading, setloading] = useState(false)
    const [user, setUser] = useState<User | null>(null)


    const getUser = async () => {
        try {
            setloading(true)
            const post = await userById(id)
            setUser(post)
            setloading(false)
        } catch (error) {
            console.error(error)
        }

    }

    useEffect(() => {
        getUser()
    }, [])

    // console.log(user)
    const activeMenuItem: string = 'your-post';
    const matchUser: boolean = user?.id === current.user.id
    return (
        <div className="max-w-7xl mx-auto w-svw  ">
            {loading ? <div className='grid place-content-center h-screen text-blue-400'><span className="loading loading-dots loading-lg"></span></div> : <div className='grid grid-cols-[1fr_2fr] gap-5  '>
                <div className="sticky top-0 bg-white h-svh p-5">
                    <Link to="/"><button className="btn btn-outline btn-accent "><AiFillHome className="text-2xl" />Home</button></Link>

                    <div className="grid place-content-center mt-20">
                        <img src={user?.avatar ? user?.avatar : ''} alt="" className="size-40" />
                        <p className="font-semibold text-3xl text-center">{user?.name}</p>
                    </div>


                </div>
                <div className="p-5">
                    {matchUser && <div className="flex justify-around bg-white mb-5 p-2 rounded-lg font-semibold">
                        <div id='your-post' className={` cursor-pointer ${activeMenuItem == 'your-post' ? 'border-b-2 border-blue-500' : ''}`}>YourPosts</div>
                        <div id='your-friend' className={` cursor-no-drop ${activeMenuItem == 'your-friend' ? 'border-b-2 border-blue-500 cursor-no-drop' : ''}`}>YourFriends</div>
                        <div id='your-likePost' className={` cursor-no-drop ${activeMenuItem == 'your-likePost' ? 'border-b-2 border-blue-500 ' : ''}`}>YourLikePost</div>
                    </div>}

                    <PostSection UserPost={user?.posts} getUser={getUser} matchUser={matchUser} />
                </div>
            </div>}

        </div>

    )
}

export default Profile