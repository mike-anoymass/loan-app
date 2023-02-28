import React, { useContext, useEffect, useState } from 'react'
import * as Yup from 'yup'
import { Formik } from 'formik'
import axios from 'axios'
import { AuthContext } from '../../helpers/AuthContext.js'
import AttachmentsForm from './AttachmentsForm'
import Loading from '../Loading'
  
const Attachments = ({nextStep, prevStep}) => {
  const {authUser} = useContext(AuthContext)
  const [loading, setLoading] = useState(false)
  const [image, setImage] = useState(null)
  const [initValues, setInitValues] = useState({
    fileName : "",
    file: ""
  })


  useEffect(() => {
    setLoading(true)
    axios.get(`http://localhost:3001/attachmentInfo/${authUser.googleId}`, {
      headers: {
        loginToken: localStorage.getItem('loginToken')
      }
    }).then(res => {
      setLoading(false)
      if(!res.data.error)
      {
        setInitValues(res.data)
        setImage(res.data.location)
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
    fileName: Yup.string()
      .required("Please enter the name of the file"),
    file: Yup.mixed().required('Attach an image of your identity'),
  })

  const onSubmit = (data) => {
    const formData = new FormData()
    formData.append("image", data.file)
    formData.append("description", data.fileName)

    console.log(formData)


   
    setLoading(true)
    axios.post("http://localhost:3001/attachmentInfo", formData, {
      headers: {
        loginToken: localStorage.getItem("loginToken"),
        "Content-Type": 'multipart/form-data',
      }
    }).then(res => {
      console.log(res)
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
      
       <AttachmentsForm initValues={initValues} prevStep={prevStep} image={image} />
        
      </Formik>

      {
        loading && <Loading />
      }
    </div>
  )
}

export default Attachments
