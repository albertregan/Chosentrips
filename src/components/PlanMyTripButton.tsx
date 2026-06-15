'use client';

import { useModal } from './ModalProvider';

export default function PlanMyTripButton({ packageId, packageName, className, children }: { packageId?: string, packageName?: string, className?: string, children: React.ReactNode }) {
  const { openModal } = useModal();

  return (
    <button 
      onClick={() => openModal(packageId, packageName)}
      className={className}
    >
      {children}
    </button>
  );
}
