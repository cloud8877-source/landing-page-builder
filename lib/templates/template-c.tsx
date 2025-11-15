import React from 'react';

export interface TemplateCProps {
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

export default function TemplateC({ data }: TemplateCProps) {
  const { agentName, agentTitle, agencyName, phone, email, whatsapp, about, properties, theme } = data;

  const themeStyle = {
    '--primary-color': theme?.primaryColor || '#059669',
    '--accent-color': theme?.secondaryColor || '#10b981',
    '--font-family': theme?.fontFamily || 'system-ui, -apple-system, sans-serif',
  } as React.CSSProperties;

  return (
    <div className="min-h-screen bg-white" style={themeStyle}>
      {/* Simple Header */}
      <header className="py-8 border-b">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-3xl font-light mb-2 text-gray-900" style={{ fontFamily: 'var(--font-family)' }}>
            {agentName}
          </h1>
          <p className="text-gray-600">{agentTitle}</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-12">
        {/* Bio Section */}
        <section className="mb-16 text-center">
          <h2 className="text-2xl font-light mb-8 text-gray-900" style={{ fontFamily: 'var(--font-family)' }}>
            Hello, I'm {agentName}
          </h2>
          <div className="max-w-2xl mx-auto">
            <p className="text-gray-600 leading-relaxed text-lg">
              {about}
            </p>
          </div>
        </section>

        {/* Quick Contact */}
        <section className="mb-16 bg-gray-50 rounded-lg p-8 text-center">
          <h3 className="text-xl font-light mb-6 text-gray-900" style={{ fontFamily: 'var(--font-family)' }}>
            Get in Touch
          </h3>
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
            <a
              href={`tel:${phone}`}
              className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors"
            >
              <span className="mr-2">📞</span>
              {phone}
            </a>
            <a
              href={`mailto:${email}`}
              className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors"
            >
              <span className="mr-2">✉️</span>
              {email}
            </a>
            <a
              href={`https://wa.me/${whatsapp.replace(/[^\d]/g, '')}`}
              className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors"
            >
              <span className="mr-2">💬</span>
              WhatsApp
            </a>
          </div>
        </section>

        {/* Properties */}
        {properties && properties.length > 0 && (
          <section className="mb-16">
            <h2 className="text-2xl font-light mb-12 text-center text-gray-900" style={{ fontFamily: 'var(--font-family)' }}>
              Available Properties
            </h2>
            <div className="space-y-8">
              {properties.map((property, index) => (
                <article key={index} className="border-b pb-8 last:border-b-0">
                  <div className="flex flex-col md:flex-row gap-6">
                    {property.image && (
                      <div className="md:w-1/3">
                        <img
                          src={property.image}
                          alt={property.title}
                          className="w-full h-48 object-cover rounded-lg"
                        />
                      </div>
                    )}
                    <div className="flex-1">
                      <h3 className="text-xl font-medium mb-2 text-gray-900" style={{ fontFamily: 'var(--font-family)' }}>
                        {property.title}
                      </h3>
                      <p className="text-emerald-600 mb-3 text-sm uppercase tracking-wide">{property.location}</p>
                      <p className="text-gray-600 mb-4 leading-relaxed">{property.description}</p>
                      <div className="flex justify-between items-center">
                        <span className="text-2xl font-light text-emerald-600">
                          RM{property.price.toLocaleString()}
                        </span>
                        <button className="px-4 py-2 text-sm border border-emerald-600 text-emerald-600 rounded hover:bg-emerald-50 transition-colors">
                          Contact for Details
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

        {/* Contact Form */}
        <section className="bg-gray-50 rounded-lg p-8">
          <h2 className="text-2xl font-light mb-8 text-center text-gray-900" style={{ fontFamily: 'var(--font-family)' }}>
            Send a Message
          </h2>
          <form className="max-w-2xl mx-auto">
            <div className="mb-6">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-colors"
                required
              />
            </div>
            <div className="mb-6">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-colors"
                required
              />
            </div>
            <div className="mb-6">
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-colors resize-none"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full px-6 py-3 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition-colors font-light"
              style={{ fontFamily: 'var(--font-family)' }}
            >
              Send Message
            </button>
          </form>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t py-8 mt-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-gray-600" style={{ fontFamily: 'var(--font-family)' }}>
            &copy; 2024 {agencyName}. All rights reserved.
          </p>
          <p className="text-sm text-gray-500 mt-2">Professional Real Estate Services</p>
        </div>
      </footer>
    </div>
  );
}