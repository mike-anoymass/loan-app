import axios from 'axios';
import React, { useEffect, useState } from 'react';
import swal from 'sweetalert';

function ContactInfoEditModal({ isOpen, onClose, data, setData, loanID}) {
  const overlayClass = isOpen ? 'fixed inset-0 bg-gray-500 opacity-75 z-50' : 'hidden';
  const modalClass = isOpen ? 'fixed inset-0 flex items-center justify-center z-50' : 'hidden';
  const formClass = "border-2 border-x-gray-500 p-1 rounded-md";
  const [loading, setLoading] = useState(false)

  const [formData, setFormData] = useState({
    mobile: data.contactInfo ? data.contactInfo.mobile : "265",
    telephone: data.contactInfo ? data.contactInfo.telephone : "265",
    address: data.contactInfo ? data.contactInfo.address : "",
    email: data.contactInfo ? data.contactInfo.email : "",
  })

  const editContactInfo = () => {
    setLoading(true)
    axios.post("http://localhost:3001/contactInfo", formData, {
      headers: {
        loginToken: localStorage.getItem("loginToken")
      }
    }).then(result => {
      //get the generated loan id from auto increment
      setData({...data,
        contactInfo:{...data.contactInfo,
          mobile:formData.mobile,
          telephone: formData.telephone,
          address: formData.address,
          email: formData.email,
        }
      })
      setLoading(false)
      onClose()
      swal({
        icon:"success",
        title:"Update",
        text:"Contact Details Updated Successfully!",
        buttons:false,
        timer: "2000"
      })
    }).catch(err => {
      setLoading(false)
      swal({
        icon:"error",
        title:"Update",
        text: "Check your input and try again",
        buttons:false,
        timer: "2000"
      })
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

            <h2 className='text-lg font-semibold p-2'>Modify Contact Information</h2>
            <hr />

            <div className='p-2 flex flex-col'>

              <label htmlFor="">Mobile</label>
              <input type="number" value={formData.mobile} className={formClass}
                onChange={e => setFormData({...formData, mobile:e.target.value})} 
              />

              <label htmlFor="" className='mt-4'>Telephone</label>
              <input type="number" value={formData.telephone} className={formClass}
                onChange={e => setFormData({...formData, telephone:e.target.value})}
              />

              <label htmlFor="" className='mt-4'>Email Address</label>
              <input type="email" value={formData.email} className={formClass}
                onChange={e => setFormData({...formData, email:e.target.value})}
              />

              <label htmlFor="" className='mt-4'>Physical Address</label>
              <textarea value={formData.address} className={formClass}
                onChange={e => setFormData({...formData, address:e.target.value})}
              ></textarea>

              <button 
                className='w-full mt-3 border-2 p-2 bg-green-600 text-white rounded-lg'
                onClick={() => editContactInfo()}
              >{loading ? "Updating ...": "Update"}</button>

            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
}
export default ContactInfoEditModal;