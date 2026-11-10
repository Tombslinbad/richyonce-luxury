/**
 * RICHYONCE CLOTHING - PRIVATE ATELIER APPOINTMENT BOOKING MODAL
 * Collects client particulars, scheduled dates, and registers honest bookings.
 */

import React, { useState } from 'react';
import { X, Calendar, Clock, MapPin, Check, Sparkles, AlertCircle } from 'lucide-react';
import { atelierStore } from '../services/store';

interface AppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AppointmentModal: React.FC<AppointmentModalProps> = ({ isOpen, onClose }) => {
  const [customerName, setCustomerName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [appointmentType, setAppointmentType] = useState<
    'Private Atelier Fitting' | 'Bespoke Consultation' | 'Wedding Entourage Styling' | 'Virtual Wardrobe Review'
  >('Private Atelier Fitting');
  const [preferredDate, setPreferredDate] = useState('');
  const [preferredTime, setPreferredTime] = useState('11:00 AM');
  const [locationType, setLocationType] = useState<
    'Lagos Atelier' | 'Abuja Atelier' | 'Abakaliki Atelier' | 'Virtual Video'
  >('Lagos Atelier');
  const [notes, setNotes] = useState('');

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [bookedId, setBookedId] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!customerName.trim()) {
      setErrorMessage('Please provide your name for the appointment guest list.');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setErrorMessage('Please provide a valid email address.');
      return;
    }
    if (!phone.trim()) {
      setErrorMessage('Please provide your phone number.');
      return;
    }
    if (!preferredDate) {
      setErrorMessage('Please pick your preferred consultation date.');
      return;
    }

    const apt = atelierStore.createAppointment({
      customerName,
      email,
      phone,
      appointmentType,
      preferredDate,
      preferredTime,
      locationType,
      notes,
    });

