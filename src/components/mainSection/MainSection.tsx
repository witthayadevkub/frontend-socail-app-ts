import React, { useState, useEffect } from 'react'
import PostSection from './PostSection'
// import { userAndPost } from '../../functions/Post'
// import { User } from '../../interface/interface'
import { IoMdImage } from "react-icons/io";
import { userReducer } from '../../store/slices/userSlice';
import { useSelector } from 'react-redux';
import { AddPost, Post } from '../../interface/interface';
import { addPost, userAndPost } from '../../functions/Post';

const MainSection: React.FC = () => {
    const auth = useSelector(userReducer)
    const [showAddImg, setShowAddImg] = useState(false)
    const [loading, setLoading] = useState(false)

    const [UserPost, setUserPost] = useState<Post[]>([])


    const allUsersAndPost = async () => {
        const post = await userAndPost()
        setUserPost(post)
    }
    useEffect(() => {
        if (auth.user) {
            allUsersAndPost()
        }
    }, [])

    // console.log(auth)
    // console.log(UserPost)

    const [form, setForm] = useState<AddPost>({
        authorId: '',
        title: '',
        content: '',
        picture: ''

    })

    const handleForm = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, files }: { name: string, value: string, files: any | File | null } = event.target
        if (name === "picture") {
            setForm(inputs => ({ ...inputs, [name]: files[0] }))
        } else {
            setForm(inputs => ({ ...inputs, [name]: value }))
        }

    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        try {
            if (form.title !== "" || form.authorId !== "") {
                setLoading(true)
                const newPost: AddPost = {
                    title: form.title,
                    authorId: await auth.user.id,
                    picture: form.picture,
                    content: form.content
                }

                await addPost(newPost)
                setForm({
                    authorId: '',
                    title: '',
                    content: '',
                    picture: ''

                })
                setTimeout(() => {
                    setLoading(false)
                    allUsersAndPost()
                }, 2000)

                setShowAddImg(false)
                return console.log('successfully added new post')
                //   window.location.reload();
            }
            return console.log("something went wrong from need require")
        } catch (err) {
            console.error(err);
        }
    };
    return (
        <div className=" w-full grid grid-rows-[auto_1fr] gap-5  ">

            <div className=" bg-white rounded-lg p-5">
                {loading
                    ? <div className='grid place-content-center h-full text-blue-400'><span className="loading loading-dots loading-lg"></span></div>
                    : <div className="">
                        <form onSubmit={handleSubmit} className='grid gap-2'>
                            <label className="input input-bordered flex items-center gap-2">
                                <input type="text" className="grow" placeholder="Title..." name='title' onChange={handleForm} value={form.title} />
                            </label>

                            {showAddImg && <label htmlFor='file-upload' className="border-dashed border-2 border-sky-500 w-full p-5 rounded-lg">
                                {form.picture ? form.picture.name : <p>Choose File</p>}
                                {/* <p>Choose File</p> */}
                                <input type="file" name='picture' id='file-upload' onChange={handleForm} className='hidden' />
                            </label>}


                            <div className="flex justify-between items-center">
                                <div onClick={() => setShowAddImg(!showAddImg)} className=" cursor-pointer h-full">
                                    <IoMdImage className="h-full size-10 text-blue-400"/>
                                </div>
                                <button type='submit' className="btn btn-outline btn-accent">Post</button>
                            </div>
                        </form>
                    </div>}



            </div>


            <div className="">
                {/* <PostSection/> */}
                <PostSection UserPost={UserPost} />
            </div>
        </div>
    )
}

export default MainSection