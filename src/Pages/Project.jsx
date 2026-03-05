import { motion } from "framer-motion"
import { FiExternalLink, FiGithub } from "react-icons/fi"

const projects = [
  {
    id: 1,
    title: "ProxyClaw",
    subtitle: "AI Agent Deployment SaaS",
    description:
      "Co-engineered a live SaaS platform for deploying AI agents with Docker-based orchestration, production-grade API security, and real-time interactive workflows.",
    tech: ["React 19", "TanStack Query", "Zustand", "Docker", "Node.js", "WebSockets"],
    github: {},
    live: "https://proxyclaw.xyz",
    featured: true,
  },
  {
    id: 2,
    title: "CrunchGuardian",
    subtitle: "Crypto Wallet Analytics",
    description:
      "A wallet analytics tracker for cryptocurrency investors to monitor and analyze different wallets before a transaction for the safety of their funds.",
    tech: ["React", "Node.js", "BitCrunch API", "Tailwind CSS"],
    github: { 
      "Code": "https://github.com/Ashish050488/CrunchGuardian-AI"
    },
    live: "https://my-wallet-app-theta.vercel.app/",
  },
  {
    id: 3,
    title: "DevSync",
    subtitle: "Developer Networking Platform",
    description:
     "A professional networking platform for developers to discover peers, manage connections, and chat in real-time with potential collaborators.",
    tech: ["React", "Node.js", "Tailwind CSS", "AWS", "MongoDB"],
    github: { 
      "Frontend": "https://github.com/Ashish050488/DevSync-frontend",
      "Backend": "https://github.com/Ashish050488/DevSync"
    },
    live: "http://16.171.132.28",
  },
]


export default function Project() {
  return (
    <section id="projects" className="bg-white py-24 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.span
            className="text-xs tracking-[0.3em] uppercase text-gray-400 font-medium"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            03 — Projects
          </motion.span>
          <h2 className="text-5xl font-bold text-black mt-3 mb-4">Selected Work</h2>
          <p className="text-lg text-gray-400 font-light">Things I've built and shipped</p>
        </motion.div>

        {/* Projects */}
        <div className="space-y-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              className={`group border ${project.featured ? 'border-black' : 'border-gray-200'} rounded-2xl p-8 hover:border-black transition-all duration-300 cursor-default relative overflow-hidden`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
            >
              {/* Project number */}
              <span className="absolute top-6 right-8 text-7xl font-bold text-gray-100 select-none pointer-events-none group-hover:text-gray-200 transition-colors">
                {String(index + 1).padStart(2, '0')}
              </span>

              <div className="relative z-10">
                {/* Featured badge */}
                {project.featured && (
                  <span className="inline-block text-xs tracking-wider uppercase bg-black text-white px-3 py-1 rounded-full mb-4 font-medium">
                    Featured
                  </span>
                )}

                {/* Title + Subtitle */}
                <motion.h3
                  className="text-2xl font-bold text-black mb-1"
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  {project.title}
                </motion.h3>
                <p className="text-sm text-gray-400 font-medium mb-3">{project.subtitle}</p>

                <p className="text-gray-600 text-sm leading-relaxed mb-5 max-w-2xl">{project.description}</p>

                {/* Tech tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tech.map((t) => (
                    <span key={t} className="text-xs px-3 py-1 rounded-full bg-gray-100 text-gray-600 font-medium">
                      {t}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex flex-wrap gap-3">
                  {Object.entries(project.github).map(([label, url]) => (
                    <motion.a
                      key={label}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-full hover:border-black hover:bg-black hover:text-white transition-all duration-200 text-sm font-medium text-gray-700"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <FiGithub size={14} />
                      {label}
                    </motion.a>
                  ))}

                  <motion.a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-full hover:bg-gray-800 transition-all duration-200 text-sm font-medium"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FiExternalLink size={14} />
                    Live Site
                  </motion.a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}