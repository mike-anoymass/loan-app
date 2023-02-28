import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'


const UserProfile = () => {
   const [userInfo, setUserInfo] = useState({})
   const navigate = useNavigate()

   useEffect(() => {
    axios.get("http://localhost:3001/basicInfo/checkProfile/profile", {
      headers: {
        loginToken: localStorage.getItem("loginToken")
      }
    }).then(res => {
      if(!res.data){
        navigate("/createProfile")
      }else{
        setUserInfo(res.data)
      }
    }).catch(err => console.log("verification_error", err))
  }, [])

  return (
    <div>
      {
        userInfo.basicInfo && (
            <div>
                {userInfo.basicInfo.fullName}
                {userInfo.contactInfo.telephone}
            </div>
        )
      }
    </div>
  )
}

export default UserProfile
