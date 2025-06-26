import React from 'react'

const Balance = ({value}) => {
  return (
    <div className='flex items-center text-2xl pb-5'>
        <span className='font-bold'>
            Your Balance: 
        </span>
        <img src="https://img.icons8.com/material-outlined/24/rupee.png" className='w-[24px] h-[24px]'/>
        <span>{value}</span>
    </div>
  )
}

export default Balance