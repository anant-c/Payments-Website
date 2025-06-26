import {useState} from 'react'
import Headings from '../components/Headings' 
import SubHeading from '../components/SubHeading'
import InputBox from '../components/InputBox'
import Button from '../components/Button'
import BottomWarning from '../components/BottomWarning'
import { useNavigate } from 'react-router-dom'
import axios from "axios"

const Signup = () => {

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  return (
    <div className='flex justify-center items-center bg-[#7F7F7F] min-h-screen'>
      <div className='flex flex-col items-center bg-white p-4 rounded-lg shadow-lg m-2'>
        <Headings label="Sign Up" />
        <SubHeading label="Enter your information to create an account" />

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
          <Button label="Sign Up" onClick={async () => {
            const response = await axios.post("http://localhost:3000/api/v1/user/signup",{
              username: email,
              firstName,
              lastName,
              password
            });

            localStorage.setItem("token", response.data.token)
            navigate("/dashboard")
          }} />
        </div>
        
        <BottomWarning label={"Already have an account?"} buttonText={"Sign in"} to={"/signin"} />
      </div>
    </div>
  )
}

export default Signup