import React, { useContext, useEffect, useState } from 'react'
import * as Yup from 'yup'
import { Formik } from 'formik'
import axios from 'axios'
import { AuthContext } from '../../helpers/AuthContext.js'
import BasicInfoForm from './BasicInfoForm'
import Loading from '../Loading'
  
const BasicInfo = ({nextStep}) => {
  const {authUser} = useContext(AuthContext)
  const [loading, setLoading] = useState(false)
  const [initValues, setInitValues] = useState({
    fullName : authUser.name,
    gender: ""
  })


  useEffect(() => {
    setLoading(true)
    axios.get(`http://localhost:3001/basicInfo/${authUser.googleId}`, {
      headers: {
        loginToken: localStorage.getItem('loginToken')
      }
    }).then(res => {
      setLoading(false)
      if(!res.data.error)
      {
        setInitValues(res.data)
      }else{
        setInitValues(initValues)
      }
    })
    .catch(err => {
      setLoading(false)
      console.log(err.message)
    })
  }, [])
  



  const validationSchema = Yup.object().shape({
    fullName: Yup.string()
      .min(3, "Your name is too short!")
      .max(100, "Your name is too long!")
      .required("Please enter your name!")
      .matches(/^[a-zA-Z0-9' ]{3,}$/g, "Invalid name! Check your name carefully"),
    gender: Yup.string()
      .required("Select Gender")
      .min(3, "Too short")
      .max(7, "To long")
  })

  const onSubmit = (data) => {
    setLoading(true)
    axios.post("http://localhost:3001/basicInfo", data, {
      headers: {
        loginToken: localStorage.getItem("loginToken")
      }
    }).then(res => {
      setLoading(false)
      nextStep()
    }).catch(err => {
      setLoading(false)
      console.log(err)
    })
    
  }
  
  return (
    <div className='w-full'>
      <Formik
        initialValues={initValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
      
       <BasicInfoForm initValues={initValues}/>
        
      </Formik>

      {
        loading && <Loading />
      }
    </div>
  )
}

export default BasicInfo
