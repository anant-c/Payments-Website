import { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000"

const Appbar = () => {
  const [name, setName] = useState("");
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(()=>{
    const fetchName = async()=>{
      const token = localStorage.getItem("token");
      const userData = await axios.get(`${backendUrl}/api/v1/user/profile`,{
        headers:{
          Authorization: token
        }
      })

      setName(userData.data.firstName)
    }

    fetchName()
  },[])

  const handleLogOut = ()=>{
    localStorage.removeItem("token")
    navigate('/signin')
  }
  
  return (  
    <div className="border-gray-200 border-solid border-2 shadow-lg rounded-md m-2 h-14 flex items-center justify-between px-4">
        <div className='font-bold font-londrina'>
            <span className='text-[#172B75]'>pay</span>
            <span className='text-[#00BCF1]'>tm</span>
        </div>
        <div className='flex items-center gap-4'>
            <div >Hi! {name}</div>
            <div className="relative">
              <img
                src="https://img.icons8.com/?size=100&id=rrtYnzKMTlUr&format=png&color=000000"
                onClick={() => setOpen(!open)}
                className="w-8 h-8 rounded-full cursor-pointer"
                alt="User Avatar"
              />
              {open && (
                <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow flex flex-col">
                    <button className="p-2 hover:bg-gray-100 cursor-pointer" onClick={()=> navigate('/edit')}>Edit Profile</button>
                    <button className="p-2 hover:bg-gray-100 cursor-pointer" onClick= {handleLogOut}>Logout</button>
                </div>
              )}
            </div>
        </div>
    </div>
  )
}

export default Appbar