import React, { useContext, useEffect, useState } from 'react'
import * as Yup from 'yup'
import { Formik } from 'formik'
import axios from 'axios'
import { AuthContext } from '../../helpers/AuthContext.js'
import WorkInfoForm from './WorkInfoForm'
import Loading from '../Loading'
  
const WorkInfo = ({nextStep, prevStep}) => {
  const {authUser} = useContext(AuthContext)
  const [loading, setLoading] = useState(false)
  const [initValues, setInitValues] = useState({
    incomeSource : "",
    description: "",
    workplace: "",
  })


  useEffect(() => {
    setLoading(true)
    axios.get(`http://localhost:3001/workInfo/${authUser.googleId}`, {
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
    incomeSource: Yup.string()
      .min(3, "Text is too short!")
      .max(100, "Text is too long!")
      .required("Please enter source of income!")
      .matches(/^[a-zA-Z',?\- ]{3,100}$/g, "Invalid text! Check your text carefully"),
    description: Yup.string()
      .min(3, "Text is too short!")
      .max(250, "Text is too long!")
      .required("Please enter your job description/position!")
      .matches(/^[a-zA-Z0-9',?\- ]{3,250}$/g, "Invalid text! Check your text carefully"),
    workplace: Yup.string()
      .min(2, "Text is too short!")
      .max(100, "Text is too long!")
      .required("Please provide your work place(name and location)!")
      .matches(/^[a-zA-Z0-9',?\- ]{2,100}$/g, "Invalid text! Check your text carefully"),
  })

  const onSubmit = (data) => {
    setLoading(true)
    axios.post("http://localhost:3001/workInfo", data, {
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
      
       <WorkInfoForm initValues={initValues} prevStep={prevStep}/>
        
      </Formik>

      {
        loading && <Loading />
      }
    </div>
  )
}

export default WorkInfo
