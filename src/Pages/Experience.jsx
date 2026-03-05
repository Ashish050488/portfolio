// "use client" is needed for framer-motion on the client
"use client"
import { motion } from "framer-motion"
import { FiBriefcase, FiCalendar, FiMapPin } from "react-icons/fi"

const experiences = [
  {
    id: 1,
    role: "Software Engineer — Full Stack",
    type: "Freelance",
    company: "Self-employed",
    period: "Jul 2025 – Present",
    location: "Remote (Germany Market)",
    points: [
      "Designed and deployed a production MERN job board (React 19, TypeScript, Vite, Tailwind CSS, Node.js/Express, MongoDB) targeting English-speaking roles in Germany.",
      "Built 20+ config-driven web scrapers with pagination, deduplication, and scheduled ingestion via node-cron; integrated Groq LLM for automated job classification.",
      "Implemented full auth and moderation system: JWT authentication, admin workflows, analytics endpoints, and dead-link validation.",
    ],
  },
  {
    id: 2,
    role: "Software Engineer Intern — Full Stack",
    type: "Internship",
    company: "SniperThink",
    period: "Apr 2025 – Jun 2025",
    location: "Remote, India",
    points: [
      "Built a scalable PostgreSQL data layer for real-time sales metrics ingestion and aggregation, increasing processing throughput by 35%.",
      "Developed a Node.js/Express.js REST API with RBAC supporting 300+ users; implemented plan-based entitlement checks.",
      "Delivered KPI dashboards and analytical charts integrated with backend APIs to surface live performance insights.",
    ],
  },
]

const fadeInUp = {
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
}

export default function Experience() {
  return (
    <section aria-labelledby="experience-heading" className="bg-white py-24 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <motion.span
            className="text-xs tracking-[0.3em] uppercase text-gray-400 font-medium"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            02 — Experience
          </motion.span>
          <h2 id="experience-heading" className="text-5xl font-bold text-black mt-3 mb-4">
            Where I've Worked
          </h2>
          <p className="text-lg text-gray-400 font-light">A timeline of my professional journey</p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical timeline line */}
          <div className="absolute left-[19px] top-0 bottom-0 w-px bg-gray-200 hidden md:block" />

          <div className="space-y-10">
            {experiences.map((item, index) => (
              <motion.article
                key={item.id}
                className="relative pl-0 md:pl-14 group"
                initial={fadeInUp.initial}
                whileInView={fadeInUp.whileInView}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: 0.15 * index }}
              >
                {/* Timeline dot */}
                <div className="absolute left-3 top-8 w-3.5 h-3.5 rounded-full border-2 border-black bg-white z-10 hidden md:block" />

                {/* Card */}
                <div className="border border-gray-200 rounded-2xl p-6 md:p-8 hover:border-black transition-colors duration-300 bg-white">
                  {/* Type badge */}
                  {item.type && (
                    <span className="inline-block text-xs tracking-wider uppercase bg-gray-100 text-gray-500 px-3 py-1 rounded-full mb-4 font-medium">
                      {item.type}
                    </span>
                  )}

                  {/* Top row */}
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3 md:gap-6">
                    <div>
                      <motion.h3
                        className="text-xl font-bold text-black"
                        whileHover={{ x: 4 }}
                        transition={{ duration: 0.2 }}
                      >
                        {item.role}
                      </motion.h3>
                      <p className="text-sm text-gray-500 mt-1">
                        {item.company}
                      </p>
                    </div>

                    <div className="flex flex-col items-start md:items-end gap-1 text-sm text-gray-400 shrink-0">
                      <div className="flex items-center gap-1.5 font-mono">
                        <FiCalendar className="size-3.5" />
                        <span>{item.period}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <FiMapPin className="size-3.5" />
                        <span>{item.location}</span>
                      </div>
                    </div>
                  </div>

                  {/* Points */}
                  <ul className="mt-5 space-y-3">
                    {item.points.map((point, i) => (
                      <motion.li
                        key={i}
                        className="text-gray-600 text-sm leading-relaxed flex"
                        initial={{ opacity: 0, x: -12 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.4, delay: 0.05 * i }}
                      >
                        <span className="mr-3 mt-1.5 w-1.5 h-1.5 rounded-full bg-black shrink-0" />
                        <span className="flex-1">{point}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
