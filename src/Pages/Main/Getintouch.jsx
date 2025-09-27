"use client"

import { motion } from "framer-motion"
import { useState } from "react"

export default function Getintouch() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsSubmitting(false)
    setFormData({ name: "", email: "", message: "" })
  }

  return (
    <section className="min-h-screen bg-white py-20 px-6">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h2
            className="text-5xl md:text-6xl font-bold text-black mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Get in Touch
          </motion.h2>

          <motion.p
            className="text-lg md:text-xl text-gray-600 font-light leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Have a question, opportunity, or just want to say hi?
          </motion.p>

          <motion.div
            className="w-16 h-1 bg-black mx-auto mt-8"
            initial={{ width: 0 }}
            animate={{ width: 64 }}
            transition={{ duration: 1, delay: 0.6 }}
          />
        </motion.div>

        {/* Contact Form */}
        <motion.div
          className="bg-white border-2 border-gray-200 rounded-2xl p-8 md:p-12 shadow-lg"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Name Field */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-3">
                Name
              </label>
              <motion.input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-4 border-2 border-gray-300 rounded-lg focus:border-black focus:outline-none transition-all duration-300 text-gray-900 placeholder-gray-400"
                placeholder="Your full name"
                whileFocus={{ scale: 1.02 }}
              />
            </motion.div>

            {/* Email Field */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 1 }}
            >
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-3">
                Email
              </label>
              <motion.input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-4 border-2 border-gray-300 rounded-lg focus:border-black focus:outline-none transition-all duration-300 text-gray-900 placeholder-gray-400"
                placeholder="your.email@example.com"
                whileFocus={{ scale: 1.02 }}
              />
            </motion.div>

            {/* Message Field */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 1.2 }}
            >
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-3">
                Message
              </label>
              <motion.textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={6}
                className="w-full px-4 py-4 border-2 border-gray-300 rounded-lg focus:border-black focus:outline-none transition-all duration-300 text-gray-900 placeholder-gray-400 resize-none"
                placeholder="Tell me about your project, idea, or just say hello..."
                whileFocus={{ scale: 1.02 }}
              />
            </motion.div>

            {/* Submit Button */}
            <motion.div
              className="text-center pt-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.4 }}
            >
              <motion.button
                type="submit"
                disabled={isSubmitting}
                className="px-12 py-4 bg-black text-white font-medium rounded-lg hover:bg-gray-800 disabled:bg-gray-400 transition-all duration-300 min-w-[200px]"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {isSubmitting ? (
                  <motion.div
                    className="flex items-center justify-center gap-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <motion.div
                      className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                    />
                    Sending...
                  </motion.div>
                ) : (
                  "Send Message"
                )}
              </motion.button>
            </motion.div>
          </form>
        </motion.div>

        {/* Bottom Note */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.6 }}
        >
          <p className="text-sm text-gray-500">
            I'll get back to you within 24 hours. Looking forward to hearing from you!
          </p>
        </motion.div>
      </div>
    </section>
  )
}
