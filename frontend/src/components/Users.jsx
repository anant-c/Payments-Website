import React, { useEffect, useState } from 'react'
import {Input} from '../components/ui/input'
import UserCard from './UserCard'
import axios from "axios"

const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000"

const Users = () => {
  const [users, setUsers] = useState([])
  const [filter, setFilter] = useState('')

  useEffect(() =>{
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${backendUrl}/api/v1/user/bulk/?filter=${filter}`,{
          headers:{
            Authorization: token
          }
        })
        setUsers(response.data.user)
      } catch (error) {
        console.error('Error fetching users:', error)
      }
    }
    const delayDebounce = setTimeout(()=>{
      fetchUsers()
    }, 1000)

    return ()=> clearTimeout(delayDebounce)
  }, [filter])

  return (
    <div className='flex flex-col gap-2'>
        <div className='text-2xl font-extrabold'>Users</div>
        <Input value={filter} onChange={(e) => setFilter(e.target.value)} placeholder="Search users..." />

        <div className='pt-5'>
            {users.map(user => (
              <UserCard key={user._id} userId={user._id} name={user.firstName} />
            ))}

            {users.length === 0 && (
              <div className='text-gray-500 text-center'>No users found</div>
            )}
        </div>

    </div>
  )
}

export default Users