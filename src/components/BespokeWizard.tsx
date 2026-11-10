/**
 * RICHYONCE CLOTHING - BESPOKE DIGITAL ATELIER WIZARD
 * 4-Step Interactive Atelier experience matching the reference website.
 * High-contrast architectural atelier design with persistent form state.
 */

import React, { useState } from 'react';
import {
  Check,
  ChevronRight,
  ChevronLeft,
  Copy,
  Sparkles,
  Scissors,
  Calendar,
  Layers,
  Ruler,
  ExternalLink,
} from 'lucide-react';
import {
  GarmentType,
  OccasionType,
  FabricChoice,
  ArtistryCustomization,
  ManualMeasurements,
  InPersonFittingPreference,
} from '../types';
import { BRAND_ASSETS } from '../config/brandAssets';
import { atelierStore } from '../services/store';

interface BespokeWizardProps {
  onTrackReference: (ref: string) => void;
}

export const BespokeWizard: React.FC<BespokeWizardProps> = ({ onTrackReference }) => {
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4>(1);

  // Form State
  const [selectedGarment, setSelectedGarment] = useState<GarmentType>('Suit');
  const [selectedOccasion, setSelectedOccasion] = useState<OccasionType>('Wedding');
  const [selectedFabric, setSelectedFabric] = useState<FabricChoice>('Brocade');
  const [selectedCustomizations, setSelectedCustomizations] = useState<ArtistryCustomization[]>([
    'Embroidery',
    'Monogram',
  ]);

  // Fit Preference
  const [fitType, setFitType] = useState<'manual' | 'in-person'>('in-person');

  // Manual Measurements
  const [unit, setUnit] = useState<'inches' | 'cm'>('inches');
  const [measurements, setMeasurements] = useState<ManualMeasurements>({
    chest: '40',
    waist: '34',
    shoulder: '18.5',
    sleeveLength: '26',
    trouserLength: '42',
    height: '6ft 1in',
    unit: 'inches',
    additionalNotes: '',
  });

  // In-Person Fitting
  const [fittingDetails, setFittingDetails] = useState<InPersonFittingPreference>({
    customerName: '',
    email: '',
    phone: '',
    preferredDate: '',
    preferredTime: '11:00 AM',
    locationPreference: 'Lagos Atelier (Ikoyi)',
  });

  // Generated Reference
  const [generatedRef, setGeneratedRef] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  // Garment Types with SVG Line Visuals
  const garmentOptions: { type: GarmentType; label: string; icon: string }[] = [
    { type: 'Traditional Wedding', label: 'Traditional Wedding', icon: 'M12 2L4 7v13l8 2 8-2V7l-8-5z' },
    { type: 'Agbada', label: 'Agbada', icon: 'M3 8l9-5 9 5v12l-9 4-9-4z' },
    { type: 'Senator', label: 'Senator', icon: 'M5 3h14l-2 18H7L5 3z' },
    { type: 'Suit', label: 'Suit', icon: 'M6 2h12v20H6z' },
    { type: 'Shirt', label: 'Shirt', icon: 'M4 4h16v16H4z' },
    { type: 'Trousers', label: 'Trousers', icon: 'M8 2h8v20h-3l-1-10-1 10H8z' },
    { type: 'Full Outfit', label: 'Full Outfit', icon: 'M7 2h10v8H7z M5 11h14v11H5z' },
  ];

  const occasions: OccasionType[] = [
    'Wedding',
    'Red Carpet',
    'Business',
    'Everyday Luxury',
    'Birthday',
    'Church',
  ];

  const fabrics: { name: FabricChoice; desc: string; color: string }[] = [
    { name: 'Ankara', desc: 'Vibrant authentic wax print', color: '#B3541E' },
    { name: 'Brocade', desc: 'Lustrous embossed jacquard', color: '#C8A86B' },
    { name: 'Aso-Oke', desc: 'Handwoven royal Yoruba heritage textile', color: '#1A362B' },
    { name: 'Cotton', desc: 'Breathable long-staple Egyptian cotton', color: '#E8E8E8' },
    { name: 'Linen', desc: 'Airy European flax with natural slub', color: '#D9CDB8' },
    { name: 'Velvet', desc: 'Plush crushed German royal velvet', color: '#1F1E24' },
  ];

  const customizationsList: ArtistryCustomization[] = [
    'Embroidery',
    'Beading',
    'Appliqué',
    'Layering',
    'Custom Buttons',
    'Monogram',
  ];

  const toggleCustomization = (item: ArtistryCustomization) => {
    if (selectedCustomizations.includes(item)) {
      setSelectedCustomizations(selectedCustomizations.filter((c) => c !== item));
    } else {
      setSelectedCustomizations([...selectedCustomizations, item]);
    }
  };

  const handleNextStep = () => {
    setValidationError(null);

    if (currentStep === 1) {
      setCurrentStep(2);
      return;
    }

    if (currentStep === 2) {
      setCurrentStep(3);
      return;
    }

    if (currentStep === 3) {
      // Validate Step 3
      if (fitType === 'in-person') {
        if (!fittingDetails.customerName.trim()) {
          setValidationError('Please provide your full name for the fitting appointment.');
          return;
        }
        if (!fittingDetails.email.trim() || !fittingDetails.email.includes('@')) {
          setValidationError('Please provide a valid email address.');
          return;
        }
        if (!fittingDetails.phone.trim()) {
          setValidationError('Please provide your phone number for SMS and WhatsApp dispatch.');
          return;
        }
        if (!fittingDetails.preferredDate) {
          setValidationError('Please select a preferred fitting date.');
          return;
        }
      } else {
        if (!measurements.chest || !measurements.waist || !measurements.height) {
          setValidationError('Please enter at least Chest, Waist, and Height measurements.');
          return;
        }
      }

      // Generate reference & persist to store
      const customerName = fitType === 'in-person' ? fittingDetails.customerName : 'VIP Atelier Client';
      const customerEmail = fitType === 'in-person' ? fittingDetails.email : 'client@richyonce.com';
      const customerPhone = fitType === 'in-person' ? fittingDetails.phone : '+234 800 000 0000';

      const newRequest = atelierStore.createBespokeRequest({
        garment: selectedGarment,
        occasion: selectedOccasion,
        fabric: selectedFabric,
        customizations: selectedCustomizations,
        fitType,
        measurements: fitType === 'manual' ? measurements : undefined,
        fittingDetails: fitType === 'in-person' ? fittingDetails : undefined,
        customerName,
        customerEmail,
        customerPhone,
        notes: measurements.additionalNotes || 'Bespoke commission submitted via digital atelier wizard.',
      });

      setGeneratedRef(newRequest.reference);
      setCurrentStep(4);
    }
  };

  const copyRefToClipboard = () => {
    if (generatedRef) {
      navigator.clipboard.writeText(generatedRef);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <section id="bespoke" className="py-20 lg:py-28 bg-[#091C16] relative border-b border-[#E5C07B]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Kicker & Title */}
        <div className="mb-10 text-center sm:text-left">
          <span className="text-xs font-semibold tracking-[0.3em] uppercase text-[#E5C07B] block mb-2 font-sans">
            CREATE YOUR LOOK
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
            Custom / Bespoke
          </h2>
          <p className="text-sm sm:text-base text-white/70 font-light mt-1">
            Tailored to your vision. Follow the steps below to create your custom piece.
          </p>
        </div>

        {/* Wizard Main Container: High contrast ivory architectural canvas matching the screenshot */}
        <div className="bg-[#FAF9F6] text-[#0A231C] rounded-2xl overflow-hidden shadow-2xl border border-[#E5C07B]/40">
          {/* Progress Header */}
          <div className="border-b border-[#0A231C]/10 px-6 sm:px-10 py-6 bg-white/70">
            <div className="flex items-center justify-between max-w-3xl mx-auto">
              {[
                { step: 1, title: 'Garment Type' },
                { step: 2, title: 'Fabric & Details' },
                { step: 3, title: 'Measurements' },
                { step: 4, title: 'Review & Submit' },
              ].map((item, idx, arr) => {
                const isCompleted = currentStep > item.step;
                const isCurrent = currentStep === item.step;
                return (
                  <React.Fragment key={item.step}>
                    <div className="flex items-center gap-2 sm:gap-3">
                      <div
                        className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                          isCurrent
                            ? 'bg-[#0A231C] text-[#E5C07B]'
                            : isCompleted
                            ? 'bg-[#E5C07B] text-[#0A231C]'
                            : 'bg-stone-200 text-stone-600'
                        }`}
                      >
                        {isCompleted ? <Check className="w-4 h-4" /> : item.step}
                      </div>
                      <span
                        className={`text-xs sm:text-sm font-medium hidden md:inline-block ${
                          isCurrent ? 'text-[#0A231C] font-semibold' : 'text-stone-500'
                        }`}
                      >
                        {item.title}
                      </span>
                    </div>

                    {idx < arr.length - 1 && (
                      <div
                        className={`flex-1 h-0.5 mx-2 sm:mx-4 transition-colors ${
                          isCompleted ? 'bg-[#E5C07B]' : 'bg-stone-200'
                        }`}
                      />
                    )}
                  </React.Fragment>
                );
              })}
            </div>
          </div>

          {/* Wizard Content Layout: Form Left (7 cols) + Model Card Right (5 cols) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[580px]">
            {/* Form Column */}
            <div className="lg:col-span-8 p-6 sm:p-10 flex flex-col justify-between">
              {validationError && (
                <div className="mb-6 p-4 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs sm:text-sm">
                  {validationError}
                </div>
              )}

              {/* STEP 1: Garment Type & Occasion */}
              {currentStep === 1 && (
                <div className="space-y-8 animate-fadeIn">
                  <div>
                    <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#0A231C] mb-1">
                      Step 1: Garment Type & Occasion
                    </h3>
                    <p className="text-xs sm:text-sm text-stone-600">
                      Select your preferred garment type
                    </p>

                    {/* Garment Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5 sm:gap-3 mt-4">
                      {garmentOptions.map((item) => {
                        const isSelected = selectedGarment === item.type;
                        return (
                          <button
                            key={item.type}
                            type="button"
                            onClick={() => setSelectedGarment(item.type)}
                            className={`p-3 rounded-lg border text-center transition-all flex flex-col items-center justify-center gap-2 cursor-pointer ${
                              isSelected
                                ? 'border-[#C8A86B] bg-[#C8A86B]/10 shadow-sm ring-1 ring-[#C8A86B]'
                                : 'border-stone-200 hover:border-stone-400 bg-white'
                            }`}
                          >
                            {/* Line Icon Illustration */}
                            <svg className="w-8 h-8 text-[#0A231C]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                              <path d={item.icon} />
                            </svg>
                            <span className="text-[11px] font-medium leading-tight text-[#0A231C]">
                              {item.label}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Occasion Selection */}
                  <div>
                    <p className="text-xs sm:text-sm text-stone-600 mb-3 font-medium">
                      Select occasion
                    </p>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                      {occasions.map((occ) => {
                        const isSelected = selectedOccasion === occ;
                        return (
                          <button
                            key={occ}
                            type="button"
                            onClick={() => setSelectedOccasion(occ)}
                            className={`py-2.5 px-3 rounded-lg border text-xs sm:text-sm font-medium transition-all text-center cursor-pointer ${
                              isSelected
                                ? 'border-[#C8A86B] bg-[#C8A86B]/15 text-[#0A231C] font-semibold'
                                : 'border-stone-200 bg-white text-stone-700 hover:border-stone-300'
                            }`}
                          >
                            {occ}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 2: Fabric & Artistry */}
              {currentStep === 2 && (
                <div className="space-y-8 animate-fadeIn">
                  <div>
                    <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#0A231C] mb-1">
                      Step 2: Fabric & Artistry
                    </h3>
                    <p className="text-xs sm:text-sm text-stone-600">
                      Choose master-milled textile foundation
                    </p>

                    {/* Fabric Swatches */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5 mt-4">
                      {fabrics.map((f) => {
                        const isSelected = selectedFabric === f.name;
                        return (
                          <button
                            key={f.name}
                            type="button"
                            onClick={() => setSelectedFabric(f.name)}
                            className={`p-3.5 rounded-lg border text-left transition-all cursor-pointer flex items-center gap-3 ${
                              isSelected
                                ? 'border-[#C8A86B] bg-[#C8A86B]/10 ring-1 ring-[#C8A86B]'
                                : 'border-stone-200 bg-white hover:border-stone-300'
                            }`}
                          >
                            <span
                              className="w-8 h-8 rounded-full border border-black/10 shrink-0 shadow-inner"
                              style={{ backgroundColor: f.color }}
                            />
                            <div>
                              <span className="block text-xs sm:text-sm font-semibold text-[#0A231C]">
                                {f.name}
                              </span>
                              <span className="block text-[10px] text-stone-500 leading-tight">
                                {f.desc}
                              </span>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Artistry Customizations (Multi-Select) */}
                  <div>
                    <p className="text-xs sm:text-sm text-stone-600 mb-3 font-medium">
                      Artisanal customizations (Select all that apply)
                    </p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                      {customizationsList.map((cust) => {
                        const isSelected = selectedCustomizations.includes(cust);
                        return (
                          <button
                            key={cust}
                            type="button"
                            onClick={() => toggleCustomization(cust)}
                            className={`py-2.5 px-3 rounded-lg border text-xs font-medium transition-all flex items-center justify-between cursor-pointer ${
                              isSelected
                                ? 'border-[#C8A86B] bg-[#0A231C] text-[#E5C07B]'
                                : 'border-stone-200 bg-white text-stone-700 hover:border-stone-300'
                            }`}
                          >
                            <span>{cust}</span>
                            {isSelected && <Check className="w-3.5 h-3.5 text-[#E5C07B]" />}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 3: Fit Preference */}
              {currentStep === 3 && (
                <div className="space-y-6 animate-fadeIn">
                  <div>
                    <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#0A231C] mb-1">
                      Step 3: Fit Preference
                    </h3>
                    <p className="text-xs sm:text-sm text-stone-600">
                      Choose your preferred fitting methodology
                    </p>

                    {/* Mode Toggle */}
                    <div className="grid grid-cols-2 gap-3 mt-4">
                      <button
                        type="button"
                        onClick={() => setFitType('in-person')}
                        className={`p-3.5 rounded-lg border text-center transition-all cursor-pointer ${
                          fitType === 'in-person'
                            ? 'border-[#0A231C] bg-[#0A231C] text-[#E5C07B]'
                            : 'border-stone-200 bg-white text-stone-700 hover:border-stone-300'
                        }`}
                      >
                        <Calendar className="w-5 h-5 mx-auto mb-1.5" />
                        <span className="block text-xs font-bold uppercase tracking-wider">
                          Book In-Person Fitting
                        </span>
                        <span className="block text-[10px] opacity-75">
                          Atelier Master Tailor Consultation
                        </span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setFitType('manual')}
                        className={`p-3.5 rounded-lg border text-center transition-all cursor-pointer ${
                          fitType === 'manual'
                            ? 'border-[#0A231C] bg-[#0A231C] text-[#E5C07B]'
                            : 'border-stone-200 bg-white text-stone-700 hover:border-stone-300'
                        }`}
                      >
                        <Ruler className="w-5 h-5 mx-auto mb-1.5" />
                        <span className="block text-xs font-bold uppercase tracking-wider">
                          Enter Measurements
                        </span>
                        <span className="block text-[10px] opacity-75">
                          Self or Personal Tailor Specs
                        </span>
                      </button>
                    </div>
                  </div>

                  {fitType === 'in-person' ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
                      <div>
                        <label className="block text-[11px] font-semibold text-stone-700 uppercase tracking-wider mb-1">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          value={fittingDetails.customerName}
                          onChange={(e) => setFittingDetails({ ...fittingDetails, customerName: e.target.value })}
                          placeholder="e.g. Chief Emeka Obi"
                          className="w-full px-3 py-2 rounded border border-stone-300 text-xs text-[#0A231C] focus:outline-none focus:border-[#0A231C]"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-stone-700 uppercase tracking-wider mb-1">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          value={fittingDetails.email}
                          onChange={(e) => setFittingDetails({ ...fittingDetails, email: e.target.value })}
                          placeholder="client@domain.com"
                          className="w-full px-3 py-2 rounded border border-stone-300 text-xs text-[#0A231C] focus:outline-none focus:border-[#0A231C]"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-stone-700 uppercase tracking-wider mb-1">
                          Phone Number (WhatsApp) *
                        </label>
                        <input
                          type="tel"
                          value={fittingDetails.phone}
                          onChange={(e) => setFittingDetails({ ...fittingDetails, phone: e.target.value })}
                          placeholder="+234 803 123 4567"
                          className="w-full px-3 py-2 rounded border border-stone-300 text-xs text-[#0A231C] focus:outline-none focus:border-[#0A231C]"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-stone-700 uppercase tracking-wider mb-1">
                          Location Preference
                        </label>
                        <select
                          value={fittingDetails.locationPreference}
                          onChange={(e) => setFittingDetails({ ...fittingDetails, locationPreference: e.target.value as any })}
                          className="w-full px-3 py-2 rounded border border-stone-300 text-xs text-[#0A231C] focus:outline-none focus:border-[#0A231C] bg-white"
                        >
                          <option value="Lagos Atelier (Ikoyi)">Lagos Atelier (Ikoyi)</option>
                          <option value="Abuja Showroom (Maitama)">Abuja Showroom (Maitama)</option>
                          <option value="Ebonyi Heritage Atelier (Abakaliki)">Ebonyi Heritage Atelier (Abakaliki)</option>
                          <option value="Private Hotel Suite">Private Hotel Suite (Lagos/London)</option>
                          <option value="Virtual Video Fitting">Virtual Video Consultation</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-stone-700 uppercase tracking-wider mb-1">
                          Preferred Date *
                        </label>
                        <input
                          type="date"
                          value={fittingDetails.preferredDate}
                          onChange={(e) => setFittingDetails({ ...fittingDetails, preferredDate: e.target.value })}
                          className="w-full px-3 py-2 rounded border border-stone-300 text-xs text-[#0A231C] focus:outline-none focus:border-[#0A231C] bg-white"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-stone-700 uppercase tracking-wider mb-1">
                          Preferred Time
                        </label>
                        <select
                          value={fittingDetails.preferredTime}
                          onChange={(e) => setFittingDetails({ ...fittingDetails, preferredTime: e.target.value })}
                          className="w-full px-3 py-2 rounded border border-stone-300 text-xs text-[#0A231C] focus:outline-none focus:border-[#0A231C] bg-white"
                        >
                          <option value="10:00 AM">10:00 AM (Morning VIP)</option>
                          <option value="11:30 AM">11:30 AM</option>
                          <option value="02:00 PM">02:00 PM (Afternoon)</option>
                          <option value="04:00 PM">04:00 PM (Late Afternoon)</option>
                          <option value="06:00 PM">06:00 PM (Evening Private)</option>
                        </select>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4 pt-1">
                      <div className="flex items-center justify-between pb-1">
                        <span className="text-xs font-semibold uppercase text-stone-600">Measurement Unit:</span>
                        <div className="flex gap-2">
                          <button
                            type="button"
                            onClick={() => setUnit('inches')}
                            className={`px-3 py-1 rounded text-xs font-semibold ${
                              unit === 'inches' ? 'bg-[#0A231C] text-white' : 'bg-stone-200 text-stone-700'
                            }`}
                          >
                            Inches
                          </button>
                          <button
                            type="button"
                            onClick={() => setUnit('cm')}
                            className={`px-3 py-1 rounded text-xs font-semibold ${
                              unit === 'cm' ? 'bg-[#0A231C] text-white' : 'bg-stone-200 text-stone-700'
                            }`}
                          >
                            Centimeters
                          </button>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        <div>
                          <label className="block text-[11px] font-semibold text-stone-700 mb-1">Chest ({unit}) *</label>
                          <input
                            type="text"
                            value={measurements.chest}
                            onChange={(e) => setMeasurements({ ...measurements, chest: e.target.value })}
                            placeholder="e.g. 42"
                            className="w-full px-3 py-2 rounded border border-stone-300 text-xs"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-semibold text-stone-700 mb-1">Waist ({unit}) *</label>
                          <input
                            type="text"
                            value={measurements.waist}
                            onChange={(e) => setMeasurements({ ...measurements, waist: e.target.value })}
                            placeholder="e.g. 34"
                            className="w-full px-3 py-2 rounded border border-stone-300 text-xs"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-semibold text-stone-700 mb-1">Shoulder ({unit})</label>
                          <input
                            type="text"
                            value={measurements.shoulder}
                            onChange={(e) => setMeasurements({ ...measurements, shoulder: e.target.value })}
                            placeholder="e.g. 19"
                            className="w-full px-3 py-2 rounded border border-stone-300 text-xs"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-semibold text-stone-700 mb-1">Sleeve ({unit})</label>
                          <input
                            type="text"
                            value={measurements.sleeveLength}
                            onChange={(e) => setMeasurements({ ...measurements, sleeveLength: e.target.value })}
                            placeholder="e.g. 26"
                            className="w-full px-3 py-2 rounded border border-stone-300 text-xs"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-semibold text-stone-700 mb-1">Trouser Length</label>
                          <input
                            type="text"
                            value={measurements.trouserLength}
                            onChange={(e) => setMeasurements({ ...measurements, trouserLength: e.target.value })}
                            placeholder="e.g. 43"
                            className="w-full px-3 py-2 rounded border border-stone-300 text-xs"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-semibold text-stone-700 mb-1">Height *</label>
                          <input
                            type="text"
                            value={measurements.height}
                            onChange={(e) => setMeasurements({ ...measurements, height: e.target.value })}
                            placeholder="e.g. 6ft 1in"
                            className="w-full px-3 py-2 rounded border border-stone-300 text-xs"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-stone-700 mb-1">Notes / Posture Specifications</label>
                        <input
                          type="text"
                          value={measurements.additionalNotes}
                          onChange={(e) => setMeasurements({ ...measurements, additionalNotes: e.target.value })}
                          placeholder="e.g. Athletic broad chest, prefer relaxed cuff opening"
                          className="w-full px-3 py-2 rounded border border-stone-300 text-xs"
                        />
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* STEP 4: Request Generated & Confirmation */}
              {currentStep === 4 && generatedRef && (
                <div className="space-y-6 animate-fadeIn text-center sm:text-left">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold">
                    <Check className="w-4 h-4" /> COMMISSION DOSSIER CREATED
                  </div>

                  <div>
                    <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#0A231C]">
                      Your request has been received.
                    </h3>
                    <p className="text-sm text-stone-600 mt-1">
                      RICHYONCE will review your request. Our Senior Bespoke Consultant will contact you within 24 hours.
                    </p>
                  </div>

                  {/* Reference Display Box */}
                  <div className="p-6 rounded-xl bg-stone-100 border border-stone-300 max-w-lg">
                    <span className="text-[11px] uppercase tracking-widest text-stone-500 font-semibold block mb-1">
                      YOUR ATELIER COMMISSION REFERENCE
                    </span>
                    <div className="flex items-center justify-between gap-4">
                      <span className="font-mono text-2xl sm:text-3xl font-bold text-[#0A231C] tracking-wider">
                        {generatedRef}
                      </span>
                      <button
                        onClick={copyRefToClipboard}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-white border border-stone-300 text-xs font-semibold text-[#0A231C] hover:bg-stone-50 cursor-pointer shadow-sm"
                      >
                        {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                        <span>{copied ? 'Copied' : 'Copy'}</span>
                      </button>
                    </div>
                  </div>

                  {/* Summary of Selection */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-left">
                    <div className="p-3 bg-white rounded border border-stone-200">
                      <span className="text-[10px] uppercase text-stone-400 font-semibold block">Garment</span>
                      <span className="text-xs font-bold text-[#0A231C]">{selectedGarment}</span>
                    </div>
                    <div className="p-3 bg-white rounded border border-stone-200">
                      <span className="text-[10px] uppercase text-stone-400 font-semibold block">Occasion</span>
                      <span className="text-xs font-bold text-[#0A231C]">{selectedOccasion}</span>
                    </div>
                    <div className="p-3 bg-white rounded border border-stone-200">
                      <span className="text-[10px] uppercase text-stone-400 font-semibold block">Fabric</span>
                      <span className="text-xs font-bold text-[#0A231C]">{selectedFabric}</span>
                    </div>
                    <div className="p-3 bg-white rounded border border-stone-200">
                      <span className="text-[10px] uppercase text-stone-400 font-semibold block">Fit Type</span>
                      <span className="text-xs font-bold text-[#0A231C]">
                        {fitType === 'in-person' ? 'In-Person Fitting' : 'Manual Specs'}
                      </span>
                    </div>
                  </div>

                  {/* Next Step / Action */}
                  <div className="pt-2 flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={() => onTrackReference(generatedRef)}
                      className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded text-xs font-semibold uppercase tracking-wider bg-[#0A231C] text-[#E5C07B] hover:bg-black transition-colors"
                    >
                      <span>TRACK IN MY RICHYONCE</span>
                      <ExternalLink className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => {
                        setCurrentStep(1);
                        setGeneratedRef(null);
                      }}
                      className="px-5 py-3 rounded text-xs font-semibold uppercase tracking-wider border border-stone-300 text-stone-700 hover:bg-stone-50"
                    >
                      CREATE ANOTHER LOOK
                    </button>
                  </div>
                </div>
              )}

              {/* Wizard Bottom Buttons (Step 1-3) */}
              {currentStep < 4 && (
                <div className="pt-8 mt-6 border-t border-stone-200 flex items-center justify-between">
                  {currentStep > 1 ? (
                    <button
                      type="button"
                      onClick={() => setCurrentStep((currentStep - 1) as any)}
                      className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded text-xs font-semibold tracking-wider uppercase text-stone-700 hover:text-black border border-stone-300 hover:bg-stone-50 cursor-pointer"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      <span>PREVIOUS</span>
                    </button>
                  ) : (
                    <div />
                  )}

                  <button
                    type="button"
                    onClick={handleNextStep}
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded text-xs font-semibold tracking-widest uppercase bg-[#C8A86B] hover:bg-[#b59556] text-[#0A231C] transition-all cursor-pointer shadow"
                  >
                    <span>{currentStep === 3 ? 'GENERATE REQUEST' : 'NEXT STEP'}</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>

            {/* Model & Bespoke Atelier Card (Right Column - exactly matching the screenshot) */}
            <div className="lg:col-span-4 relative overflow-hidden bg-[#0A231C] text-white p-8 flex flex-col justify-end min-h-[380px] lg:min-h-full">
              <img
                src={BRAND_ASSETS.heroAgbada}
                alt="Richyonce Bespoke Luxury model in emerald Agbada"
                className="absolute inset-0 w-full h-full object-cover object-top opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A231C] via-[#0A231C]/60 to-transparent" />

              {/* Editorial lockup overlay matching screenshot */}
              <div className="relative z-10">
                <span className="text-[10px] tracking-[0.3em] uppercase text-[#E5C07B] font-semibold block mb-1">
                  HERITAGE ATELIER
                </span>
                <h4 className="font-serif text-2xl sm:text-3xl font-bold text-white leading-tight">
                  Bespoke Luxury
                </h4>
                <p className="text-xs sm:text-sm text-stone-300 font-light mt-1">
                  Your style. Our craftsmanship. Made for you.
                </p>
                <div className="w-12 h-0.5 bg-[#E5C07B] mt-4" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
