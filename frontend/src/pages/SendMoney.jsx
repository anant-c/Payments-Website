import {useState} from 'react'
import axios from 'axios'
import Headings from '../components/Headings'
import SubHeading from '@/components/SubHeading'
import InputBox from '@/components/InputBox'
import Button from '@/components/Button'

const SendMoney = ({to}) => {
  const [money, setMoney] = useState("")
  const [isSending, setIsSending] = useState(false)

  const handleSendMoney = async ()=>{
    if(isSending) return ; // don't wanna send again
    setIsSending(true)

    try{
      const response = await axios("http://localhost:3000/api/v1/account/transfer",{
      
      })
    }
    catch(err){
      console.log(`Error during the transfer: ${err}`)
    }
    finally{
      setIsSending(false);
    }
  }

  return (
    <div className='flex justify-center items-center bg-[#F3F5F7] min-h-screen'>
      <div className='flex flex-col items-center bg-white p-4 rounded-lg shadow-2xl m-2 shadow-gray-600'>
        <Headings label="Send Money" />
        <SubHeading label="Enter the details to send money." />

        <InputBox label="E-mail" onChange={(e)=>{
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