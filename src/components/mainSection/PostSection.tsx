
import React, { useState } from 'react'

import { Post } from '../../interface/interface'
//icons
import { MdFullscreen } from "react-icons/md";
import { MdFullscreenExit } from "react-icons/md";
import { CiMenuKebab } from "react-icons/ci";
import { IoMdShare } from "react-icons/io";
import { FaRegCommentAlt } from "react-icons/fa";
import { FaHeart } from "react-icons/fa6";
import { FaRegHeart } from "react-icons/fa";
import { CiSquareRemove } from "react-icons/ci";
import { IoTrashBin } from "react-icons/io5";

import { removePost } from '../../functions/Post';

//type
interface KeyState {
  [key: string]: boolean;
}
interface PostSectionProps {
  UserPost: Post[] | undefined;
  matchUser?: boolean;
  getUser?: () => Promise<void>;
}

const PostSection: React.FC<PostSectionProps> = ({ UserPost, getUser, matchUser }) => {

  const [removeCard, setRemoveCard] = useState<KeyState>({})
  const [loading, setLoading] = useState(false)

  const apiUrl = import.meta.env.VITE_API_URL;
  const [handleLike, setHandleLike] = useState<KeyState>({})
  const [imgMore, setImgMore] = useState<KeyState>({})

  const remove = async (id: string) => {
    try {
      setLoading(true)
      const status: boolean = await removePost(id)
      if (status) {
        setLoading(false)
        if (getUser) {
          await getUser()
        }
      } else {
        console.log("something went wrong")
        setLoading(false)
         if (getUser) {
          await getUser()
        }
      }
    } catch (error) {
      console.log(error)
    }


  }

  //like
  const handleLikeToggle = (postId: string) => {
    setHandleLike(prevState => ({
      ...prevState,
      [postId]: !prevState[postId]
    }));
  };
  // console.log(handleLike)

  //  {console.log(UserPost)}
  return (
    <div>
      {loading ? <div className='grid place-content-center h-svh text-blue-400'><span className="loading loading-spinner loading-lg"></span></div>
        : <div className="grid gap-5">
          {UserPost?.length === 0 ? <div className=" grid place-content-center h-screen text-3xl font-semibold"> post !!!</div> : <>
            {UserPost?.map(post => (
              <div key={post.id} className={` bg-white rounded-lg p-5 `}>

                {post?.author?.avatar && <div className="flex justify-between items-center">
                  <div className="flex items-center gap-5 font-semibold text-lg">
                    <img src={post?.author?.avatar} alt="" className="size-10" />
                    <p className="text-xl"> {post?.author?.name}</p>
                  </div>
                  <div className="text-xl"><CiMenuKebab /></div>
                </div>}

                {matchUser && <div>
                  {!removeCard[post.id] ? <div>
                    <IoTrashBin className="text-3xl text-red-500 flex justify-end" onClick={() => setRemoveCard({ [post?.id]: true })} />
                  </div> : <div>
                    <CiSquareRemove className="text-3xl text-red-500 shadow" onClick={() => setRemoveCard({ [post?.id]: false })} />
                    กดปุ่ม remove เพื่อลบ หรือ x เพื่อยกเลิก  <button onClick={() => remove(post?.id)} className="btn btn-error btn-sm text-white">remove</button>
                  </div>}
                </div>}



                <div className="">
                  <p className="text-sm p-1">เมื่อ เวลา: {new Date(post?.created).toLocaleTimeString()}  วัน: {new Date(post?.created).toLocaleDateString()}</p>
                  <p className="text-blue-400 text-lg border-b-2 py-5">{post?.title}</p>
                  <div className="flex justify-between items-center">
                    <p className="p-2 text-md">{post?.content}</p>

                    {post?.picture && <div className="text-3xl cursor-pointer">
                      {!imgMore[post.id] ? <MdFullscreenExit onClick={() => setImgMore({ [post?.id]: true })} /> : <MdFullscreen onClick={() => setImgMore({ [post?.id]: false })} />}
                    </div>}

                  </div>

                  <div className="">
                    {post?.picture && <img src={`${apiUrl}/img/post-images/${post?.picture}`} alt="" className={`${imgMore[post?.id] ? "h-full" : "h-[250px]"} rounded-lg  w-full object-cover`} />}
                  </div>

                  <div className="flex justify-between pt-5 text-xl">
                    <div className="flex justify-center items-center gap-5">
                      {handleLike[post.id] ? <FaHeart className='text-red-500' onClick={() => handleLikeToggle(post.id)} /> : <FaRegHeart onClick={() => handleLikeToggle(post.id)} />}
                      <FaRegCommentAlt />
                    </div>
                    <div>
                      <IoMdShare />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </>}


        </div>
      }

    </div>
  )
}

export default PostSection