"use client";

import { usePathname } from 'next/navigation';
import React from 'react';

export default function WhatsAppButton() {
  const pathname = usePathname();

  // Hide on admin pages
  if (pathname?.startsWith('/admin')) {
    return null;
  }

  return (
    <a
      href="https://wa.me/919986399793"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 bg-green-500 rounded-full shadow-xl hover:bg-green-600 hover:scale-110 transition-all duration-300"
      aria-label="Chat with us on WhatsApp"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-8 h-8 text-white"
      >
        <path d="M12.031 0C5.385 0 0 5.385 0 12.031c0 2.127.554 4.195 1.606 6.009L.452 22.427l4.52-1.185A11.968 11.968 0 0012.031 24c6.645 0 12.03-5.385 12.03-12.03C24.06 5.385 18.675 0 12.031 0zm0 22.016c-1.803 0-3.565-.483-5.111-1.4l-.367-.217-3.358.88.896-3.276-.239-.38A9.977 9.977 0 012.015 12.03c0-5.545 4.516-10.061 10.016-10.061 5.545 0 10.061 4.516 10.061 10.061 0 5.545-4.516 10.06-10.061 10.06zm5.514-7.536c-.302-.152-1.787-.88-2.063-.981-.277-.101-.478-.152-.68.152-.202.303-.781.981-.957 1.183-.176.202-.352.228-.654.076-1.521-.765-2.617-1.41-3.626-3.15-.101-.177-.01-.274.141-.425.136-.137.302-.354.453-.531.152-.177.202-.303.303-.505.101-.202.05-.38-.026-.531-.076-.152-.68-1.643-.932-2.25-.246-.593-.496-.513-.68-.522-.176-.01-.378-.01-.58-.01s-.53.076-.807.38c-.277.303-1.058 1.034-1.058 2.52 0 1.487 1.084 2.924 1.235 3.126.152.202 2.13 3.253 5.161 4.561.721.311 1.283.497 1.722.636.723.23 1.382.197 1.899.119.58-.088 1.787-.73 2.038-1.436.252-.706.252-1.31.176-1.436-.075-.126-.276-.202-.578-.353z" />
      </svg>
    </a>
  );
}
