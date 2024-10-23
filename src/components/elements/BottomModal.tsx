import React, { ReactNode } from 'react'
interface BottomModalProps {
  className? : String;
  // children : ReactNode[];
  children: React.ReactNode;
}

const BottomModal = ({className, children }:BottomModalProps) => {
  const modalClass = `${className} bg-stone-500 absolute bottom-0 max-w-3xl w-full max-h-[50%] rounded-t-lg px-4 flex left-1/2 -translate-x-1/2 overflow-y-auto`
  return (
    <div className={modalClass}>
      <div className='w-full h-full'>
        {children}
      </div>
    </div>
  )
}

export default BottomModal