import { X } from "lucide-react";
import React, { useState } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className='fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-50'>
      <div className='flex-col bg-white w-72 p-4 rounded shadow-lg'>
        <div className='flex justify-end'>
          <button
            onClick={onClose}
            className='text-gray-500 hover:text-red-500'
          >
            <X />
          </button>
        </div>
        <div className='flex justify-center mb-4'>
          <h2 className='text-xl font-semibold '>{title}</h2>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
