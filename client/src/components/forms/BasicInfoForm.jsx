import React, { useEffect } from 'react'
import { useFormikContext, ErrorMessage, Field, Form } from 'formik'

const BasicInfoForm = ({initValues}) => {
  const {errors, touched, dirty, values, isValid, setValues} = useFormikContext()

  useEffect(() => {
    setValues(initValues)
  }, [initValues])

  return ( 
    <Form className='flex flex-col gap-3'>
        <div className='gap-1 flex flex-col items-start shadow-xl p-2' >
            <label htmlFor=""
                className="text-xl px-2 font-semibold"
            >
                Full Name* :
            </label>
            <div className='flex w-full animate-pulse flex-row items-end text-red-900 font-medium justify-end px-2'>
                <ErrorMessage name='fullName'/>
            </div>
            <Field
                name="fullName"
                id="fullName"
                className={touched.fullName && errors.fullName ? 
                "w-full p-3 rounded-lg px-5 text-red-800 border-2 border-red-700" :
                "w-full p-3 rounded-lg px-5 text-black"}
                placeholder="What's your name ?"
            />
        </div>

        <div className='gap-1 flex flex-col items-start shadow-xl p-2 w-full'>
            <label htmlFor=""
                className="text-xl px-2 font-semibold"
            >
                Gender* :
            </label>
            <div className='flex w-full animate-pulse flex-row items-end text-red-900 font-medium justify-end px-2'>
                <ErrorMessage name='gender'/>
            </div>

            <div role="group" className='flex flex-row items-center justify-evenly w-full text-lg' aria-labelledby="my-radio-group">
                <div className='flex flex-row gap-2 items-center justify-center'>
                <Field
                    type="radio"
                    name="gender"
                    value="Male"
                    className="bg-black p-4"
                    
                />
                <label htmlFor=""
                    className='text-lg font-light'
                >Male</label>
                
                </div>
                <div className='flex flex-row gap-2 items-center justify-center'>
                <Field
                    type="radio"
                    name="gender"
                    value="Female"
                    size="20"
                    className="p-5"
                    
                />
                <label htmlFor=""
                    className='text-lg font-light'
                >Female</label>
                
                </div>
            </div>
        
        </div>
        <hr />

        <div className='w-full flex flex-col items-end justify-center'>
            <button 
                type='submit'
                disabled ={!(dirty && isValid)}
                className={
                !(dirty && isValid) ? 
                "border-0 p-2 bg-white bg-opacity-80 text-gray-400 rounded-xl shadow-2xl px-5"
                : 'border-0 p-3 bg-white bg-opacity-60 text-green-900 rounded-xl shadow-2xl px-5'
                }>
                Save and Continue
            </button>
        </div>
        
        
    </Form>         
  )
}

export default BasicInfoForm
