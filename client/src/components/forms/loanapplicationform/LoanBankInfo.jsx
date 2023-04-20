import React, { useContext, useEffect, useState } from "react"
import { Formik } from "formik"
import * as Yup from 'yup'
import { LoanBankInfoForm } from "."
import axios from 'axios'
import { LoanContext } from "../../../helpers/Context"
import Loading from "../../Loading"


const LoanBankInfo = ({nextStep, prevStep}) => {
  //set initial values for our form
  const [initValues, setInitValues] = useState({
    bankName: "NationalBank",
    accountNumber: "",
    accountName: ""
  })

  const {loanId} = useContext(LoanContext) //handles loan ID
  const [loading, setLoading] = useState(false) //handles loading page

  useEffect(() => {
    setLoading(true)

    //try to fetch data for that particular loan- this data will be used to populate our form
    axios.get(`http://localhost:3001/loanBankInfo/${loanId}`, {
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
    bankName: Yup.string()
      .min(3, "Bank name is too short!")
      .max(100, "Your name is too long!")
      .required("Please select bank institution!")
      .matches(/^[a-zA-Z0-9' ]{3,}$/g, "Invalid name! Check your name carefully"),
    accountName: Yup.string()
      .min(3, "Your account name is too short!")
      .max(100, "Your name is too long!")
      .required("Please enter your account name")
      .matches(/^[a-zA-Z0-9' ]{3,}$/g, "Invalid name! Check your account name carefully"),
    accountNumber: Yup.string()
      .min(3, "Your account number is too short!")
      .max(50, "Your mobile number is too long!")
      .required("Please enter your account number!")
      .matches(/^[a-zA-Z0-9+ ]{3,}$/g, "Invalid account number! Check your number carefully"),
  })

  //handle data submission when submit button has been clicked
  const onSubmit = data => {
    //send data to backend together with loan ID
    data.loanId = loanId
    
    setLoading(true)

    axios.post("http://localhost:3001/loanBankInfo", data, {
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
        <LoanBankInfoForm initValues={initValues}  prevStep={prevStep}/>
      </Formik>

      {
        loading && <Loading />
      }
    </div>
  )
}

export default LoanBankInfo
