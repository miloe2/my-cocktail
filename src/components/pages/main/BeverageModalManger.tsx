"use client";
import React from "react";
import BeverageModal from "./BeverageModal";
import useModalStore from "@/store/useModalStore";

const BeverageModalManger = () => {
  const { openModal } = useModalStore();
  const modalId = "beverage";

  return (
    <div>
      <button onClick={() => openModal(modalId)}>open</button>
      <BeverageModal modalId={modalId} />
    </div>
  );
};

export default BeverageModalManger;
