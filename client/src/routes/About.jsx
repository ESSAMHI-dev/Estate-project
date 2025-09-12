import React from "react";

function About() {
  return (
    <div className="w-full px-6 py-16 bg-white text-gray-800">
      {/* Hero Section */}
      <section className="text-center max-w-4xl mx-auto mb-16">
        <h1 className="text-4xl font-bold mb-4 text-[#fece51]">About Us</h1>
        <p className="text-lg text-gray-600">
          Welcome to <span className="font-semibold text-black">LuxeLiving</span>, your trusted platform for finding the perfect place to call home. Whether you’re looking to rent or buy, we connect people with properties — and the owners who manage them.
        </p>
      </section>

      {/* What We Do */}
      <section className="max-w-5xl mx-auto mb-16">
        <h2 className="text-2xl font-semibold mb-4 text-[#333]">What We Do</h2>
        <p className="text-gray-700 leading-relaxed">
          LuxeLiving simplifies the process of finding your dream property by combining listings from verified property owners with powerful search tools and direct messaging. You can:
        </p>
        <ul className="list-disc list-inside mt-4 text-gray-700 space-y-2">
          <li>Browse a wide range of rental and for-sale properties</li>
          <li>Filter by city, type, price range, and number of bedrooms</li>
          <li>View detailed property photos, descriptions, and locations on a map</li>
          <li>Message property owners directly to ask questions or schedule a visit</li>
          <li>Save your favorite properties and track your activity</li>
        </ul>
      </section>

      {/* Features Section */}
      <section className="bg-[#fcf5f3] rounded-xl p-10 mb-16">
        <h2 className="text-2xl font-semibold mb-6 text-[#333] text-center">Why Choose LuxeLiving?</h2>
        <div className="grid sm:grid-cols-2 gap-8 text-gray-700">
          <div>
            <h3 className="font-semibold text-lg mb-2">Trusted Listings</h3>
            <p>We verify all listings to ensure they are legitimate and up-to-date, so you can browse with confidence.</p>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-2">Direct Communication</h3>
            <p>Connect directly with owners and landlords — no middlemen, no hidden fees.</p>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-2">Smart Search</h3>
            <p>Use our filters to narrow down exactly what you’re looking for — from a cozy studio to a luxury villa.</p>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-2">Mobile Friendly</h3>
            <p>Our site is fully responsive, so you can find your next home on any device, anytime.</p>
          </div>
        </div>
      </section>

      {/* Privacy Policy */}
      <section className="max-w-5xl mx-auto">
        <h2 className="text-2xl font-semibold mb-4 text-[#333]">Privacy Policy</h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          We value your privacy and are committed to protecting your personal data. This Privacy Policy outlines how we collect, use, and safeguard your information.
        </p>

        <h3 className="font-semibold text-lg mb-2">1. Information We Collect</h3>
        <p className="mb-4">
          We collect basic user information such as name, email address, and messages exchanged through our platform. When browsing or creating an account, additional data such as saved listings, preferences, and activity may be recorded to improve your experience.
        </p>

        <h3 className="font-semibold text-lg mb-2">2. How We Use Your Data</h3>
        <p className="mb-4">
          Your data is used to facilitate communication with property owners, personalize your experience, and maintain security. We do not sell your personal information to third parties.
        </p>

        <h3 className="font-semibold text-lg mb-2">3. Messaging</h3>
        <p className="mb-4">
          Messages you send to property owners are stored securely and visible only to you and the recipient. These are not shared externally.
        </p>

        <h3 className="font-semibold text-lg mb-2">4. Cookies and Tracking</h3>
        <p className="mb-4">
          We use cookies to maintain your session and track usage anonymously to help improve our services. You can disable cookies in your browser settings.
        </p>

        <h3 className="font-semibold text-lg mb-2">5. Your Rights</h3>
        <p className="mb-4">
          You have the right to access, update, or delete your personal data at any time. To request data removal or modification, contact us at: <a href="mailto:Mohammed.amine.Essamhi@ibm.com" className="text-[#fece51] hover:underline">Mohammed.amine.Essamhi@ibm.com</a>.
        </p>

        <p className="text-sm text-gray-500">
          By using LuxeLiving, you agree to this privacy policy and our terms of service.
        </p>
      </section>
    </div>
  );
}

export default About;
