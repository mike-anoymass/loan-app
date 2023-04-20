import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../helpers/Context'
import { AiOutlineEdit, AiOutlinePhone, AiOutlineMail } from 'react-icons/ai'
import { AttachmentInfoEditModal, BasicInfoEditModal, ContactInfoEditModal, WorkInfoEditModal } from "./modals/user"


const UserProfile = () => {
   const [userInfo, setUserInfo] = useState({})
   const [loading, setLoading] = useState(false)
   const navigate = useNavigate()
   const {authUser} = useContext(AuthContext)

   const [isBasicOpen, setIsBasicOpen] = useState(false)
   const [isAttachmentOpen, setIsAttachmentOpen] = useState(false)
   const [isContactOpen, setIsContactOpen] = useState(false)
   const [isWorkOpen, setIsWorkOpen] = useState(false)

   useEffect(() => {
    setLoading(true)
    axios.get("http://localhost:3001/basicInfo/checkProfile/profile", {
      headers: {
        loginToken: localStorage.getItem("loginToken")
      }
    }).then(res => {
      setLoading(false)
      if(!res.data){
        navigate("/createProfile")
      }else{
        console.log(res.data)
        setUserInfo(res.data)
      }
    }).catch(err => console.log("verification_error", err))
  }, [])

  const openBasicModal = () => {
    setIsBasicOpen(true)
  }

  const closeBasicModal = () => {
    setIsBasicOpen(false)
  }

  const openContactModal = () => {
    setIsContactOpen(true)
  }

  const closeContactModal = () => {
    setIsContactOpen(false)
  }

  const openAttachmentModal = () => {
    setIsAttachmentOpen(true)
  }

  const closeAttachmentModal = () => {
    setIsAttachmentOpen(false)
  }

  const openWorkModal = () => {
    setIsWorkOpen(true)
  }

  const closeWorkModal = () => {
    setIsWorkOpen(false)
  }

  return (
    <div className=''>
      {
        loading ? <p className='w-full text-center text-lg text-blue-600'>Loading ...</p> : 
          <div className='w-full flex flex-col items-center justify-center p-2'>
          <h1 className='text-2xl font-light animate-bounce pb-2'>Profile Information</h1>
          <hr className='w-full'/>

          <div className='p-1'>
            {
              userInfo.basicInfo && (
                <div className='flex flex-row p-2 shadow-sm gap-x-2 justify-center items-baseline'>
                  <BasicInfoEditModal 
                    isOpen={isBasicOpen} 
                    onClose={closeBasicModal} 
                    data={userInfo} 
                    setData={setUserInfo}
                  />
                  <AttachmentInfoEditModal 
                    isOpen={isAttachmentOpen} 
                    onClose={closeAttachmentModal} 
                    data={userInfo} 
                    setData={setUserInfo}
                  />
                  <ContactInfoEditModal 
                    isOpen={isContactOpen} 
                    onClose={closeContactModal} 
                    data={userInfo} 
                    setData={setUserInfo}
                  />
                  <WorkInfoEditModal 
                    isOpen={isWorkOpen} 
                    onClose={closeWorkModal} 
                    data={userInfo} 
                    setData={setUserInfo}
                  />
                  <img src={authUser.imageUrl} alt="Profile IMG" className='w-40 rounded-full m-2' />
                  <div>
                    <p className='font-bold text-2xl'>{userInfo.basicInfo.fullName}</p>
                    <p className='text-lg italic'>{userInfo.basicInfo.gender}</p>
                  </div>
                  <AiOutlineEdit 
                    fontSize={18} 
                    className='text-gray-600 cursor-pointer' 
                    title='Edit'
                    onClick={openBasicModal}
                  />
                </div>
            )
          }
          </div>

          <div className='w-full p-3 mt-2 flex md:flex-row flex-col flex-wrap md:justify-evenly'>
            <div class="bg-white shadow-lg rounded-md p-4 mt-2 gap-y-3 flex flex-col">
              <div className='flex justify-between p-1'>
                <h2 class="text-md font-semibold">Contact Information</h2>
                <button title='Edit' onClick={openContactModal}><AiOutlineEdit /></button>
              </div>
              
              <hr className='border-1'/>

              {
                userInfo.contactInfo ? (
                  <div className='gap-y-3 flex flex-col'>
                    <div className='flex justify-between items-center'>
                      <p class="mt-2 flex justify-center items-center gap-x-1"><AiOutlineMail />Email Address: </p> 
                      <p>_______</p>
                      <p class="mt-2">{ userInfo.contactInfo.email }</p>
                    </div>
                  
                    <div className='flex justify-between items-center'>
                      <p class="mt-2 flex justify-center items-center gap-x-1"><AiOutlinePhone />Mobile: </p> 
                      <p class="mt-2">{  userInfo.contactInfo.mobile }</p>
                    </div>

                    <div className='flex justify-between items-center'>
                      
                      <p class="mt-2  flex justify-center items-center gap-x-1"><AiOutlinePhone />Telephone: </p> 
                      <p class="mt-2">{  userInfo.contactInfo.telephone }</p>
                    </div>

                    <div className='flex flex-col flex-wrap'>
                      <p class="mt-2 font-semibold">Physical Address </p> 
                      <p class="mt-2">"{  userInfo.contactInfo.address }"</p>
                    </div>
                  </div>
                ) : <p>Contact Information Not Available</p>

              }

              
            </div>

            <div class="bg-white shadow-lg rounded-md p-4 mt-2 gap-y-3 flex flex-col">
              <div className='flex justify-between p-1'>
                <h2 class="text-md font-semibold">Employment Details</h2>
                <button title='Edit' onClick={openWorkModal}><AiOutlineEdit /></button>
              </div>
              
              <hr className='border-1'/>

              {
                userInfo.workInfo ? (
                  <div className='gap-y-3 flex flex-col'>
                    <div className='flex justify-between items-center'>
                      <p class="mt-2">Income Source: </p> 
                      <p>_______</p>
                      <p class="mt-2">{ userInfo.workInfo.incomeSource }</p>
                    </div>
                  
                    <div className='flex justify-between items-center'>
                      <p class="mt-2">Position: </p> 
                      <p class="mt-2">{  userInfo.workInfo.description }</p>
                    </div>

                    <div className='flex flex-col flex-wrap'>
                      <p class="mt-2 font-semibold">Work Place </p> 
                      <p class="mt-2">"{  userInfo.workInfo.workplace }"</p>
                    </div>
                  </div>
                ) : <p>Employment Information Not Available</p>

              }

              
            </div>

            <div class="bg-white shadow-lg rounded-md p-4 mt-2 gap-y-3 flex flex-col">
              <div className='flex justify-between p-1'>
                <h2 class="text-md font-semibold">Attachment Details</h2>
                <button title='Edit' onClick={openAttachmentModal}><AiOutlineEdit /></button>
              </div>
              
              <hr className='border-1'/>

              {
                userInfo.attachmentInfo ? (
                  <div className='gap-y-3 flex flex-col'>
                    <div className='flex justify-between items-center'>
                      <p class="mt-2">Attachment Name: </p> 
                      <p>_______</p>
                      <p class="mt-2">{ userInfo.attachmentInfo.fileName }</p>
                    </div>
                  
                    <div className='flex flex-col flex-wrap'>
                      <p class="mt-2">Attachment </p> 
                      <img 
                        src={`http://localhost:3001/attachmentInfo/images/${userInfo.attachmentInfo.location}`}
                        alt="Attachment File" 
                        className='w-60 mt-2 rounded-2xl'
                      />
                    </div>
                  </div>
                ) : <p>Attachment Information Not Available</p>

              }
            </div>
          </div>
      
        </div>
      }
    </div>
  )
}

export default UserProfile
