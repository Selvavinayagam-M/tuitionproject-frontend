
import React, { useState } from 'react';
import Button from '../../../shared/components/Button';
import { FaPaperPlane } from 'react-icons/fa';

const ContactForm = () => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '', subject: 'General Enquiry' });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Message Sent! We will get back to you soon.');
    setFormData({ name: '', email: '', phone: '', message: '', subject: 'General Enquiry' });
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Send us a Message</h2>
            <p className="text-gray-500">Have a query? We would love to hear from you.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="label">Your Name</label>
                <input type="text" name="name" required value={formData.name} onChange={handleChange} className="input-field w-full p-3 border rounded-lg bg-gray-50 focus:bg-white" placeholder="John Doe" />
              </div>
              <div>
                <label className="label">Phone Number</label>
                <input type="tel" name="phone" required value={formData.phone} onChange={handleChange} className="input-field w-full p-3 border rounded-lg bg-gray-50 focus:bg-white" placeholder="+91 98765..." />
              </div>
            </div>

            <div>
              <label className="label">Email Address</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} className="input-field w-full p-3 border rounded-lg bg-gray-50 focus:bg-white" placeholder="john@example.com" />
            </div>

            <div>
              <label className="label">Subject</label>
              <select name="subject" value={formData.subject} onChange={handleChange} className="input-field w-full p-3 border rounded-lg bg-gray-50 focus:bg-white">
                <option>General Enquiry</option>
                <option>Admission Enquiry</option>
                <option>Fee Structure</option>
                <option>Feedback</option>
              </select>
            </div>

            <div>
              <label className="label">Message</label>
              <textarea name="message" required value={formData.message} onChange={handleChange} rows="4" className="input-field w-full p-3 border rounded-lg bg-gray-50 focus:bg-white" placeholder="How can we help you?"></textarea>
            </div>

            <Button type="submit" width="full" className="bg-blue-900 hover:bg-blue-800 py-3 text-lg shadow-lg">
              <FaPaperPlane className="mr-2" /> Send Message
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;