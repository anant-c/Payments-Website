import React from 'react'

const Appbar = () => {
  return (  
    <div className="border-gray-200 border-solid border-2 shadow-lg rounded-md m-2 h-14 flex items-center justify-between px-4">
        <div className='font-bold font-londrina'>
            <span className='text-[#172B75]'>pay</span>
            <span className='text-[#00BCF1]'>tm</span>
        </div>
        <div className='flex items-center gap-4'>
            <div >User</div>
            <div><img src="https://img.icons8.com/?size=100&id=rrtYnzKMTlUr&format=png&color=000000" alt="User Avatar" className='w-8 h-8 rounded-full' /></div>
        </div>
    </div>
  )
}

export default Appbar