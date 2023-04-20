import React, { useContext } from 'react'
import { AuthContext } from '../helpers/Context'
import { BiLogOutCircle } from 'react-icons/bi'
import {Link} from "react-router-dom"

const UserInfoPopUp = () => {
  const {authUser, setAuthUser, setToggleUserInfo} = useContext(AuthContext)

 const logout = () => {
    localStorage.removeItem("loginToken")
    setAuthUser(authUser => ({...authUser, email:"", login_status: false}))
    setToggleUserInfo(false)
  }
  
  return (
    <div className='flex justify-end border-2 items-center flex-col p-10 bg-white shadow-2xl gap-y-3 rounded-xl'>
      <img src={authUser.imageUrl} alt="Profile" className='w-18 rounded-full' />
      <div className='font-bold'>
        {authUser.name}
      </div>
      <hr className='w-full' />
      
      <Link to={`/home`} className='px-5 py-1 my-1'>Home Page</Link>
      <Link to={`/category/profile`} className='border-2 border-gray-300 rounded-lg px-5 py-1 my-1'>View profile</Link>
    
      <button onClick={logout} className="flex items-center gap-2 justify-between">
        <BiLogOutCircle fontSize={20}/> 
        Logout
      </button>
    </div>
  )
}

export default UserInfoPopUp
