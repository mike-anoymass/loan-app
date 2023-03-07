import React, { useEffect, useContext } from 'react'
import loanVideo from "../assets/loanVideo.mp4"
import logo from "../assets/logoweb.webp"
import { FcGoogle } from "react-icons/fc";
import { GoogleLogin } from 'react-google-login';
import { gapi } from 'gapi-script';
import axios from "axios";
import swal from "sweetalert"
import { useNavigate } from "react-router-dom";
import { AuthContext } from '../helpers/Context';

const Register = () => {
  const clientId = process.env.REACT_APP_GOOGLE_API_TOKEN
  const navigate = useNavigate()
  const { authUser } = useContext(AuthContext)

  useEffect(() => {
    if(authUser.googleId !== 0){
      authUser.login_status && navigate("/")
    }
  }, [authUser])

  const onSuccess = (res) => {
    const data = res.profileObj;
    axios.post("http://localhost:3001/auth", data)
      .then(res => {
        if(res.data.error){
          swal({
            title: res.data.error,
            text: "You are being redirected to the login page",
            icon: "warning",
            button: false,
            timer: 3000
          }).then(() => {
            navigate("/login")
          })
        }else{
          swal({
            title: res.data,
            text: "You are being redirected to the login page",
            icon: "success",
            button: false,
            timer: 3000
          }).then(() => {
            navigate("/login")
          })
        }
       
      })
      .catch(err => {
        console.log("failed", err)
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
      <div className="absolute top-5 left-0 right-0 flex flex-col justify-center items-center bg-blackOverlay">
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
                  <FcGoogle className='mr-4'/> Register with Google
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

export default Register
