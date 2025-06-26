import React from 'react'
import { Button } from "@/components/ui/button"

const UserCard = ({name}) => {
  return (
    <div className='flex justify-between items-center my-8'>
        <div className='flex'>
            <div><img src="https://img.icons8.com/?size=100&id=rrtYnzKMTlUr&format=png&color=000000" alt="User Avatar" className='w-[24px] h-[24px] rounded-full' /></div>
            <div className='ml-4 text-md font-bold'>{name}</div>
        </div>
        <Button>
            Send Money
        </Button>
    </div>
  )
}

export default UserCard