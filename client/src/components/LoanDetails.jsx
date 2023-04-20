import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { AiOutlineArrowLeft, AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai'
import { LoanContext } from '../helpers/Context'
import swal from 'sweetalert'
import { BasicInfoEditModal, BankInfoEditModal, CollateralInfoEditModal, WitnessInfoEditModal} from './modals/loan'

const LoanDetails = () => {
  const { id } = useParams()
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState({})
  const [statusValue, setStatusValue] = useState(0)
  const navigate = useNavigate()
  const {setLoanId} = useContext(LoanContext) //handles loan ID

  const [isBasicOpen, setIsBasicOpen] = useState(false);
  const [isBankOpen, setIsBankOpen] = useState(false);
  const [isCollateralOpen, setIsCollateralOpen] = useState(false);
  const [isWitnessOpen, setIsWitnessOpen] = useState(false);

  function openBasicModal() {
    setIsBasicOpen(true);
  }

  function closeBasicModal() {
    setIsBasicOpen(false);
  }

  function openBankModal() {
    setIsBankOpen(true);
  }

  function closeBankModal() {
    setIsBankOpen(false);
  }

  function openCollateralModal() {
    setIsCollateralOpen(true);
  }

  function closeCollateralModal() {
    setIsCollateralOpen(false);
  }

  function openWitnessModal() {
    setIsWitnessOpen(true);
  }

  function closeWitnessModal() {
    setIsWitnessOpen(false);
  }

  useEffect(() => {
     axios.get(`http://localhost:3001/loanBasicInfo/loan/fullInfo/${id}`, {
        headers: {
          loginToken: localStorage.getItem("loginToken")
        }
      })
      .then(res => {
        setLoading(false)
        setData(data => res.data)
      })
      .catch(err => {
        <p>err.message</p>
        setLoading(false)
      })
  
  }, [])

  useEffect(() => {
    if(data.basicInfo){
      setStatusValue(25)

      if(data.basicInfo && data.collateralInfo){
        setStatusValue(50)
      }

      if(data.basicInfo && data.witnessInfo){
        setStatusValue(50)
      }

      if(data.basicInfo && data.bankInfo){
        setStatusValue(50)
      }

      if(data.basicInfo && data.collateralInfo && data.witnessInfo){
        setStatusValue(75)
      }

      if(data.basicInfo && data.bankInfo && data.witnessInfo){
        setStatusValue(75)
      }

      if(data.basicInfo && data.collateralInfo && data.witnessInfo && data.bankInfo){
        setStatusValue(100)
      }
    }
  
  }, [data,setData])

  const editLoan = () => {
    setLoanId(id)
    navigate('/category/newApplication')
  }

  const deleteApplication = () => {
    swal({
        title: "Are you sure?",
        text: ("You want to delete this Application !"),
        icon:'warning', //The right way
        dangerMode: "red" ,
        closeModal: false,
        buttons: ["No", "Yes"] //The right way to do it in Swal1
    })
    .then((isConfirm) => {
        if (isConfirm) {
          setLoading(true)
          axios.delete(`http://localhost:3001/loanBasicInfo/${id}`, {
            headers: {
              loginToken: localStorage.getItem('loginToken')
            }
          })
          .then(res => {
            navigate(-1)
            swal("Application Successfully Deleted",{
              icon: "success",
              timer: '2000',
            })
          })
        }
    });
  }

  return (
    <div className='p-2'>
        
      <div className='flex flex-col md:flex-row items-center justify-between w-full py-2 gap-y-2'>
        <div className='flex justify-center items-center p-2'>
          <AiOutlineArrowLeft 
            fontSize={20}
            className='cursor-pointer'
            onClick={() => navigate(-1)}
          />
          <p className='ml-3 font-bold cursor-pointer'>What i need to know about this loan?</p>
        </div>

        <div>
          <p><span className='font-bold'>Application Status:{' '}</span> 
          { loading ? <span> ...</span> : statusValue}% complete</p>
        </div>

        <div className='gap-x-2 flex flex-row w-full md:max-w-min justify-center animate-pulse'>
          <button 
            className='border-2 rounded-xl py-1 px-3 border-green-500 flex items-center gap-1'
            onClick={() => editLoan()}
          >
            <AiOutlineEdit 
              className='text-green-700'
            />
            Edit
          </button>
          <button 
            className='border-2 rounded-xl py-1 px-3 border-red-500 flex items-center gap-1'
            onClick={() => deleteApplication()}
          >
            <AiOutlineDelete 
              className='text-red-600'
            />
            Delete
          </button>
        </div>
        
      </div>
      <hr />
      {
        loading ? <p className='flex items-center w-full h-full text-lg text-blue-700 justify-center mt-5'>Loading ...</p> : (
            <div className='flex md:flex-row flex-col w-full gap-x-1 flex-wrap mt-4'>  
              <BankInfoEditModal 
                isOpen={isBankOpen} 
                onClose={closeBankModal} 
                data={data} setData={setData} 
                loanID={id} 
              />
              <BasicInfoEditModal 
                isOpen={isBasicOpen} 
                onClose={closeBasicModal} 
                data={data} setData={setData} 
                loanID={id}
              />
              <CollateralInfoEditModal 
                isOpen={isCollateralOpen} 
                onClose={closeCollateralModal} 
                data={data} setData={setData} 
                loanID={id}
              />
              <WitnessInfoEditModal 
                isOpen={isWitnessOpen} 
                onClose={closeWitnessModal} 
                data={data} 
                setData={setData} 
                loanID={id}
              />

              <div class="bg-white shadow-lg rounded-md p-4 mt-2 gap-y-3  flex flex-col">
                <div className='flex justify-between p-1'>
                  <h2 class="text-md font-semibold">Loan Basic Information</h2>
                  <button title='Edit' onClick={openBasicModal}><AiOutlineEdit /></button>
                </div>
                
                <hr className='border-1'/>
                <div className='flex justify-between items-center'>
                  <p class="mt-2">Borrowing: </p> 
                  <p>_________________</p>
                  <p class="mt-2">{data.basicInfo.amount.toLocaleString('en-mw', {style: 'currency', currency:'MWK'})}</p>
                </div>
                
                <div className='flex justify-between items-center'>
                  <p class="mt-2">Payback Amount: </p> 
                  <p class="mt-2">{data.basicInfo.paybackAmount.toLocaleString('en-mw', {style: 'currency', currency:'MWK'})}</p>
                </div>

                <div className='flex justify-between items-center'>
                  <p class="mt-2">Loan Term: </p> 
                  <p class="mt-2">{data.basicInfo.termId}%</p>
                </div>

                <div className='flex shadow-sm p-y-2 flex-col justify-start items-sta'>
                  <p class="mt-2 font-semibold">Reason for Loan </p> 
                  
                  <p class="mt-2">"{data.basicInfo.loanFor}"</p>
                </div>
              </div>

              <div class="bg-white shadow-lg rounded-md p-4 mt-2 gap-y-3 flex flex-col">
                <div className='flex justify-between p-1'>
                  <h2 class="text-md font-semibold">Collateral Information</h2>
                  <button title='Edit' onClick={openCollateralModal}><AiOutlineEdit /></button>
                </div>
                
                <hr className='border-1'/>

                {
                  data.collateralInfo ? (
                    <div className='gap-y-3 flex flex-col'>
                      <div className='flex justify-between items-center'>
                        <p class="mt-2">Monthly earning: </p> 
                        <p>_________________</p>
                        <p class="mt-2">{data.collateralInfo.monthlyEarning.toLocaleString('en-mw', {style:'currency', currency: "MWK"})}</p>
                      </div>
                    
                      <div className='flex justify-between items-center'>
                        <p class="mt-2">Collateral Name: </p> 
                        <p class="mt-2">{data.collateralInfo.description}</p>
                      </div>

                       <div className='flex justify-between items-center'>
                        <p class="mt-2">Collateral Valuation: </p> 
                        <p class="mt-2">{data.collateralInfo.valuation.toLocaleString('en-mw', {style:'currency', currency: "MWK"})}</p>
                      </div>
                    </div>
                  ) : <p>Collateral Information Not Available</p>
      
                }

                
              </div>

              <div class="bg-white shadow-lg rounded-md p-4 mt-2 gap-y-3 flex flex-col">
                <div className='flex justify-between p-1'>
                  <h2 class="text-md font-semibold">Witness Information</h2>
                  <button title='Edit' onClick={openWitnessModal}><AiOutlineEdit /></button>
                </div>
                
                <hr className='border-1'/>

                {
                  data.witnessInfo ? (
                    <div className='gap-y-3 flex flex-col'>
                      <div className='flex justify-between items-center'>
                        <p class="mt-2">Witness Name: </p> 
                        <p>_________________</p>
                        <p class="mt-2">{data.witnessInfo.name}</p>
                      </div>
                    
                     <div className='flex justify-between items-center'>
                        <p class="mt-2">Phone Number: </p> 
                        <p class="mt-2">{data.witnessInfo.phoneNumber}</p>
                      </div>

                      <div className='flex justify-between items-center'>
                        <p class="mt-2">Residence: </p> 
                        <p class="mt-2">{data.witnessInfo.residence}</p>
                      </div>

                    </div>
                  ) : <p>Witness Information Not Available</p>
      
                }

                
              </div>

              <div class="bg-white shadow-lg rounded-md p-4 mt-2 gap-y-3 flex flex-col">
                <div className='flex justify-between p-1'>
                  <h2 class="text-md font-semibold">Bank Information</h2>
                  <button 
                    title='Edit'
                    onClick={openBankModal}
                  >
                    <AiOutlineEdit />
                  </button>
                </div>
                
                <hr className='border-1'/>
                {
                  data.bankInfo ? (
                    <div className='gap-y-3 flex flex-col'>
                      <div className='flex justify-between items-center'>
                        <p class="mt-2">Bank Name: </p> 
                        <p>_________________</p>
                        <p class="mt-2">{data.bankInfo.bankName}</p>
                      </div>
                    
                      <div className='flex justify-between items-center'>
                        <p class="mt-2">Account Name: </p> 
                        <p class="mt-2">{data.bankInfo.accountName}</p>
                      </div>

                      <div className='flex justify-between items-center'>
                        <p class="mt-2">Account Number: </p> 
                        <p class="mt-2">{data.bankInfo.accountNumber}</p>
                      </div>
                    </div>
                  ) : <p>Bank Information Not Available</p>
      
                }  
              </div>
            </div>
        )
      }
    </div>
  )
}

export default LoanDetails
