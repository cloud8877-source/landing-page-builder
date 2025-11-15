import React from 'react';

export interface TemplateBProps {
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

export default function TemplateB({ data }: TemplateBProps) {
  const { agentName, agentTitle, agencyName, phone, email, whatsapp, about, properties, theme } = data;

  const themeStyle = {
    '--primary-color': theme?.primaryColor || '#1f2937',
    '--secondary-color': theme?.secondaryColor || '#f59e0b',
    '--font-family': theme?.fontFamily || 'Georgia, serif',
  } as React.CSSProperties;

  return (
    <div className="min-h-screen" style={themeStyle}>
      {/* Header */}
      <header className="bg-gradient-to-r from-gray-800 to-gray-900 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-serif mb-4" style={{ fontFamily: 'var(--font-family)' }}>
            {agentName}
          </h1>
          <p className="text-xl mb-2 text-amber-300">{agentTitle}</p>
          <p className="text-lg text-gray-300">{agencyName}</p>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white shadow-md sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex justify-center space-x-8 py-4">
            <a href="#about" className="text-gray-700 hover:text-amber-500 transition-colors">About</a>
            <a href="#properties" className="text-gray-700 hover:text-amber-500 transition-colors">Properties</a>
            <a href="#contact" className="text-gray-700 hover:text-amber-500 transition-colors">Contact</a>
          </div>
        </div>
      </nav>

      {/* About Section */}
      <section id="about" className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-serif mb-8 text-gray-800" style={{ fontFamily: 'var(--font-family)' }}>
            About {agentName}
          </h2>
          <div className="max-w-2xl mx-auto">
            <p className="text-lg text-gray-600 leading-relaxed">
              {about}
            </p>
          </div>
        </div>
      </section>

      {/* Properties Section */}
      {properties && properties.length > 0 && (
        <section id="properties" className="py-20">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-4xl font-serif text-center mb-16 text-gray-800" style={{ fontFamily: 'var(--font-family)' }}>
              Exclusive Properties
            </h2>
            <div className="grid md:grid-cols-2 gap-12">
              {properties.map((property, index) => (
                <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden">
                  {property.image && (
                    <img
                      src={property.image}
                      alt={property.title}
                      className="w-full h-64 object-cover"
                    />
                  )}
                  <div className="p-8">
                    <h3 className="text-2xl font-serif mb-3 text-gray-800" style={{ fontFamily: 'var(--font-family)' }}>
                      {property.title}
                    </h3>
                    <p className="text-amber-500 font-semibold mb-2">{property.location}</p>
                    <p className="text-gray-600 mb-6 leading-relaxed">{property.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-3xl font-bold text-amber-500">
                        RM{property.price.toLocaleString()}
                      </span>
                      <button className="bg-amber-500 text-gray-900 px-6 py-2 rounded font-semibold hover:bg-amber-400 transition-colors">
                        Schedule Viewing
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
      <section id="contact" className="py-20 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-serif mb-12" style={{ fontFamily: 'var(--font-family)' }}>
            Contact {agentName}
          </h2>
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="text-center">
              <div className="text-amber-400 text-3xl mb-4">📞</div>
              <h3 className="text-xl font-semibold mb-2">Phone</h3>
              <a href={`tel:${phone}`} className="text-gray-300 hover:text-white">
                {phone}
              </a>
            </div>
            <div className="text-center">
              <div className="text-amber-400 text-3xl mb-4">✉️</div>
              <h3 className="text-xl font-semibold mb-2">Email</h3>
              <a href={`mailto:${email}`} className="text-gray-300 hover:text-white">
                {email}
              </a>
            </div>
            <div className="text-center">
              <div className="text-amber-400 text-3xl mb-4">💬</div>
              <h3 className="text-xl font-semibold mb-2">WhatsApp</h3>
              <a href={`https://wa.me/${whatsapp.replace(/[^\d]/g, '')}`} className="text-gray-300 hover:text-white">
                {whatsapp}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-400 py-8 border-t border-gray-700">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="mb-2" style={{ fontFamily: 'var(--font-family)' }}>
            &copy; 2024 {agencyName}. All rights reserved.
          </p>
          <p className="text-sm">Professional Real Estate Services</p>
        </div>
      </footer>
    </div>
  );
}