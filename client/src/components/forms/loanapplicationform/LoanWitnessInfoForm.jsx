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
    <Form className='w-full' autoComplete='off'>
      <div className='gap-1 flex flex-col items-start p-2 w-full' >
          <label htmlFor=""
              className={labelStyle}
          >
              Name of Witness * :
          </label>
          <div className='flex w-full animate-pulse flex-row items-end text-red-900 font-medium justify-end px-2'>
              <ErrorMessage name='name'/>
          </div>
          <Field
              name="name"
              id="name"
              className={ touched.monthlyEarning && errors.monthlyEarning ?
              "w-full p-3 rounded-lg px-5 text-red-800 border-2 border-red-500" :
              "w-full p-3 rounded-lg px-5 text-black border-2 border-gray-300"
              }
              placeholder="Name of loan witness ?"
              autocomplete="off"
          />
      </div>

      <div className='gap-1 flex flex-col items-start p-2 w-full' >
          <label htmlFor=""
              className={labelStyle}
          >
            Witness Phone Number * :
          </label>
          <div className='flex w-full animate-pulse flex-row items-end text-red-900 font-medium justify-end px-2'>
              <ErrorMessage name='phoneNumber'/>
          </div>
          <Field
              name="phoneNumber"
              id="phoneNumber"
              className={ touched.description && errors.description ?
              "w-full p-3 rounded-lg px-5 text-red-800 border-2 border-red-500" :
              "w-full p-3 rounded-lg px-5 text-black border-2 border-gray-300"
              }
              placeholder="What's the phone number for this witness ?"
              autocomplete="off"
          />
      </div>

      <div className='gap-1 flex flex-col items-start p-2 w-full' >
          <label htmlFor=""
              className={labelStyle}
          >
              Witness Residence/ Address* :
          </label>
          <div className='flex w-full animate-pulse flex-row items-end text-red-900 font-medium justify-end px-2'>
              <ErrorMessage name='residence'/>
          </div>
          <Field
              name="residence"
              id="residence"
              as="textarea"
              className={ touched.valuation && errors.valuation ?
              "w-full p-3 rounded-lg px-5 text-red-800 border-2 border-red-500" :
              "w-full p-3 rounded-lg px-5 text-black border-2 border-gray-300"
              }
              placeholder="Where does the witness live ?"
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
