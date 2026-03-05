"use client"

import { motion } from "framer-motion"
import { FaReact, FaNodeJs, FaJs, FaPython, FaGitAlt, FaDocker, FaAws, FaFigma } from "react-icons/fa"
import {
  SiNextdotjs,
  SiMongodb,
  SiPostgresql,
  SiTailwindcss,
  SiTypescript,
  SiRedis,
  SiMysql 
} from "react-icons/si"

const technologies = [
  { name: "React", icon: FaReact, category: "Frontend" },
  // { name: "Next.js", icon: SiNextdotjs, category: "Frontend" },
  // { name: "TypeScript", icon: SiTypescript, category: "Language" },
  { name: "JavaScript", icon: FaJs, category: "Language" },
  { name: "Node.js", icon: FaNodeJs, category: "Backend" },
  { name: "Python", icon: FaPython, category: "Language" },
  { name: "MongoDB", icon: SiMongodb, category: "Database" },
   { name: "MySQL", icon: SiMysql , category: "Database" },
  // { name: "PostgreSQL", icon: SiPostgresql, category: "Database" },
  { name: "Tailwind CSS", icon: SiTailwindcss, category: "Styling" },
  // { name: "AWS", icon: FaAws, category: "Cloud" },
  // { name: "Redis", icon: SiRedis, category: "Database" },
  { name: "Git", icon: FaGitAlt, category: "Tools" },
  // { name: "Figma", icon: FaFigma, category: "Design" },
]

export default function TechStack() {
  return (
    <section id="tech" className="bg-white dark:bg-neutral-950 py-16 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.h2
            className="text-5xl font-bold text-black dark:text-white mb-4"
            initial={{ opacity: 0, rotateX: -90 }}
            animate={{ opacity: 1, rotateX: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            Technologies I Use
          </motion.h2>
          <motion.div
            className="w-24 h-1 bg-black dark:bg-white mx-auto"
            initial={{ width: 0 }}
            animate={{ width: 96 }}
            transition={{ duration: 1.2, delay: 0.5, ease: "easeInOut" }}
          />
        </motion.div>

        {/* Tech Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-6">
          {technologies.map((tech, index) => {
            const IconComponent = tech.icon
            const row = Math.floor(index / 4)
            const col = index % 4

            return (
              <motion.div
                key={tech.name}
                className="group relative"
                initial={{
                  opacity: 0,
                  scale: 0,
                  rotate: -180,
                  y: 100,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  rotate: 0,
                  y: 0,
                }}
                transition={{
                  duration: 0.6,
                  delay: row * 0.1 + col * 0.05,
                  ease: "easeOut",
                  type: "spring",
                  stiffness: 100,
                }}
              >
                <motion.div
                  className="bg-white dark:bg-neutral-900 border-2 border-gray-200 dark:border-gray-800 rounded-xl p-6 h-32 flex flex-col items-center justify-center cursor-pointer transition-all duration-300 hover:border-black dark:hover:border-white hover:shadow-lg"
                  whileHover={{
                    scale: 1.1,
                    rotate: [0, -5, 5, 0],
                    transition: {
                      scale: { duration: 0.2 },
                      rotate: { duration: 0.6, ease: "easeInOut" },
                    },
                  }}
                  whileTap={{
                    scale: 0.9,
                    rotate: 15,
                    transition: { duration: 0.1 },
                  }}
                  animate={{
                    y: [0, -10, 0],
                  }}
                  transition={{
                    y: {
                      duration: 3,
                      repeat: Number.POSITIVE_INFINITY,
                      delay: index * 0.2,
                      ease: "easeInOut",
                    },
                  }}
                >
                  {/* Icon */}
                  <motion.div
                    className="text-3xl text-gray-700 dark:text-gray-300 mb-3 group-hover:text-black dark:group-hover:text-white transition-colors duration-300"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                      duration: 0.4,
                      delay: row * 0.1 + col * 0.05 + 0.3,
                      type: "spring",
                      stiffness: 200,
                    }}
                    whileHover={{
                      scale: [1, 1.3, 1],
                      rotate: [0, 360],
                      transition: { duration: 0.8 },
                    }}
                  >
                    <IconComponent />
                  </motion.div>

                  {/* Tech Name */}
                  <motion.h3
                    className="text-sm font-semibold text-gray-800 dark:text-gray-200 group-hover:text-black dark:group-hover:text-white transition-colors duration-300 text-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.4,
                      delay: row * 0.1 + col * 0.05 + 0.5,
                    }}
                  >
                    {tech.name}
                  </motion.h3>

                  {/* Category Badge */}
                  <motion.span
                    className="absolute -top-2 -right-2 bg-black text-white text-xs px-2 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    initial={{ scale: 0, rotate: -180 }}
                    whileHover={{
                      scale: 1,
                      rotate: 0,
                      transition: { duration: 0.3, type: "spring" },
                    }}
                  >
                    {tech.category}
                  </motion.span>
                </motion.div>

                {/* Ripple Effect on Hover */}
                <motion.div
                  className="absolute inset-0 border-2 border-black dark:border-white rounded-xl opacity-0 pointer-events-none"
                  whileHover={{
                    opacity: [0, 0.5, 0],
                    scale: [1, 1.2, 1.4],
                    transition: { duration: 0.6 },
                  }}
                />
              </motion.div>
            )
          })}
        </div>

        {/* Bottom Stats */}
        <motion.div
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2 }}
        >
          <div className="flex justify-center items-center gap-12 text-gray-600 dark:text-gray-400">
            {[
              { value: `${technologies.length}+`, label: "Technologies" },
              // { value: "5+", label: "Years Experience" },
              { value: "1+", label: "Projects Built" },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                className="text-center"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.5,
                  delay: 2.2 + index * 0.2,
                  type: "spring",
                  stiffness: 150,
                }}
                whileHover={{
                  scale: 1.1,
                  transition: { duration: 0.2 },
                }}
              >
                <motion.div
                  className="text-2xl font-bold text-black dark:text-white"
                  animate={{
                    scale: [1, 1.05, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    delay: index * 0.5,
                  }}
                >
                  {stat.value}
                </motion.div>
                <div className="text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
