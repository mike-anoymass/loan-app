import React, { useEffect, useContext } from 'react'
import loanVideo from "../assets/loanVideo.mp4"
import logo from "../assets/logoweb.webp"
import { FcGoogle } from "react-icons/fc";
import { GoogleLogin } from 'react-google-login';
import { gapi } from 'gapi-script';
import axios from 'axios';
import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../helpers/Context';

const Login = () => {
  const clientId = process.env.REACT_APP_GOOGLE_API_TOKEN
  const navigate = useNavigate()
  const { authUser, setAuthUser } = useContext(AuthContext)

  useEffect(() => {
    if(authUser.googleId !== 0){
      authUser.login_status && navigate("/")
    }
  }, [authUser])

  const onSuccess = (res) => {
    const data = res.profileObj
    axios.get(`http://localhost:3001/auth/login/${data.googleId}`)
      .then(res => {
        if(res.data.error){
          swal({
            title: res.data.error,
            text: "You are being redirected to the registration page",
            icon: "warning",
            button: false,
            timer: 3000
          }).then(() => {
            navigate("/register")
          })
        }else{
          localStorage.setItem("loginToken", res.data)
          
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
            navigate("/")  
          }).catch(err => console.log("verification_error", err))
           
        }
      })
    
  };

  const onFailure = (err) => {
      console.log('failed:', err);
  };

  useEffect(() => {
    const initClient = () => {
          gapi.client.init({
          clientId: clientId,
          scope: ''
        });
     };
     gapi.load('client:auth2', initClient);
 }, []);

    return (
      <div className="flex flex-start items-center flex-col h-screen">
        <div className='relative h-full w-full'>
          <video
              src={loanVideo}
              type="video/mp4"
              className='h-full object-cover w-full '
              autoPlay={true}
              loop
              controls={false}
              muted
          />
        </div>
        <div className="absolute left-0 right-0 flex flex-col py-4 items-center bg-black bg-opacity-40 w-full h-full">
        <div className="shadow-2xl">
              <GoogleLogin 
                clientId={clientId}
                render={(props) => (
                  <button
                    type='button'
                    className='bg-white flex justify-center items-center p-2 rounded-lg shadow-lg cursor-pointer outline-none'
                    onClick={props.onClick}
                    disabled={props.disabled}
                  >
                    <FcGoogle className='mr-4'/> Login with Google
                  </button>
                )}
                onSuccess={onSuccess}
                onFailure={onFailure}
                cookiePolicy={'single_host_origin'}
              />
            </div>
          <div className="p-5">
            <img src={logo} alt="logo" width={200}/>
          </div>
         
        </div>
  
      </div>
    )

 
}

export default Login
