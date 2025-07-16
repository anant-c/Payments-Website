import {useState} from 'react'
import Headings from '../components/Headings' 
import SubHeading from '../components/SubHeading'
import InputBox from '../components/InputBox'
import Button from '../components/Button'
import { Toaster } from '@/components/ui/sonner'
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'
import axios from "axios"


const EditProfile = () => {

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

  return (
    <div className='flex justify-center items-center bg-[#7F7F7F] min-h-screen'>

        <Toaster/>
      <div className='flex flex-col items-center bg-white p-4 rounded-lg shadow-lg m-2'>
        <Headings label="Edit Profile" />
        <SubHeading label="Edit your account details." />

        <InputBox label="First Name" onChange={(e)=>{
          setFirstName(e.target.value)
        }} placeholder={"Anant"}></InputBox>

        <InputBox label="Last Name" onChange={(e)=>{
          setLastName(e.target.value)
        }} placeholder={"Chaudhary"}></InputBox>

        <InputBox label="E-mail" onChange={(e)=>{
          setEmail(e.target.value)
        }} placeholder={"abcd@gmail.com"}></InputBox>

        <InputBox label="Password" onChange={(e)=>{
          setPassword(e.target.value)
        }} placeholder={"Abcd@12345"}></InputBox>

        <div className='pt-4'>
          <Button label="Edit Profile" onClick={async () => {
            const token = localStorage.getItem("token")
            
            const response = await axios.put("http://localhost:3000/api/v1/user/",{
              ...(email && {username: email}),
              ...(firstName && {firstName}),
              ...(lastName && {lastName}),
              ...(password && {password})
            },
            {
                headers:{
                    Authorization: token,
                    "Content-Type": "application/json"
                }
            }
            );
            toast("Profile updated successfully.");
            setTimeout(() => {
                navigate("/dashboard");
            }, 1000); // Delay by 2 seconds
          }} />
        </div>
        
      </div>
    </div>
  )
}

export default EditProfile