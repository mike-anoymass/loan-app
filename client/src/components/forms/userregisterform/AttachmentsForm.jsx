import React, { useEffect, useState } from 'react'
import { useFormikContext, ErrorMessage, Field, Form } from 'formik'
import axios from 'axios'

const AttachmentsForm = ({initValues, prevStep, image}) => {
  const {errors, setFieldError,touched, dirty, isValid, setValues, setFieldValue} = useFormikContext()
  const [preview, setPreview] = useState(null)
  const [error, setError] = useState(null)
  
  useEffect(() => {
    setValues(initValues)
  }, [initValues])

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    const MAX_FILE_SIZE = 2048

    const fileSizeKiloBytes = file.size / 1024

    if (!file) {
      setFieldError("file", "Please Select a file")
      setError("Please Select a file")
      setPreview(null)
      return
    }


    if(fileSizeKiloBytes > MAX_FILE_SIZE){
      setFieldError("file", `The image is too large! The limit is 2MB`)
      setError("The image is too large! The limit is 2MB")
      setPreview(null)
      return
    }

    try{
        setError(null)
        setFieldValue("file", file)
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => {
            setPreview(reader.result)
        }
    }catch(err){
        console.log(err)
    }
  }

  return ( 
    <Form className='flex flex-col gap-3'>
        <div className='gap-1 flex flex-col items-start shadow-xl p-2' >
            <label htmlFor=""
                className="text-xl px-2 font-semibold"
            >
                Name of the File* :
            </label>
            <div className='flex w-full animate-pulse flex-row items-end text-red-900 font-medium justify-end px-2'>
                <ErrorMessage name='fileName'/>
            </div>
            <Field
                name="fileName"
                id="fileName"
                className={touched.fileName && errors.fileName ? 
                "w-full p-3 rounded-lg px-5 text-red-800 border-2 border-red-700" :
                "w-full p-3 rounded-lg px-5 text-black"}
                placeholder="e.g. National ID, Passport, Drivers License ..etc "
            />
        </div>

        <div className='gap-1 flex flex-col items-start shadow-xl p-2' >
            <label htmlFor=""
                className="text-xl px-2 font-semibold"
            >
                Attach your file here* :
            </label>
            <div className='flex w-full animate-pulse flex-row items-end text-red-900 font-medium justify-end px-2'>
                <ErrorMessage name='file'/>
                {
                    error && <p>{error}</p>
                }
            </div>
            <input
                type="file"
                name="file"
                id="file"
                onChange={handleFileChange}
                accept="image/*"
                className={touched.file && errors.file ? 
                "w-full p-3 rounded-lg px-5 text-red-800 border-2 border-red-700" :
                "w-full p-3 rounded-lg px-5 text-black"}
                autocomplete="off"
            />
        </div>
        {
            preview && <img src={preview} alt="Attachment" className='w-16 self-center' />
        }
        {
            image && <img src={`http://localhost:3001/attachmentInfo/images/${image}`} alt="Attachment" className='w-16 self-center' />
        }
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
                Save
            </button>
        </div>
        
        
    </Form>         
  )
}

export default AttachmentsForm
