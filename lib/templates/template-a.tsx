import React from 'react';

export interface TemplateAProps {
  data: {
    agentName: string;
    agentTitle: string;
    agencyName: string;
    phone: string;
    email: string;
    whatsapp: string;
    about: string;
    properties?: Array<{
      title: string;
      description: string;
      price: number;
      location: string;
      image?: string;
    }>;
    theme?: {
      primaryColor: string;
      secondaryColor: string;
      fontFamily: string;
    };
  };
}

export default function TemplateA({ data }: TemplateAProps) {
  const { agentName, agentTitle, agencyName, phone, email, whatsapp, about, properties, theme } = data;

  const themeStyle = {
    '--primary-color': theme?.primaryColor || '#2563eb',
    '--secondary-color': theme?.secondaryColor || '#64748b',
    '--font-family': theme?.fontFamily || 'Inter, sans-serif',
  } as React.CSSProperties;

  return (
    <div className="min-h-screen" style={themeStyle}>
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900" style={{ fontFamily: 'var(--font-family)' }}>
                {agencyName}
              </h1>
            </div>
            <div className="flex space-x-4">
              <a href={`tel:${phone}`} className="text-gray-600 hover:text-gray-900">
                {phone}
              </a>
              <a href={`mailto:${email}`} className="text-gray-600 hover:text-gray-900">
                {email}
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {agentName}
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90">
            {agentTitle}
          </p>
          <div className="flex justify-center space-x-4">
            <a
              href={`https://wa.me/${whatsapp.replace(/[^\d]/g, '')}`}
              className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              WhatsApp
            </a>
            <a
              href={`tel:${phone}`}
              className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
            >
              Call Now
            </a>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-900">About Me</h2>
          <div className="max-w-3xl mx-auto">
            <p className="text-lg text-gray-700 leading-relaxed text-center">
              {about}
            </p>
          </div>
        </div>
      </section>

      {/* Properties Section */}
      {properties && properties.length > 0 && (
        <section className="py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">Featured Properties</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {properties.map((property, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                  {property.image && (
                    <img
                      src={property.image}
                      alt={property.title}
                      className="w-full h-48 object-cover"
                    />
                  )}
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2 text-gray-900">{property.title}</h3>
                    <p className="text-gray-600 mb-2">{property.location}</p>
                    <p className="text-gray-700 mb-4">{property.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-2xl font-bold text-blue-600">
                        RM{property.price.toLocaleString()}
                      </span>
                      <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors">
                        Contact
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Contact Section */}
      <section className="bg-gray-900 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-8">Get in Touch</h2>
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-semibold mb-2">Phone</h3>
              <a href={`tel:${phone}`} className="text-blue-300 hover:text-white">
                {phone}
              </a>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Email</h3>
              <a href={`mailto:${email}`} className="text-blue-300 hover:text-white">
                {email}
              </a>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">WhatsApp</h3>
              <a href={`https://wa.me/${whatsapp.replace(/[^\d]/g, '')}`} className="text-blue-300 hover:text-white">
                {whatsapp}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-300 py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p>&copy; 2024 {agencyName}. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}