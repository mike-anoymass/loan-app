import React from 'react'
import { useFormikContext, ErrorMessage, Field, Form } from 'formik'
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";

const LoanCollateralInfoForm = ({initValues, prevStep}) => {
  const {errors, touched, dirty, isValid, setValues} = useFormikContext()
  const labelStyle = "md:text-lg text-md px-2 font-light"

  return (
    <Form className='w-full'>
      <div className='gap-1 flex flex-col items-start p-2 w-full' >
          <label htmlFor=""
              className={labelStyle}
          >
              Your Monthly Earning * :
          </label>
          <div className='flex w-full animate-pulse flex-row items-end text-red-900 font-medium justify-end px-2'>
              <ErrorMessage name='monthlyEarning'/>
          </div>
          <Field
              name="monthlyEarning"
              id="monthlyEarning"
              className={ touched.monthlyEarning && errors.monthlyEarning ?
              "w-full p-3 rounded-lg px-5 text-red-800 border-2 border-red-500" :
              "w-full p-3 rounded-lg px-5 text-black border-2 border-gray-300"
              }
              placeholder="How much do you earn per month ?"
          />
      </div>

      <div className='gap-1 flex flex-col items-start p-2 w-full' >
          <label htmlFor=""
              className={labelStyle}
          >
            Name of the Collateral * :
          </label>
          <div className='flex w-full animate-pulse flex-row items-end text-red-900 font-medium justify-end px-2'>
              <ErrorMessage name='description'/>
          </div>
          <Field
              name="description"
              id="description"
              className={ touched.description && errors.description ?
              "w-full p-3 rounded-lg px-5 text-red-800 border-2 border-red-500" :
              "w-full p-3 rounded-lg px-5 text-black border-2 border-gray-300"
              }
              placeholder="What collateral do you have for this loan ?"
          />
      </div>

      <div className='gap-1 flex flex-col items-start p-2 w-full' >
          <label htmlFor=""
              className={labelStyle}
          >
              Collateral Valuation in cash * :
          </label>
          <div className='flex w-full animate-pulse flex-row items-end text-red-900 font-medium justify-end px-2'>
              <ErrorMessage name='valuation'/>
          </div>
          <Field
              name="valuation"
              id="valuation"
              className={ touched.valuation && errors.valuation ?
              "w-full p-3 rounded-lg px-5 text-red-800 border-2 border-red-500" :
              "w-full p-3 rounded-lg px-5 text-black border-2 border-gray-300"
              }
              placeholder="How much is your collateral in terms of money ?"
          />
      </div>

      <div className='gap-1 flex flex-row items-start justify-between py-5 w-full px-2' >
        
         <button   
            className={
                'flex flex-row text-lg items-center justify-center border-2 gap-5 rounded-3xl p-3 bg-red-400 font-light'
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
                'flex flex-row text-lg items-center justify-center border-2 gap-5 rounded-3xl p-3 bg-white font-light':
                'flex flex-row text-lg items-center justify-center border-2 gap-5 rounded-3xl p-3 bg-green-400 font-light'
            }
            >
          Save 
          <AiOutlineArrowRight fontSize={17}/>
        </button>
      </div>
    </Form>
  )
}

export default LoanCollateralInfoForm
