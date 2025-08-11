import {useEffect, useState, lazy} from 'react'
import { useNavigate } from 'react-router-dom'
import Appbar from '../components/Appbar'
import Balance from '../components/Balance'
import Users from '../components/Users'
import axios from 'axios'
const Loader = lazy(() => import('../components/Loader'));
const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000"

const Dashboard = () => {

  const navigate = useNavigate();
  const [loading, setLoading] = useState(true)
  const [amount , setAmount ] = useState('');

  useEffect(()=>{
    const checkAuth = async ()=> {
      const token = localStorage.getItem('token')

      if(!token){
        navigate('/signin')
        return;
      }

      try{
        const res = await axios.get(`${backendUrl}/api/v1/user/protected-route`,{
          headers :{
            Authorization : token
          }
        })

        const amountreq = await axios.get(`${backendUrl}/api/v1/account/balance`,{
          headers:{
            Authorization: token
          }
        })
        setAmount(amountreq.data.balance)

        if(res.status !== 200){
          navigate('/signin')
        }
        else{
          setLoading(false); 
        }
      }
      catch(err){
        navigate('/signin')
      }
      
    }
    checkAuth()
  }, [navigate])

  if(loading){
    return <Loader/>
  }

  return (
    <div>
      <Appbar />
      <div className='m-8'>
        <Balance value= {amount}/>
        <Users />
      </div>
    </div>
  )
}

export default Dashboard