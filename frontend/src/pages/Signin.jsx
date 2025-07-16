import {useState} from 'react'
import Headings from '../components/Headings'
import SubHeading from '../components/SubHeading'
import InputBox from '../components/InputBox'
import Button from '../components/Button'
import BottomWarning from '../components/BottomWarning'
import {useNavigate} from 'react-router-dom'
import axios from "axios"
import { Toaster } from '@/components/ui/sonner'
import { toast } from 'sonner'

const Signin = () => {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const navigate = useNavigate();

  const handleSignIn = async () => {
    if(isSubmitting) return; //prevent multiple submissions
    setIsSubmitting(true);

    try{
      const response = await axios.post("http://localhost:3000/api/v1/user/signin", {
        username: email,
        password: password
      });
      
      localStorage.setItem("token", "Bearer "+response.data.token);
      toast("Sign In Succesfull")
      setTimeout(()=>{
        navigate("/dashboard");
      },1000)
    }
    catch(error){
      console.error("Error during sign in:", error);
      const message = error?.response?.data?.message || "Something went wrong!";
      toast.error(message)
      // Handle error (e.g., show a notification)
    } finally {
      setIsSubmitting(false);
    }
   
  }
  return (
    <div className='flex justify-center items-center bg-[#7F7F7F] min-h-screen'>
      <Toaster/>
      <div className='flex flex-col items-center bg-white p-4 rounded-lg shadow-lg m-2'>
        <Headings label="Sign in" />
        <SubHeading label="Enter your credentials to enter your account." />

        <InputBox label="E-mail" onChange={(e)=>{
          setEmail(e.target.value)
        }} placeholder={"abcd@gmail.com"}></InputBox>

        <InputBox label="Password" onChange={(e)=>{
          setPassword(e.target.value)
        }} placeholder={"Abcd@12345"}></InputBox>

        <div className='pt-4'>
          <Button label="Sign in" onClick={handleSignIn} disabled={isSubmitting} />
        </div>

        <BottomWarning label={"Don't have an account?"} buttonText={"Sign Up"} to={"/signup"} />

      </div>
    </div>
  )
}

export default Signin