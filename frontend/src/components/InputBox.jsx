import React from 'react'

const InputBox = ({label, placeholder, onChange}) => {
  return (
    <div className='py-2'>
        <div className='text-sm font-medium text-left py-2'>
            {label}
        </div>

        <input onChange={onChange} placeholder={placeholder} className='w-xs border rounded border-slate-200 px-3 py-1' />
    </div>
  )
}

export default InputBox