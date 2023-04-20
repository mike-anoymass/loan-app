import axios from 'axios';
import React, { useState } from 'react';
import swal from 'sweetalert'

function BankInfoEditModal({ isOpen, onClose, data, setData, loanID, }) {
  const overlayClass = isOpen ? 'fixed inset-0 bg-gray-500 opacity-75 z-50' : 'hidden';
  const modalClass = isOpen ? 'fixed inset-0 flex items-center justify-center z-50' : 'hidden';
  const formClass = "border-2 border-x-gray-500 p-1 rounded-md";
  const [loading, setLoading] = useState(false)

  const [formData, setFormData] = useState({
    loanId: loanID,
    bankName: data.bankInfo ? data.bankInfo.bankName : "National Bank",
    accountName: data.bankInfo ? data.bankInfo.accountName : "",
    accountNumber: data.bankInfo ? data.bankInfo.accountNumber: 0
  })

  const editBankInfo = () => {
    setLoading(true)
    axios.post("http://localhost:3001/loanBankInfo", formData, {
      headers: {
        loginToken: localStorage.getItem("loginToken")
      }
    }).then(result => {
      //get the generated loan id from auto increment
      setData({...data,
        bankInfo:{...data.bankInfo,
          bankName:formData.bankName,
          accountName: formData.accountName,
          accountNumber: formData.accountNumber
        }
      })
      setLoading(false)
      onClose()
      
      swal({
        icon:"success",
        title:"Update",
        text:"Bank Details Updated Successfully!",
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

            <h2 className='text-lg font-semibold p-2'>Updating Bank Information</h2>
            <hr />

            

            <div className='p-2 flex flex-col'>
              <label htmlFor="">Bank Name</label>
              <select 
                value={formData.bankName}
                onChange={e => setFormData({...formData, bankName:e.target.value})}
                className={formClass}
              >
                <option value="National Bank">National Bank (NBM)</option>
                <option value="NBS Bank">NBS Bank</option>
                <option value="Standard Bank">Standard Bank</option>
                <option value="Unayo Standard Bank">Unayo Standard Bank</option>
                <option value="FDH Bank">FDH Bank</option>
                <option value="Fist Capital Bank">First Capital Bank</option>
                <option value="My Bucks Bank">MyBucks</option>
                <option value="CDH Bank">CDH</option>
              </select>

              <label htmlFor="" className='mt-4'>Account Name</label>
              <input type="text" value={formData.accountName} className={formClass}
                onChange={e => setFormData({...formData, accountName:e.target.value})} 
              />

              <label htmlFor="" className='mt-4'>Account Number</label>
              <input type="text" value={formData.accountNumber} className={formClass}
                onChange={e => setFormData({...formData, accountNumber:e.target.value})} 
              />

              <button 
                className='w-full mt-3 border-2 p-2 bg-green-600 text-white rounded-lg'
                onClick={() => editBankInfo()}
              >{loading ? "Updating ...": "Update"}</button>

            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
}
export default BankInfoEditModal;