import axios from 'axios';
import React, {useState, useEffect} from 'react'
import { Routes, Route } from "react-router-dom";
import { Login, Register, NotFound, AddProfile} from './components'
import { AuthContext } from './helpers/Context';
import Home from './containers/Home';

const App = () => {

  const [authUser, setAuthUser] = useState({
    googleId: 0,
    name: "",
    imageUrl: "",
    email: "",
    role: "",
    login_status: false
  })

  const [toggleUserInfo, setToggleUserInfo] = useState(false)

  useEffect(() => {
    axios.get("http://localhost:3001/auth/verify", {
      headers: {
        loginToken: localStorage.getItem("loginToken")
      }
    }).then(res => {
      setAuthUser(authUser => ({...authUser, 
        googleId: res.data.user.googleId,
        name: res.data.user.name,
        imageUrl: res.data.user.imageUrl,
        email: res.data.user.email,
        role: res.data.user.role,
        login_status: res.data.login_status 
      }))
    }).catch(err => console.log("verification_error", err))
  }, [])

  return (
    <AuthContext.Provider value = {{authUser, setAuthUser, toggleUserInfo, setToggleUserInfo }}>
       <Routes>
        <Route path="/login" element={<Login/>} exact/>
        <Route path="/register" element={<Register/>} exact/>
        <Route path='/createProfile' element={<AddProfile/>}/>
        <Route path="/*" element={<Home/>}/>
      </Routes>
    </AuthContext.Provider>
   
  )
}

export default App
