import React, { useContext, useEffect, useState } from "react"
import { Formik } from "formik"
import * as Yup from 'yup'
import { LoanBasicInfoForm, LoanCollateralInfoForm } from "./"
import axios from 'axios'
import { LoanContext } from "../../../helpers/Context"

const LoanCollateralInfo = ({nextStep, prevStep}) => {
   const [initValues, setInitValues] = useState({
    monthlyEarning: 0,
    description: "",
    valuation: 0
  })

  const {loanId, setLoanId} = useContext(LoanContext)

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
    console.log(data)

   /* axios.post("http://localhost:3001/loanBasicInfo", data , {
      headers: {
        loginToken: localStorage.getItem("loginToken")
      }
    }).then(result => {
      setLoanId(result.data.loanId)
      nextStep()
    }).catch(err => console.log(err))
    */
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
    </div>
  )
}

export default LoanCollateralInfo
