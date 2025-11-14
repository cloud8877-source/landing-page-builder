'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useBuilderStore } from '@/lib/store/builder-store';
import { toast } from 'sonner';
import ContentEditable from 'react-contenteditable';

type ViewMode = 'desktop' | 'tablet' | 'mobile';

export default function PreviewPage() {
  const router = useRouter();
  const { agentInfo, properties, siteDesign, generatedContent, updateDesign } = useBuilderStore();

  const [viewMode, setViewMode] = useState<ViewMode>('desktop');
  const [editableContent, setEditableContent] = useState(generatedContent);
  const [showColorPicker, setShowColorPicker] = useState(false);

  useEffect(() => {
    if (!generatedContent) {
      toast.error('No content generated yet');
      router.push('/builder/create');
    } else {
      setEditableContent(generatedContent);
    }
  }, [generatedContent, router]);

  const handleContentChange = (section: string, field: string, value: string) => {
    if (!editableContent) return;

    setEditableContent({
      ...editableContent,
      [section]: {
        ...editableContent[section as keyof typeof editableContent],
        [field]: value
      }
    } as any);
  };

  const handleColorChange = (color: string) => {
    updateDesign({ primaryColor: color });
  };

  const handleAddProperties = () => {
    router.push('/builder/preview?tab=properties');
  };

  const handlePublish = () => {
    // Save the edited content
    useBuilderStore.getState().setGeneratedContent(editableContent);
    router.push('/builder/publish');
  };

  const viewportWidths = {
    desktop: '100%',
    tablet: '768px',
    mobile: '375px',
  };

  if (!editableContent) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Loading preview...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark flex flex-col">
      {/* Header */}
      <header className="bg-white dark:bg-black border-b border-border-light dark:border-border-dark sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <button
                onClick={() => router.push('/builder/create')}
                className="flex items-center gap-2 px-4 py-2 hover:bg-surface-light dark:hover:bg-surface-dark transition-colors"
              >
                <span className="material-symbols-outlined">arrow_back</span>
                Edit Info
              </button>
              <div>
                <h1 className="text-xl font-display font-bold text-heading-light dark:text-heading-dark uppercase">
                  Preview & Customize
                </h1>
                <p className="text-sm text-muted-light dark:text-muted-dark">
                  Click any text to edit • Change colors below
                </p>
              </div>
            </div>

            {/* View Mode Switcher */}
            <div className="flex items-center gap-2 bg-surface-light dark:bg-surface-dark p-1 rounded">
              {(['desktop', 'tablet', 'mobile'] as ViewMode[]).map((mode) => (
                <button
                  key={mode}
                  onClick={() => setViewMode(mode)}
                  className={`px-4 py-2 rounded transition-colors ${
                    viewMode === mode
                      ? 'bg-primary text-white'
                      : 'hover:bg-background-light dark:hover:bg-background-dark'
                  }`}
                >
                  <span className="material-symbols-outlined text-xl">
                    {mode === 'desktop' ? 'desktop_windows' : mode === 'tablet' ? 'tablet' : 'smartphone'}
                  </span>
                </button>
              ))}
            </div>

            <div className="flex items-center gap-3">
              {properties.length === 0 && (
                <button
                  onClick={handleAddProperties}
                  className="px-6 py-3 border-2 border-primary text-primary hover:bg-primary hover:text-white transition-colors"
                >
                  Add Properties
                </button>
              )}
              <button
                onClick={handlePublish}
                className="px-6 py-3 btn-brutalist"
              >
                <span className="flex items-center gap-2">
                  Continue to Publish
                  <span className="material-symbols-outlined">arrow_forward</span>
                </span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex">
        {/* Preview Canvas */}
        <div className="flex-1 bg-gray-100 dark:bg-gray-900 p-6 overflow-auto">
          <div
            className="mx-auto transition-all duration-300 bg-white dark:bg-black shadow-2xl"
            style={{ maxWidth: viewportWidths[viewMode] }}
          >
            {/* Preview Bar */}
            <div className="bg-yellow-100 dark:bg-yellow-900 border-b border-yellow-200 dark:border-yellow-800 px-4 py-2 flex items-center gap-2">
              <span className="material-symbols-outlined text-yellow-700 dark:text-yellow-300">visibility</span>
              <span className="text-sm font-medium text-yellow-700 dark:text-yellow-300">
                Preview Mode - Click text to edit
              </span>
            </div>

            {/* Website Content */}
            <div className="overflow-auto" style={{ maxHeight: 'calc(100vh - 200px)' }}>
              {/* Hero Section */}
              <section
                className="py-20 sm:py-28 px-4"
                style={{ backgroundColor: siteDesign.primaryColor, color: 'white' }}
              >
                <div className="container mx-auto max-w-4xl text-center">
                  <div className="mb-6">
                    {agentInfo.profilePhoto && (
                      <img
                        src={agentInfo.profilePhoto}
                        alt={agentInfo.fullName}
                        className="w-32 h-32 rounded-full mx-auto mb-6 border-4 border-white shadow-lg object-cover"
                      />
                    )}
                  </div>

                  <ContentEditable
                    html={editableContent.hero.headline}
                    onChange={(e) => handleContentChange('hero', 'headline', e.target.value)}
                    tagName="h1"
                    className="text-4xl md:text-5xl lg:text-6xl font-display font-extrabold mb-4 outline-none focus:ring-2 focus:ring-white/50 rounded px-2"
                  />

                  <ContentEditable
                    html={editableContent.hero.subheadline}
                    onChange={(e) => handleContentChange('hero', 'subheadline', e.target.value)}
                    tagName="p"
                    className="text-lg md:text-xl mb-8 outline-none focus:ring-2 focus:ring-white/50 rounded px-2"
                  />

                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <a
                      href={`https://wa.me/${agentInfo.whatsapp?.replace(/[^0-9]/g, '')}`}
                      className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-gray-900 font-bold rounded hover:bg-gray-100 transition-colors"
                    >
                      <span className="material-symbols-outlined">chat</span>
                      {editableContent.hero.ctaText}
                    </a>
                    <a
                      href={`tel:${agentInfo.phoneNumber}`}
                      className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded hover:bg-white/10 transition-colors"
                    >
                      <span className="material-symbols-outlined">call</span>
                      Call Now
                    </a>
                  </div>
                </div>
              </section>

              {/* About Section */}
              <section className="py-20 bg-white dark:bg-black">
                <div className="container mx-auto px-4 max-w-6xl">
                  <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div>
                      <h2 className="text-3xl font-display font-bold text-heading-light dark:text-heading-dark uppercase mb-6">
                        About {agentInfo.fullName}
                      </h2>

                      <ContentEditable
                        html={editableContent.about.bio}
                        onChange={(e) => handleContentChange('about', 'bio', e.target.value)}
                        tagName="p"
                        className="text-body-light dark:text-body-dark mb-6 outline-none focus:ring-2 focus:ring-primary rounded p-2"
                      />

                      <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="bg-surface-light dark:bg-surface-dark p-4 rounded">
                          <div className="text-3xl font-bold text-primary mb-1">
                            {agentInfo.yearsOfExperience}+
                          </div>
                          <div className="text-sm text-muted-light dark:text-muted-dark">
                            Years Experience
                          </div>
                        </div>
                        <div className="bg-surface-light dark:bg-surface-dark p-4 rounded">
                          <div className="text-3xl font-bold text-primary mb-1">
                            {agentInfo.areasOfCoverage.length}+
                          </div>
                          <div className="text-sm text-muted-light dark:text-muted-dark">
                            Coverage Areas
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm">
                          <span className="material-symbols-outlined text-primary">verified</span>
                          <span>REN/REA: {agentInfo.renNumber}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <span className="material-symbols-outlined text-primary">business</span>
                          <span>{agentInfo.agencyName}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <span className="material-symbols-outlined text-primary">language</span>
                          <span>{agentInfo.languages.join(', ')}</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold text-heading-light dark:text-heading-dark uppercase mb-4">
                        Key Achievements
                      </h3>
                      <ul className="space-y-3">
                        {editableContent.about.achievements.map((achievement, index) => (
                          <li key={index} className="flex items-start gap-3">
                            <span className="material-symbols-outlined text-primary text-xl">check_circle</span>
                            <ContentEditable
                              html={achievement}
                              onChange={(e) => {
                                const newAchievements = [...editableContent.about.achievements];
                                newAchievements[index] = e.target.value;
                                setEditableContent({
                                  ...editableContent,
                                  about: { ...editableContent.about, achievements: newAchievements }
                                });
                              }}
                              tagName="span"
                              className="outline-none focus:ring-2 focus:ring-primary rounded px-1"
                            />
                          </li>
                        ))}
                      </ul>

                      <h3 className="text-xl font-bold text-heading-light dark:text-heading-dark uppercase mt-8 mb-4">
                        Why Choose Me
                      </h3>
                      <ul className="space-y-3">
                        {editableContent.about.whyChooseMe.map((reason, index) => (
                          <li key={index} className="flex items-start gap-3">
                            <span className="material-symbols-outlined text-primary text-xl">star</span>
                            <ContentEditable
                              html={reason}
                              onChange={(e) => {
                                const newReasons = [...editableContent.about.whyChooseMe];
                                newReasons[index] = e.target.value;
                                setEditableContent({
                                  ...editableContent,
                                  about: { ...editableContent.about, whyChooseMe: newReasons }
                                });
                              }}
                              tagName="span"
                              className="outline-none focus:ring-2 focus:ring-primary rounded px-1"
                            />
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </section>

              {/* Services Section */}
              <section className="py-20 bg-surface-light dark:bg-surface-dark">
                <div className="container mx-auto px-4 max-w-6xl">
                  <h2 className="text-3xl font-display font-bold text-heading-light dark:text-heading-dark uppercase text-center mb-12">
                    My Services
                  </h2>

                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {editableContent.services.map((service, index) => (
                      <div
                        key={index}
                        className="bg-white dark:bg-black p-6 border border-border-light dark:border-border-dark hover:border-primary transition-colors"
                      >
                        <span className="material-symbols-outlined text-4xl text-primary mb-4 block">
                          {service.icon}
                        </span>
                        <ContentEditable
                          html={service.title}
                          onChange={(e) => {
                            const newServices = [...editableContent.services];
                            newServices[index] = { ...service, title: e.target.value };
                            setEditableContent({ ...editableContent, services: newServices });
                          }}
                          tagName="h3"
                          className="text-lg font-bold text-heading-light dark:text-heading-dark mb-2 outline-none focus:ring-2 focus:ring-primary rounded px-1"
                        />
                        <ContentEditable
                          html={service.description}
                          onChange={(e) => {
                            const newServices = [...editableContent.services];
                            newServices[index] = { ...service, description: e.target.value };
                            setEditableContent({ ...editableContent, services: newServices });
                          }}
                          tagName="p"
                          className="text-sm text-body-light dark:text-body-dark outline-none focus:ring-2 focus:ring-primary rounded px-1"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* Properties Section */}
              {properties.length > 0 && (
                <section className="py-20 bg-white dark:bg-black">
                  <div className="container mx-auto px-4 max-w-6xl">
                    <h2 className="text-3xl font-display font-bold text-heading-light dark:text-heading-dark uppercase text-center mb-12">
                      Featured Properties
                    </h2>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {properties.map((property) => (
                        <div
                          key={property.id}
                          className="bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark overflow-hidden hover:shadow-lg transition-shadow"
                        >
                          {property.images[0] && (
                            <img
                              src={property.images[0]}
                              alt={property.title}
                              className="w-full h-48 object-cover"
                            />
                          )}
                          <div className="p-4">
                            <h3 className="text-lg font-bold text-heading-light dark:text-heading-dark mb-2">
                              {property.title}
                            </h3>
                            <div className="text-2xl font-bold text-primary mb-3">
                              RM {property.price.toLocaleString()}
                            </div>
                            <div className="flex items-center gap-4 text-sm text-muted-light dark:text-muted-dark mb-3">
                              <span className="flex items-center gap-1">
                                <span className="material-symbols-outlined text-base">bed</span>
                                {property.bedrooms}
                              </span>
                              <span className="flex items-center gap-1">
                                <span className="material-symbols-outlined text-base">bathtub</span>
                                {property.bathrooms}
                              </span>
                              <span className="flex items-center gap-1">
                                <span className="material-symbols-outlined text-base">square_foot</span>
                                {property.sqft}
                              </span>
                            </div>
                            <p className="text-sm text-body-light dark:text-body-dark mb-4 line-clamp-2">
                              {property.description}
                            </p>
                            <a
                              href={`https://wa.me/${agentInfo.whatsapp?.replace(/[^0-9]/g, '')}?text=I'm interested in ${property.title}`}
                              className="inline-flex items-center gap-2 text-primary hover:underline"
                            >
                              <span className="material-symbols-outlined">chat</span>
                              Inquire via WhatsApp
                            </a>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>
              )}

              {/* Testimonials Section */}
              <section className="py-20 bg-surface-light dark:bg-surface-dark">
                <div className="container mx-auto px-4 max-w-6xl">
                  <h2 className="text-3xl font-display font-bold text-heading-light dark:text-heading-dark uppercase text-center mb-12">
                    Client Testimonials
                  </h2>

                  <div className="grid md:grid-cols-3 gap-6">
                    {editableContent.testimonials.map((testimonial, index) => (
                      <div
                        key={index}
                        className="bg-white dark:bg-black p-6 border border-border-light dark:border-border-dark"
                      >
                        <div className="flex gap-1 mb-4">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <span key={i} className="material-symbols-outlined text-yellow-500">star</span>
                          ))}
                        </div>
                        <ContentEditable
                          html={testimonial.text}
                          onChange={(e) => {
                            const newTestimonials = [...editableContent.testimonials];
                            newTestimonials[index] = { ...testimonial, text: e.target.value };
                            setEditableContent({ ...editableContent, testimonials: newTestimonials });
                          }}
                          tagName="p"
                          className="text-sm text-body-light dark:text-body-dark mb-4 outline-none focus:ring-2 focus:ring-primary rounded px-1"
                        />
                        <div className="font-bold text-heading-light dark:text-heading-dark">
                          {testimonial.name}
                        </div>
                        <div className="text-sm text-muted-light dark:text-muted-dark">
                          {testimonial.propertyType}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* Contact Section */}
              <section className="py-20 bg-white dark:bg-black">
                <div className="container mx-auto px-4 max-w-4xl text-center">
                  <h2 className="text-3xl font-display font-bold text-heading-light dark:text-heading-dark uppercase mb-6">
                    Get In Touch
                  </h2>
                  <p className="text-lg text-body-light dark:text-body-dark mb-8">
                    Ready to find your dream property? Contact me today!
                  </p>

                  <div className="grid sm:grid-cols-3 gap-6 mb-8">
                    <a
                      href={`tel:${agentInfo.phoneNumber}`}
                      className="flex flex-col items-center gap-3 p-6 bg-surface-light dark:bg-surface-dark rounded hover:bg-primary hover:text-white transition-colors group"
                    >
                      <span className="material-symbols-outlined text-4xl text-primary group-hover:text-white">call</span>
                      <div className="text-sm font-medium">Call Me</div>
                      <div className="text-xs">{agentInfo.phoneNumber}</div>
                    </a>

                    <a
                      href={`https://wa.me/${agentInfo.whatsapp?.replace(/[^0-9]/g, '')}`}
                      className="flex flex-col items-center gap-3 p-6 bg-surface-light dark:bg-surface-dark rounded hover:bg-primary hover:text-white transition-colors group"
                    >
                      <span className="material-symbols-outlined text-4xl text-primary group-hover:text-white">chat</span>
                      <div className="text-sm font-medium">WhatsApp</div>
                      <div className="text-xs">{agentInfo.whatsapp}</div>
                    </a>

                    <a
                      href={`mailto:${agentInfo.email}`}
                      className="flex flex-col items-center gap-3 p-6 bg-surface-light dark:bg-surface-dark rounded hover:bg-primary hover:text-white transition-colors group"
                    >
                      <span className="material-symbols-outlined text-4xl text-primary group-hover:text-white">mail</span>
                      <div className="text-sm font-medium">Email</div>
                      <div className="text-xs">{agentInfo.email}</div>
                    </a>
                  </div>

                  <div className="bg-surface-light dark:bg-surface-dark p-6 rounded">
                    <h3 className="font-bold text-heading-light dark:text-heading-dark mb-4">
                      Coverage Areas
                    </h3>
                    <div className="flex flex-wrap gap-2 justify-center">
                      {agentInfo.areasOfCoverage.map((area, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-white dark:bg-black border border-border-light dark:border-border-dark rounded text-sm"
                        >
                          {area}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>

        {/* Right Sidebar - Customization */}
        <div className="w-80 bg-white dark:bg-black border-l border-border-light dark:border-border-dark p-6 overflow-auto">
          <h3 className="text-lg font-display font-bold text-heading-light dark:text-heading-dark uppercase mb-6">
            Customize Design
          </h3>

          {/* Color Picker */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-heading-light dark:text-heading-dark uppercase mb-2">
              Primary Color
            </label>
            <div className="flex gap-2 flex-wrap">
              {['#2563eb', '#7c3aed', '#db2777', '#dc2626', '#ea580c', '#16a34a', '#0891b2'].map((color) => (
                <button
                  key={color}
                  onClick={() => handleColorChange(color)}
                  className={`w-10 h-10 rounded border-2 transition-all ${
                    siteDesign.primaryColor === color ? 'border-black dark:border-white scale-110' : 'border-gray-300'
                  }`}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="space-y-4 pt-6 border-t border-border-light dark:border-border-dark">
            <div>
              <div className="text-sm text-muted-light dark:text-muted-dark mb-1">Sections</div>
              <div className="text-2xl font-bold text-heading-light dark:text-heading-dark">
                {5 + (properties.length > 0 ? 1 : 0)}
              </div>
            </div>
            <div>
              <div className="text-sm text-muted-light dark:text-muted-dark mb-1">Properties</div>
              <div className="text-2xl font-bold text-heading-light dark:text-heading-dark">
                {properties.length}
              </div>
            </div>
            <div>
              <div className="text-sm text-muted-light dark:text-muted-dark mb-1">Services</div>
              <div className="text-2xl font-bold text-heading-light dark:text-heading-dark">
                {editableContent.services.length}
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mt-8 space-y-3">
            <button
              onClick={handleAddProperties}
              className="w-full flex items-center justify-between p-3 border border-border-light dark:border-border-dark hover:border-primary transition-colors"
            >
              <span className="text-sm font-medium">Manage Properties</span>
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </button>

            <button
              onClick={() => router.push('/builder/create')}
              className="w-full flex items-center justify-between p-3 border border-border-light dark:border-border-dark hover:border-primary transition-colors"
            >
              <span className="text-sm font-medium">Edit Agent Info</span>
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
