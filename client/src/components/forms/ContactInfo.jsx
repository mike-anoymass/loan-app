import React, { useContext, useEffect, useState } from 'react'
import * as Yup from 'yup'
import { Formik } from 'formik'
import axios from 'axios'
import { AuthContext } from '../../helpers/AuthContext.js'
import ContactInfoForm from './ContactInfoForm'
import Loading from '../Loading'
  
const ContactInfo = ({nextStep, prevStep}) => {
  const {authUser} = useContext(AuthContext)
  const [loading, setLoading] = useState(false)
  const [initValues, setInitValues] = useState({
    mobile : "",
    telephone: "",
    address: "",
    email: authUser.email
  })


  useEffect(() => {
    setLoading(true)
    axios.get(`http://localhost:3001/contactInfo/${authUser.googleId}`, {
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
    mobile: Yup.string()
      .min(9, "Your mobile number is too short!")
      .max(14, "Your mobile number is too long!")
      .required("Please enter your mobile phone number!")
      .matches(/^[0-9+ ]{9,14}$/g, "Invalid mobile number! Check your number carefully"),
    telephone: Yup.string()
      .min(7, "Your telephone number is too short!")
      .max(14, "Your telephone number is too long!")
      .matches(/^[0-9+ ]{7,14}$/g, "Invalid telephone number! Check your number carefully"),
    address: Yup.string()
      .min(3, "Your home address is too short!")
      .required("Please enter your home address"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Please enter your contact email address")
  })

  const onSubmit = (data) => {
    setLoading(true)
    axios.post("http://localhost:3001/contactInfo", data, {
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
      
       <ContactInfoForm initValues={initValues} prevStep={prevStep}/>
        
      </Formik>

      {
        loading && <Loading />
      }
    </div>
  )
}

export default ContactInfo
