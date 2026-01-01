"use client";

import React, { useState } from 'react';
import { toast } from 'sonner';
import { sendEmail } from '@/lib/actions';

const ContactForm = ({ content }: { content?: any }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const title = content?.title || "Thanks for taking the time to reach out. How can I help you today?";

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);
    const result = await sendEmail(formData);

    if (result.error) {
      toast.error(result.error);
    } else {
      toast.success('Message sent successfully!');
      (event.target as HTMLFormElement).reset();
    }
    
    setIsSubmitting(false);
  }

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="container mx-auto px-6 max-w-3xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#141c3a] mb-4" style={{ fontFamily: 'europa, sans-serif' }}>
              {title}
            </h2>
          </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#7510f7] focus:border-transparent outline-none transition-all"
                placeholder="Enter your name"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#7510f7] focus:border-transparent outline-none transition-all"
                placeholder="Enter your email"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
            <textarea
              id="message"
              name="message"
              required
              rows={6}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#7510f7] focus:border-transparent outline-none transition-all resize-none"
              placeholder="How can I help you?"
            ></textarea>
          </div>

          <div className="text-center">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`
                px-12 py-4 rounded-full border-2 border-[#7510f7] text-[#7510f7] font-bold text-lg
                hover:bg-[#7510f7] hover:text-white transition-all duration-300
                disabled:opacity-50 disabled:cursor-not-allowed
              `}
              style={{ fontFamily: 'europa, sans-serif' }}
            >
              {isSubmitting ? 'Sending...' : 'Submit'}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default ContactForm;
