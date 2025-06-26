import React from 'react'
import {Input} from '../components/ui/input'
import UserCard from './UserCard'

const Users = () => {
  return (
    <div className='flex flex-col gap-2'>
        <div className='text-2xl font-extrabold'>Users</div>
        <Input></Input>

        <div className='pt-5'>
            <UserCard name={"Anant"}/>
            <UserCard name={"Aryan"}/>
            <UserCard name={"Lokesh"}/>
            <UserCard name={"Taklu"}/>
        </div>

    </div>
  )
}

export default Users