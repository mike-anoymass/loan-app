import React, { useEffect } from 'react'
import { useFormikContext, ErrorMessage, Field, Form } from 'formik'

const WorkInfoForm = ({initValues, prevStep}) => {
  const {errors, touched, dirty, isValid, setValues} = useFormikContext()

  useEffect(() => {
    setValues(initValues)
  }, [initValues])

  return ( 
    <Form className='flex flex-col gap-3'>
        <div className='gap-1 flex flex-col items-start shadow-xl p-2' >
            <label htmlFor=""
                className="text-xl px-2 font-semibold"
            >
                Source of Income* :
            </label>
            <div className='flex w-full animate-pulse flex-row items-end text-red-900 font-medium justify-end px-2'>
                <ErrorMessage name='incomeSource'/>
            </div>
            <Field
                name="incomeSource"
                id="incomeSource"
                className={touched.incomeSource && errors.incomeSource ? 
                "w-full p-3 rounded-lg px-5 text-red-800 border-2 border-red-700" :
                "w-full p-3 rounded-lg px-5 text-black"}
                placeholder="e.g. Employed, Business, Pension ..etc"
                autocomplete="off"
            />
        </div>

        <div className='gap-1 flex flex-col items-start shadow-xl p-2' >
            <label htmlFor=""
                className="text-xl px-2 font-semibold"
            >
                Description/Job Position* :
            </label>
            <div className='flex w-full animate-pulse flex-row items-end text-red-900 font-medium justify-end px-2'>
                <ErrorMessage name='description'/>
            </div>
            <Field
                name="description"
                id="description"
                className={touched.description && errors.description ? 
                "w-full p-3 rounded-lg px-5 text-red-800 border-2 border-red-700" :
                "w-full p-3 rounded-lg px-5 text-black"}
                placeholder="What's your role ?"
                autocomplete="off"
            />
        </div>

        <div className='gap-1 flex flex-col items-start shadow-xl p-2' >
            <label htmlFor=""
                className="text-xl px-2 font-semibold"
            >
                Work Place* :
            </label>
            <div className='flex w-full animate-pulse flex-row items-end text-red-900 font-medium justify-end px-2'>
                <ErrorMessage name='workplace'/>
            </div>
            <Field
                as="textarea"
                name="workplace"
                id="workplace"
                className={touched.address && errors.address ? 
                "w-full p-3 rounded-lg px-5 text-red-800 border-2 border-red-700" :
                "w-full p-3 rounded-lg px-5 text-black"}
                placeholder="e.g. Ministry of finance - Lilongwe"
                autocomplete="off"
            />
        </div>
        <hr />

        <div className='w-full flex flex-row items-center justify-between'>
            <button 
                className='border-0 p-3 bg-white bg-opacity-60 text-black rounded-xl shadow-2xl px-5'
                onClick={() => prevStep()}
            >
                Back
            </button>
            <button 
                type='submit'
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

export default WorkInfoForm
