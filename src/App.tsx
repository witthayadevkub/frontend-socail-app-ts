import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
// import { fetchPosts } from './functions/Post'
import './App.css'

//components
import Layout from './layout/Layout'
import Login from './components/auth/Login'
import SignUp from './components/auth/SignUp';
import Profile from './components/profile/Profile'
// import { current } from '@reduxjs/toolkit'

import { useSelector } from 'react-redux';
import { userReducer } from './store/slices/userSlice'

function App() {
  // const dispatch = useAppDispatch()
  const user = useSelector(userReducer)



  return (
    <div className="bg-slate-200 h-svh ">
      <div className="bg-cover h-svh overflow-y-scroll  bg-[url('')]">
        <Router>
          <Routes>
            <Route path="*" element={user.user ? <Layout /> : <Navigate to="/login" />} />
            <Route path="/profile/:id" element={user.user ?<Profile/>: <Navigate to="/login"/>} />
            <Route path="/signup" element={user.user ? <Navigate to="/" /> : <SignUp />} />
            <Route path="/login" element={user.user ? <Navigate to="/" /> : <Login />} />
          </Routes>
        </Router>
      </div>

    </div>
  )
}

export default App
