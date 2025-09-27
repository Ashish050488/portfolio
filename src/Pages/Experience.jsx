// "use client" is needed for framer-motion on the client
"use client"
import { motion } from "framer-motion"
import { FiBriefcase, FiCalendar } from "react-icons/fi"

const experiences = [
  {
    id: 1,
    role: "FullStack  Developer",
    company: "SniperThink",
    period: "April 2025- June 2025",
    location: "Remote",
    points: [
      "Implemented a PostgreSQL backend for live sales metrics, achieving a 35% boost in data processing with Git version control.",
      "Deployed Node/Express RBA system for 300+ users, improving compliance by 40%.",
      "Integrated user-plan logic to enforce purchase-based access limits (e.g., 50-user cap), ensuring licensing compliance."
    ],
  },

]

const fadeInUp = {
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
}

export default function Experience() {
  return (
    <section aria-labelledby="experience-heading" className="min-h-screen bg-background py-20 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <h2 id="experience-heading" className="text-5xl font-bold text-foreground mb-4 text-balance">
            Experience
          </h2>
          <p className="text-lg text-muted-foreground font-light">A quick look at my professional journey</p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">

          <div className="space-y-6">
            {experiences.map((item, index) => (
              <motion.article
                key={item.id}
                className="relative group cursor-default border-2 border-foreground border-dashed rounded-2xl bg-background p-6 md:p-8..."
                initial={fadeInUp.initial}
                whileInView={fadeInUp.whileInView}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
              >
                {/* Timeline node */}
            
                {/* Top row */}
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3 md:gap-6">
                  <div className="flex items-center gap-3">
                    <div className="inline-flex items-center justify-center rounded-md border border-foreground p-2 text-foreground">
                      <FiBriefcase className="size-4" />
                    </div>
                    <div>
                      <motion.h3
                        className="text-2xl font-bold text-foreground"
                        whileHover={{ x: 4 }}
                        transition={{ duration: 0.2 }}
                      >
                        {item.role}
                      </motion.h3>
                      <p className="text-sm text-muted-foreground">
                        {item.company}
                        {item.location ? ` • ${item.location}` : ""}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-muted-foreground font-mono">
                    <FiCalendar className="size-4" />
                    <span>{item.period}</span>
                  </div>
                </div>

                {/* Points */}
                <ul className="mt-5 space-y-2.5">
                  {item.points.map((point, i) => (
                    <motion.li
                      key={i}
                      className="text-foreground/80 flex" // <--- ADDED: flex to align bullet and text
                      initial={{ opacity: 0, x: -12 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, amount: 0.3 }}
                      transition={{ duration: 0.4, delay: 0.05 * i }}
                    >
                      <span className="mr-2">{"•"}</span> {/* <--- MODIFIED: Bullet moved into a span with right margin */}
                      <span className="flex-1">{point}</span> {/* <--- MODIFIED: Text wrapped in flex-1 span */}
                    </motion.li>
                  ))}
                </ul>

                {/* Hover underline accent */}
                <motion.div
                  className="h-0.5 bg-foreground mt-6 origin-left"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.article>
            ))}
          </div>

          {/* Bottom Accent */}
          <motion.div
            className="flex justify-center mt-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ delay: 0.2 }}
          >
            <div className="w-16 h-0.5 bg-border" />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
