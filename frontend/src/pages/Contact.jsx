import React, { useState } from "react";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { Button } from "../components/Common";

export const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate form submission
    console.log("Form submitted:", formData);
    setSubmitted(true);
    setFormData({ name: "", email: "", subject: "", message: "" });
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Contact Us</h1>
          <p className="text-xl text-gray-600">We'd love to hear from you. Get in touch with our support team</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {/* Email Support Card */}
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <div className="inline-block p-4 bg-blue-100 rounded-lg mb-4">
              <Mail className="text-blue-600" size={32} />
            </div>
            <h3 className="text-xl font-semibold mb-2">Email</h3>
            <p className="text-gray-600 mb-2">support@cropguard.com</p>
            <p className="text-sm text-gray-500">We'll respond within 24 hours</p>
          </div>

          {/* Phone Support Card */}
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <div className="inline-block p-4 bg-green-100 rounded-lg mb-4">
              <Phone className="text-green-600" size={32} />
            </div>
            <h3 className="text-xl font-semibold mb-2">Phone</h3>
            <p className="text-gray-600 mb-2">+1 (800) 123-4567</p>
            <p className="text-sm text-gray-500">Monday - Friday, 9 AM - 5 PM</p>
          </div>

          {/* Office Location Card */}
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <div className="inline-block p-4 bg-red-100 rounded-lg mb-4">
              <MapPin className="text-red-600" size={32} />
            </div>
            <h3 className="text-xl font-semibold mb-2">Office</h3>
            <p className="text-gray-600 mb-2">123 Farm Lane, Agriculture District</p>
            <p className="text-sm text-gray-500">New Delhi, India 110001</p>
          </div>
        </div>

        {/* Contact Form Row */}
        <div className="grid lg:grid-cols-2 gap-12 mb-12">
          {/* Form Column */}
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-semibold mb-6">Send us a Message</h2>

            {submitted && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700 flex items-start gap-3">
                <span className="text-xl">✓</span>
                <div>
                  <p className="font-semibold">Message Sent!</p>
                  <p className="text-sm">Thank you for contacting us. We'll get back to you soon.</p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="you@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Subject</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="How can we help?"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="5"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
                  placeholder="Tell us more..."
                />
              </div>

              <Button type="submit" variant="primary" size="lg" className="w-full">
                <Send size={20} />
                Send Message
              </Button>
            </form>
          </div>

          {/* FAQ Column */}
          <div>
            <h2 className="text-2xl font-semibold mb-6">Quick Help</h2>

            <div className="space-y-4">
              <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-green-500">
                <h3 className="font-semibold text-gray-900 mb-2">🚀 Getting Started</h3>
                <p className="text-sm text-gray-600">New to CropGuard? Learn how to upload your first image and get disease detection results.</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-blue-500">
                <h3 className="font-semibold text-gray-900 mb-2">📱 Mobile App</h3>
                <p className="text-sm text-gray-600">Download our mobile app for on-field disease detection. Available on iOS and Android.</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-purple-500">
                <h3 className="font-semibold text-gray-900 mb-2">🏢 For Organizations</h3>
                <p className="text-sm text-gray-600">We offer custom enterprise plans with API access for agricultural organizations and research institutions.</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-orange-500">
                <h3 className="font-semibold text-gray-900 mb-2">📚 Knowledge Base</h3>
                <p className="text-sm text-gray-600">Visit our comprehensive knowledge base with tutorials, guides, and best practices for crop disease management.</p>
              </div>

              <div className="bg-green-50 p-6 rounded-lg border border-green-200">
                <p className="text-sm text-gray-700">
                  <span className="font-semibold">Response Time:</span> Our support team typically responds within 4 business hours during standard business hours.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
