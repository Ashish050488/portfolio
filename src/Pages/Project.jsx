"use client"

import { motion } from "framer-motion"
import { FiExternalLink, FiGithub } from "react-icons/fi"

const projects = [
  {
    id: 1,
    title: "CrunchGuardian",
    description:
      "A wallet analytics tracker for cryptocurrency investors to monitor and analyze different wallets before a transaction for the safety of theri funds.",
    tech: "React • Node.js • BitCrunch Api • TailwindCSS • Github",
    github: "https://github.com/Ashish050488/CrunchGuardian-AI",
    live: "https://my-wallet-app-theta.vercel.app/",
  },
]

export default function Project() {
  return (
    <section id="projects" className="min-h-screen bg-white py-20 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-5xl font-bold text-black mb-4">My Projects</h2>
          <p className="text-lg text-gray-400 font-light">Here are some of my recent works</p>
        </motion.div>

        {/* Projects Container */}
        <motion.div
          className="border-2 border-black border-dashed rounded-2xl overflow-hidden"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              className={`p-8 ${index !== projects.length - 1 ? "border-b-2 border-dashed border-black" : ""} group cursor-pointer`}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
              whileHover={{
                scale: 1.02,
                backgroundColor: "#fafafa",
                transition: { duration: 0.2 },
              }}
            >
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                {/* Project Info */}
                <div className="flex-1">
                  <motion.h3
                    className="text-2xl font-bold text-black mb-3 group-hover:text-gray-800 transition-colors"
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    {project.title}
                  </motion.h3>

                  <p className="text-gray-600 mb-4 leading-relaxed">{project.description}</p>

                  <div className="text-sm text-gray-400 font-mono">{project.tech}</div>
                </div>

                {/* Project Links */}
                <motion.div
                  className="flex gap-4 lg:flex-col lg:gap-3"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                >
                  <motion.a
                    href={project.github}
                    // ADD target="_blank" AND rel="noopener noreferrer" HERE
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex items-center gap-2 px-4 py-2 border border-black border-dashed rounded-lg hover:bg-black hover:text-white transition-all duration-200 text-sm font-medium"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FiGithub size={16} />
                    Code
                  </motion.a>

                  <motion.a
                    href={project.live}
                    // ADD target="_blank" AND rel="noopener noreferrer" HERE
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-all duration-200 text-sm font-medium"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FiExternalLink size={16} />
                    Live Demo
                  </motion.a>
                </motion.div>
              </div>

              {/* Hover Line Effect */}
              <motion.div
                className="h-0.5 bg-black mt-6 origin-left"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom Accent */}
        <motion.div
          className="flex justify-center mt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <div className="w-16 h-0.5 bg-gray-300" />
        </motion.div>
      </div>
    </section>
  )
}