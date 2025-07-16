import {useState} from 'react'
import axios from 'axios'
import Headings from '../components/Headings'
import SubHeading from '@/components/SubHeading'
import InputBox from '@/components/InputBox'
import Button from '@/components/Button'
import { Toaster } from '@/components/ui/sonner'
import { toast } from 'sonner'
import { useNavigate, useSearchParams } from 'react-router-dom'


const SendMoney = () => {
  const [money, setMoney] = useState("")
  const [isSending, setIsSending] = useState(false)
  const navigate = useNavigate()
  const [searchParam] = useSearchParams()
  const id = searchParam.get("id")
  const name = searchParam.get("name")
  const handleSendMoney = async ()=>{
    if(isSending) return ; // don't wanna send again
    setIsSending(true)

    try{

      const token = localStorage.getItem('token')

      if(!token){
        navigate('/signin')
        return;
      }

      if (!id) {
        toast.error("Missing user information.");
        navigate('/dashboard');
        return;
      }
      
      const response = await axios.post("http://localhost:3000/api/v1/account/transfer",{
        amount: Number(money),
        to: id
      },{
        headers:{
          Authorization: token
        }
      })

      toast(response.data.message)

      setTimeout(()=>{  
        navigate('/dashboard')
      }, 1000)
    }
    catch(err){
      console.log(`Error during the transfer: ${err}`)
    }
    finally{
      setIsSending(false);
    }
  }

  return (
    <div className='flex justify-center items-center bg-[#7F7F7F] min-h-screen'>
      <Toaster></Toaster>
      <div className='flex flex-col text-center bg-white p-4 rounded-lg shadow-2xl m-2 shadow-gray-600'>
        <Headings label="Send Money" />
        <div className='flex items-center gap-4 '>
            <div className="relative">
              <img
                src="https://img.icons8.com/?size=100&id=rrtYnzKMTlUr&format=png&color=000000"
                className="w-8 h-8 rounded-full cursor-pointer"
                alt="User Avatar"
              />
            </div>
            <div className='font-extrabold'>{name}</div>
        </div>
        <InputBox label="Amount" onChange={(e)=>{
          setMoney(e.target.value)
        }} placeholder={"Enter Amount"}></InputBox>

        
        <div className='pt-4'>
          <Button label="Initiate Transfer" onClick={handleSendMoney} disabled={isSending} />
        </div>
      </div>
    </div>
  )
}

export default SendMoney