import React, { useContext, useEffect, useState } from "react"
import { Formik } from "formik"
import * as Yup from 'yup'
import { LoanCollateralInfoForm } from "./"
import axios from 'axios'
import { LoanContext } from "../../../helpers/Context"
import Loading from "../../Loading"

const LoanCollateralInfo = ({nextStep, prevStep}) => {
   const [initValues, setInitValues] = useState({
    monthlyEarning: 0,
    description: "",
    valuation: 0
  })

  const {loanId, setLoanId} = useContext(LoanContext)

  const [loading, setLoading] = useState(false) //handles loading page

  useEffect(() => {
    setLoading(true)

    //try to fetch data for that particular loan- this data will be used to populate our form
    axios.get(`http://localhost:3001/loanCollateralInfo/${loanId}`, {
      headers: {
        loginToken: localStorage.getItem("loginToken")
      }
    }).then(res => {
      setLoading(false)
      console.log(res)
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
    monthlyEarning: Yup.number()
      .required("Please enter amount"),
    valuation: Yup.number()
      .required("How much is your collateral valued ?"),
    description: Yup.string()
      .required("Please fill this field")
      .min(4, "Text is too short")
  })

  const onSubmit = data => {
    data.loanId = loanId
    setLoading(true)

   axios.post("http://localhost:3001/loanCollateralInfo", data , {
      headers: {
        loginToken: localStorage.getItem("loginToken")
      }
    }).then(result => {
      setLoading(false)
      nextStep()
    }).catch(err => {
      console.log(err)
      setLoading(false)
    })
  
  }

  return (
    <div className="flex flex-col w-full items-center justify-center">
      <Formik
        initialValues={initValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        <LoanCollateralInfoForm initValues={initValues} prevStep={prevStep}/>
      </Formik>

      {
        loading && <Loading />
      }

    </div>
  )
}

export default LoanCollateralInfo
