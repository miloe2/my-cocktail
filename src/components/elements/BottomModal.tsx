import React, { ReactNode } from 'react'
interface BottomModalProps {
  className? : String;
  // children : ReactNode[];
  children: React.ReactNode;
}

const BottomModal = ({className, children }:BottomModalProps) => {
  const modalClass = `${className} bg-stone-500 absolute bottom-0 w-full h-2/3 rounded-t-lg p-4 flex opacity-100`
  return (
    <div className={modalClass}>
      <div className='w-full h-full'>
        {children}
      </div>
    </div>
  )
}

export default BottomModal