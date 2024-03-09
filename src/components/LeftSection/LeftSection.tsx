import React from 'react'
import Profile from './Profile'

//images
import portfolio from '../../assets/portfolio.png'
import chat from '../../assets/chatapp.png'

import { FaExternalLinkAlt } from "react-icons/fa";
import RightSection from '../RightSection/RightSection';
import { IoMdArrowDropright } from "react-icons/io";
const LeftSection: React.FC = () => {

    return (
        <div className="md:sticky top-[90px]  w-full h-fit grid rounded-lg gap-5 overflow-auto ">

            <Profile />
            
            <div className="grid gap-2 p-2 bg-white rounded-lg ">

                <p className="font-semibold text-xl">Introduce</p>
                <a href="https://myportfolio-hhxk.onrender.com/" target='_blank'>
                    <div className=" p-3  rounded-lg hover:text-blue-400 border-b-2">
                        <div className="flex items-center justify-between pb-2">
                            <p className="font-semibold text-md flex items-center"><IoMdArrowDropright /> My Portfolio</p>
                            <FaExternalLinkAlt />
                        </div>

                        <img src={portfolio} alt="" className="rounded-md shadow hover:shadow-blue-400" />
                    </div>
                </a>

                <a href="https://app-chat-frontend-sn5q.onrender.com/" target='_blank'>
                    <div className=" p-3  rounded-lg hover:text-blue-400">
                        <div className="flex items-center justify-between pb-2">
                            <p className="font-semibold text-md flex items-center"><IoMdArrowDropright /> Wed-Chat</p>
                            <FaExternalLinkAlt />
                        </div>

                        <img src={chat} alt="" className="rounded-md shadow hover:shadow-blue-400 " />
                    </div>
                </a>
            </div>


            <div className="block lg:hidden ">
                <RightSection />
            </div>

        </div>
    )
}

export default LeftSection