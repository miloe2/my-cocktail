'use client'
import React from 'react'
import BeverageModal from './BeverageModal'
import useModalStore from '@/store/useModalStore'


const BeverageModalManger = () => {
  const { isModalOpen, openModal, closeModal } = useModalStore();
  
  return (
    <div>
      <div>
        <button onClick={openModal}>open</button>
        <button onClick={closeModal}>close</button>
        {/* {isModalOpen && <BeverageModal></BeverageModal>} */}
      </div>
        <BeverageModal/>
    </div>
  )
}

export default BeverageModalManger