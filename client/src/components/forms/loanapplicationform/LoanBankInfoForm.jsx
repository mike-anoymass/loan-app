import React, { useEffect } from 'react'
import { useFormikContext, ErrorMessage, Field, Form } from 'formik'
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";

const LoanWitnessInfoForm = ({initValues, prevStep}) => {
  const {errors, touched, dirty, isValid, setValues} = useFormikContext()
  const labelStyle = "md:text-lg text-md px-2 font-light"

  useEffect(() => {
    console.log(initValues)
    setValues(initValues)
  }, [initValues])

  return (
    <Form className='w-full'>
      <div className='gap-1 flex flex-col items-start p-2 w-full' >
          <label htmlFor=""
              className={labelStyle}
          >
            Bank Name * :
          </label>
          <div className='flex w-full animate-pulse flex-row items-end text-red-900 font-medium justify-end px-2'>
              <ErrorMessage name='bankName'/>
          </div>
          <Field
              name="bankName"
              id="bankName"
              as="select"
              className={ touched.bankName && errors.bankName ?
              "w-full p-3 rounded-lg px-5 text-red-800 border-2 border-red-500" :
              "w-full p-3 rounded-lg px-5 text-black border-2 border-gray-300"
              }
          >
            <option value="National Bank">National Bank (NBM)</option>
            <option value="NBS Bank">NBS Bank</option>
            <option value="Standard Bank">Standard Bank</option>
            <option value="Unayo Standard Bank">Unayo Standard Bank</option>
            <option value="FDH Bank">FDH Bank</option>
            <option value="Fist Capital Bank">First Capital Bank</option>
            <option value="MyBucks Bank">MyBucks</option>
            <option value="CDH Bank">CDH</option>
          </Field>
      </div>

      <div className='gap-1 flex flex-col items-start p-2 w-full' >
          <label htmlFor=""
              className={labelStyle}
          >
            Account Name * :
          </label>
          <div className='flex w-full animate-pulse flex-row items-end text-red-900 font-medium justify-end px-2'>
              <ErrorMessage name='accountName'/>
          </div>
          <Field
              name="accountName"
              id="accountName"
              className={ touched.accountName && errors.accountName ?
              "w-full p-3 rounded-lg px-5 text-red-800 border-2 border-red-500" :
              "w-full p-3 rounded-lg px-5 text-black border-2 border-gray-300"
              }
              placeholder="What's the name of your bank account ?"
              autocomplete="off"
          />
      </div>

      <div className='gap-1 flex flex-col items-start p-2 w-full' >
          <label htmlFor=""
              className={labelStyle}
          >
            Account Number * :
          </label>
          <div className='flex w-full animate-pulse flex-row items-end text-red-900 font-medium justify-end px-2'>
              <ErrorMessage name='accountNumber'/>
          </div>
          <Field
              name="accountNumber"
              id="accountNumber"
              className={ touched.accountNumber && errors.accountNumber ?
              "w-full p-3 rounded-lg px-5 text-red-800 border-2 border-red-500" :
              "w-full p-3 rounded-lg px-5 text-black border-2 border-gray-300"
              }
              placeholder="What's your bank account number ?"
          />
      </div>

      <div className='gap-1 flex flex-row items-start justify-between py-5 w-full px-2' >
        
         <button   
            className={
                'flex flex-row md:text-lg text-sm items-center justify-center border-2 gap-5 rounded-3xl p-3 bg-red-400 font-light'
            }

            onClick={() => prevStep()}
         >
          <AiOutlineArrowLeft fontSize={17}/>
          Back
        </button>

        <button 
            type='submit'  
            className={
                !(dirty && isValid) ?
                'flex flex-row md:text-lg text-sm items-center justify-center border-2 gap-5 rounded-3xl p-3 bg-white font-light':
                'flex flex-row md:text-lg text-sm items-center justify-center border-2 gap-5 rounded-3xl p-3 bg-green-400 font-light'
            }
            >
          Save 
          <AiOutlineArrowRight fontSize={17}/>
        </button>
      </div>
    </Form>
  )
}

export default LoanWitnessInfoForm
