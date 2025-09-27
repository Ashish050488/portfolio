"use client"

import { motion } from "framer-motion"
import Ashish_MERN_Developer from "../../assets/Ashish_MERN_Developer.pdf"


export default function Footer (){
  const currentYear = new Date().getFullYear()

  const socialLinks = [
    { name: "GitHub", href: "https://github.com/Ashish050488" },
    { name: "LinkedIn", href: "https://www.linkedin.com/in/dev-ashishranjan/" },
    { name: "Resume", href: Ashish_MERN_Developer },
  ]

  return (
    <footer className="bg-white border-t border-gray-200 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-gray-200 rounded-full"
            style={{
              left: `${15 + i * 15}%`,
              top: "20%",
            }}
            animate={{
              y: [0, -10, 0],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 3,
              repeat: Number.POSITIVE_INFINITY,
              delay: i * 0.5,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8 relative">
        <motion.div
          className="flex flex-col md:flex-row items-center justify-between gap-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Copyright */}
          <motion.div
            className="text-sm text-gray-600 font-light order-2 md:order-1"
            initial={{ opacity: 0, x: -50, rotate: -5 }}
            animate={{ opacity: 1, x: 0, rotate: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.2,
              type: "spring",
              stiffness: 100,
            }}
            whileHover={{
              scale: 1.05,
              color: "#000000",
              transition: { duration: 0.2 },
            }}
          >
            © {currentYear} Ashish Ranjan
          </motion.div>

          {/* Social Links - Centered */}
          <motion.nav
            className="flex items-center gap-8 order-1 md:order-2"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.8,
              delay: 0.4,
              type: "spring",
              stiffness: 120,
            }}
          >
            {socialLinks.map((link, index) => (
              <motion.a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative text-sm text-gray-700 hover:text-black transition-colors duration-300 font-medium"
                initial={{
                  opacity: 0,
                  y: 20,
                  rotate: index % 2 === 0 ? -10 : 10,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                  rotate: 0,
                }}
                transition={{
                  duration: 0.6,
                  delay: 0.6 + index * 0.15,
                  type: "spring",
                  stiffness: 150,
                }}
                whileHover={{
                  y: -3,
                  scale: 1.1,
                  rotate: [0, -2, 2, 0],
                  transition: {
                    rotate: { duration: 0.4 },
                    y: { duration: 0.2 },
                    scale: { duration: 0.2 },
                  },
                }}
                whileTap={{
                  scale: 0.95,
                  rotate: 5,
                }}
              >
                <motion.span
                  animate={{
                    textShadow: ["0 0 0px rgba(0,0,0,0)", "0 0 2px rgba(0,0,0,0.1)", "0 0 0px rgba(0,0,0,0)"],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    delay: index * 0.3,
                  }}
                >
                  {link.name}
                </motion.span>

                {/* Animated Underline */}
                <motion.div
                  className="absolute -bottom-1 left-0 w-full h-px bg-black origin-left"
                  initial={{ scaleX: 0 }}
                  whileHover={{
                    scaleX: 1,
                    height: 2,
                    transition: { duration: 0.3 },
                  }}
                />

                {/* Ripple Effect */}
                <motion.div
                  className="absolute inset-0 border border-gray-300 rounded opacity-0 pointer-events-none"
                  whileHover={{
                    opacity: [0, 0.5, 0],
                    scale: [1, 1.3, 1.6],
                    transition: { duration: 0.6 },
                  }}
                />
              </motion.a>
            ))}
          </motion.nav>

          {/* Email */}
          <motion.a
            href="mailto:ashish@example.com"
            className="group relative text-sm text-gray-700 hover:text-black transition-colors duration-300 font-medium order-3"
            initial={{
              opacity: 0,
              x: 50,
              rotate: 5,
            }}
            animate={{
              opacity: 1,
              x: 0,
              rotate: 0,
            }}
            transition={{
              duration: 0.8,
              delay: 1,
              type: "spring",
              stiffness: 100,
            }}
            whileHover={{
              y: -3,
              scale: 1.05,
              rotate: [-2, 2, -1, 0],
              color: "#000000",
              transition: {
                rotate: { duration: 0.5 },
                y: { duration: 0.2 },
                scale: { duration: 0.2 },
              },
            }}
            whileTap={{
              scale: 0.95,
              rotate: -5,
            }}
          >
            <motion.span
              animate={{
                letterSpacing: ["0em", "0.05em", "0em"],
              }}
              transition={{
                duration: 3,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            >
              Email
            </motion.span>

            {/* Animated Underline */}
            <motion.div
              className="absolute -bottom-1 left-0 w-full h-px bg-black origin-left"
              initial={{ scaleX: 0 }}
              whileHover={{
                scaleX: 1,
                height: 2,
                transition: { duration: 0.3 },
              }}
            />

            {/* Pulse Effect */}
            <motion.div
              className="absolute -inset-2 border border-gray-200 rounded opacity-0 pointer-events-none"
              animate={{
                opacity: [0, 0.3, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                delay: 2,
              }}
            />
          </motion.a>
        </motion.div>

        {/* Animated Border Line */}
        <motion.div
          className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.5, delay: 0.5 }}
        />

        {/* Floating Elements */}
        <motion.div
          className="absolute bottom-2 right-4 w-2 h-2 bg-gray-300 rounded-full opacity-50"
          animate={{
            y: [0, -8, 0],
            scale: [1, 1.2, 1],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
      </div>
    </footer>
  )
}
