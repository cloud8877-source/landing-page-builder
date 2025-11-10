export const affordableHousingTemplate = {
  html: `
    <section class="bg-gradient-to-r from-green-600 to-green-800 text-white py-20">
      <div class="container mx-auto px-4 text-center">
        <h1 class="text-5xl font-bold mb-4">Rumah Mampu Milik</h1>
        <h2 class="text-3xl mb-6">Affordable Homes for Malaysian Families</h2>
        <p class="text-xl mb-8">Harga berpatutan • Lokasi strategik • Kemudahan lengkap</p>
        <div class="flex gap-4 justify-center flex-wrap">
          <a href="#units" class="bg-white text-green-800 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">View Units</a>
          <a href="https://wa.me/60123456789" target="_blank" class="bg-yellow-500 text-green-900 px-8 py-3 rounded-lg font-semibold hover:bg-yellow-400 transition">WhatsApp Kami</a>
        </div>
      </div>
    </section>

    <section class="py-16 bg-white">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl font-bold text-center mb-12">Mengapa Pilih Kami?</h2>
        <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div class="text-center p-4">
            <div class="text-4xl mb-3">💰</div>
            <h3 class="font-semibold mb-2">Harga Berpatutan</h3>
            <p class="text-sm text-gray-600">Dari RM 250,000</p>
          </div>
          <div class="text-center p-4">
            <div class="text-4xl mb-3">🏢</div>
            <h3 class="font-semibold mb-2">Lokasi Strategik</h3>
            <p class="text-sm text-gray-600">Dekat LRT & highway</p>
          </div>
          <div class="text-center p-4">
            <div class="text-4xl mb-3">✅</div>
            <h3 class="font-semibold mb-2">Layak PR1MA</h3>
            <p class="text-sm text-gray-600">Kelayakan PR1MA</p>
          </div>
          <div class="text-center p-4">
            <div class="text-4xl mb-3">🏠</div>
            <h3 class="font-semibold mb-2">Siap Renovate</h3>
            <p class="text-sm text-gray-600">Fully fitted</p>
          </div>
        </div>
      </div>
    </section>

    <section id="units" class="py-16 bg-gray-50">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl font-bold text-center mb-12">Unit Tersedia</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <div class="bg-white rounded-lg shadow-md overflow-hidden">
            <div class="h-48 bg-gradient-to-br from-green-400 to-green-600"></div>
            <div class="p-6">
              <h3 class="text-2xl font-bold mb-2 text-green-800">RM 280,000</h3>
              <p class="text-gray-600 mb-4">Type A - 3 Bilik</p>
              <div class="space-y-2 text-sm mb-4">
                <div class="flex justify-between"><span>Bilik Tidur:</span><span>3</span></div>
                <div class="flex justify-between"><span>Bilik Air:</span><span>2</span></div>
                <div class="flex justify-between"><span>Keluasan:</span><span>900 kaki²</span></div>
              </div>
              <a href="#contact" class="block text-center bg-green-600 text-white py-2 rounded-lg hover:bg-green-700">Tanya Sekarang</a>
            </div>
          </div>
          <div class="bg-white rounded-lg shadow-md overflow-hidden">
            <div class="h-48 bg-gradient-to-br from-blue-400 to-blue-600"></div>
            <div class="p-6">
              <h3 class="text-2xl font-bold mb-2 text-blue-800">RM 320,000</h3>
              <p class="text-gray-600 mb-4">Type B - 3 Bilik</p>
              <div class="space-y-2 text-sm mb-4">
                <div class="flex justify-between"><span>Bilik Tidur:</span><span>3</span></div>
                <div class="flex justify-between"><span>Bilik Air:</span><span>2</span></div>
                <div class="flex justify-between"><span>Keluasan:</span><span>1,000 kaki²</span></div>
              </div>
              <a href="#contact" class="block text-center bg-green-600 text-white py-2 rounded-lg hover:bg-green-700">Tanya Sekarang</a>
            </div>
          </div>
          <div class="bg-white rounded-lg shadow-md overflow-hidden">
            <div class="h-48 bg-gradient-to-br from-purple-400 to-purple-600"></div>
            <div class="p-6">
              <h3 class="text-2xl font-bold mb-2 text-purple-800">RM 380,000</h3>
              <p class="text-gray-600 mb-4">Type C - 4 Bilik</p>
              <div class="space-y-2 text-sm mb-4">
                <div class="flex justify-between"><span>Bilik Tidur:</span><span>4</span></div>
                <div class="flex justify-between"><span>Bilik Air:</span><span>3</span></div>
                <div class="flex justify-between"><span>Keluasan:</span><span>1,200 kaki²</span></div>
              </div>
              <a href="#contact" class="block text-center bg-green-600 text-white py-2 rounded-lg hover:bg-green-700">Tanya Sekarang</a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section id="contact" class="py-16 bg-white">
      <div class="container mx-auto px-4 max-w-2xl">
        <h2 class="text-3xl font-bold text-center mb-8">Hubungi Kami</h2>
        <form class="space-y-4" onsubmit="handleSubmit(event)">
          <input type="text" name="name" placeholder="Nama Penuh" class="w-full px-4 py-3 rounded-lg border focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none" required />
          <input type="email" name="email" placeholder="Emel" class="w-full px-4 py-3 rounded-lg border focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none" required />
          <input type="tel" name="phone" placeholder="No. Telefon" class="w-full px-4 py-3 rounded-lg border focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none" required />
          <select name="interest" class="w-full px-4 py-3 rounded-lg border focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none">
            <option value="">Pilih Unit</option>
            <option value="type-a">Type A - RM 280,000</option>
            <option value="type-b">Type B - RM 320,000</option>
            <option value="type-c">Type C - RM 380,000</option>
          </select>
          <textarea name="message" rows="3" placeholder="Mesej" class="w-full px-4 py-3 rounded-lg border focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none"></textarea>
          <button type="submit" class="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition">Hantar</button>
        </form>
      </div>
    </section>

    <footer class="bg-gray-900 text-white py-8">
      <div class="container mx-auto px-4 text-center">
        <h3 class="text-xl font-bold mb-2">Rumah Mampu Milik</h3>
        <p class="text-gray-400 text-sm">Hubungi: +60 12-345 6789</p>
        <p class="text-gray-500 text-sm mt-4">&copy; 2024 All Rights Reserved</p>
      </div>
    </footer>

    <script>
    function handleSubmit(e) {
      e.preventDefault();
      const formData = new FormData(e.target);
      fetch('/api/leads', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          name: formData.get('name'),
          email: formData.get('email'),
          phone: formData.get('phone'),
          interest: formData.get('interest'),
          message: formData.get('message')
        })
      })
      .then(() => {
        alert('Terima kasih! Kami akan hubungi anda tidak lama lagi.');
        e.target.reset();
      })
      .catch(() => alert('Ralat. Sila cuba WhatsApp.'));
    }
    </script>
  `,
  css: `
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; }
  `,
};
