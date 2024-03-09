import React, { useEffect, useState } from 'react';
import Header from '../components/header/Header';
import LeftSection from '../components/LeftSection/LeftSection';
import RightSection from '../components/RightSection/RightSection';
import MainSection from '../components/mainSection/MainSection';
import { useAppDispatch } from '../store/store';
import { setValueAsync } from '../store/slices/userSlice';
import { User } from '../interface/interface';
import { currentUser } from '../functions/Auth';

const Layout: React.FC = () => {
  const [loading, setLoading] = useState(false)
  const dispatch = useAppDispatch()

  const fetchData = async () => {
    try {
      setLoading(true)
    const data: User = await currentUser()
    //save currentuser
    dispatch(setValueAsync(data))
    setLoading(false)

    } catch (error) {
      console.error(error)
    }
    
  }

  useEffect(() => {
    fetchData();
  }, [])

  return (

    <div className="max-w-7xl mx-auto w-svw  ">

      <div className="sticky top-0  z-50 h-[70px]">
        <Header />
      </div>
      {loading ? <div className="grid place-content-center h-screen">
        <span className="loading loading-dots loading-lg text-blue-400"></span>
      </div> : <div className="text-gray-500 pt-5 grid md:grid-cols-[1fr_2fr] lg:grid-cols-[1fr_2fr_1fr]  gap-5">

        <LeftSection />

        <MainSection />

        <div className=" hidden lg:block">
          <RightSection />
        </div>

      </div>}


    </div>


  )
}

export default Layout;
