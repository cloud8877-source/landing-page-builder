// PropertyPage MY - Property Listing Template
// This template uses PLACEHOLDER_* variables that get replaced with actual data

export const propertyListingTemplate = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>PLACEHOLDER_PROPERTY_NAME - Property Listing</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        :root {
            --primary-color: #1e3a8a;
            --accent-color: #d97706;
        }
        .highlight {
            background-color: #fef08a;
            padding: 2px 6px;
            border-radius: 4px;
            font-weight: 600;
        }
    </style>
</head>
<body class="bg-gray-50 text-gray-900">
    <!-- Hero Section with property image -->
    <header class="relative h-[60vh] bg-cover bg-center" style="background-image: linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.6)), url('PLACEHOLDER_HERO_IMAGE');">
        <!-- Agent badge top-right -->
        <div class="absolute top-4 right-4 flex items-center gap-2 bg-black/40 backdrop-blur-sm rounded-full p-2">
            <img src="PLACEHOLDER_AGENT_PHOTO" alt="Agent" class="w-10 h-10 rounded-full border-2 border-amber-600">
            <div class="pr-2">
                <p class="text-white text-sm font-semibold">PLACEHOLDER_AGENT_NAME</p>
                <p class="text-gray-300 text-xs">Property Agent</p>
            </div>
        </div>

        <!-- Hero content -->
        <div class="h-full flex flex-col items-center justify-center text-center px-4">
            <h1 class="text-white text-4xl md:text-6xl font-bold mb-2">PLACEHOLDER_PROPERTY_NAME</h1>
            <p class="text-white text-xl md:text-2xl font-semibold mb-4">RM PLACEHOLDER_PRICE</p>
            <a href="https://wa.me/PLACEHOLDER_PHONE" class="bg-amber-600 hover:bg-amber-700 text-white px-8 py-3 rounded-lg font-bold text-lg">
                WhatsApp Agent Now
            </a>
        </div>
    </header>

    <!-- Key details bar -->
    <div class="bg-white shadow-md sticky top-0 z-10">
        <div class="max-w-6xl mx-auto px-4 py-4">
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div>
                    <p class="text-sm text-gray-500">Bedrooms</p>
                    <p class="font-bold">PLACEHOLDER_BEDS</p>
                </div>
                <div>
                    <p class="text-sm text-gray-500">Bathrooms</p>
                    <p class="font-bold">PLACEHOLDER_BATHS</p>
                </div>
                <div>
                    <p class="text-sm text-gray-500">Area</p>
                    <p class="font-bold">PLACEHOLDER_SQFT sq ft</p>
                </div>
                <div>
                    <p class="text-sm text-gray-500">Location</p>
                    <p class="font-bold">PLACEHOLDER_LOCATION</p>
                </div>
            </div>
        </div>
    </div>

    <!-- Main content sections -->
    <main class="max-w-4xl mx-auto px-4 py-12">
        <!-- Features section -->
        <section class="mb-16">
            <h2 class="text-3xl font-bold text-center mb-8">Property Features</h2>
            <div class="bg-white rounded-lg shadow-lg p-8">
                <div class="grid md:grid-cols-2 gap-4">
                    <div class="flex items-center gap-3">✓ PLACEHOLDER_FEATURE_1</div>
                    <div class="flex items-center gap-3">✓ PLACEHOLDER_FEATURE_2</div>
                    <div class="flex items-center gap-3">✓ PLACEHOLDER_FEATURE_3</div>
                    <div class="flex items-center gap-3">✓ PLACEHOLDER_FEATURE_4</div>
                    <div class="flex items-center gap-3">✓ PLACEHOLDER_FEATURE_5</div>
                    <div class="flex items-center gap-3">✓ PLACEHOLDER_FEATURE_6</div>
                </div>
            </div>
        </section>

        <!-- Photo gallery -->
        <section class="mb-16">
            <h2 class="text-3xl font-bold text-center mb-8">Photo Gallery</h2>
            <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
                <img src="PLACEHOLDER_IMAGE_1" alt="Property photo" class="aspect-square rounded-lg object-cover">
                <img src="PLACEHOLDER_IMAGE_2" alt="Property photo" class="aspect-square rounded-lg object-cover">
                <img src="PLACEHOLDER_IMAGE_3" alt="Property photo" class="aspect-square rounded-lg object-cover">
                <img src="PLACEHOLDER_IMAGE_4" alt="Property photo" class="aspect-square rounded-lg object-cover">
                <img src="PLACEHOLDER_IMAGE_5" alt="Property photo" class="aspect-square rounded-lg object-cover">
                <img src="PLACEHOLDER_IMAGE_6" alt="Property photo" class="aspect-square rounded-lg object-cover">
            </div>
        </section>

        <!-- Description -->
        <section class="mb-16">
            <h2 class="text-3xl font-bold text-center mb-8">About This Property</h2>
            <div class="bg-white rounded-lg shadow-lg p-8">
                <p class="text-gray-700 leading-relaxed text-lg">PLACEHOLDER_DESCRIPTION</p>
            </div>
        </section>

        <!-- Location & amenities -->
        <section class="mb-16">
            <h2 class="text-3xl font-bold text-center mb-8">Location & Nearby</h2>
            <div class="bg-white rounded-lg shadow-lg p-8">
                <h3 class="text-xl font-bold mb-4">Nearby Amenities:</h3>
                <ul class="space-y-2">
                    <li>📍 PLACEHOLDER_AMENITY_1</li>
                    <li>📍 PLACEHOLDER_AMENITY_2</li>
                    <li>📍 PLACEHOLDER_AMENITY_3</li>
                </ul>
            </div>
        </section>
    </main>

    <!-- Contact section -->
    <section class="bg-blue-900 text-white py-16">
        <div class="max-w-2xl mx-auto px-4 text-center">
            <h2 class="text-3xl font-bold mb-8">Contact Agent</h2>
            <img src="PLACEHOLDER_AGENT_PHOTO" alt="Agent" class="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-amber-600">
            <h3 class="text-2xl font-bold mb-2">PLACEHOLDER_AGENT_NAME</h3>
            <p class="text-gray-300 mb-2">REA License: PLACEHOLDER_LICENSE</p>
            <p class="text-gray-300 mb-6">PLACEHOLDER_YEARS_EXP years experience</p>

            <div class="space-y-3 max-w-md mx-auto">
                <a href="https://wa.me/PLACEHOLDER_PHONE" class="block bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-6 rounded-lg">
                    📱 WhatsApp: PLACEHOLDER_PHONE
                </a>
                <a href="mailto:PLACEHOLDER_EMAIL" class="block bg-gray-600 hover:bg-gray-700 text-white font-bold py-4 px-6 rounded-lg">
                    📧 Email: PLACEHOLDER_EMAIL
                </a>
            </div>
        </div>
    </section>

    <!-- Footer -->
    <footer class="bg-gray-900 text-gray-400 py-8 text-center">
        <p>© 2024 PLACEHOLDER_AGENT_NAME. All rights reserved.</p>
    </footer>
</body>
</html>
`;
