import React from "react";
import { destroyModal } from "../../utils/modalHooks";
import ButtonPrimary from "../CommonComponents/ButtonPrimary";

const ConfirmationModal = (data) => {
  const title = data.data?.title;
  const text = data.data?.text;
  const handleConfirm = () => {
    data.data.onConfirm();
    destroyModal();
  };
  const handleDecline = () => {
    destroyModal();
  };
  return (
    <div className="flex flex-col items-center justify-center gap-5 p-5 w-30">
      <h2 className="text-lg">{title}</h2>
      <p>{text}</p>
      <div className="flex justify-center gap-5 mx-auto text-center">
        <ButtonPrimary onClick={handleConfirm}>YES</ButtonPrimary>
        <ButtonPrimary onClick={handleDecline}>NO</ButtonPrimary>
      </div>
    </div>
  );
};

export default ConfirmationModal;
