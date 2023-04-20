import axios from 'axios';
import React, { useEffect, useState } from 'react';
import swal from 'sweetalert';

function BasicInfoEditModal({ isOpen, onClose, data, setData, loanID}) {
  const overlayClass = isOpen ? 'fixed inset-0 bg-gray-500 opacity-75 z-50' : 'hidden';
  const modalClass = isOpen ? 'fixed inset-0 flex items-center justify-center z-50' : 'hidden';
  const formClass = "border-2 border-x-gray-500 p-1 rounded-md";
  const [loading, setLoading] = useState(false)

  const [formData, setFormData] = useState({
    loanId: loanID,
    amount: data.basicInfo.amount,
    term: data.basicInfo.termId,
    reason: data.basicInfo.loanFor,
    paybackAmount: data.basicInfo.paybackAmount
  })

  useEffect(() => {
    setFormData({...formData, paybackAmount: (formData.amount * (formData.term/100)) + +formData.amount})
  }, [formData, formData.amount, formData.term])

  const editBasicInfo = () => {
    setLoading(true)
    axios.post("http://localhost:3001/loanBasicInfo", formData, {
      headers: {
        loginToken: localStorage.getItem("loginToken")
      }
    }).then(result => {
      //get the generated loan id from auto increment
      setData({...data,
        basicInfo:{...data.basicInfo,
          amount:formData.amount,
          paybackAmount: formData.paybackAmount,
          termId: formData.term,
          loanFor: formData.reason
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

              <label htmlFor="">Amount</label>
              <input type="number" value={formData.amount} className={formClass}
                onChange={e => setFormData({...formData, amount:e.target.value})} 
              />
              <label htmlFor="" className='mt-4'>Loan Term</label>
              <select 
                value={formData.term}
                onChange={e => setFormData({...formData, term:e.target.value})}
                className={formClass}
              >
                <option value="50">4 Weeks - 50%</option>
                <option value="40">3 Weeks - 40%</option>
                <option value="30">2 Weeks - 30% </option>
                <option value="20">1 Week - 20% </option>
              </select>

             

              <label htmlFor="" className='mt-4'>PayBack Amount</label>
              <input type="text" value={formData.paybackAmount} className={formClass}
                onChange={e => setFormData({...formData, paybackAmount:e.target.value})} disabled
              />

              <label htmlFor="" className='mt-4'>Loan For</label>
              <textarea value={formData.reason} className={formClass}
                onChange={e => setFormData({...formData, reason:e.target.value})}
              ></textarea>

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