import React, {useContext, useEffect, useState} from 'react'
import firstThingsVideo from "../assets/fistthings.mp4"
import {AiOutlineMore, AiOutlineSmile} from 'react-icons/ai'
import { BsTelephoneMinus } from "react-icons/bs";
import { AuthContext } from '../helpers/AuthContext'
import UserInfoPopUp from './UserInfoPopUp'
import { useNavigate } from 'react-router-dom'
import { BasicInfo, ContactInfo, WorkInfo, Attachments, Final } from "./forms";

const AddProfile = () => {
  const { authUser, toggleUserInfo, setToggleUserInfo } = useContext(AuthContext)
  const [steps, setSteps] = useState(1)
  const navigate = useNavigate()

  useEffect(() => {
    !authUser.login_status && navigate("/")
  }, [authUser])

  const nextStep = () => {
    setSteps(steps + 1)
  }

  const prevStep = () => {
    setSteps(steps - 1)
  }

  return (
    <div className='w-full h-screen relative flex justify-center items-center'>
      <video 
      src={firstThingsVideo}
      className = "w-full object-cover h-full"
      autoPlay
      loop
      muted
      controls= {false}
      />

      <div className='absolute w-full h-full top-0 bg-black gap-3 bg-opacity-50  overflow-y-auto bottom-0 left-0 right-0  flex flex-col justify-center items-center'>
         <div className='flex flex-col justify-center items-center gap-2 relative'>
            <AiOutlineMore
                fontSize={30}
                onClick = {() => toggleUserInfo ? setToggleUserInfo(false) : setToggleUserInfo(true)}
                color="white"
                className='cursor-pointer'
            />
            <h1 className='text-2xl md:text-3xl text-white font-bold animate-bounce-short'>First things first ! </h1>
             {
              {
                1: <p className='md:text-2xl text-xl animate-bounce  flex items-center justify-center text-white font-light'>Step 1/4: Let us know you <AiOutlineSmile size={19}/> </p>,
                2: <p className='md:text-2xl text-xl animate-bounce flex items-center justify-center  text-white font-light'>Step 2/4: Submit your Contact details <BsTelephoneMinus size={15}/> </p>,
                3: <p className='md:text-2xl text-xl animate-bounce  text-white font-light'>Step 3/4: Let us know your Income Source</p>,
                4: <p className='md:text-2xl text-xl animate-bounce  text-white font-light'>Step 4/4: Let's Grab your Identity</p>,
                5: <p className='md:text-2xl text-xl animate-bounce  text-white font-light'>Congratulations! Profile Created</p>
              }[steps] || <div>Nothing</div>
            }
            
            <div className='absolute top-10'>
                {
                    toggleUserInfo && <UserInfoPopUp />
                }
            </div>
         </div>
        
        <div className='bg-white text-white md:w-2/6 w-5/6 bg-opacity-40 p-6 rounded-lg shadow-2xl flex flex-col  overflow-y-auto'>
          {
            {
              1: <BasicInfo nextStep={nextStep} />,
              2: <ContactInfo nextStep={nextStep} prevStep={prevStep}/>,
              3: <WorkInfo nextStep={nextStep} prevStep={prevStep}/>,
              4: <Attachments prevStep={prevStep} nextStep={nextStep}/>,
              5: <Final/>
            }[steps] || <div>Nothing</div>
          }
        </div>
      </div>
    </div>
  )
}

export default AddProfile
