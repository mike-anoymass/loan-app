import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext, LoanContext } from '../helpers/Context'
import { LoanBasicInfo, LoanCollateralInfo } from "./forms/loanapplicationform"

const LoanApplication = () => {
  const context = useContext(AuthContext)
  const navigate = useNavigate()
  const [steps, setSteps] = useState(1)
  const [loanId, setLoanId] = useState(0)

  //only show when the user is logged in   
  useEffect(() => {
      if(context.authUser.googleId !== 0){
        !context.authUser.login_status && navigate("/")
      }
  }, [context.authUser])

  //increments to go to the next form - multi-step form
  const nextStep = () => {
    setSteps(steps => {return steps + 1})
  }

  //decrements to go to the previous form - multi-step form
  const prevStep = () => {
    setSteps(steps - 1)
  }

  return (
    //set loan context values
    <LoanContext.Provider value = {{ loanId, setLoanId }}>

      <div className='p-5 h-full w-full'>
          <div className='md:text-2xl font-semibold text-rose-500 w-full'>
              <p className='pb-3'>Apply for a Loan <br /> Here</p>
              <hr />
          </div>
          
          {/* defining header according to steps value - this is the same as case statement */}
          <div className='flex items-center justify-center p-5 h-full w-full flex-col overflow-auto'>
              {
                {
                  1: <p className='md:text-2xl text-lg animate-bounce  flex items-center justify-center font-light'>Step 1/4: Loan Basic Information</p>,
                  2: <p className='md:text-2xl text-lg animate-bounce  flex items-center justify-center font-light'>Step 2/4: Collateral Information</p>,
                  3: <p className='md:text-2xl text-xl animate-bounce  text-white font-light'>Step 3/4: Let us know your Income Source</p>,
                  4: <p className='md:text-2xl text-xl animate-bounce  text-white font-light'>Step 4/4: Let's Grab your Identity</p>,
                  5: <p className='md:text-2xl text-xl animate-bounce  text-white font-light'>Congratulations! Profile Created</p>
                }[steps] || <div>Nothing</div>
              }

              {/* defining forms according to steps value - this is the same as case statement */}
              <div className='bg-white md:w-1/2 w-full bg-opacity-40 p-6 rounded-lg shadow-sm flex flex-col  overflow-y-auto'>
                  {
                    {
                    1: <LoanBasicInfo nextStep={nextStep} />,
                    2: <LoanCollateralInfo nextStep={nextStep} prevStep={prevStep}/>,
                    3: <LoanBasicInfo nextStep={nextStep} prevStep={prevStep}/>,
                    4: <LoanBasicInfo prevStep={prevStep} nextStep={nextStep}/>,
                    5: <LoanBasicInfo/>
                    }[steps] || <div>Nothing</div>
                  }
              </div>
          </div>
          
      </div>

    </LoanContext.Provider>
  )
}

export default LoanApplication
