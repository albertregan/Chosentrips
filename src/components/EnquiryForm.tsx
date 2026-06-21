'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function EnquiryForm({ packageId, packageName, isModal, onSuccess }: { packageId?: string, packageName?: string, isModal?: boolean, onSuccess?: () => void }) {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    destination: packageName || '',
    preferred_date: '',
    no_of_nights: '',
    no_of_adults: 2,
    no_of_children: 0,
    children_ages: [] as string[],
    budget: '',
    budget_type: 'total',
    message: '',
    name: '',
    email: '',
    phone_number: '',
    referral_name: '',
    plan_summary: '',
    customer_type: 'Family'
  });

  const handleChildrenChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const count = parseInt(e.target.value) || 0;
    setFormData({
      ...formData,
      no_of_children: count,
      children_ages: Array(count).fill('')
    });
  };

  const handleAgeChange = (index: number, value: string) => {
    const newAges = [...formData.children_ages];
    newAges[index] = value;
    setFormData({ ...formData, children_ages: newAges });
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 4) {
      nextStep();
      return;
    }

    setLoading(true); setError(''); setSuccess(false);

    const submissionData = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone_number,
      message: formData.message,
      package_id: packageId || null,
      destination: formData.destination,
      preferred_date: formData.preferred_date || null,
      no_of_nights: parseInt(formData.no_of_nights as string) || null,
      no_of_adults: formData.no_of_adults,
      no_of_children: formData.no_of_children,
      children_ages: formData.children_ages,
      budget: parseFloat(formData.budget as string) || null,
      budget_type: formData.budget_type,
      referral_name: formData.referral_name || null,
      plan_summary: formData.plan_summary || null,
      customer_type: formData.customer_type
    };

    const { error: submitError } = await supabase.from('leads').insert([submissionData]);

    setLoading(false);
    if (submitError) {
      console.error(submitError);
      setError('There was an error submitting your enquiry. Please try again.');
    } else {
      setSuccess(true);
      if (onSuccess) {
        setTimeout(onSuccess, 3000); // Close modal after 3 seconds on success
      }
    }
  };

  if (success) {
    return (
      <div className={`bg-surface/95 backdrop-blur-md p-12 text-center rounded-2xl ${!isModal ? 'border border-surface-variant luxury-shadow' : ''}`}>
        <h3 className="font-headline-md text-[32px] text-primary font-bold mb-4">Journey Requested</h3>
        <p className="text-on-surface-variant text-lg">Thank you, {formData.name}. Our luxury travel curators will review your preferences and contact you shortly.</p>
      </div>
    );
  }

  const inputClasses = "w-full border-b-2 border-surface-container-highest focus:border-secondary bg-transparent px-4 py-3 text-primary font-medium focus:outline-none transition-colors";
  const labelClasses = "block text-label-sm font-label-sm text-on-surface-variant mb-1 uppercase tracking-widest";

  return (
    <div className={`${isModal ? 'pt-8' : 'sticky top-28 bg-surface/95 backdrop-blur-xl p-8 md:p-12 border border-surface-variant luxury-shadow rounded-2xl'}`}>
      <div className="flex justify-between mb-8 border-b border-surface-variant pb-6">
        <span className={`text-xs uppercase tracking-widest font-bold ${step === 1 ? 'text-secondary' : 'text-outline-variant'}`}>01. The Trip</span>
        <span className={`text-xs uppercase tracking-widest font-bold ${step === 2 ? 'text-secondary' : 'text-outline-variant'}`}>02. Travelers</span>
        <span className={`text-xs uppercase tracking-widest font-bold ${step === 3 ? 'text-secondary' : 'text-outline-variant'}`}>03. Details</span>
        <span className={`text-xs uppercase tracking-widest font-bold ${step === 4 ? 'text-secondary' : 'text-outline-variant'}`}>04. Contact</span>
      </div>

      <h3 className="font-headline-md text-[32px] text-primary font-bold mb-6">
        {packageName ? `Enquire about ${packageName}` : 'Curate Your Journey'}
      </h3>
      
      {error && <div className="bg-error-container text-on-error-container p-4 mb-6 rounded-lg text-sm">{error}</div>}

      <form onSubmit={handleSubmit}>
        
        {/* STEP 1: The Trip */}
        {step === 1 && (
          <div className="space-y-6 animate-fade-in">
            <div>
              <label className={labelClasses}>Destination</label>
              <input required type="text" className={inputClasses} value={formData.destination} onChange={(e) => setFormData({...formData, destination: e.target.value})} placeholder="Where would you like to go?" />
            </div>
            <div>
              <label className={labelClasses}>Preferred Start Date</label>
              <input type="date" className={inputClasses} value={formData.preferred_date} onChange={(e) => setFormData({...formData, preferred_date: e.target.value})} />
            </div>
            <div>
              <label className={labelClasses}>Number of Nights</label>
              <input type="number" min="1" className={inputClasses} value={formData.no_of_nights} onChange={(e) => setFormData({...formData, no_of_nights: e.target.value})} placeholder="e.g. 7" />
            </div>
          </div>
        )}

        {/* STEP 2: Travelers */}
        {step === 2 && (
          <div className="space-y-6 animate-fade-in">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className={labelClasses}>Adults</label>
                <input type="number" min="1" className={inputClasses} value={formData.no_of_adults} onChange={(e) => setFormData({...formData, no_of_adults: parseInt(e.target.value) || 1})} />
              </div>
              <div>
                <label className={labelClasses}>Children</label>
                <input type="number" min="0" className={inputClasses} value={formData.no_of_children} onChange={handleChildrenChange} />
              </div>
            </div>

            <div>
              <label className={labelClasses}>Customer Type</label>
              <select className={`${inputClasses} bg-white rounded-lg border border-surface-variant`} value={formData.customer_type} onChange={(e) => setFormData({...formData, customer_type: e.target.value})}>
                <option value="Family">Family</option>
                <option value="Honeymooners">Honeymooners</option>
                <option value="Friends">Friends</option>
                <option value="Children friendly">Children friendly</option>
                <option value="Solo Travelers">Solo Travelers</option>
              </select>
            </div>

            {formData.no_of_children > 0 && (
              <div className="p-6 bg-surface-container rounded-xl mt-6">
                <label className="block text-primary font-bold mb-4">Ages of Children at time of travel</label>
                <div className="grid grid-cols-2 gap-4">
                  {formData.children_ages.map((age, index) => (
                    <div key={index}>
                      <select required className={`${inputClasses} bg-white rounded-lg border border-surface-variant`} value={age} onChange={(e) => handleAgeChange(index, e.target.value)}>
                        <option value="">Select Age</option>
                        {Array.from({length: 18}, (_, i) => i).map(num => (
                          <option key={num} value={num}>{num} {num === 1 ? 'year' : 'years'} old</option>
                        ))}
                      </select>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* STEP 3: Details */}
        {step === 3 && (
          <div className="space-y-6 animate-fade-in">
            <div>
              <label className={labelClasses}>Budget Range</label>
              <div className="flex gap-4 mb-4">
                <button type="button" onClick={() => setFormData({...formData, budget_type: 'total'})} className={`flex-1 py-3 rounded-lg font-bold transition-all border ${formData.budget_type === 'total' ? 'bg-primary text-on-primary border-primary' : 'bg-transparent text-primary border-surface-variant hover:border-primary'}`}>Total Budget</button>
                <button type="button" onClick={() => setFormData({...formData, budget_type: 'per_person'})} className={`flex-1 py-3 rounded-lg font-bold transition-all border ${formData.budget_type === 'per_person' ? 'bg-primary text-on-primary border-primary' : 'bg-transparent text-primary border-surface-variant hover:border-primary'}`}>Per Person</button>
              </div>
              <input type="number" className={inputClasses} value={formData.budget} onChange={(e) => setFormData({...formData, budget: e.target.value})} placeholder="Amount in ₹" />
            </div>

            <div>
              <label className={labelClasses}>Specific Requirements / Occasion</label>
              <textarea rows={3} className={`${inputClasses} resize-none`} value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})} placeholder="Honeymoon, dietary requirements, specific hotels..."></textarea>
            </div>

            <div>
              <label className={labelClasses}>Plan Summary</label>
              <textarea rows={3} className={`${inputClasses} resize-none`} value={formData.plan_summary} onChange={(e) => setFormData({...formData, plan_summary: e.target.value})} placeholder="Briefly summarize your ideal trip plan..."></textarea>
            </div>
          </div>
        )}

        {/* STEP 4: Contact */}
        {step === 4 && (
          <div className="space-y-6 animate-fade-in">
            <div>
              <label className={labelClasses}>Full Name</label>
              <input required type="text" className={inputClasses} value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
            </div>
            <div>
              <label className={labelClasses}>Email Address</label>
              <input required type="email" className={inputClasses} value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
            </div>
            <div>
              <label className={labelClasses}>Phone Number</label>
              <input required type="tel" className={inputClasses} value={formData.phone_number} onChange={(e) => setFormData({...formData, phone_number: e.target.value})} />
            </div>
            <div>
              <label className={labelClasses}>Referral Name / Source (Optional)</label>
              <input type="text" className={inputClasses} value={formData.referral_name} onChange={(e) => setFormData({...formData, referral_name: e.target.value})} placeholder="How did you hear about us?" />
            </div>
          </div>
        )}

        <div className="flex gap-4 mt-10">
          {step > 1 && (
            <button type="button" onClick={prevStep} className="flex-1 py-4 border border-surface-variant text-primary font-bold rounded-lg hover:bg-surface-container transition-colors">
              Back
            </button>
          )}
          <button type="submit" disabled={loading} className="flex-[2] bg-primary text-on-primary py-4 font-bold rounded-lg hover:bg-opacity-90 transition-all luxury-shadow">
            {step < 4 ? 'Next Step' : (loading ? 'Submitting...' : 'Submit Request')}
          </button>
        </div>
      </form>
    </div>
  );
}
