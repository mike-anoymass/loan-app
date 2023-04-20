import axios from 'axios';
import React, { useState } from 'react';
import swal from 'sweetalert';

function BasicInfoEditModal({ isOpen, onClose, data, setData }) {
  const overlayClass = isOpen ? 'fixed inset-0 bg-gray-500 opacity-75 z-50' : 'hidden';
  const modalClass = isOpen ? 'fixed inset-0 flex items-center justify-center z-50' : 'hidden';
  const formClass = "border-2 border-x-gray-500 p-1 rounded-md";
  const [loading, setLoading] = useState(false)

  const [formData, setFormData] = useState({
    fullName: data.basicInfo.fullName,
    gender: data.basicInfo.gender,
  })

  const editBasicInfo = () => {
    setLoading(true)
    axios.post("http://localhost:3001/basicInfo", formData, {
      headers: {
        loginToken: localStorage.getItem("loginToken")
      }
    }).then(result => {
      setData({...data,
        basicInfo:{...data.basicInfo,
          fullName:formData.fullName,
          gender: formData.gender,
        }
      })
      setLoading(false)
      onClose()
      swal({
        icon:"success",
        title:"Update",
        text:"Basic Details Updated Successfully!",
        buttons:false,
        timer: "2000"
      })
    }).catch(err => {
      setLoading(false)
      console.log(err.message)
    })
  }

  return (
    <div>
      <div className={overlayClass} onClick={onClose}></div>

      <div className={modalClass}>
        <div className="bg-white rounded-lg overflow-hidden md:w-1/4 w-2/3">
          <div className="p-4">
            <button className="float-right text-gray-500" onClick={onClose}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <h2 className='text-lg font-semibold p-2'>Change Basic Information</h2>
            <hr />

            <div className='p-2 flex flex-col'>

              <label htmlFor="">Your Full Name</label>
              <input 
                type="text" 
                value={formData.fullName} 
                className={formClass}
                onChange={e => setFormData({...formData, fullName:e.target.value})} 
              />

              <div className='mt-2'>
                <label htmlFor="" className='mt-4'>Gender</label>
                <div className='flex items-center justify-evenly'>
                  <div>
                    Male 
                    <input 
                      type="radio" 
                      name="gender" 
                      value="Male"
                      className='ml-2'
                      checked = { formData.gender === "Male" && "checked" }
                      onChange={e => setFormData({...formData, gender:e.target.value})}
                    />
                  </div>
                  <div>
                    Female
                    <input 
                      type="radio" 
                      name="gender" 
                      value="Female"
                      className='ml-2'
                      checked = { formData.gender === "Female" && "checked" }
                      onChange={e => setFormData({...formData, gender:e.target.value})}
                    />
                  </div>
                </div>
              </div>
              
              

              <button 
                className='w-full mt-3 border-2 p-2 bg-green-600 text-white rounded-lg'
                onClick={() => editBasicInfo()}
              >{loading ? "Updating ...": "Update"}</button>

            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
}
export default BasicInfoEditModal;