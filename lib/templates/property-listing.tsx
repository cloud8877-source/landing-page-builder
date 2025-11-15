import React from 'react';

export interface PropertyListingData {
  agentInfo: {
    name: string;
    phone: string;
    email: string;
    whatsapp: string;
    agency?: string;
  };
  properties: Array<{
    title: string;
    description: string;
    price: number;
    location: string;
    image?: string;
    bedrooms?: number;
    bathrooms?: number;
    sqft?: number;
    type?: string;
  }>;
  theme?: {
    primaryColor: string;
    secondaryColor: string;
  };
}

export const propertyListingTemplate = {
  id: 'property-listing',
  name: 'Property Listing Template',
  generateHTML: (data: PropertyListingData): string => {
    const { agentInfo, properties, theme } = data;

    const primaryColor = theme?.primaryColor || '#2563eb';
    const secondaryColor = theme?.secondaryColor || '#64748b';

    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${agentInfo.name} - Real Estate Agent</title>
    <style>
        :root {
            --primary-color: ${primaryColor};
            --secondary-color: ${secondaryColor};
        }

        body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            margin: 0;
            padding: 0;
            line-height: 1.6;
            color: #333;
        }

        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 20px;
        }

        header {
            background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
            color: white;
            padding: 40px 0;
            text-align: center;
        }

        .agent-info {
            margin-bottom: 20px;
        }

        .agent-name {
            font-size: 2.5rem;
            font-weight: 700;
            margin: 0;
        }

        .contact-info {
            font-size: 1.1rem;
            opacity: 0.9;
        }

        .properties {
            padding: 60px 0;
            background: #f8fafc;
        }

        .properties-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
            gap: 30px;
            margin-top: 40px;
        }

        .property-card {
            background: white;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .property-card:hover {
            transform: translateY(-4px);
            box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
        }

        .property-image {
            width: 100%;
            height: 250px;
            object-fit: cover;
            background: var(--secondary-color);
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 1.2rem;
        }

        .property-content {
            padding: 24px;
        }

        .property-title {
            font-size: 1.5rem;
            font-weight: 600;
            margin: 0 0 12px 0;
            color: var(--primary-color);
        }

        .property-price {
            font-size: 1.25rem;
            font-weight: 700;
            color: var(--primary-color);
            margin: 0 0 12px 0;
        }

        .property-location {
            color: var(--secondary-color);
            font-weight: 500;
            margin: 0 0 16px 0;
        }

        .property-description {
            color: #666;
            margin: 0 0 20px 0;
        }

        .contact-section {
            padding: 60px 0;
            background: white;
            text-align: center;
        }

        .contact-buttons {
            display: flex;
            justify-content: center;
            gap: 20px;
            flex-wrap: wrap;
            margin-top: 30px;
        }

        .contact-btn {
            padding: 12px 24px;
            border-radius: 8px;
            text-decoration: none;
            font-weight: 600;
            transition: all 0.3s ease;
        }

        .btn-primary {
            background: var(--primary-color);
            color: white;
        }

        .btn-primary:hover {
            background: var(--secondary-color);
        }

        .btn-secondary {
            background: transparent;
            color: var(--primary-color);
            border: 2px solid var(--primary-color);
        }

        .btn-secondary:hover {
            background: var(--primary-color);
            color: white;
        }

        footer {
            background: #1f2937;
            color: white;
            padding: 30px 0;
            text-align: center;
        }

        @media (max-width: 768px) {
            .agent-name {
                font-size: 2rem;
            }

            .properties-grid {
                grid-template-columns: 1fr;
            }

            .contact-buttons {
                flex-direction: column;
                align-items: center;
            }
        }
    </style>
</head>
<body>
    <header>
        <div class="container">
            <div class="agent-info">
                <h1 class="agent-name">${agentInfo.name}</h1>
                <div class="contact-info">
                    ${agentInfo.agency ? `<p>${agentInfo.agency}</p>` : ''}
                    <p>📞 ${agentInfo.phone} | ✉️ ${agentInfo.email}</p>
                </div>
            </div>
        </div>
    </header>

    <section class="properties">
        <div class="container">
            <h2 style="text-align: center; font-size: 2.5rem; margin-bottom: 20px; color: var(--primary-color);">
                Featured Properties
            </h2>
            <div class="properties-grid">
                ${properties.map(property => `
                    <div class="property-card">
                        ${property.image
                            ? `<img src="${property.image}" alt="${property.title}" class="property-image">`
                            : `<div class="property-image">Property Image</div>`
                        }
                        <div class="property-content">
                            <h3 class="property-title">${property.title}</h3>
                            <p class="property-price">RM${property.price.toLocaleString()}</p>
                            <p class="property-location">📍 ${property.location}</p>
                            <p class="property-description">${property.description}</p>
                            ${property.bedrooms && property.bathrooms ? `
                                <p style="color: #666; margin: 10px 0;">
                                    🛏️ ${property.bedrooms} Bedrooms | 🚿 ${property.bathrooms} Bathrooms
                                    ${property.sqft ? ` | 📐 ${property.sqft} sqft` : ''}
                                </p>
                            ` : ''}
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    </section>

    <section class="contact-section">
        <div class="container">
            <h2 style="font-size: 2.5rem; margin-bottom: 20px; color: var(--primary-color);">
                Interested in These Properties?
            </h2>
            <p style="font-size: 1.2rem; color: #666; max-width: 600px; margin: 0 auto;">
                Contact me today to schedule a viewing or get more information about any of these properties.
            </p>
            <div class="contact-buttons">
                <a href="tel:${agentInfo.phone}" class="contact-btn btn-primary">
                    📞 Call Now
                </a>
                <a href="https://wa.me/${agentInfo.whatsapp.replace(/[^\d]/g, '')}" class="contact-btn btn-primary">
                    💬 WhatsApp
                </a>
                <a href="mailto:${agentInfo.email}" class="contact-btn btn-secondary">
                    ✉️ Email
                </a>
            </div>
        </div>
    </section>

    <footer>
        <div class="container">
            <p>&copy; 2024 ${agentInfo.name}. All rights reserved.</p>
            <p style="margin-top: 10px; opacity: 0.8;">Professional Real Estate Services</p>
        </div>
    </footer>
</body>
</html>
    `;
  },
};