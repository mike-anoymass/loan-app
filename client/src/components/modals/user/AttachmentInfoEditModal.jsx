import axios from 'axios';
import React, { useState } from 'react';
import swal from 'sweetalert'

function BankInfoEditModal({ isOpen, onClose, data, setData, loanID, }) {
  const overlayClass = isOpen ? 'fixed inset-0 bg-gray-500 opacity-75 z-50' : 'hidden';
  const modalClass = isOpen ? 'fixed inset-0 flex items-center justify-center z-50' : 'hidden';
  const formClass = "border-2 border-x-gray-500 p-1 rounded-md";
  const [loading, setLoading] = useState(false)
  const [preview, setPreview] = useState(null)

  const [formData, setFormData] = useState({
    fileName: data.attachmentInfo ? data.attachmentInfo.fileName : "",
    file: data.attachmentInfo ? data.attachmentInfo.file : "",
  })

  const handleFileChange = (e) => {
    const _file = e.target.files[0]
    const MAX_FILE_SIZE = 2048

    const fileSizeKiloBytes = _file.size / 1024

    if (!_file) {
      swal({
        icon: "warning",
        title: "Oops!",
        text:"Please Select a file",
        buttons: true
      })
      setPreview(null)

      return
    }


    if(fileSizeKiloBytes > MAX_FILE_SIZE){
      swal({
        icon: "warning",
        title: "Oops!",
        text:"File is too large. Maximum: 2MB",
        buttons: true
      })
      setPreview(null)
      return
    }

    try{
        setFormData({...formData, file: _file})
        const reader = new FileReader()
        reader.readAsDataURL(_file)
        reader.onload = () => {
            setPreview(reader.result)
        }
    }catch(err){
      console.log(err)
    }
  }


  const editInfo = () => {

    if(preview){
      setLoading(true)

      const _formData = new FormData()
      _formData.append("image", formData.file)
      _formData.append("description", formData.fileName)

      axios.post("http://localhost:3001/attachmentInfo", _formData, {
        headers: {
          loginToken: localStorage.getItem("loginToken")
        }
      }).then(result => {
        console.log(result.data.data)
        //get the generated loan id from auto increment
        setData({...data,
          attachmentInfo:{...data.attachmentInfo,
            fileName:formData.fileName,
            location: result.data.newLocation,
          }
        })
        setLoading(false)
        onClose()
        
        swal({
          icon:"success",
          title:"Update",
          text:"Attachment Details Updated Successfully!",
          buttons:false,
          timer: "2000"
        })
      }).catch(err => {
        setLoading(false)
        console.log(err.message)
      })
    }else{
      swal({
        icon: "warning",
        title: "Oops!",
        text:"Please Select a file and maximum:2MB",
        buttons: true
      })
    }
    
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

            <h2 className='text-lg font-semibold p-2'>Updating Attachment Information</h2>
            <hr />

            <div className='p-2 flex flex-col'>
              <label htmlFor="" >Attachment File</label>
              <input type="file" accept='image/*' className={formClass}
                onChange={handleFileChange} 
              />

              <label htmlFor="" className='mt-4'>Attachment Name</label>
              <input type="text" value={formData.fileName} className={formClass}
                onChange={e => setFormData({...formData, fileName:e.target.value})}
                placeholder='e.g. National ID, Driving License, etc.' 
              />

              <button 
                className='w-full mt-3 border-2 p-2 bg-green-600 text-white rounded-lg'
                onClick={() => editInfo()}
              >{loading ? "Updating ...": "Update"}</button>

            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
}
export default BankInfoEditModal;