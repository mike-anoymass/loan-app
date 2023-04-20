import React, { useContext, useEffect, useState } from "react"
import { Formik } from "formik"
import * as Yup from 'yup'
import { LoanBasicInfoForm, LoanWitnessInfoForm } from "."
import axios from 'axios'
import { LoanContext } from "../../../helpers/Context"
import Loading from "../../Loading"


const LoanWitnessInfo = ({nextStep, prevStep}) => {
  //set initial values for our form
  const [initValues, setInitValues] = useState({
    name: "",
    residence: "",
    phoneNumber: ""
  })

  const {loanId} = useContext(LoanContext) //handles loan ID
  const [loading, setLoading] = useState(false) //handles loading page

  useEffect(() => {
    setLoading(true)

    //try to fetch data for that particular loan- this data will be used to populate our form
    axios.get(`http://localhost:3001/loanWitnessInfo/${loanId}`, {
      headers: {
        loginToken: localStorage.getItem("loginToken")
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

  //validate fields using YUP
  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, "Your name is too short!")
      .max(100, "Your name is too long!")
      .required("Please enter loan witness loan!")
      .matches(/^[a-zA-Z0-9' ]{3,}$/g, "Invalid name! Check your name carefully"),
    residence: Yup.string()
      .min(3, "Your name is too short!")
      .max(100, "Your name is too long!")
      .required("Please enter loan witness address")
      .matches(/^[a-zA-Z0-9' ]{3,}$/g, "Invalid name! Check your name carefully"),
    phoneNumber: Yup.string()
      .min(9, "Your mobile number is too short!")
      .max(14, "Your mobile number is too long!")
      .required("Please enter loan witness phone number!")
      .matches(/^[0-9+ ]{9,14}$/g, "Invalid mobile number! Check your number carefully"),
  })

  //handle data submission when submit button has been clicked
  const onSubmit = data => {
    //send data to backend together with loan ID
    data.loanId = loanId

    setLoading(true)

    axios.post("http://localhost:3001/loanWitnessInfo", data, {
      headers: {
        loginToken: localStorage.getItem("loginToken")
      }
    }).then(result => {
      //get the generated loan id from auto increment
      setLoading(false)
      nextStep()
    }).catch(err => {
      console.log(err.message)
      setLoading(false)
    })
  }

  return (
    <div className="flex flex-col w-full items-center justify-center overflow-auto">
      <Formik
        initialValues={initValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {/* form should be wrappped in formik for easy access to formik context variables */}
        <LoanWitnessInfoForm initValues={initValues}  prevStep={prevStep}/>
      </Formik>

      {
        loading && <Loading />
      }
    </div>
  )
}

export default LoanWitnessInfo