    setBookedId(apt.id);
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setBookedId(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="relative w-full max-w-xl bg-[#091C16] border border-[#E5C07B]/30 rounded-2xl shadow-2xl overflow-hidden text-white my-8">
        {/* Header */}
        <div className="p-6 border-b border-white/10 flex items-center justify-between bg-[#06140F]">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-[#E5C07B]" />
            <h2 className="font-serif text-xl font-bold tracking-wide">
              ATELIER CONSULTATION
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-white/60 hover:text-white rounded-full hover:bg-white/5 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {isSubmitted ? (
          <div className="p-8 text-center space-y-5 animate-fadeIn">
            <div className="w-16 h-16 rounded-full bg-[#E5C07B]/20 border border-[#E5C07B] flex items-center justify-center mx-auto text-[#E5C07B]">
              <Check className="w-8 h-8" />
            </div>

            <div>
              <span className="text-[11px] font-mono uppercase tracking-widest text-[#E5C07B] font-semibold">
                APPOINTMENT CODE: {bookedId}
              </span>
              <h3 className="font-serif text-2xl font-bold text-white mt-1">
                Your Atelier Fitting is Scheduled
              </h3>
              <p className="text-xs sm:text-sm text-white/70 max-w-md mx-auto mt-2 leading-relaxed">
                Thank you, {customerName}. A dedicated Richyonce Concierge has reserved your slot for{' '}
                <strong className="text-white">{preferredDate} at {preferredTime}</strong> at our {locationType}.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-black/40 border border-white/10 text-xs text-white/80 max-w-md mx-auto text-left space-y-1">
              <p><span className="text-[#E5C07B]">Consultation:</span> {appointmentType}</p>
              <p><span className="text-[#E5C07B]">Venue:</span> {locationType}</p>
              <p><span className="text-[#E5C07B]">Confirmation:</span> Sent to {email}</p>
            </div>

            <button
              onClick={handleReset}
              className="px-8 py-3 rounded-lg text-xs font-semibold tracking-widest uppercase bg-[#E5C07B] text-[#0A231C] hover:bg-[#F3DCA2] transition-colors"
            >
              RETURN TO ATELIER
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-5 text-xs">
            {errorMessage && (
              <div className="p-3 rounded-lg bg-red-950/60 border border-red-500/40 text-red-200 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="block text-white/70 mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="e.g. Kolawole Davies"
                  className="w-full px-3 py-2 rounded bg-[#06150F] border border-white/15 focus:border-[#E5C07B] focus:outline-none text-white"
                />
              </div>

              <div>
                <label className="block text-white/70 mb-1">Email Address *</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="client@domain.com"
                  className="w-full px-3 py-2 rounded bg-[#06150F] border border-white/15 focus:border-[#E5C07B] focus:outline-none text-white"
                />
              </div>

              <div>
                <label className="block text-white/70 mb-1">Phone / WhatsApp *</label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+234 802 000 0000"
                  className="w-full px-3 py-2 rounded bg-[#06150F] border border-white/15 focus:border-[#E5C07B] focus:outline-none text-white"
                />
              </div>

              <div>
                <label className="block text-white/70 mb-1">Consultation Nature</label>
                <select
                  value={appointmentType}
                  onChange={(e) => setAppointmentType(e.target.value as any)}
                  className="w-full px-3 py-2 rounded bg-[#06150F] border border-white/15 focus:border-[#E5C07B] focus:outline-none text-white"
                >
                  <option value="Private Atelier Fitting">Private Atelier Fitting</option>
                  <option value="Bespoke Consultation">Bespoke Consultation</option>
                  <option value="Wedding Entourage Styling">Wedding Entourage Styling</option>
                  <option value="Virtual Wardrobe Review">Virtual Wardrobe Review</option>
                </select>
              </div>

              <div>
                <label className="block text-white/70 mb-1">Preferred Date *</label>
                <input
                  type="date"
                  required
                  value={preferredDate}
                  onChange={(e) => setPreferredDate(e.target.value)}
                  className="w-full px-3 py-2 rounded bg-[#06150F] border border-white/15 focus:border-[#E5C07B] focus:outline-none text-white"
                />
              </div>

              <div>
                <label className="block text-white/70 mb-1">Preferred Time Window</label>
                <select
                  value={preferredTime}
                  onChange={(e) => setPreferredTime(e.target.value)}
                  className="w-full px-3 py-2 rounded bg-[#06150F] border border-white/15 focus:border-[#E5C07B] focus:outline-none text-white"
                >
                  <option value="10:00 AM">10:00 AM - 11:30 AM</option>
                  <option value="01:00 PM">01:00 PM - 02:30 PM</option>
                  <option value="03:30 PM">03:30 PM - 05:00 PM</option>
                  <option value="05:30 PM">05:30 PM - 07:00 PM (VIP Evening)</option>
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-white/70 mb-1">Location or Virtual Preference</label>
                <select
                  value={locationType}
                  onChange={(e) => setLocationType(e.target.value as any)}
                  className="w-full px-3 py-2 rounded bg-[#06150F] border border-white/15 focus:border-[#E5C07B] focus:outline-none text-white"
                >
                  <option value="Lagos Atelier">Lagos Flagship Atelier (Ikoyi)</option>
                  <option value="Abuja Atelier">Abuja Private Showroom (Maitama)</option>
                  <option value="Abakaliki Atelier">Abakaliki Heritage House (Ebonyi State)</option>
                  <option value="Virtual Video">Virtual Video Consultation (Global)</option>
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-white/70 mb-1">Special Tailoring or Garment Notes</label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g. Groom look with 6 groomsmen agbada sets for December ceremony."
                  className="w-full px-3 py-2 rounded bg-[#06150F] border border-white/15 focus:border-[#E5C07B] focus:outline-none text-white resize-none"
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3.5 rounded-lg text-xs font-semibold tracking-widest uppercase bg-[#E5C07B] text-[#0A231C] hover:bg-[#F3DCA2] transition-colors cursor-pointer shadow-lg shadow-[#E5C07B]/15"
              >
                CONFIRM ATELIER RESERVATION
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
