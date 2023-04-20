import React, { useEffect, useState } from 'react'
import { useFormikContext, ErrorMessage, Field, Form } from 'formik'
import { AiOutlineArrowRight } from "react-icons/ai";

const LoanBasicInfoForm = ({initValues}) => {
  const {errors, touched, dirty, isValid, setValues, values, setFieldValue} = useFormikContext() //accessing formik context variables
  const labelStyle = "md:text-lg text-md px-2 font-light"   //styles for form labels

  useEffect(() => {
    setValues(initValues)
  }, [initValues])

  useEffect(() => {
    setFieldValue("paybackAmount", (values.amount * (values.term/100)) + +values.amount)
  }, [values.amount, values.term])

  return (
    <Form className='w-full overflow-auto'>
      <div className='gap-1 flex flex-col items-start p-2 w-full' >
          <label htmlFor=""
              className={labelStyle}
          >
              Amount in kwacha * :
          </label>
          <div className='flex w-full animate-pulse flex-row items-end text-red-900 font-medium justify-end px-2'>
              <ErrorMessage name='amount'/>
          </div>
          <Field
              name="amount"
              id="amount"
              className={ touched.amount && errors.amount ?
              "w-full p-3 rounded-lg px-5 text-red-800 border-2 border-red-500" :
              "w-full p-3 rounded-lg px-5 text-black border-2 border-gray-300"
              }
              placeholder="How much do want to borrow ?"
              autocomplete="off"
          />
      </div>

      <div className='gap-1 flex flex-col items-start p-2 w-full' >
          <div className='flex flex-row justify-between w-full'>
             <label htmlFor=""
                className={labelStyle}
            >
                Loan Term * :
            </label>
            <label htmlFor=""
                className={labelStyle + " hidden md:flex"}
            >
                Payback Value :
            </label>
          </div>
          <div className='flex w-full animate-pulse flex-row items-end text-red-900 font-medium justify-end px-2'>
              <ErrorMessage name='term'/>
          </div>
          <div className='flex md:flex-row flex-col w-full gap-2'>
            <Field 
              as="select"
              name="term"  
              className={ touched.term && errors.term ?
                "md:w-2/3 w-full p-3 rounded-lg px-5 text-red-800 border-2 border-red-500" :
                "md:w-2/3 w-full p-3 rounded-lg px-5 text-black border-2 border-gray-300"
              }
              
            >
              <option value="50">4 Weeks - 50%</option>
              <option value="40">3 Weeks - 40%</option>
              <option value="30">2 Weeks - 30% </option>
              <option value="20">1 Week - 20% </option>
            </Field>

            <label htmlFor=""
                className={labelStyle + " md:hidden"}
            >
                Payback Value :
            </label>
            <Field
              name= "paybackAmount"
              id="paybackAmount"
              title='Compound Interest Rate / Payback value'
              className="md:w-1/3 w-2/3 p-3 rounded-lg px-5 text-black border-2 border-black animate-pulse"
              disabled
              placeholder='Payback Amount'
              autocomplete="off"
            />
          </div>
          
      </div>

      <div className='gap-1 flex flex-col items-start p-2 w-full' >
          <label htmlFor=""
              className={labelStyle}
          >
              Loan for * :
          </label>
          <div className='flex w-full animate-pulse flex-row items-end text-red-900 font-medium justify-end px-2'>
              <ErrorMessage name='reason'/>
          </div>
          <Field 
            as="textarea" 
            name="reason"  
            placeholder="Money will be used for ?"
            className={ touched.reason && errors.reason ?
              "w-full p-3 rounded-lg px-5 text-red-800 border-2 border-red-500" :
              "w-full p-3 rounded-lg px-5 text-black border-2 border-gray-300"
              }
          />
      </div>

      <div className='gap-1 flex flex-col items-start py-5 w-full px-2' >
        <button 
            type='submit' 
            className={
                !(dirty && isValid) ?
                'flex flex-row md:text-lg items-center justify-center border-2 gap-5 rounded-3xl w-full p-3 bg-white font-light':
                'flex flex-row md:text-lg items-center justify-center border-2 gap-5 rounded-3xl w-full p-3 bg-green-400 font-light'
            }
            >
              Continue 
              <AiOutlineArrowRight fontSize={17}/>
        </button>
      </div>
    </Form>
  )
}

export default LoanBasicInfoForm
