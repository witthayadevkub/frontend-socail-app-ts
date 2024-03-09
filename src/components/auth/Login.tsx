import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import { logIn } from '../../functions/Auth';
// import { login, logout } from '../functions/auth';
// import { useAuthContext } from '../main';


const Login = () => {
    // const { authUser, setAuthUser } = useAuthContext()
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false)
    const [form, setForm] = useState({
        email: "",
        password: "",
    })

    const handleForm = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target
        setForm(inputs => ({ ...inputs, [name]: value }))
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        try {
            if (form.email !== "" || form.password !== "") {
                setLoading(true)
                const user = await logIn(form)
                if (user) {
                    setLoading(false)
                    navigate('/')
                    window.location.reload()
                }
            }

            setLoading(false)

        } catch (err) {
            console.log(err);
        }
    };

    const handleGuest = async () => {
        try {
            setLoading(true)
            // setTimeout(() => {
            //     setLoading(false)
            // }, 3000);
            const guestUser = { email: "user@test.com", password: "000000" }
            if (guestUser) {
                setLoading(true)
                const user = await logIn(guestUser)
                if (user) {
                    setTimeout(() => {
                        setLoading(false)
                        navigate('/')
                        window.location.reload()
                    }, 1500);
                }
            }
        } catch (err) {
            console.log(err);
        }
    }



    return (
        <div className="  h-svh  flex justify-center items-center">
            <div className="bg-white shadow p-4 rounded-lg ">
                <form onSubmit={handleSubmit} className='relative max-w-[500px]   flex flex-col gap-2  '>
                    <div className="">
                        <h2 className='text-xl font-bold text-center'>LogIn</h2>
                        {loading && <span className="loading loading-dots loading-lg"></span>}
                    </div>

                    <label className="input input-bordered flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" /><path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" /></svg>
                        <input type="text" className="grow" placeholder="Email" name="email" onChange={handleForm} value={form.email} />
                    </label>

                    <label className="input input-bordered flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" /></svg>

                        <input type="password" className="grow" placeholder="Password" maxLength={6} name='password' onChange={handleForm} value={form.password} />
                        <p className="text-gray-500 font-semibold">{form.password.length}/6</p>
                    </label>

                    <Link to='/signup' className="underline hover:btn-link text-sm">Go Signup</Link>
                    <div className="flex gap-1">
                        <button type='submit' className="flex-1 btn btn-outline btn-accent">Login</button>
                        {/* <button onClick={handleGuest} className=" btn btn-outline btn-accent ">Guest</button> */}
                    </div>

                </form>
                <button onClick={handleGuest} className=" btn btn-outline btn-accent w-full mt-2">Guest</button>
            </div>

        </div>

    )
}

export default Login