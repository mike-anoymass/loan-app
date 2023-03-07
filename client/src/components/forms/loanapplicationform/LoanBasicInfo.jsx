import React, { useContext, useEffect, useState } from "react"
import { Formik } from "formik"
import * as Yup from 'yup'
import { LoanBasicInfoForm } from "./"
import axios from 'axios'
import { LoanContext } from "../../../helpers/Context"


const LoanBasicInfo = ({nextStep}) => {
  //set initial values for our form
  const [initValues, setInitValues] = useState({
    amount: 0,
    term: "50",
    reason: "",
    paybackAmount: "0"
  })

  const {loanId, setLoanId} = useContext(LoanContext) //handles loan ID
  const [loading, setLoading] = useState(false) //handles loading page

  useEffect(() => {
    setLoading(true)

    //try to fetch data for that particular loan- this data will be used to populate our form
    axios.get(`http://localhost:3001/loanBasicInfo/${loanId}`, {
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
    amount: Yup.number()
      .required("Please enter amount")
      .min(10000, "Small amount. Loan starts from 10,000") ,
    term: Yup.string()
      .required("Please select loan term"),
    reason: Yup.string()
      .required("Please fill this field")
      .min(4, "Text is too short"),
  })

  //handle data submission when submit button has been clicked
  const onSubmit = data => {
    //send data to backend together with loan ID
    data.loanId = loanId
    console.log(data)

    axios.post("http://localhost:3001/loanBasicInfo", data, {
      headers: {
        loginToken: localStorage.getItem("loginToken")
      }
    }).then(result => {
      //get the generated loan id from auto increment
      setLoanId(result.data.id)
      nextStep()
    }).catch(err => console.log(err))
  }

  return (
    <div className="flex flex-col w-full items-center justify-center overflow-auto">
      <Formik
        initialValues={initValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {/* form should be wrappped in formik for easy access to formik context variables */}
        <LoanBasicInfoForm initValues={initValues}/>
      </Formik>
    </div>
  )
}

export default LoanBasicInfo
