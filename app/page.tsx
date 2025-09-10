"use client"

import { useState, useEffect } from "react"
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Moon,
  Sun,
  Download,
  Mail,
  Github,
  Linkedin,
  ExternalLink,
  Code,
  Zap,
  Send,
  Play,
  Star,
  Rocket,
  Coffee,
  Heart,
  Database,
  Globe,
  Server,
  Cloud,
  Layers,
  Palette,
  Shield,
  Bot,
  ArrowRight,
  Sparkles,
  Eye,
  Flame,
  Menu,
  X,
} from "lucide-react"

// Floating geometric shapes - optimized for mobile
const FloatingShape = ({ delay = 0, duration = 4, shape = "circle" }: { delay?: number; duration?: number; shape?: "circle" | "square" | "triangle" }) => {
  const [dimensions, setDimensions] = useState({ width: 1200, height: 800 })
  const [isMobile, setIsMobile] = useState(false)
  const shouldReduceMotion = useReducedMotion()

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const checkMobile = () => window.innerWidth < 768
      setIsMobile(checkMobile())
      setDimensions({ width: window.innerWidth, height: window.innerHeight })
      
      const handleResize = () => {
        setIsMobile(checkMobile())
        setDimensions({ width: window.innerWidth, height: window.innerHeight })
      }
      
      window.addEventListener('resize', handleResize)
      return () => window.removeEventListener('resize', handleResize)
    }
  }, [])

  // Reduce animation complexity on mobile or if user prefers reduced motion
  if (shouldReduceMotion || isMobile) {
    return (
      <motion.div
        className={`absolute w-4 h-4 md:w-8 md:h-8 bg-gradient-to-br from-pink-500/20 to-cyan-500/20 ${
          shape === "circle" ? "rounded-full" : shape === "square" ? "rounded-lg rotate-45" : "rounded-sm rotate-12"
        } blur-sm`}
        initial={{
          x: Math.random() * dimensions.width,
          y: Math.random() * dimensions.height,
          opacity: 0.3,
        }}
        animate={{
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: duration * 2,
          delay: delay,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />
    )
  }

  const shapes = {
    circle: "rounded-full",
    square: "rounded-lg rotate-45",
    triangle: "rounded-sm rotate-12",
  }

  return (
    <motion.div
      className={`absolute w-8 h-8 bg-gradient-to-br from-pink-500/30 to-cyan-500/30 ${shapes[shape]} blur-sm`}
      initial={{
        x: Math.random() * dimensions.width,
        y: Math.random() * dimensions.height,
        scale: 0,
      }}
      animate={{
        x: Math.random() * dimensions.width,
        y: Math.random() * dimensions.height,
        scale: [0, 1, 0],
        rotate: [0, 360, 720],
      }}
      transition={{
        duration: duration,
        delay: delay,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
      }}
    />
  )
}

// Glitch text effect - optimized
const GlitchText = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => {
  const shouldReduceMotion = useReducedMotion()
  
  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      className={`relative ${className}`}
      animate={{
        textShadow: ["0 0 0 transparent", "2px 0 0 #ff0080, -2px 0 0 #00ffff", "0 0 0 transparent"],
      }}
      transition={{
        duration: 0.1,
        repeat: Number.POSITIVE_INFINITY,
        repeatDelay: 3,
      }}
    >
      {children}
    </motion.div>
  )
}

// Morphing blob background - mobile optimized
const MorphingBlob = ({ delay = 0 }) => {
  const shouldReduceMotion = useReducedMotion()
  
  if (shouldReduceMotion) {
    return (
      <div className="absolute w-48 h-48 md:w-96 md:h-96 bg-gradient-to-br from-purple-600/10 via-pink-500/10 to-cyan-500/10 rounded-full blur-3xl" />
    )
  }

  return (
    <motion.div
      className="absolute w-48 h-48 md:w-96 md:h-96 bg-gradient-to-br from-purple-600/20 via-pink-500/20 to-cyan-500/20 rounded-full blur-3xl"
      animate={{
        scale: [1, 1.5, 0.8, 1.2, 1],
        x: [0, 50, -25, 40, 0],
        y: [0, -40, 60, -20, 0],
        rotate: [0, 180, 270, 90, 360],
      }}
      transition={{
        duration: 20,
        delay: delay,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
      }}
    />
  )
}

