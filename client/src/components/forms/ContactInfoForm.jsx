import React, { useEffect } from 'react'
import { useFormikContext, ErrorMessage, Field, Form } from 'formik'

const ContactInfoForm = ({initValues, prevStep}) => {
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
                Mobile Phone Number* :
            </label>
            <div className='flex w-full animate-pulse flex-row items-end text-red-900 font-medium justify-end px-2'>
                <ErrorMessage name='mobile'/>
            </div>
            <Field
                name="mobile"
                id="mobile"
                className={touched.mobile && errors.mobile ? 
                "w-full p-3 rounded-lg px-5 text-red-800 border-2 border-red-700" :
                "w-full p-3 rounded-lg px-5 text-black"}
                placeholder="What's your mobile phone number (whatsapp ..etc) ?"
            />
        </div>

        <div className='gap-1 flex flex-col items-start shadow-xl p-2' >
            <label htmlFor=""
                className="text-xl px-2 font-semibold"
            >
                Telephone/Alternate Number :
            </label>
            <div className='flex w-full animate-pulse flex-row items-end text-red-900 font-medium justify-end px-2'>
                <ErrorMessage name='telephone'/>
            </div>
            <Field
                name="telephone"
                id="telephone"
                className={touched.telephone && errors.telephone ? 
                "w-full p-3 rounded-lg px-5 text-red-800 border-2 border-red-700" :
                "w-full p-3 rounded-lg px-5 text-black"}
                placeholder="What's your telephone number (for calls ..etc) ?"
            />
        </div>

        <div className='gap-1 flex flex-col items-start shadow-xl p-2' >
            <label htmlFor=""
                className="text-xl px-2 font-semibold"
            >
                Home Address* :
            </label>
            <div className='flex w-full animate-pulse flex-row items-end text-red-900 font-medium justify-end px-2'>
                <ErrorMessage name='address'/>
            </div>
            <Field
                as="textarea"
                name="address"
                id="address"
                className={touched.address && errors.address ? 
                "w-full p-3 rounded-lg px-5 text-red-800 border-2 border-red-700" :
                "w-full p-3 rounded-lg px-5 text-black"}
                placeholder="Where do you stay ? or Just leave you home address"
            />
        </div>

        <div className='gap-1 flex flex-col items-start shadow-xl p-2' >
            <label htmlFor=""
                className="text-xl px-2 font-semibold"
            >
                Contact Email Address* :
            </label>
            <div className='flex w-full animate-pulse flex-row items-end text-red-900 font-medium justify-end px-2'>
                <ErrorMessage name='email'/>
            </div>
            <Field
                name="email"
                id="email"
                className={touched.email && errors.email ? 
                "w-full p-3 rounded-lg px-5 text-red-800 border-2 border-red-700" :
                "w-full p-3 rounded-lg px-5 text-black"}
                placeholder="Leave an email that we should use to send you notifications"
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

export default ContactInfoForm
