'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useBuilderStore } from '@/lib/store/builder-store';
import { toast } from 'sonner';

const malaysianAreas = [
  'Kuala Lumpur', 'Petaling Jaya', 'Mont Kiara', 'Bangsar', 'KLCC',
  'Subang Jaya', 'Shah Alam', 'Puchong', 'Cyberjaya', 'Putrajaya',
  'Damansara', 'Ampang', 'Cheras', 'Bukit Jalil', 'Kepong',
  'Seremban', 'Penang', 'Georgetown', 'Johor Bahru', 'Ipoh',
  'Kuching', 'Kota Kinabalu', 'Melaka', 'Klang', 'Selayang'
];

const popularAgencies = [
  'IQI Realty',
  'PropNex Realty',
  'Metro Homes Realty',
  'Hartanah Realty',
  'Century 21 Malaysia',
  'Reapfield Properties',
  'VPC Alliance',
  'WTW Real Estate',
  'IWH Real Estate',
  'Other'
];

export default function CreateBuilderPage() {
  const router = useRouter();
  const { agentInfo, setAgentInfo, formProgress, calculateProgress } = useBuilderStore();

  const [currentStep, setCurrentStep] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedAgency, setSelectedAgency] = useState('');
  const [selectedAreas, setSelectedAreas] = useState<string[]>(agentInfo.areasOfCoverage || []);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>(agentInfo.languages || []);
  const [profileImagePreview, setProfileImagePreview] = useState<string>(agentInfo.profilePhoto || '');
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Auto-save every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      if (agentInfo.fullName || agentInfo.email) {
        toast.success('Progress auto-saved', { duration: 1000 });
      }
    }, 10000);

    return () => clearInterval(interval);
  }, [agentInfo]);

  // Calculate progress
  useEffect(() => {
    calculateProgress();
  }, [agentInfo, calculateProgress]);

  const handleInputChange = (field: string, value: any) => {
    setAgentInfo({ [field]: value });
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleAreaToggle = (area: string) => {
    const newAreas = selectedAreas.includes(area)
      ? selectedAreas.filter(a => a !== area)
      : [...selectedAreas, area];
    setSelectedAreas(newAreas);
    setAgentInfo({ areasOfCoverage: newAreas });
  };

  const handleLanguageToggle = (language: string) => {
    const newLanguages = selectedLanguages.includes(language)
      ? selectedLanguages.filter(l => l !== language)
      : [...selectedLanguages, language];
    setSelectedLanguages(newLanguages);
    setAgentInfo({ languages: newLanguages });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5000000) {
        toast.error('Image size must be less than 5MB');
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setProfileImagePreview(result);
        setAgentInfo({ profilePhoto: result });
      };
      reader.readAsDataURL(file);
    }
  };

  const generateBio = async () => {
    setIsGenerating(true);
    try {
      const response = await fetch('/api/ai/suggest-bio', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ agentInfo }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate bio');
      }

      const { bio } = await response.json();
      setAgentInfo({ bio });
      toast.success('Bio generated successfully!');
    } catch (error) {
      toast.error('Failed to generate bio. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const generateTagline = async () => {
    setIsGenerating(true);
    try {
      const response = await fetch('/api/ai/suggest-bio', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          agentInfo,
          type: 'tagline'
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate tagline');
      }

      // For now, use the first part of bio as tagline or generate from bio
      const { bio } = await response.json();
      const tagline = bio.split('.')[0] || 'Your Trusted Property Agent';
      setAgentInfo({ tagline });
      toast.success('Tagline generated successfully!');
    } catch (error) {
      toast.error('Failed to generate tagline. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};

    if (step === 1) {
      if (!agentInfo.fullName?.trim()) newErrors.fullName = 'Full name is required';
      if (!agentInfo.agencyName?.trim()) newErrors.agencyName = 'Agency name is required';
      if (!agentInfo.phoneNumber?.trim()) newErrors.phoneNumber = 'Phone number is required';
      else if (!/^\+?60\d{9,10}$/.test(agentInfo.phoneNumber.replace(/[\s-]/g, ''))) {
        newErrors.phoneNumber = 'Invalid Malaysian phone number';
      }
      if (!agentInfo.email?.trim()) newErrors.email = 'Email is required';
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(agentInfo.email)) {
        newErrors.email = 'Invalid email address';
      }
      if (!agentInfo.whatsapp?.trim()) newErrors.whatsapp = 'WhatsApp number is required';
    }

    if (step === 2) {
      if (!agentInfo.renNumber?.trim()) newErrors.renNumber = 'REN/REA number is required';
      else if (!/^(REN|REA)\s?\d{4,5}$/i.test(agentInfo.renNumber)) {
        newErrors.renNumber = 'Invalid REN/REA format (e.g., REN 12345)';
      }
      if (!agentInfo.specialization) newErrors.specialization = 'Specialization is required';
      if (selectedAreas.length === 0) newErrors.areasOfCoverage = 'Select at least one area';
      if (selectedLanguages.length === 0) newErrors.languages = 'Select at least one language';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      if (currentStep < 3) {
        setCurrentStep(currentStep + 1);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        handleSubmit();
      }
    } else {
      toast.error('Please fill in all required fields');
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSubmit = async () => {
    setIsGenerating(true);
    try {
      const response = await fetch('/api/ai/generate-content', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ agentInfo }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate content');
      }

      const generatedContent = await response.json();
      useBuilderStore.getState().setGeneratedContent(generatedContent);
      toast.success('Website content generated!');
      router.push('/builder/preview');
    } catch (error) {
      toast.error('Failed to generate content. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark">
      {/* Header */}
      <header className="bg-white dark:bg-black border-b border-border-light dark:border-border-dark">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-display font-bold text-heading-light dark:text-heading-dark uppercase">
              Create Your Website
            </h1>
            <div className="flex items-center gap-4">
              <div className="text-sm text-muted-light dark:text-muted-dark">
                {formProgress.toFixed(0)}% Complete
              </div>
              <div className="w-32 h-2 bg-surface-light dark:bg-surface-dark rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary transition-all duration-300"
                  style={{ width: `${formProgress}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2">
            {/* Progress Steps */}
            <div className="mb-8 flex items-center justify-center gap-4">
              {[1, 2, 3].map((step) => (
                <div key={step} className="flex items-center">
                  <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-colors ${
                    currentStep === step
                      ? 'bg-primary border-primary text-white'
                      : currentStep > step
                      ? 'bg-green-500 border-green-500 text-white'
                      : 'bg-background-light dark:bg-background-dark border-border-light dark:border-border-dark text-muted-light dark:text-muted-dark'
                  }`}>
                    {currentStep > step ? (
                      <span className="material-symbols-outlined text-xl">check</span>
                    ) : (
                      step
                    )}
                  </div>
                  {step < 3 && (
                    <div className={`w-16 h-0.5 ${
                      currentStep > step ? 'bg-green-500' : 'bg-border-light dark:bg-border-dark'
                    }`} />
                  )}
                </div>
              ))}
            </div>

            {/* Step 1: Basic Information */}
            {currentStep === 1 && (
              <div className="space-y-6 bg-white dark:bg-black p-8 border border-border-light dark:border-border-dark">
                <h2 className="text-2xl font-display font-bold text-heading-light dark:text-heading-dark uppercase mb-6">
                  Basic Information
                </h2>

                <div className="grid md:grid-cols-2 gap-6">
                  {/* Full Name */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-heading-light dark:text-heading-dark uppercase mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={agentInfo.fullName}
                      onChange={(e) => handleInputChange('fullName', e.target.value)}
                      placeholder="e.g. David Tan Wei Ming"
                      className={`form-input-brutalist w-full h-12 px-4 ${errors.fullName ? 'border-red-500' : ''}`}
                    />
                    {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
                  </div>

                  {/* Agency Name */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-heading-light dark:text-heading-dark uppercase mb-2">
                      Agency Name *
                    </label>
                    <select
                      value={selectedAgency || agentInfo.agencyName}
                      onChange={(e) => {
                        const value = e.target.value;
                        setSelectedAgency(value);
                        if (value !== 'Other') {
                          handleInputChange('agencyName', value);
                        } else {
                          handleInputChange('agencyName', '');
                        }
                      }}
                      className={`form-input-brutalist w-full h-12 px-4 ${errors.agencyName ? 'border-red-500' : ''}`}
                    >
                      <option value="">Select Agency</option>
                      {popularAgencies.map(agency => (
                        <option key={agency} value={agency}>{agency}</option>
                      ))}
                    </select>
                    {selectedAgency === 'Other' && (
                      <input
                        type="text"
                        value={agentInfo.agencyName}
                        onChange={(e) => handleInputChange('agencyName', e.target.value)}
                        placeholder="Enter your agency name"
                        className="form-input-brutalist w-full h-12 px-4 mt-2"
                      />
                    )}
                    {errors.agencyName && <p className="text-red-500 text-sm mt-1">{errors.agencyName}</p>}
                  </div>

                  {/* Phone Number */}
                  <div>
                    <label className="block text-sm font-medium text-heading-light dark:text-heading-dark uppercase mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      value={agentInfo.phoneNumber}
                      onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                      placeholder="+60 12-345 6789"
                      className={`form-input-brutalist w-full h-12 px-4 ${errors.phoneNumber ? 'border-red-500' : ''}`}
                    />
                    {errors.phoneNumber && <p className="text-red-500 text-sm mt-1">{errors.phoneNumber}</p>}
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium text-heading-light dark:text-heading-dark uppercase mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      value={agentInfo.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="you@example.com"
                      className={`form-input-brutalist w-full h-12 px-4 ${errors.email ? 'border-red-500' : ''}`}
                    />
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                  </div>

                  {/* WhatsApp */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-heading-light dark:text-heading-dark uppercase mb-2">
                      WhatsApp Number *
                    </label>
                    <input
                      type="tel"
                      value={agentInfo.whatsapp}
                      onChange={(e) => handleInputChange('whatsapp', e.target.value)}
                      placeholder="+60 12-345 6789"
                      className={`form-input-brutalist w-full h-12 px-4 ${errors.whatsapp ? 'border-red-500' : ''}`}
                    />
                    {errors.whatsapp && <p className="text-red-500 text-sm mt-1">{errors.whatsapp}</p>}
                  </div>

                  {/* Profile Photo */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-heading-light dark:text-heading-dark uppercase mb-2">
                      Profile Photo
                    </label>
                    <div className="flex gap-4">
                      {profileImagePreview && (
                        <div className="w-32 h-32 rounded-lg overflow-hidden border-2 border-border-light dark:border-border-dark">
                          <img src={profileImagePreview} alt="Profile" className="w-full h-full object-cover" />
                        </div>
                      )}
                      <label className="flex-1 flex flex-col items-center justify-center border-2 border-dashed border-border-light dark:border-border-dark rounded-lg p-6 cursor-pointer hover:bg-surface-light dark:hover:bg-surface-dark transition-colors">
                        <span className="material-symbols-outlined text-4xl text-muted-light dark:text-muted-dark mb-2">
                          cloud_upload
                        </span>
                        <span className="text-sm text-muted-light dark:text-muted-dark">Click to upload</span>
                        <span className="text-xs text-muted-light dark:text-muted-dark mt-1">PNG, JPG (MAX. 5MB)</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="hidden"
                        />
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Professional Details */}
            {currentStep === 2 && (
              <div className="space-y-6 bg-white dark:bg-black p-8 border border-border-light dark:border-border-dark">
                <h2 className="text-2xl font-display font-bold text-heading-light dark:text-heading-dark uppercase mb-6">
                  Professional Details
                </h2>

                <div className="space-y-6">
                  {/* REN Number */}
                  <div>
                    <label className="block text-sm font-medium text-heading-light dark:text-heading-dark uppercase mb-2">
                      REN/REA Number *
                    </label>
                    <input
                      type="text"
                      value={agentInfo.renNumber}
                      onChange={(e) => handleInputChange('renNumber', e.target.value.toUpperCase())}
                      placeholder="REN 12345 or REA 1234"
                      className={`form-input-brutalist w-full h-12 px-4 ${errors.renNumber ? 'border-red-500' : ''}`}
                    />
                    {errors.renNumber && <p className="text-red-500 text-sm mt-1">{errors.renNumber}</p>}
                  </div>

                  {/* Years of Experience */}
                  <div>
                    <label className="block text-sm font-medium text-heading-light dark:text-heading-dark uppercase mb-2">
                      Years of Experience: {agentInfo.yearsOfExperience} years
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="30"
                      value={agentInfo.yearsOfExperience}
                      onChange={(e) => handleInputChange('yearsOfExperience', parseInt(e.target.value))}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-muted-light dark:text-muted-dark mt-1">
                      <span>0 years</span>
                      <span>15 years</span>
                      <span>30+ years</span>
                    </div>
                  </div>

                  {/* Specialization */}
                  <div>
                    <label className="block text-sm font-medium text-heading-light dark:text-heading-dark uppercase mb-2">
                      Specialization *
                    </label>
                    <div className="grid grid-cols-3 gap-4">
                      {(['residential', 'commercial', 'both'] as const).map((type) => (
                        <button
                          key={type}
                          onClick={() => handleInputChange('specialization', type)}
                          className={`p-4 border-2 rounded transition-colors ${
                            agentInfo.specialization === type
                              ? 'border-primary bg-primary bg-opacity-10'
                              : 'border-border-light dark:border-border-dark hover:border-primary'
                          }`}
                        >
                          <span className="capitalize font-medium">{type}</span>
                        </button>
                      ))}
                    </div>
                    {errors.specialization && <p className="text-red-500 text-sm mt-1">{errors.specialization}</p>}
                  </div>

                  {/* Areas of Coverage */}
                  <div>
                    <label className="block text-sm font-medium text-heading-light dark:text-heading-dark uppercase mb-2">
                      Areas of Coverage * ({selectedAreas.length} selected)
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2 max-h-64 overflow-y-auto p-4 border border-border-light dark:border-border-dark rounded">
                      {malaysianAreas.map((area) => (
                        <label key={area} className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={selectedAreas.includes(area)}
                            onChange={() => handleAreaToggle(area)}
                            className="w-4 h-4"
                          />
                          <span className="text-sm">{area}</span>
                        </label>
                      ))}
                    </div>
                    {errors.areasOfCoverage && <p className="text-red-500 text-sm mt-1">{errors.areasOfCoverage}</p>}
                  </div>

                  {/* Languages */}
                  <div>
                    <label className="block text-sm font-medium text-heading-light dark:text-heading-dark uppercase mb-2">
                      Languages Spoken *
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {['Malay', 'English', 'Mandarin', 'Cantonese', 'Tamil', 'Hokkien'].map((language) => (
                        <label key={language} className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={selectedLanguages.includes(language)}
                            onChange={() => handleLanguageToggle(language)}
                            className="w-4 h-4"
                          />
                          <span className="text-sm">{language}</span>
                        </label>
                      ))}
                    </div>
                    {errors.languages && <p className="text-red-500 text-sm mt-1">{errors.languages}</p>}
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Bio and Tagline */}
            {currentStep === 3 && (
              <div className="space-y-6 bg-white dark:bg-black p-8 border border-border-light dark:border-border-dark">
                <h2 className="text-2xl font-display font-bold text-heading-light dark:text-heading-dark uppercase mb-6">
                  About You
                </h2>

                <div className="space-y-6">
                  {/* Professional Bio */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-sm font-medium text-heading-light dark:text-heading-dark uppercase">
                        Professional Bio
                      </label>
                      <button
                        onClick={generateBio}
                        disabled={isGenerating}
                        className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded hover:bg-opacity-90 transition-colors disabled:opacity-50"
                      >
                        <span className="material-symbols-outlined text-sm">magic_button</span>
                        {isGenerating ? 'Generating...' : 'Generate with AI'}
                      </button>
                    </div>
                    <textarea
                      value={agentInfo.bio}
                      onChange={(e) => handleInputChange('bio', e.target.value)}
                      placeholder="Tell your clients about yourself, your experience, and what makes you special..."
                      className="form-textarea-brutalist w-full min-h-[150px] px-4 py-3"
                      maxLength={500}
                    />
                    <div className="text-xs text-muted-light dark:text-muted-dark mt-1 text-right">
                      {agentInfo.bio?.length || 0}/500 characters
                    </div>
                  </div>

                  {/* Tagline */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-sm font-medium text-heading-light dark:text-heading-dark uppercase">
                        Your Tagline
                      </label>
                      <button
                        onClick={generateTagline}
                        disabled={isGenerating}
                        className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded hover:bg-opacity-90 transition-colors disabled:opacity-50"
                      >
                        <span className="material-symbols-outlined text-sm">magic_button</span>
                        {isGenerating ? 'Generating...' : 'Generate Tagline'}
                      </button>
                    </div>
                    <input
                      type="text"
                      value={agentInfo.tagline}
                      onChange={(e) => handleInputChange('tagline', e.target.value)}
                      placeholder="e.g. Your Trusted Property Partner in Kuala Lumpur"
                      className="form-input-brutalist w-full h-12 px-4"
                      maxLength={100}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8">
              <button
                onClick={handleBack}
                disabled={currentStep === 1}
                className="flex items-center gap-2 px-6 py-3 border-2 border-border-light dark:border-border-dark disabled:opacity-50 disabled:cursor-not-allowed hover:bg-surface-light dark:hover:bg-surface-dark transition-colors"
              >
                <span className="material-symbols-outlined">arrow_back</span>
                Back
              </button>
              <button
                onClick={handleNext}
                disabled={isGenerating}
                className="flex items-center gap-2 px-6 py-3 btn-brutalist disabled:opacity-50"
              >
                {currentStep === 3 ? 'Generate Website' : 'Next'}
                <span className="material-symbols-outlined">
                  {currentStep === 3 ? 'rocket_launch' : 'arrow_forward'}
                </span>
              </button>
            </div>
          </div>

          {/* AI Assistant Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 bg-white dark:bg-black p-6 border border-border-light dark:border-border-dark">
              <div className="flex items-center gap-2 mb-6">
                <span className="material-symbols-outlined text-primary text-2xl">magic_button</span>
                <h3 className="text-xl font-display font-bold text-heading-light dark:text-heading-dark uppercase">
                  AI Assistant
                </h3>
              </div>

              <div className="space-y-4">
                <p className="text-sm text-muted-light dark:text-muted-dark">
                  Use AI to create professional content for your website automatically.
                </p>

                <div className="space-y-3">
                  <button
                    onClick={generateBio}
                    disabled={isGenerating || !agentInfo.fullName}
                    className="w-full flex items-center justify-between p-3 border border-border-light dark:border-border-dark hover:border-primary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span className="text-sm font-medium">Generate Bio</span>
                    <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </button>

                  <button
                    onClick={generateTagline}
                    disabled={isGenerating || !agentInfo.fullName}
                    className="w-full flex items-center justify-between p-3 border border-border-light dark:border-border-dark hover:border-primary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span className="text-sm font-medium">Create Tagline</span>
                    <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </button>
                </div>

                <div className="mt-6 p-4 bg-surface-light dark:bg-surface-dark rounded">
                  <h4 className="text-sm font-bold text-heading-light dark:text-heading-dark mb-2">
                    Tips for Better Results
                  </h4>
                  <ul className="space-y-2 text-xs text-muted-light dark:text-muted-dark">
                    <li className="flex items-start gap-2">
                      <span className="material-symbols-outlined text-sm text-primary">check_circle</span>
                      Fill in all your details first
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="material-symbols-outlined text-sm text-primary">check_circle</span>
                      Select your specialization
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="material-symbols-outlined text-sm text-primary">check_circle</span>
                      Choose your coverage areas
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="material-symbols-outlined text-sm text-primary">check_circle</span>
                      You can edit AI-generated content
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