export default function Portfolio() {
  const [darkMode, setDarkMode] = useState(true)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [currentSection, setCurrentSection] = useState(0)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])
  const shouldReduceMotion = useReducedMotion()

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    
    // Only track mouse on desktop
    if (window.innerWidth >= 768) {
      window.addEventListener("mousemove", updateMousePosition)
    }
    
    return () => window.removeEventListener("mousemove", updateMousePosition)
  }, [])

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [darkMode])

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      if (mobileMenuOpen) {
        setMobileMenuOpen(false)
      }
    }
    
    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [mobileMenuOpen])

  const projects = [
    {
      title: "AI QUESTION PAPER GENERATOR",
      subtitle: "AI-Driven Study Assistant",
      description:
        "Developed an AI-driven study assistant that generates personalized questions based on a given topic or uploaded PDF. The system leverages Generative AI and NLP to create adaptive quizzes aligned with Bloom's Taxonomy, ensuring a structured learning approach from basic understanding to higher-order thinking. It dynamically adjusts question difficulty based on student performance, reinforcing learning through progressively challenging assessments.",
      image: "/placeholder.svg",
      tech: ["Python", "NLP", "API Integration", "Generative AI", "Machine Learning"],
      color: "from-purple-400 via-pink-500 to-cyan-600",
      stats: { position: "2nd Place", exhibition: "CMRIT", year: "2025" },
      type: "AI PROJECT",
      accent: "border-purple-500/50 shadow-purple-500/25",
      github: "https://github.com/theakshatkhandelwal",
      live: "https://unittest-ai-quiz-1.onrender.com/",
    },
    {
      title: "AUTO SPARE PARTS MANAGEMENT",
      subtitle: "Web-Based Inventory System",
      description:
        "A web-based application designed to optimize the operations of an auto spare parts store by effectively managing inventory, suppliers, sales, and stock levels. The system leverages PHP for server-side functionality and MySQL for robust data storage. The frontend is crafted with HTML, CSS, Bootstrap, and jQuery, offering a responsive and user-friendly interface. This application supports secure user authentication and facilitates streamlined tracking of stock, sales, and supplier information, ensuring seamless and efficient store management.",
      image: "/placeholder.svg",
      tech: ["PHP", "MySQL", "HTML", "CSS", "Bootstrap", "jQuery", "XAMPP"],
      color: "from-blue-400 via-cyan-500 to-teal-600",
      stats: { database: "MySQL", frontend: "Bootstrap", auth: "Secure" },
      type: "WEB APPLICATION",
      accent: "border-cyan-500/50 shadow-cyan-500/25",
      github: "https://github.com/theakshatkhandelwal",
      live: "https://github.com/theakshatkhandelwal",
    },
  ]

  const skills = [
    {
      name: "Python",
      level: 85,
      icon: Server,
      color: "from-green-500 to-teal-500",
      glow: "shadow-green-500/50",
    },
    {
      name: "Java",
      level: 80,
      icon: Shield,
      color: "from-orange-500 to-red-500",
      glow: "shadow-orange-500/50",
    },
    {
      name: "C Programming",
      level: 80,
      icon: Code,
      color: "from-blue-500 to-cyan-500",
      glow: "shadow-blue-500/50",
    },
    {
      name: "HTML",
      level: 85,
      icon: Globe,
      color: "from-orange-400 to-red-500",
      glow: "shadow-orange-500/50",
    },
    {
      name: "CSS",
      level: 80,
      icon: Palette,
      color: "from-blue-400 to-purple-500",
      glow: "shadow-blue-500/50",
    },
    {
      name: "JavaScript",
      level: 75,
      icon: Zap,
      color: "from-yellow-500 to-orange-500",
      glow: "shadow-yellow-500/50",
    },
    {
      name: "MySQL",
      level: 75,
      icon: Database,
      color: "from-blue-600 to-indigo-600",
      glow: "shadow-blue-500/50",
    },
    {
      name: "SQL",
      level: 70,
      icon: Database,
      color: "from-cyan-500 to-blue-600",
      glow: "shadow-cyan-500/50",
    },
    {
      name: "Visual Studio Code",
      level: 85,
      icon: Code,
      color: "from-blue-500 to-purple-500",
      glow: "shadow-blue-500/50",
    },
    {
      name: "Excel",
      level: 80,
      icon: Layers,
      color: "from-green-500 to-emerald-600",
      glow: "shadow-green-500/50",
    },
    {
      name: "Eclipse",
      level: 70,
      icon: Bot,
      color: "from-purple-500 to-pink-500",
      glow: "shadow-purple-500/50",
    },
    {
      name: "GitHub",
      level: 75,
      icon: Github,
      color: "from-gray-600 to-gray-800",
      glow: "shadow-gray-500/50",
    },
  ]

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden relative">
      {/* Crazy animated background */}
      <div className="fixed inset-0 z-0">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-black via-purple-900/20 to-black" />

        {/* Morphing blobs */}
        <MorphingBlob delay={0} />
        <MorphingBlob delay={5} />
        <MorphingBlob delay={10} />

        {/* Floating shapes - reduced count on mobile */}
        {Array.from({ length: shouldReduceMotion ? 0 : (typeof window !== 'undefined' && window.innerWidth < 768 ? 6 : 15) }).map((_, i) => (
          <FloatingShape
            key={i}
            delay={i * 0.5}
            duration={Math.random() * 10 + 8}
            shape={["circle", "square", "triangle"][Math.floor(Math.random() * 3)] as "circle" | "square" | "triangle"}
          />
        ))}

        {/* Grid overlay - responsive size */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:30px_30px] md:bg-[size:50px_50px]" />

        {/* Cursor trail - desktop only */}
        {typeof window !== 'undefined' && window.innerWidth >= 768 && (
          <motion.div
            className="absolute w-6 h-6 bg-gradient-to-r from-pink-500 to-cyan-500 rounded-full blur-sm pointer-events-none mix-blend-screen"
            animate={{
              x: mousePosition.x - 12,
              y: mousePosition.y - 12,
            }}
            transition={{ type: "spring", stiffness: 500, damping: 28 }}
          />
        )}
      </div>

      {/* Futuristic Navigation */}
      <nav className="fixed top-0 w-full z-50 backdrop-blur-2xl bg-black/10 border-b border-purple-500/20">
        <div className="container mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex justify-between items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-lg sm:text-xl lg:text-2xl font-black bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent"
            >
              ⚡ Akshat Khandelwal
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {["ABOUT", "EDUCATION", "PROJECTS", "SKILLS", "ACHIEVEMENTS", "CONTACT"].map((item, index) => (
                <motion.a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="relative text-gray-300 hover:text-white font-bold text-sm tracking-wider group"
                  whileHover={{ scale: 1.1 }}
                  onHoverStart={() => setCurrentSection(index)}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item}
                  <motion.div
                    className="absolute -bottom-2 left-0 h-0.5 bg-gradient-to-r from-pink-500 to-cyan-500"
                    initial={{ width: 0 }}
                    whileHover={{ width: "100%" }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.a>
              ))}
            </div>

            {/* Mobile and Desktop Controls */}
            <div className="flex items-center gap-2 sm:gap-4">
              {/* Theme Toggle */}
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setDarkMode(!darkMode)}
                  className="rounded-full border-2 border-purple-500/30 hover:border-purple-400 hover:bg-purple-500/10 backdrop-blur-sm w-10 h-10 sm:w-12 sm:h-12"
                >
                  <motion.div animate={{ rotate: darkMode ? 0 : 180 }} transition={{ duration: 0.5 }}>
                    {darkMode ? (
                      <Sun className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-400" />
                    ) : (
                      <Moon className="h-4 w-4 sm:h-5 sm:w-5 text-purple-400" />
                    )}
                  </motion.div>
                </Button>
              </motion.div>

              {/* Mobile Menu Button */}
              <motion.div className="lg:hidden" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={(e) => {
                    e.stopPropagation()
                    setMobileMenuOpen(!mobileMenuOpen)
                  }}
                  className="rounded-full border-2 border-purple-500/30 hover:border-purple-400 hover:bg-purple-500/10 backdrop-blur-sm w-10 h-10 sm:w-12 sm:h-12"
                >
                  <motion.div
                    animate={{ rotate: mobileMenuOpen ? 90 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {mobileMenuOpen ? (
                      <X className="h-4 w-4 sm:h-5 sm:w-5 text-purple-400" />
                    ) : (
                      <Menu className="h-4 w-4 sm:h-5 sm:w-5 text-purple-400" />
                    )}
                  </motion.div>
                </Button>
              </motion.div>
            </div>
          </div>

          {/* Mobile Menu */}
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ 
              opacity: mobileMenuOpen ? 1 : 0, 
              height: mobileMenuOpen ? "auto" : 0 
            }}
            transition={{ duration: 0.3 }}
            className="lg:hidden overflow-hidden"
          >
            <div className="pt-4 pb-2 space-y-2">
              {["ABOUT", "EDUCATION", "PROJECTS", "SKILLS", "ACHIEVEMENTS", "CONTACT"].map((item, index) => (
                <motion.a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="block px-4 py-3 text-gray-300 hover:text-white font-bold text-sm tracking-wider hover:bg-purple-500/10 rounded-lg transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ 
                    opacity: mobileMenuOpen ? 1 : 0, 
                    x: mobileMenuOpen ? 0 : -20 
                  }}
                  transition={{ delay: index * 0.1 }}
                >
                  {item}
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>
      </nav>


      {/* INSANE Hero Section */}
      <section id="about" className="relative min-h-screen flex items-center justify-center z-10 overflow-hidden pt-20 sm:pt-24 lg:pt-28">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          {/* Main content with avatar and text */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="mb-12 sm:mb-20"
          >
            <div className="max-w-7xl mx-auto">
              <div className="flex flex-col lg:flex-row items-center justify-center gap-8 sm:gap-12 lg:gap-20">
                {/* Avatar on the left */}
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8, duration: 1 }}
                  className="flex-shrink-0 order-1 lg:order-none"
                >
                  <motion.div
                    className="relative"
                    whileHover={shouldReduceMotion ? {} : { scale: 1.05, rotate: 2 }}
                    animate={shouldReduceMotion ? {} : {
                      y: [0, -10, 0],
                    }}
                    transition={{
                      duration: 3,
                      repeat: shouldReduceMotion ? 0 : Number.POSITIVE_INFINITY,
                      ease: "easeInOut"
                    }}
                  >
                    <img
                      src="/aditya_transparent.png"
                      alt="Hi, I'm Aditya Bajaj"
                      className="w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 object-contain mx-auto"
                      style={{
                        filter: 'drop-shadow(0 0 20px rgba(168, 85, 247, 0.3)) drop-shadow(0 0 40px rgba(168, 85, 247, 0.1))'
                      }}
                    />
                    {/* Enhanced glowing effect around avatar */}
                    {!shouldReduceMotion && (
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-cyan-500/20 to-pink-500/20 rounded-full blur-3xl -z-10"
                        animate={{
                          opacity: [0.3, 0.6, 0.3],
                          scale: [0.8, 1.1, 0.8],
                        }}
                        transition={{
                          duration: 4,
                          repeat: Number.POSITIVE_INFINITY,
                          ease: "easeInOut"
                        }}
                      />
                    )}
                  </motion.div>
                  
                  {/* Hi text under avatar */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.2, duration: 0.8 }}
                    className="text-center mt-4 sm:mt-6"
                  >
                    <p className="text-base sm:text-lg md:text-xl text-gray-300 font-medium">
                      Hi, I'm <span className="text-cyan-400 font-bold">Akshat Khandelwal</span>
                    </p>
                  </motion.div>
                </motion.div>

                {/* Text content on the right */}
                <div className="flex-1 text-center lg:text-left max-w-3xl space-y-6 sm:space-y-8 order-2 lg:order-none">
                  {/* Animated name */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.5, duration: 1 }}
                  >
                    <motion.h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black mb-4 sm:mb-6 leading-tight">
                      {["A", "K", "S", "H", "A", "T", " ", "K", "H", "A", "N", "D", "E", "L", "W", "A", "L"].map((letter, index) => (
                        <motion.span
                          key={index}
                          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 50 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ 
                            delay: shouldReduceMotion ? 0 : 1.5 + index * 0.1, 
                            duration: shouldReduceMotion ? 0 : 0.5 
                          }}
                          className="inline-block bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent"
                        >
                          {letter === " " ? "\u00A0" : letter}
                        </motion.span>
                      ))}
                    </motion.h1>
                  </motion.div>

                  {/* Animated taglines */}
                  <motion.div className="space-y-3 sm:space-y-4">
                    <motion.div
                      initial={{ opacity: 0, x: shouldReduceMotion ? 0 : 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: shouldReduceMotion ? 0 : 2.7, duration: 0.8 }}
                    >
                        <motion.h2 className="text-xl md:text-2xl lg:text-3xl font-bold">
                        {["A", "S", "P", "I", "R", "I", "N", "G", " ", "S", "O", "F", "T", "W", "A", "R", "E", " ", "D", "E", "V", "E", "L", "O", "P", "E", "R"].map((letter, index) => (
                          <motion.span
                            key={index}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 2.7 + index * 0.05, duration: 0.3 }}
                            className="inline-block bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent"
                          >
                            {letter === " " ? "\u00A0" : letter}
                          </motion.span>
                        ))}
                      </motion.h2>
                    </motion.div>
                    
                    <motion.div
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 4.4, duration: 0.8 }}
                    >
                        <motion.h2 className="text-lg md:text-xl lg:text-2xl font-bold">
                        {["C", "O", "M", "P", "U", "T", "E", "R", " ", "S", "C", "I", "E", "N", "C", "E", " ", "E", "N", "G", "I", "N", "E", "E", "R"].map((letter, index) => (
                          <motion.span
                            key={index}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 4.4 + index * 0.05, duration: 0.3 }}
                            className="inline-block bg-gradient-to-r from-cyan-400 via-green-400 to-yellow-400 bg-clip-text text-transparent"
                          >
                            {letter === " " ? "\u00A0" : letter}
                          </motion.span>
                        ))}
                      </motion.h2>
                    </motion.div>
                  </motion.div>

                  {/* Description paragraphs */}
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 6, duration: 0.8 }}
                    className="space-y-4 pt-6"
                  >
                    <p className="text-base md:text-lg text-gray-300 leading-relaxed">
                      Aspiring to secure a dynamic role in IT as a software or web developer at a reputed organization, where I can leverage{" "}
                      <span className="text-pink-400 font-bold">my passion for innovation</span> and{" "}
                      <span className="text-cyan-400 font-bold">robust technical skills</span> with{" "}
                      <span className="text-purple-400 font-bold">strong work ethic</span>. 
                    </p>
                    <p className="text-base md:text-lg text-gray-300 leading-relaxed">
                      With proven abilities in{" "}
                      <span className="text-green-400 font-bold">team collaboration and leadership</span>, I am dedicated to creating impactful solutions that drive organizational success.
                    </p>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Insane CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: shouldReduceMotion ? 0 : 2, duration: 1 }}
            className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center mb-12 sm:mb-16 px-4"
          >
            <motion.div 
              whileHover={shouldReduceMotion ? {} : { scale: 1.05, rotate: 2 }} 
              whileTap={{ scale: 0.95 }}
            >
              <Button
                size="lg"
                className="bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 hover:from-pink-400 hover:via-purple-400 hover:to-cyan-400 text-white shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 group px-6 py-4 sm:px-8 sm:py-5 lg:px-10 lg:py-6 text-base sm:text-lg lg:text-xl font-black rounded-xl sm:rounded-2xl border-2 border-white/20 w-full sm:w-auto"
                onClick={() => {
                  window.open('https://drive.google.com/file/d/1n_5VwGe2ZizSjA4axbTDJiM0IfVZWip-/view?usp=sharing', '_blank')
                }}
              >
                <Download className="mr-2 sm:mr-3 h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 group-hover:animate-bounce" />
                <span className="hidden sm:inline">DOWNLOAD RESUME</span>
                <span className="sm:hidden">RESUME</span>
                <ArrowRight className="ml-2 sm:ml-3 h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 group-hover:translate-x-2 transition-transform" />
              </Button>
            </motion.div>

            <motion.div 
              whileHover={shouldReduceMotion ? {} : { scale: 1.05, rotate: -2 }} 
              whileTap={{ scale: 0.95 }}
            >
              <Button
                size="lg"
                variant="outline"
                className="border-2 sm:border-4 border-cyan-500/50 hover:border-cyan-400 hover:bg-cyan-500/20 text-cyan-300 hover:text-white backdrop-blur-sm bg-black/20 group px-6 py-4 sm:px-8 sm:py-5 lg:px-10 lg:py-6 text-base sm:text-lg lg:text-xl font-black rounded-xl sm:rounded-2xl w-full sm:w-auto"
                onClick={() => {
                  document.getElementById('contact')?.scrollIntoView({ 
                    behavior: 'smooth' 
                  })
                }}
              >
                <Rocket className="mr-2 sm:mr-3 h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 group-hover:animate-pulse" />
                <span className="hidden sm:inline">LET'S BUILD THE FUTURE</span>
                <span className="sm:hidden">LET'S BUILD</span>
                <Sparkles className="ml-2 sm:ml-3 h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 group-hover:animate-spin" />
              </Button>
            </motion.div>
          </motion.div>

          {/* Animated stats with crazy effects */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: shouldReduceMotion ? 0 : 2.5, duration: 1 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 max-w-4xl mx-auto px-4"
          >
            {[
              { number: "8.43", label: "CGPA Score", icon: Code, color: "text-blue-400" },
              { number: "2+", label: "Projects Built", icon: Zap, color: "text-purple-400" },
              { number: "4+", label: "Hackathons", icon: Globe, color: "text-violet-500" },
              { number: "∞", label: "Learning", icon: Sparkles, color: "text-pink-400" },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                className="text-center group cursor-pointer p-3 sm:p-4 rounded-xl hover:bg-white/5 transition-colors"
                whileHover={shouldReduceMotion ? {} : { scale: 1.05, y: -5 }}
                animate={shouldReduceMotion ? {} : {
                  y: [0, -3, 0],
                }}
                transition={{
                  duration: shouldReduceMotion ? 0 : 2,
                  delay: shouldReduceMotion ? 0 : index * 0.2,
                  repeat: shouldReduceMotion ? 0 : Number.POSITIVE_INFINITY,
                }}
              >
                <motion.div 
                  className="mb-2 sm:mb-3" 
                  whileHover={shouldReduceMotion ? {} : { rotate: 360 }} 
                  transition={{ duration: 0.5 }}
                >
                  <stat.icon className={`h-6 w-6 sm:h-8 sm:w-8 lg:h-10 lg:w-10 mx-auto ${stat.color} group-hover:drop-shadow-lg`} />
                </motion.div>
                <div className="text-2xl sm:text-3xl lg:text-4xl font-black text-white mb-1 sm:mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-pink-400 group-hover:to-cyan-400 group-hover:bg-clip-text transition-all duration-300">
                  {stat.number}
                </div>
                <div className="text-gray-400 text-xs sm:text-sm font-medium leading-tight">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* EDUCATION Section */}
      <section id="education" className="relative py-16 sm:py-24 lg:py-32 z-10">
        <div className="container mx-auto px-4 sm:px-6">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12 sm:mb-16 lg:mb-20"
          >
            <motion.h2
              className="text-3xl sm:text-4xl md:text-6xl lg:text-8xl font-black mb-4 sm:mb-6 lg:mb-8 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
              animate={shouldReduceMotion ? {} : {
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{ duration: shouldReduceMotion ? 0 : 5, repeat: shouldReduceMotion ? 0 : Number.POSITIVE_INFINITY }}
            >
              EDUCATION
            </motion.h2>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed px-4">
              Academic journey and technical foundation.
            </p>
          </motion.div>

          {/* Education & Experience Cards */}
          <div className="grid gap-6 sm:gap-8 max-w-4xl mx-auto">
            {/* Current Education */}
            <motion.div
              initial={{ opacity: 0, x: shouldReduceMotion ? 0 : -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="group relative overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-br from-black/80 to-purple-900/20 border border-purple-500/30 backdrop-blur-xl p-4 sm:p-6 lg:p-8 hover:border-purple-400/50 transition-all duration-500"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-cyan-500/10 group-hover:from-purple-500/20 group-hover:to-cyan-500/20 transition-all duration-500" />
              <div className="relative z-10">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4 sm:mb-6 gap-3 sm:gap-0">
                  <div className="flex-1">
                    <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-1 sm:mb-2">CMR Institute of Technology</h3>
                    <p className="text-base sm:text-lg text-cyan-400 font-semibold">Bachelor of Engineering - Computer Science</p>
                    <p className="text-xs sm:text-sm text-gray-400">CGPA: 8.43 • 2026 (Pursuing)</p>
                  </div>
                  <div className="text-left sm:text-right">
                    <div className="inline-block px-3 sm:px-4 py-1.5 sm:py-2 bg-green-500/20 border border-green-500/30 rounded-full">
                      <span className="text-green-400 font-bold text-xs sm:text-sm">CURRENT</span>
                    </div>
                  </div>
                </div>
                <p className="text-sm sm:text-base text-gray-300 leading-relaxed mb-4 sm:mb-6">
                  Pursuing Computer Science Engineering with strong focus on software development, 
                  artificial intelligence, and web technologies. Actively involved in projects and hackathons.
                </p>
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {["Computer Science", "Engineering", "Software Development", "AI/ML"].map((tech) => (
                    <span
                      key={tech}
                      className="px-2 sm:px-3 py-1 bg-purple-500/20 border border-purple-500/30 rounded-full text-purple-300 text-xs sm:text-sm font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Previous Education */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-black/80 to-cyan-900/20 border border-cyan-500/30 backdrop-blur-xl p-8 hover:border-cyan-400/50 transition-all duration-500"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-green-500/10 group-hover:from-cyan-500/20 group-hover:to-green-500/20 transition-all duration-500" />
              <div className="relative z-10">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h3 className="text-3xl font-bold text-white mb-2">Previous Education</h3>
                    <p className="text-lg text-green-400 font-semibold">School Education</p>
                    <p className="text-sm text-gray-400">12th & 10th Grade</p>
                  </div>
                  <div className="text-right">
                    <div className="px-4 py-2 bg-blue-500/20 border border-blue-500/30 rounded-full">
                      <span className="text-blue-400 font-bold text-sm">COMPLETED</span>
                    </div>
                  </div>
                </div>
                <p className="text-gray-300 leading-relaxed mb-6">
                  12th Grade from Indian Convent School, Bundi, Rajasthan and 10th Grade from Mount Egmont School, Hazaribagh. 
                  Strong foundation in mathematics, science, and computer applications.
                </p>
                <div className="flex flex-wrap gap-2">
                  {["Mathematics", "Science", "Computer Applications", "Academic Excellence"].map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-cyan-500/20 border border-cyan-500/30 rounded-full text-cyan-300 text-sm font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Internship Experience */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-black/80 to-green-900/20 border border-green-500/30 backdrop-blur-xl p-8 hover:border-green-400/50 transition-all duration-500"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 via-transparent to-teal-500/10 group-hover:from-green-500/20 group-hover:to-teal-500/20 transition-all duration-500" />
              <div className="relative z-10">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h3 className="text-3xl font-bold text-white mb-2">Incanus Technologies Pvt. Ltd.</h3>
                    <p className="text-lg text-green-400 font-semibold">Quality Check Intern</p>
                    <p className="text-sm text-gray-400">July 2025 - September 2025 • Bangalore, India</p>
                  </div>
                  <div className="text-right">
                    <div className="px-4 py-2 bg-green-500/20 border border-green-500/30 rounded-full">
                      <span className="text-green-400 font-bold text-sm">INTERNSHIP</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <p className="text-gray-300 leading-relaxed">
                    Selected through Newton School, reporting to Siddhant Agarwal. Conducted quality checks and assisted in testing internal tools and platforms. Ensured all deliverables adhered to internal standards before deployment.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {["Quality Assurance", "Testing", "Newton School", "Internal Tools", "Deployment Standards"].map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-green-500/20 border border-green-500/30 rounded-full text-green-300 text-sm font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Technical Skills */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              viewport={{ once: true }}
              className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-black/80 to-pink-900/20 border border-pink-500/30 backdrop-blur-xl p-8 hover:border-pink-400/50 transition-all duration-500"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 via-transparent to-orange-500/10 group-hover:from-pink-500/20 group-hover:to-orange-500/20 transition-all duration-500" />
              <div className="relative z-10">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h3 className="text-3xl font-bold text-white mb-2">Technical Expertise</h3>
                    <p className="text-lg text-orange-400 font-semibold">Programming & Development</p>
                    <p className="text-sm text-gray-400">Languages • Tools • Technologies</p>
                  </div>
                  <div className="text-right">
                    <div className="px-4 py-2 bg-orange-500/20 border border-orange-500/30 rounded-full">
                      <span className="text-orange-400 font-bold text-sm">SKILLED</span>
                    </div>
                  </div>
                </div>
                <p className="text-gray-300 leading-relaxed mb-6">
                  Proficient in multiple programming languages including Python, Java, and C. 
                  Experienced with web technologies, databases, and development tools.
                </p>
                <div className="flex flex-wrap gap-2">
                  {["Python", "Java", "C", "HTML/CSS", "JavaScript", "MySQL"].map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-pink-500/20 border border-pink-500/30 rounded-full text-pink-300 text-sm font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* INSANE Projects Section */}
      <section id="projects" className="py-16 sm:py-24 lg:py-32 relative z-10">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <GlitchText className="text-3xl sm:text-4xl md:text-6xl lg:text-8xl font-black mb-6 sm:mb-8 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              EPIC BUILDS
            </GlitchText>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 max-w-3xl mx-auto px-4">
              Projects that don't just work - they{" "}
              <span className="text-pink-400 font-bold animate-pulse">DOMINATE</span> their domains 🔥
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 100, rotate: index % 2 === 0 ? -5 : 5 }}
                whileInView={{ opacity: 1, y: 0, rotate: 0 }}
                transition={{ delay: index * 0.2, duration: 0.8 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02, rotate: index % 2 === 0 ? 2 : -2 }}
                className="group"
              >
                <Card
                  className={`bg-gradient-to-br from-gray-900/80 to-black/80 border-2 ${project.accent} backdrop-blur-xl overflow-hidden transition-all duration-500 hover:shadow-2xl rounded-3xl`}
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-700"
                    />

                    {/* Crazy overlay effects */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-t ${project.color} opacity-30 group-hover:opacity-60 transition-opacity duration-500`}
                    />

                    {/* Floating type badge */}
                    <motion.div className="absolute top-6 left-6" whileHover={{ scale: 1.1, rotate: 5 }}>
                      <span className="px-4 py-2 bg-black/80 backdrop-blur-sm rounded-full text-sm font-black text-cyan-400 border-2 border-cyan-500/50 shadow-lg">
                        {project.type}
                      </span>
                    </motion.div>

                    {/* Action buttons with crazy effects */}
                    <div className="absolute top-6 right-6 flex gap-3">
                      <motion.div whileHover={{ scale: 1.2, rotate: 10 }} whileTap={{ scale: 0.9 }}>
                        <Button
                          size="sm"
                          className="bg-black/80 backdrop-blur-sm hover:bg-purple-500/30 border-2 border-purple-500/50 rounded-full"
                        >
                          <Play className="h-5 w-5 text-purple-400" />
                        </Button>
                      </motion.div>
                      <motion.div whileHover={{ scale: 1.2, rotate: -10 }} whileTap={{ scale: 0.9 }}>
                        <Button
                          size="sm"
                          className="bg-black/80 backdrop-blur-sm hover:bg-cyan-500/30 border-2 border-cyan-500/50 rounded-full"
                          onClick={() => window.open(project.github || 'https://github.com/adiVIT', '_blank')}
                        >
                          <Github className="h-5 w-5 text-cyan-400" />
                        </Button>
                      </motion.div>
                    </div>

                    {/* Stats with glow effects */}
                    <div className="absolute bottom-6 left-6 flex gap-4">
                      {Object.entries(project.stats).map(([key, value]) => (
                        <motion.div
                          key={key}
                          className="bg-black/80 backdrop-blur-sm rounded-2xl px-4 py-2 text-sm border border-white/20"
                          whileHover={{ scale: 1.05, y: -2 }}
                        >
                          <span className="text-cyan-400 font-black text-lg">{value}</span>
                          <span className="text-gray-300 ml-2 font-medium">{key}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  <CardContent className="p-4 sm:p-6 lg:p-8">
                    <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                      <GlitchText className="text-xl sm:text-2xl lg:text-3xl font-black text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-pink-400 group-hover:to-cyan-400 group-hover:bg-clip-text transition-all duration-300">
                        {project.title}
                      </GlitchText>
                      <motion.div
                        animate={{ rotate: [0, 360] }}
                        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                      >
                        <Zap className="h-6 w-6 text-yellow-400" />
                      </motion.div>
                    </div>

                    <p className="text-cyan-300 font-bold text-base sm:text-lg mb-3 sm:mb-4">{project.subtitle}</p>
                    <p className="text-gray-300 mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base lg:text-lg">{project.description}</p>

                    <div className="flex flex-wrap gap-2 sm:gap-3 mb-4 sm:mb-6">
                      {project.tech.map((tech, techIndex) => (
                        <motion.span
                          key={tech}
                          className="px-2 sm:px-3 lg:px-4 py-1 sm:py-2 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 border border-purple-500/30 rounded-full text-purple-300 font-bold text-xs sm:text-sm"
                          whileHover={{ scale: 1.1, y: -2 }}
                          transition={{ delay: techIndex * 0.1 }}
                        >
                          {tech}
                        </motion.span>
                      ))}
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                      <motion.div className="flex-1" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                        <Button 
                          className="w-full bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 hover:from-purple-400 hover:via-pink-400 hover:to-cyan-400 group/btn font-black text-sm sm:text-base lg:text-lg py-2 sm:py-3 rounded-xl sm:rounded-2xl"
                          onClick={() => window.open(project.live || '#', '_blank')}
                        >
                          <ExternalLink className="mr-1 sm:mr-2 h-4 w-4 sm:h-5 sm:w-5 group-hover/btn:animate-pulse" />
                          <span className="hidden sm:inline">LAUNCH PROJECT</span>
                          <span className="sm:hidden">LAUNCH</span>
                        </Button>
                      </motion.div>
                      <motion.div whileHover={{ scale: 1.1, rotate: 5 }} whileTap={{ scale: 0.9 }}>
                        <Button
                          variant="outline"
                          className="border-2 border-cyan-500/50 hover:bg-cyan-500/20 text-cyan-300 rounded-xl sm:rounded-2xl px-4 sm:px-6 w-full sm:w-auto"
                          onClick={() => window.open(project.github || 'https://github.com/adiVIT', '_blank')}
                        >
                          <Github className="h-5 w-5" />
                        </Button>
                      </motion.div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CRAZY Skills Section */}
      <section id="skills" className="py-32 relative z-10">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <GlitchText className="text-3xl sm:text-4xl md:text-6xl lg:text-8xl font-black mb-6 sm:mb-8 bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
              SUPERPOWERS
            </GlitchText>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 max-w-3xl mx-auto px-4">
              Technologies I've mastered to create{" "}
              <span className="text-purple-400 font-bold animate-pulse">DIGITAL MAGIC</span> ✨
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {skills.map((skill, index) => {
              const IconComponent = skill.icon
              return (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, scale: 0, rotate: -180 }}
                  whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.8, type: "spring" }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05, rotate: 3, y: -10 }}
                >
                  <Card
                    className={`p-8 bg-gradient-to-br from-gray-900/80 to-black/80 border-2 border-purple-500/30 hover:border-purple-400/60 backdrop-blur-xl transition-all duration-500 group hover:shadow-2xl ${skill.glow} rounded-3xl`}
                  >
                    <div className="text-center">
                      <motion.div
                        className={`inline-flex p-6 rounded-full bg-gradient-to-r ${skill.color} mb-6 group-hover:scale-110 transition-transform duration-300 shadow-2xl`}
                        whileHover={{ rotate: 360, scale: 1.2 }}
                        transition={{ duration: 0.6 }}
                      >
                        <IconComponent className="h-10 w-10 text-white" />
                      </motion.div>

                      <h3 className="text-xl font-black mb-4 text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-cyan-400 group-hover:bg-clip-text transition-all duration-300">
                        {skill.name}
                      </h3>

                      <div className="relative mb-4">
                        <div className="w-full bg-gray-800 rounded-full h-4 overflow-hidden border border-gray-600">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.level}%` }}
                            transition={{ delay: index * 0.1 + 0.5, duration: 2, ease: "easeOut" }}
                            viewport={{ once: true }}
                            className={`h-full bg-gradient-to-r ${skill.color} rounded-full relative overflow-hidden`}
                          >
                            <motion.div
                              className="absolute inset-0 bg-white/30"
                              animate={{ x: ["-100%", "100%"] }}
                              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                            />
                          </motion.div>
                        </div>
                      </div>

                      <div className="flex justify-between items-center">
                        <span className="text-3xl font-black text-white">{skill.level}%</span>
                        <div className="flex gap-1">
                          {[...Array(5)].map((_, i) => (
                            <motion.div
                              key={i}
                              initial={{ scale: 0 }}
                              whileInView={{ scale: 1 }}
                              transition={{ delay: index * 0.1 + i * 0.1 + 1 }}
                              viewport={{ once: true }}
                            >
                              <Star
                                className={`h-5 w-5 ${
                                  i < Math.floor(skill.level / 20)
                                    ? "text-yellow-400 fill-current drop-shadow-lg"
                                    : "text-gray-600"
                                }`}
                              />
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ACHIEVEMENTS & ACTIVITIES Section */}
      <section id="achievements" className="py-16 sm:py-24 lg:py-32 relative z-10">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <GlitchText className="text-3xl sm:text-4xl md:text-6xl lg:text-8xl font-black mb-6 sm:mb-8 bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 bg-clip-text text-transparent">
              ACHIEVEMENTS
            </GlitchText>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 max-w-3xl mx-auto px-4">
              Recognition and{" "}
              <span className="text-yellow-400 font-bold animate-pulse">ACCOMPLISHMENTS</span> that showcase my potential 🏆
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 max-w-6xl mx-auto">
            {/* Achievements */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Card className="bg-gradient-to-br from-gray-900/80 to-black/80 border-2 border-yellow-500/30 backdrop-blur-xl p-6 sm:p-8 rounded-3xl shadow-2xl shadow-yellow-500/20">
                <h3 className="text-2xl sm:text-3xl font-black mb-6 text-white">🏆 ACHIEVEMENTS</h3>
                <div className="space-y-4">
                  {[
                    {
                      title: "2nd Place - Project Exhibition",
                      description: "Secured 2nd place in Major project exhibition organized by CMR Institute of Technology",
                      type: "Academic"
                    },
                    {
                      title: "Top 60 - National Social Hackathon",
                      description: "Selected among top 60 out of 500+ teams for Round 2 of National Social Hackathon",
                      type: "Competition"
                    },
                    {
                      title: "Top 25 - HappyFox GenAI Hackathon",
                      description: "Shortlisted among top 25 teams out of 125 for Round 2 of Generative AI HappyFox Hackathon",
                      type: "AI Competition"
                    },
                    {
                      title: "Top 60 - Nokia Recruitment",
                      description: "Selected among top 60 out of 350+ students for Round 2 of Nokia recruitment process",
                      type: "Career"
                    }
                  ].map((achievement, index) => (
                    <motion.div
                      key={achievement.title}
                      className="p-4 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/20 rounded-xl hover:border-yellow-400/40 transition-all duration-300"
                      whileHover={{ scale: 1.02, x: 10 }}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0" />
                        <div>
                          <h4 className="text-white font-bold text-sm sm:text-base mb-1">{achievement.title}</h4>
                          <p className="text-gray-300 text-xs sm:text-sm mb-2">{achievement.description}</p>
                          <span className="inline-block px-2 py-1 bg-yellow-500/20 text-yellow-300 text-xs rounded-full">
                            {achievement.type}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </Card>
            </motion.div>

            {/* Activities & Hobbies */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="bg-gradient-to-br from-gray-900/80 to-black/80 border-2 border-cyan-500/30 backdrop-blur-xl p-6 sm:p-8 rounded-3xl shadow-2xl shadow-cyan-500/20">
                <h3 className="text-2xl sm:text-3xl font-black mb-6 text-white">🎯 ACTIVITIES & HOBBIES</h3>
                
                {/* Online Courses */}
                <div className="mb-6">
                  <h4 className="text-lg font-bold text-cyan-400 mb-3">📚 Online Courses & Certifications</h4>
                  <div className="space-y-2">
                    <div className="p-3 bg-cyan-500/10 border border-cyan-500/20 rounded-lg">
                      <p className="text-white font-medium text-sm">The Complete Python Developer - UDEMY</p>
                    </div>
                    <div className="p-3 bg-cyan-500/10 border border-cyan-500/20 rounded-lg">
                      <p className="text-white font-medium text-sm">The Front-End Web Developer Bootcamp - UDEMY</p>
                    </div>
                  </div>
                </div>

                {/* Hackathons */}
                <div className="mb-6">
                  <h4 className="text-lg font-bold text-purple-400 mb-3">🚀 Hackathons Participated</h4>
                  <div className="space-y-2">
                    {[
                      "AptiCode, 2025",
                      "Nokia Student Hackathon, 2025",
                      "Hackathon on GenAI conducted by HappyFox, 2025",
                      "Social Hackathon conducted by CMRIT Bangalore, 2025"
                    ].map((hackathon, index) => (
                      <div key={index} className="p-3 bg-purple-500/10 border border-purple-500/20 rounded-lg">
                        <p className="text-white font-medium text-sm">{hackathon}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Technical Clubs */}
                <div className="mb-6">
                  <h4 className="text-lg font-bold text-green-400 mb-3">👥 Technical Clubs</h4>
                  <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                    <p className="text-white font-medium text-sm">Hacker Earth Club - Member of organizing team, improving coding skillset</p>
                  </div>
                </div>

                {/* Hobbies */}
                <div>
                  <h4 className="text-lg font-bold text-pink-400 mb-3">🎮 Hobbies</h4>
                  <div className="flex flex-wrap gap-2">
                    {["Playing Video Games", "Going to Gym", "Watching TV Shows"].map((hobby, index) => (
                      <span key={index} className="px-3 py-1 bg-pink-500/20 border border-pink-500/30 rounded-full text-pink-300 text-sm font-medium">
                        {hobby}
                      </span>
                    ))}
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* INSANE Contact Section */}
      <section id="contact" className="py-16 sm:py-24 lg:py-32 relative z-10">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <GlitchText className="text-3xl sm:text-4xl md:text-6xl lg:text-8xl font-black mb-6 sm:mb-8 bg-gradient-to-r from-green-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
              LET'S CREATE MAGIC
            </GlitchText>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 max-w-3xl mx-auto px-4">
              Ready to build something <span className="text-green-400 font-bold animate-pulse">LEGENDARY</span>? Let's
              make it happen! 🚀
            </p>
          </motion.div>

          <div className="max-w-6xl mx-auto">
            <Card className="bg-gradient-to-br from-gray-900/80 to-black/80 border-2 border-cyan-500/30 backdrop-blur-xl p-4 sm:p-6 lg:p-8 xl:p-12 rounded-2xl sm:rounded-3xl shadow-2xl shadow-cyan-500/20">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16">
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                >
                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black mb-6 sm:mb-8 text-white">DROP ME A LINE!</h3>
                  <form 
                    action="mailto:akshat111bkg@gmail.com"
                    method="POST"
                    encType="text/plain"
                    className="space-y-6"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                      <motion.div whileHover={{ scale: 1.02 }}>
                        <Input
                          name="name"
                          placeholder="Your Name"
                          required
                          className="bg-black/60 border-2 border-purple-500/30 focus:border-purple-400 text-white placeholder-gray-400 rounded-xl sm:rounded-2xl py-3 sm:py-4 text-base sm:text-lg font-medium"
                        />
                      </motion.div>
                      <motion.div whileHover={{ scale: 1.02 }}>
                        <Input
                          name="email"
                          type="email"
                          placeholder="your@email.com"
                          required
                          className="bg-black/60 border-2 border-cyan-500/30 focus:border-cyan-400 text-white placeholder-gray-400 rounded-xl sm:rounded-2xl py-3 sm:py-4 text-base sm:text-lg font-medium"
                        />
                      </motion.div>
                    </div>
                    <motion.div whileHover={{ scale: 1.02 }}>
                      <Input
                        name="subject"
                        placeholder="Project Subject"
                        required
                        className="bg-black/60 border-2 border-pink-500/30 focus:border-pink-400 text-white placeholder-gray-400 rounded-xl sm:rounded-2xl py-3 sm:py-4 text-base sm:text-lg font-medium"
                      />
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.02 }}>
                      <Textarea
                        name="message"
                        placeholder="Tell me about your EPIC project idea..."
                        rows={6}
                        required
                        className="bg-black/60 border-2 border-green-500/30 focus:border-green-400 text-white placeholder-gray-400 rounded-xl sm:rounded-2xl p-3 sm:p-4 text-base sm:text-lg font-medium resize-none"
                      />
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Button 
                        type="submit"
                        className="w-full bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 hover:from-purple-400 hover:via-pink-400 hover:to-cyan-400 text-white shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 group py-4 sm:py-5 lg:py-6 text-base sm:text-lg lg:text-xl font-black rounded-xl sm:rounded-2xl"
                      >
                        <Send className="mr-2 sm:mr-3 h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 group-hover:translate-x-2 transition-transform" />
                        <span className="hidden sm:inline">LAUNCH MESSAGE 🚀</span>
                        <span className="sm:hidden">SEND 🚀</span>
                        <Sparkles className="ml-2 sm:ml-3 h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 group-hover:animate-spin" />
                      </Button>
                    </motion.div>
                  </form>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                  className="space-y-8"
                >
                  <div>
                    <h3 className="text-2xl sm:text-3xl font-black mb-4 sm:mb-6 text-white">LET'S CONNECT!</h3>
                    <p className="text-gray-300 mb-6 sm:mb-8 leading-relaxed text-sm sm:text-base lg:text-lg">
                      I'm always excited to collaborate on mind-blowing projects. Whether you need a scalable backend
                      that handles millions of users or an AI system that predicts the future, let's build something
                      LEGENDARY together!
                    </p>
                  </div>

                  <div className="space-y-4 sm:space-y-6">
                    {[
                      {
                        icon: Mail,
                        label: "Email",
                        value: "akshat111bkg@gmail.com",
                        color: "text-cyan-400",
                        bg: "from-cyan-500/20 to-blue-500/20",
                      },
                      {
                        icon: Coffee,
                        label: "Location",
                        value: "Bangalore, India",
                        color: "text-yellow-400",
                        bg: "from-yellow-500/20 to-orange-500/20",
                      },
                      {
                        icon: Zap,
                        label: "Mobile",
                        value: "+91 9798074928",
                        color: "text-purple-400",
                        bg: "from-purple-500/20 to-pink-500/20",
                      },
                    ].map((contact, index) => (
                      <motion.div
                        key={contact.label}
                        className={`flex items-center gap-3 sm:gap-4 lg:gap-6 p-3 sm:p-4 lg:p-6 rounded-xl sm:rounded-2xl bg-gradient-to-r ${contact.bg} border border-white/10 hover:border-white/30 transition-all duration-300`}
                        whileHover={{ scale: 1.02, x: 10 }}
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        viewport={{ once: true }}
                      >
                        <motion.div whileHover={{ rotate: 360, scale: 1.2 }} transition={{ duration: 0.5 }}>
                          <contact.icon className={`h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8 ${contact.color}`} />
                        </motion.div>
                        <div>
                          <p className="font-black text-white text-sm sm:text-base lg:text-lg">{contact.label}</p>
                          <p className="text-gray-300 font-medium text-xs sm:text-sm lg:text-base">{contact.value}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  <div>
                    <h4 className="text-lg sm:text-xl font-black mb-4 sm:mb-6 text-white">FIND ME ONLINE</h4>
                    <div className="flex gap-3 sm:gap-4 lg:gap-6">
                      {[
                        {
                          icon: Github,
                          color: "hover:bg-purple-600",
                          label: "GitHub",
                          bg: "from-purple-500/20 to-indigo-500/20",
                          link: "https://github.com/theakshatkhandelwal",
                        },
                        {
                          icon: Linkedin,
                          color: "hover:bg-blue-600",
                          label: "LinkedIn",
                          bg: "from-blue-500/20 to-cyan-500/20",
                          link: "https://www.linkedin.com/in/akshatkhandelwal28/",
                        },
                        {
                          icon: Mail,
                          color: "hover:bg-pink-600",
                          label: "Email",
                          bg: "from-pink-500/20 to-rose-500/20",
                          link: "mailto:akshat111bkg@gmail.com",
                        },
                      ].map((social, index) => (
                        <motion.div
                          key={social.label}
                          whileHover={{ scale: 1.2, rotate: 10, y: -5 }}
                          whileTap={{ scale: 0.9 }}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          viewport={{ once: true }}
                        >
                          <Button
                            size="icon"
                            className={`rounded-xl sm:rounded-2xl bg-gradient-to-r ${social.bg} border-2 border-white/20 ${social.color} transition-all duration-300 p-3 sm:p-4 h-12 w-12 sm:h-14 sm:w-14 lg:h-16 lg:w-16`}
                            onClick={() => window.open(social.link, '_blank')}
                          >
                            <social.icon className="h-5 w-5 sm:h-6 sm:w-6 lg:h-8 lg:w-8" />
                          </Button>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* CRAZY Footer */}
      <footer className="py-12 border-t-2 border-purple-500/20 relative z-10">
        <div className="container mx-auto px-6 text-center">
          <motion.p
            className="text-gray-400 mb-6 text-lg"
            animate={{
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 3,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          >
            © {new Date().getFullYear()} Akshat Khandelwal - Crafted with{" "}
            <Heart className="inline h-5 w-5 text-red-500 animate-pulse" /> and lots of{" "}
            <Coffee className="inline h-5 w-5 text-yellow-500 animate-bounce" />
          </motion.p>
          <GlitchText className="text-sm text-gray-500 font-bold">
            "Code is art, systems are symphonies, and bugs are just plot twists in the epic story." 🎭
          </GlitchText>
        </div>
      </footer>
    </div>
  )
}
