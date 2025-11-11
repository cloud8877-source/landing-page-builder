import React from 'react';
import { LandingPage } from '@/lib/types';
import { Building, Bed, Bath, Maximize, Phone, Mail, MessageCircle, MapPin, Award, Star, Shield, TrendingUp, Users, CheckCircle, Play, Sparkles } from 'lucide-react';

interface TemplateBProps {
  data: LandingPage;
}

export default function TemplateB({ data }: TemplateBProps) {
  const { agentInfo, branding, properties, pageTitle } = data;

  const formatPrice = (price: number) => {
    return `RM ${price.toLocaleString('en-MY')}`;
  };

  const handleWhatsAppClick = (phone: string, propertyTitle?: string) => {
    const message = propertyTitle
      ? `Hi, I'm interested in ${propertyTitle}`
      : `Hi, I'd like to know more about your exclusive properties`;
    const whatsappUrl = `https://wa.me/${phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  // Luxury testimonials
  const testimonials = [
    { name: 'David Lim', rating: 5, text: 'Exceptional luxury properties and white-glove service throughout.', title: 'CEO, Tech Startup' },
    { name: 'Victoria Wong', rating: 5, text: 'Found our dream penthouse. Truly understands the luxury market.', title: 'Investment Banker' },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white" style={{ fontFamily: 'Playfair Display, serif' }}>
      {/* Full-Width Hero - Enhanced Luxury */}
      <section
        className="relative min-h-screen flex items-center justify-center bg-cover bg-center"
        style={{
          backgroundImage: properties[0]?.photos[0]
            ? `url(${properties[0].photos[0]})`
            : 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
        }}
      >
        {/* Enhanced Overlay with Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/90 via-slate-950/75 to-slate-950/90"></div>

        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '50px 50px'
          }}></div>
        </div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 text-center">
          {/* Premium Badge */}
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full mb-6 border border-white/20" style={{ backgroundColor: `${branding.primaryColor}20` }}>
            <Sparkles className="h-4 w-4" style={{ color: branding.primaryColor }} />
            <span className="text-sm font-semibold" style={{ color: branding.primaryColor }}>Exclusive Luxury Properties</span>
          </div>

          {agentInfo.logoUrl && (
            <img
              src={agentInfo.logoUrl}
              alt={agentInfo.name}
              className="h-24 w-auto object-contain mx-auto mb-8 drop-shadow-2xl"
            />
          )}

          <h1 className="text-6xl md:text-8xl font-bold mb-8 text-white leading-tight drop-shadow-2xl">
            {pageTitle}
          </h1>

          <p className="text-3xl md:text-4xl mb-6 font-serif" style={{ color: branding.primaryColor }}>
            {agentInfo.name}
          </p>

          <p className="text-xl md:text-2xl mb-6 opacity-90 max-w-3xl mx-auto">
            Curating exceptional properties for discerning clients
          </p>

          {/* Stats Bar */}
          <div className="flex items-center justify-center gap-8 mb-12 flex-wrap">
            <div className="text-center">
              <p className="text-4xl font-bold" style={{ color: branding.primaryColor }}>{properties.length}+</p>
              <p className="text-sm opacity-75">Exclusive Listings</p>
            </div>
            <div className="w-px h-12 bg-white/20"></div>
            <div className="text-center">
              <p className="text-4xl font-bold" style={{ color: branding.primaryColor }}>RM 50M+</p>
              <p className="text-sm opacity-75">Portfolio Value</p>
            </div>
            <div className="w-px h-12 bg-white/20"></div>
            <div className="text-center">
              <p className="text-4xl font-bold" style={{ color: branding.primaryColor }}>15+</p>
              <p className="text-sm opacity-75">Years Experience</p>
            </div>
          </div>

          <div className="flex items-center justify-center gap-5 flex-wrap">
            <a
              href="#properties"
              className="px-10 py-5 rounded-xl font-bold text-slate-950 transition-all hover:shadow-2xl transform hover:scale-105 text-lg"
              style={{ backgroundColor: branding.primaryColor }}
            >
              View Exclusive Collection
            </a>
            <button
              onClick={() => handleWhatsAppClick(agentInfo.whatsapp)}
              className="px-10 py-5 rounded-xl border-2 font-bold text-white transition-all hover:bg-white/10 backdrop-blur-sm text-lg"
              style={{ borderColor: branding.primaryColor }}
            >
              <MessageCircle className="inline h-5 w-5 mr-2" />
              Private Consultation
            </button>
          </div>
        </div>

        {/* Enhanced Scroll Indicator */}
        <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-12 border-2 rounded-full flex items-start justify-center p-2" style={{ borderColor: `${branding.primaryColor}80` }}>
            <div className="w-1 h-3 rounded-full" style={{ backgroundColor: branding.primaryColor }}></div>
          </div>
          <p className="text-xs mt-3 opacity-60">Scroll to explore</p>
        </div>
      </section>

      {/* Concierge Section */}
      <section className="py-20 bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Why Choose {agentInfo.name}?</h2>
            <div className="w-24 h-1 mx-auto" style={{ backgroundColor: branding.primaryColor }}></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center p-8 rounded-xl bg-slate-800/50 backdrop-blur">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ backgroundColor: branding.primaryColor }}>
                <Award className="h-8 w-8 text-slate-950" />
              </div>
              <h3 className="text-xl font-bold mb-3">Local Expertise</h3>
              <p className="text-gray-300 leading-relaxed">
                Deep knowledge of the area's best properties and neighborhoods
              </p>
            </div>

            <div className="text-center p-8 rounded-xl bg-slate-800/50 backdrop-blur">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ backgroundColor: branding.primaryColor }}>
                <Star className="h-8 w-8 text-slate-950" />
              </div>
              <h3 className="text-xl font-bold mb-3">VIP Service</h3>
              <p className="text-gray-300 leading-relaxed">
                Personalized attention and exclusive access to premium listings
              </p>
            </div>

            <div className="text-center p-8 rounded-xl bg-slate-800/50 backdrop-blur">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ backgroundColor: branding.primaryColor }}>
                <Shield className="h-8 w-8 text-slate-950" />
              </div>
              <h3 className="text-xl font-bold mb-3">Exclusive Access</h3>
              <p className="text-gray-300 leading-relaxed">
                First look at off-market properties and pre-launch developments
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section id="properties" className="py-20 bg-slate-950">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Exclusive Listings</h2>
            <p className="text-xl text-gray-300">Handpicked premium properties just for you</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {properties.map((property, index) => (
              <div
                key={property.id}
                className="bg-slate-900 rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300 border border-slate-800"
              >
                {/* Large Property Image */}
                <div className="relative h-96 bg-slate-800 overflow-hidden group">
                  {property.photos[0] ? (
                    <img
                      src={property.photos[0]}
                      alt={property.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-slate-800">
                      <Building className="h-24 w-24 text-slate-600" />
                    </div>
                  )}

                  {/* Exclusive Badge */}
                  {index === 0 && (
                    <div className="absolute top-6 left-6 px-4 py-2 rounded-full text-slate-950 font-bold text-sm" style={{ backgroundColor: branding.primaryColor }}>
                      Featured
                    </div>
                  )}

                  {/* Price Tag */}
                  <div className="absolute bottom-6 right-6 px-6 py-3 rounded-lg bg-slate-950/90 backdrop-blur">
                    <p className="text-2xl font-bold" style={{ color: branding.primaryColor }}>
                      {formatPrice(property.price)}
                    </p>
                  </div>
                </div>

                {/* Property Details */}
                <div className="p-8">
                  <div className="flex items-center gap-2 text-gray-400 mb-3">
                    <MapPin className="h-4 w-4" style={{ color: branding.primaryColor }} />
                    <span className="text-sm">{property.location}</span>
                  </div>

                  <h3 className="text-2xl font-bold mb-4">{property.title}</h3>

                  <div className="flex items-center gap-6 mb-6 text-gray-300">
                    <div className="flex items-center gap-2">
                      <Bed className="h-5 w-5" />
                      <span>{property.bedrooms} Beds</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Bath className="h-5 w-5" />
                      <span>{property.bathrooms} Baths</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Maximize className="h-5 w-5" />
                      <span>{property.sqft} sqft</span>
                    </div>
                  </div>

                  <p className="text-gray-300 leading-relaxed mb-6 line-clamp-3">
                    {property.description}
                  </p>

                  <div className="flex gap-3">
                    <button
                      onClick={() => handleWhatsAppClick(property.contactInfo.whatsapp, property.title)}
                      className="flex-1 py-3 px-6 rounded-lg font-semibold transition hover:opacity-90"
                      style={{ backgroundColor: branding.primaryColor, color: '#0f172a' }}
                    >
                      Schedule Viewing
                    </button>
                    <a
                      href={`tel:${property.contactInfo.phone}`}
                      className="py-3 px-6 rounded-lg border-2 font-semibold transition hover:bg-white hover:text-slate-950"
                      style={{ borderColor: branding.primaryColor }}
                    >
                      <Phone className="h-5 w-5" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section - NEW */}
      <section className="py-24 bg-slate-950">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4 border" style={{ borderColor: `${branding.primaryColor}40`, backgroundColor: `${branding.primaryColor}10` }}>
              <Star className="h-4 w-4 fill-current" style={{ color: branding.primaryColor }} />
              <span className="text-sm font-semibold" style={{ color: branding.primaryColor }}>Client Excellence</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-bold mb-6">Distinguished Clientele</h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Trusted by industry leaders and high-net-worth individuals
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-16">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-slate-900/50 backdrop-blur border border-slate-800 rounded-2xl p-10 hover:border-slate-700 transition-all"
              >
                {/* Star Rating */}
                <div className="flex items-center gap-1 mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-6 w-6 fill-current" style={{ color: branding.primaryColor }} />
                  ))}
                </div>

                {/* Testimonial Text */}
                <p className="text-lg text-gray-300 mb-8 leading-relaxed italic">
                  "{testimonial.text}"
                </p>

                {/* Client Info */}
                <div className="flex items-center gap-4">
                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center text-white font-bold text-xl"
                    style={{ backgroundColor: branding.primaryColor }}
                  >
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-bold text-white text-lg">{testimonial.name}</p>
                    <p className="text-sm" style={{ color: branding.primaryColor }}>{testimonial.title}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Luxury Trust Badges */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className="text-center p-6 rounded-xl bg-slate-900/30 border border-slate-800">
              <Award className="h-10 w-10 mx-auto mb-3" style={{ color: branding.primaryColor }} />
              <p className="text-sm font-semibold">Award Winning</p>
              <p className="text-xs text-gray-500 mt-1">2020-2025</p>
            </div>
            <div className="text-center p-6 rounded-xl bg-slate-900/30 border border-slate-800">
              <Shield className="h-10 w-10 mx-auto mb-3" style={{ color: branding.primaryColor }} />
              <p className="text-sm font-semibold">Verified Listings</p>
              <p className="text-xs text-gray-500 mt-1">100% Authentic</p>
            </div>
            <div className="text-center p-6 rounded-xl bg-slate-900/30 border border-slate-800">
              <Users className="h-10 w-10 mx-auto mb-3" style={{ color: branding.primaryColor }} />
              <p className="text-sm font-semibold">VIP Network</p>
              <p className="text-xs text-gray-500 mt-1">Elite Clientele</p>
            </div>
            <div className="text-center p-6 rounded-xl bg-slate-900/30 border border-slate-800">
              <TrendingUp className="h-10 w-10 mx-auto mb-3" style={{ color: branding.primaryColor }} />
              <p className="text-sm font-semibold">Top Performer</p>
              <p className="text-xs text-gray-500 mt-1">98% Success Rate</p>
            </div>
          </div>
        </div>
      </section>

      {/* Booking Form */}
      <section className="py-20 bg-slate-900">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-12">
            <h2 className="text-5xl md:text-6xl font-bold mb-6">Exclusive Access Awaits</h2>
            <p className="text-xl text-gray-300">Schedule your private viewing with our luxury property specialist</p>
          </div>

          <div className="bg-slate-800/50 backdrop-blur rounded-3xl shadow-2xl p-10 md:p-12 border border-slate-700">
            {/* Streamlined Luxury Form */}
            <form className="space-y-6" id="contact-form">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-bold mb-3" style={{ color: branding.primaryColor }}>
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="w-full px-5 py-4 bg-slate-950 border-2 border-slate-700 rounded-xl focus:ring-2 focus:border-transparent text-white text-lg transition-all"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-bold mb-3" style={{ color: branding.primaryColor }}>
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    className="w-full px-5 py-4 bg-slate-950 border-2 border-slate-700 rounded-xl focus:ring-2 focus:border-transparent text-white text-lg transition-all"
                    placeholder="+60 12-345 6789"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-bold mb-3" style={{ color: branding.primaryColor }}>
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full px-5 py-4 bg-slate-950 border-2 border-slate-700 rounded-xl focus:ring-2 focus:border-transparent text-white text-lg transition-all"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label htmlFor="property-interest" className="block text-sm font-bold mb-3" style={{ color: branding.primaryColor }}>
                  Property of Interest (Optional)
                </label>
                <select
                  id="property-interest"
                  name="propertyInterest"
                  className="w-full px-5 py-4 bg-slate-950 border-2 border-slate-700 rounded-xl focus:ring-2 focus:border-transparent text-white text-lg transition-all"
                >
                  <option value="">Select or leave blank for portfolio overview</option>
                  {properties.map((property) => (
                    <option key={property.id} value={property.id}>
                      {property.title}
                    </option>
                  ))}
                </select>
              </div>

              <button
                type="submit"
                className="w-full py-5 px-8 rounded-xl font-bold text-xl text-slate-950 transition-all hover:shadow-2xl transform hover:scale-[1.02] flex items-center justify-center gap-3"
                style={{ backgroundColor: branding.primaryColor }}
              >
                <Sparkles className="h-6 w-6" />
                Request Private Viewing
              </button>

              <p className="text-xs text-center text-gray-500 mt-6 flex items-center justify-center gap-2">
                <CheckCircle className="h-4 w-4" />
                Discreet, confidential service. Response within 2 hours.
              </p>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 border-t border-slate-800 py-12">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <p className="text-xl font-semibold mb-2">{agentInfo.name}</p>
            <div className="flex items-center justify-center gap-6 mb-6">
              <a href={`tel:${agentInfo.phone}`} className="text-gray-400 hover:text-white transition">
                {agentInfo.phone}
              </a>
              <span className="text-gray-600">|</span>
              <a href={`mailto:${agentInfo.email}`} className="text-gray-400 hover:text-white transition">
                {agentInfo.email}
              </a>
            </div>
            <p className="text-sm text-gray-500">
              © {new Date().getFullYear()} {agentInfo.name}. Luxury Property Services.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
