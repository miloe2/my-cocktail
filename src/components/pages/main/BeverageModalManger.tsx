"use client";
import React from "react";
import BeverageModal from "./BeverageModal";
import useModalStore from "@/store/useModalStore";

const BeverageModalManger = () => {
  const { openModal, closeModal } = useModalStore();
  const modalId = "beverage";

  return (
    <div>
      <div>
        <button onClick={() => openModal(modalId)}>open</button>
        <button onClick={() => closeModal(modalId)}>close</button>
        {/* {isModalOpen && <BeverageModal></BeverageModal>} */}
      </div>
      <BeverageModal modalId={modalId} />
    </div>
  );
};

export default BeverageModalManger;
