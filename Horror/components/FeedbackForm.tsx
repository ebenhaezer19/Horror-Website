'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

export function FeedbackForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    rating: '5'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log(formData);
    // Reset form
    setFormData({ name: '', email: '', message: '', rating: '5' });
  };

  return (
    <section className="py-16 px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-black/50 z-0" />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-4xl mx-auto relative z-10"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-red-600 text-center mb-8">
          Share Your Nightmares
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <label className="block text-gray-300 mb-2">Your Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 bg-gray-900/50 border border-gray-800 rounded-lg focus:ring-red-500 focus:border-red-500 text-white placeholder-gray-500"
                placeholder="Enter your name"
                required
              />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <label className="block text-gray-300 mb-2">Your Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 bg-gray-900/50 border border-gray-800 rounded-lg focus:ring-red-500 focus:border-red-500 text-white placeholder-gray-500"
                placeholder="Enter your email"
                required
              />
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <label className="block text-gray-300 mb-2">Fear Rating</label>
            <select
              value={formData.rating}
              onChange={(e) => setFormData({ ...formData, rating: e.target.value })}
              className="w-full px-4 py-3 bg-gray-900/50 border border-gray-800 rounded-lg focus:ring-red-500 focus:border-red-500 text-white"
            >
              {[1, 2, 3, 4, 5].map((num) => (
                <option key={num} value={num}>
                  {num} {num === 1 ? 'Skull' : 'Skulls'} - {
                    num === 1 ? 'Mildly Disturbing' :
                    num === 2 ? 'Unsettling' :
                    num === 3 ? 'Frightening' :
                    num === 4 ? 'Terrifying' :
                    'Nightmare Inducing'
                  }
                </option>
              ))}
            </select>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <label className="block text-gray-300 mb-2">Your Message</label>
            <textarea
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full px-4 py-3 bg-gray-900/50 border border-gray-800 rounded-lg focus:ring-red-500 focus:border-red-500 text-white placeholder-gray-500 min-h-[150px]"
              placeholder="Describe your experience..."
              required
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <button
              type="submit"
              className="px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-colors duration-300 transform hover:scale-105"
            >
              Submit Your Nightmare
            </button>
          </motion.div>
        </form>
      </motion.div>
    </section>
  );
} 