import React from 'react'
import { Button } from "@/components/ui/button"
import { useNavigate } from 'react-router-dom'

const UserCard = ({userId,name}) => {
  const navigate = useNavigate();
  return (
    <div className='flex justify-between items-center my-8'>
        <div className='flex'>
            <div><img src="https://img.icons8.com/?size=100&id=rrtYnzKMTlUr&format=png&color=000000" alt="User Avatar" className='w-[24px] h-[24px] rounded-full' /></div>
            <div className='ml-4 text-md font-bold'>{name}</div>
        </div>
        <Button onClick={()=>{navigate('/send?id=' + userId + "&name="+name)}}>
            Send Money
        </Button>
    </div>  
  )
}

export default UserCard