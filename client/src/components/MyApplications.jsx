import React, { useContext, useEffect, useMemo, useState } from 'react'
import axios from 'axios'
import { AuthContext } from '../helpers/Context'
import MyApplicationsTable from './tables/applicationstable/MyApplicationsTable'
import { COLUMNS } from "./tables/applicationstable/columns"
import { useNavigate, Link } from 'react-router-dom'

const MyApplications = () => {
  const [myLoans, setMyLoans] = useState([])
  const [loading, setLoading] = useState(true)
  const { authUser } = useContext(AuthContext)
  const navigate = useNavigate()

  const columns = useMemo(() => COLUMNS, [])

  useEffect(() => {

    if(authUser.googleId !== 0){
      !authUser.login_status && navigate("/")
    }

    if(authUser.googleId !== 0){
      axios.get(`http://localhost:3001/loanBasicInfo/myApplications/${authUser.googleId}`, {
        headers: {
          loginToken: localStorage.getItem("loginToken")
        }
      })
      .then(res => {
        setMyLoans(myLoans => {
          return res.data
        })

        setLoading(false)
      })
      .catch(err => {
        <p>err.message</p>
        setLoading(false)
      })
    }
    
  }, [authUser])

  return (
    <div className='w-full'>
      <h1 className='text-center text-xl font-light p-4 animate-bounce'>Pending Applications</h1>
      <hr />
      {
        loading ? <p className='w-full h-full text-center text-lg py-5'>Getting Loans ... Please wait</p> :
          myLoans.error ? (
              <div className='w-full text-center text-lg py-5 gap-y-10 flex flex-col justify-center items-center'>
                <p>{myLoans.error}</p>

                 <Link to="/category/newApplication" 
                  className="py-4 font-light px-5 border-2 rounded-xl bg-green-400">
                    Apply For a Loan Here
                 </Link>
              </div>              
            ) :
            <MyApplicationsTable columns={columns} data={myLoans} />
      }
    </div>
  )
}

export default MyApplications
