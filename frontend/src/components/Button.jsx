import React from 'react'

const Button = ({ label, onClick }) => {
  return (
    <button onClick={onClick} className='bg-[#18181A] text-white rounded-sm py-2 font-semibold w-xs'>
        {label}
    </button>
  )
}

export default Button 