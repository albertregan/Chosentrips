'use client';

import { useState } from 'react';

export default function FaqAccordion({ faqs }: { faqs: any[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0); // First one open by default

  return (
    <div className="space-y-4 max-w-3xl mx-auto">
      {faqs.map((faq, index) => (
        <div 
          key={faq.id} 
          className={`border border-surface-variant rounded-xl overflow-hidden transition-all duration-300 ${openIndex === index ? 'bg-surface-container-low shadow-md' : 'bg-white hover:bg-surface-container-lowest'}`}
        >
          <button 
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
            className="w-full px-6 py-5 text-left flex justify-between items-center focus:outline-none"
          >
            <span className="font-headline-md font-bold text-lg text-primary pr-8">{faq.question}</span>
            <span className={`material-symbols-outlined text-secondary transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''}`}>
              keyboard_arrow_down
            </span>
          </button>
          
          <div 
            className={`transition-all duration-300 ease-in-out ${openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
          >
            <div className="px-6 pb-6 text-on-surface-variant leading-relaxed">
              {faq.answer}
            </div>
          </div>
        </div>
      ))}
      {faqs.length === 0 && (
        <div className="text-center p-8 text-on-surface-variant italic border border-surface-variant rounded-xl">
          No FAQs available at the moment.
        </div>
      )}
    </div>
  );
}
