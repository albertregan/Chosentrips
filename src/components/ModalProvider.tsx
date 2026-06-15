'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import EnquiryForm from './EnquiryForm';

interface ModalContextType {
  openModal: (packageId?: string, packageName?: string) => void;
  closeModal: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export function ModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [modalData, setModalData] = useState<{ packageId?: string; packageName?: string }>({});

  const openModal = (packageId?: string, packageName?: string) => {
    setModalData({ packageId, packageName });
    setIsOpen(true);
    // Prevent scrolling when modal is open
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsOpen(false);
    setTimeout(() => {
      setModalData({});
      document.body.style.overflow = 'unset';
    }, 300); // Wait for transition
  };

  return (
    <ModalContext.Provider value={{ openModal, closeModal }}>
      {children}
      
      {/* Global Modal Overlay */}
      <div 
        className={`fixed inset-0 z-[100] flex items-center justify-center transition-all duration-300 ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
      >
        {/* Backdrop */}
        <div 
          className="absolute inset-0 bg-black/60 backdrop-blur-sm cursor-pointer"
          onClick={closeModal}
        ></div>

        {/* Modal Content */}
        <div 
          className={`relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-surface rounded-2xl luxury-shadow transition-all duration-300 transform ${isOpen ? 'translate-y-0 scale-100' : 'translate-y-8 scale-95'}`}
        >
          <button 
            onClick={closeModal}
            className="absolute top-6 right-6 z-50 w-10 h-10 bg-surface-container rounded-full flex items-center justify-center hover:bg-surface-variant transition-colors"
          >
            <span className="material-symbols-outlined text-primary">close</span>
          </button>
          
          <div className="p-8 md:p-12">
            <div className="-mt-12">
              <EnquiryForm packageId={modalData.packageId} packageName={modalData.packageName} isModal={true} onSuccess={closeModal} />
            </div>
          </div>
        </div>
      </div>
    </ModalContext.Provider>
  );
}

export function useModal() {
  const context = useContext(ModalContext);
  if (context === undefined) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
}
