import axios from 'axios';
import React, { useEffect, useState } from 'react';
import swal from 'sweetalert';

function WitnessInfoEditModal({ isOpen, onClose, data, setData, loanID}) {
  const overlayClass = isOpen ? 'fixed inset-0 bg-gray-500 opacity-75 z-50' : 'hidden';
  const modalClass = isOpen ? 'fixed inset-0 flex items-center justify-center z-50' : 'hidden';
  const formClass = "border-2 border-x-gray-500 p-1 rounded-md";
  const [loading, setLoading] = useState(false)

  const [formData, setFormData] = useState({
    loanId: loanID,
    name: data.witnessInfo ? data.witnessInfo.name : "",
    residence: data.witnessInfo ? data.witnessInfo.residence : "",
    phoneNumber: data.witnessInfo ? data.witnessInfo.phoneNumber : 0,
  })

  const editWitnessInfo = () => {
    setLoading(true)
    axios.post("http://localhost:3001/loanWitnessInfo", formData, {
      headers: {
        loginToken: localStorage.getItem("loginToken")
      }
    }).then(result => {
      //get the generated loan id from auto increment
      setData({...data,
        witnessInfo:{...data.witnessInfo,
          name:formData.name,
          residence: formData.residence,
          phoneNumber: formData.phoneNumber
        }
      })
      setLoading(false)
      onClose()
      swal({
        icon:"success",
        title:"Update",
        text:"Witness Details Updated Successfully!",
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

            <h2 className='text-lg font-semibold p-2'>Modify Witness Information</h2>
            <hr />

            <div className='p-2 flex flex-col'>

              <label htmlFor="">Name of Witness</label>
              <input type="text" value={formData.name} className={formClass}
                onChange={e => setFormData({...formData, name:e.target.value})} 
              />

              <label htmlFor="" className='mt-4'>Phone Number</label>
              <input type="number" value={formData.phoneNumber} className={formClass}
                onChange={e => setFormData({...formData, phoneNumber:e.target.value})}
              />

              <label htmlFor="" className='mt-4'>Residence/Address</label>
              <textarea value={formData.residence} className={formClass}
                onChange={e => setFormData({...formData, residence:e.target.value})}
              ></textarea>

              <button 
                className='w-full mt-3 border-2 p-2 bg-green-600 text-white rounded-lg'
                onClick={() => editWitnessInfo()}
              >{loading ? "Updating ...": "Update"}</button>

            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
}
export default WitnessInfoEditModal;