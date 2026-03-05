import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { FiExternalLink, FiGithub, FiChevronDown } from "react-icons/fi"

const projects = [
  {
    id: 1,
    title: "CrunchGuardian",
    description:
      "A wallet analytics tracker for cryptocurrency investors to monitor and analyze different wallets before a transaction for the safety of their funds.",
    tech: "React • Node.js • BitCrunch Api • TailwindCSS • Github",
    github: { 
      "Code": "https://github.com/Ashish050488/CrunchGuardian-AI"
    },
    live: "https://my-wallet-app-theta.vercel.app/",
    caseStudy: {
      problem: "Crypto investors had no easy way to assess wallet safety before sending funds, risking losses from malicious or risky wallets.",
      approach: "Integrated BitCrunch's wallet analytics API with a React frontend and Node.js backend to surface risk scores, transaction history, and behavioral patterns.",
      impact: "Users can evaluate any wallet's risk profile in seconds, making informed decisions before initiating transactions.",
    },
  },
  {
    id: 2,
    title: "DevSync",
    description:
     "A professional networking platform for developers to discover peers, manage connections, and chat in real-time with potential collaborators.",
    tech: "React • Node.js  • TailwindCSS • Github • AWS",
    github: { 
      "Frontend": "https://github.com/Ashish050488/DevSync-frontend",
      "Backend": "https://github.com/Ashish050488/DevSync"
    },
    live: "http://16.171.132.28",
    caseStudy: {
      problem: "Developers lacked a dedicated platform to find and connect with peers based on tech stack, interests, and collaboration potential.",
      approach: "Built a MERN-stack platform with real-time WebSocket chat, connection management, and developer profiles, deployed on AWS EC2.",
      impact: "Created a networking space where developers can discover peers, send connection requests, and collaborate through real-time messaging.",
    },
  },
]


export default function Project() {
  const [expandedId, setExpandedId] = useState(null)

  return (
    <section id="projects" aria-labelledby="projects-heading" className="bg-white dark:bg-neutral-950 py-16 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <h2 id="projects-heading" className="text-5xl font-bold text-black dark:text-white mb-4">My Projects</h2>
          <p className="text-lg text-gray-400 dark:text-gray-500 font-light">Here are some of my recent works</p>
        </motion.div>

        {/* Projects Container */}
        <motion.div
          className="border-2 border-black dark:border-white border-dashed rounded-2xl overflow-hidden"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              className={`p-8 ${index !== projects.length - 1 ? "border-b-2 border-dashed border-black dark:border-white" : ""} group hover:bg-gray-50 dark:hover:bg-neutral-900 transition-colors`}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
            >
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                {/* Project Info */}
                <div className="flex-1">
                  <motion.h3
                    className="text-2xl font-bold text-black dark:text-white mb-3 group-hover:text-gray-800 dark:group-hover:text-gray-200 transition-colors"
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    {project.title}
                    </motion.h3>

                  <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">{project.description}</p>

                  <div className="text-sm text-gray-400 dark:text-gray-500 font-mono">{project.tech}</div>
                </div>

                {/* Project Links */}
                <motion.div
                  className="flex gap-4 lg:flex-col lg:gap-3"
                >
                  {/* --- MODIFIED GITHUB LINKS --- */}
                  {Object.entries(project.github).map(([label, url]) => (
                    <motion.a
                      key={label}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 border border-black dark:border-white border-dashed rounded-lg hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-200 text-sm font-medium text-black dark:text-white"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <FiGithub size={16} />
                      {label} {/* This will display "Code", "Frontend", or "Backend" */}
                    </motion.a>
                  ))}

                  {/* --- MODIFIED LIVE LINK --- */}
                  <motion.a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-black dark:bg-white text-white dark:text-black rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition-all duration-200 text-sm font-medium"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FiExternalLink size={16} />
                    Live Site {/* Changed from "Live Demo" */}
                  </motion.a>
                </motion.div>
              </div>

              {/* Case Study Toggle */}
              <button
                type="button"
                onClick={() => setExpandedId(expandedId === project.id ? null : project.id)}
                className="mt-5 flex items-center gap-1.5 text-sm font-medium text-black dark:text-white hover:text-gray-600 dark:hover:text-gray-400 transition-colors cursor-pointer"
                aria-expanded={expandedId === project.id}
                aria-controls={`case-study-${project.id}`}
              >
                <span>{expandedId === project.id ? "Hide Details" : "View Case Study \u2192"}</span>
                <motion.span
                  animate={{ rotate: expandedId === project.id ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <FiChevronDown size={16} />
                </motion.span>
              </button>

              <AnimatePresence>
                {expandedId === project.id && (
                  <motion.div
                    id={`case-study-${project.id}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="mt-6 pt-6 border-t border-dashed border-gray-300 dark:border-gray-700 grid gap-5 md:grid-cols-3">
                      {[
                        { label: "Problem", text: project.caseStudy.problem },
                        { label: "Approach", text: project.caseStudy.approach },
                        { label: "Impact", text: project.caseStudy.impact },
                      ].map((item, i) => (
                        <motion.div
                          key={item.label}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: 0.1 * i }}
                        >
                          <h4 className="text-xs font-bold text-black dark:text-white uppercase tracking-wider mb-2">{item.label}</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{item.text}</p>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Hover Line Effect */}
              <motion.div
                className="h-0.5 bg-black dark:bg-white mt-6 origin-left"
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
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <div className="w-16 h-0.5 bg-gray-300 dark:bg-gray-700" />
        </motion.div>
      </div>
    </section>
  )
}