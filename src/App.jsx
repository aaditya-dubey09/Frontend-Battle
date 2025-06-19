import React, { useState, useEffect, useRef } from 'react';
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform
} from "framer-motion";
import { Menu, X, Sun, Moon, ChevronDown, BarChart3, TrendingUp, Users, Star, Sparkles, Zap, Rocket } from 'lucide-react';
import './App.css';

// Import assets
import loaderVideo from './assets/loader.mp4';
import homepageVideo from './assets/homepage.mp4';
import cardsImage from './assets/cards.png';
import statsImage from './assets/stats.png';
import graphImage from './assets/graph.png';
import featuresVideo from './assets/features-services.mp4';
import customerVideo from './assets/customer-section.mp4';
import showcaseVideo from './assets/showcasework.mp4';
import testimonialsVideo from './assets/testimonials.mp4';
import parallaxVideo from './assets/parallaxanimation.mp4';
import rippleVideo from './assets/rippleeffect.mp4';
import scrollPopupVideo from './assets/scrollandpopup.mp4';
import carouselVideo from './assets/caraouselswitch.mp4';
import strikingVideo from './assets/striking-anysimpleobjectcanbeused.mp4';

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isScrolled, setIsScrolled] = useState(false);
  
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  // Loader effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  // Mouse tracking for interactive effects
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Dark mode toggle
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  // Navigation items
  const navItems = [
    { id: 'home', label: 'Home', icon: Rocket },
    { id: 'features', label: 'Features', icon: Zap },
    { id: 'showcase', label: 'Showcase', icon: Sparkles },
    { id: 'stats', label: 'Analytics', icon: BarChart3 },
    { id: 'testimonials', label: 'Testimonials', icon: Star },
    { id: 'contact', label: 'Contact', icon: Users }
  ];

  // Floating particles component
  const FloatingParticles = () => (
    <div className="fixed inset-0 z-10 pointer-events-none">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full bg-primary/20"
          initial={{
            x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1200),
            y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
          }}
          animate={{
            x: mousePosition.x + (Math.random() - 0.5) * 100,
            y: mousePosition.y + (Math.random() - 0.5) * 100,
          }}
          transition={{
            duration: 2,
            ease: "easeOut",
            delay: i * 0.1,
          }}
        />
      ))}
    </div>
  );

  // Loader Component
  const Loader = () => (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative flex items-center justify-center w-full h-full">
        <video
          autoPlay
          muted
          loop
          className="object-cover w-full h-full"
        >
          <source src={loaderVideo} type="video/mp4" />
        </video>
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <motion.div
            className="text-4xl font-bold text-white"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <motion.span
              className="inline-block mr-4"
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              ⚡
            </motion.span>
            Loading Experience...
          </motion.div>
        </div>
      </div>
    </motion.div>
  );

  // Navigation Component
  const Navigation = () => (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled 
          ? 'bg-background/95 backdrop-blur-lg border-b border-border shadow-lg' 
          : 'bg-background/80 backdrop-blur-md border-b border-border'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container flex items-center justify-between px-4 py-4 mx-auto">
        <motion.div
          className="flex items-center space-x-2 text-2xl font-bold text-primary"
          whileHover={{ scale: 1.05 }}
        >
          <motion.span
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          >
            ⚡
          </motion.span>
          <span>Frontend Battle</span>
        </motion.div>

        {/* Desktop Navigation */}
        <div className="items-center hidden space-x-8 md:flex">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <motion.a
                key={item.id}
                href={`#${item.id}`}
                className={`flex items-center space-x-2 text-foreground hover:text-primary transition-colors ${
                  activeSection === item.id ? 'text-primary font-semibold' : ''
                }`}
                whileHover={{ scale: 1.05, y: -2 }}
                onClick={() => setActiveSection(item.id)}
              >
                <Icon size={16} />
                <span>{item.label}</span>
              </motion.a>
            );
          })}
        </div>

        {/* Dark Mode Toggle & Mobile Menu */}
        <div className="flex items-center space-x-4">
          <motion.button
            onClick={toggleDarkMode}
            className="p-2 transition-colors rounded-full bg-secondary hover:bg-accent glow-effect"
            whileHover={{ scale: 1.1, rotate: 180 }}
            whileTap={{ scale: 0.95 }}
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </motion.button>

          <motion.button
            className="p-2 transition-colors rounded-full md:hidden bg-secondary hover:bg-accent"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="border-t md:hidden bg-background border-border"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="container px-4 py-4 mx-auto space-y-4">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <motion.a
                    key={item.id}
                    href={`#${item.id}`}
                    className="flex items-center space-x-3 transition-colors text-foreground hover:text-primary"
                    whileHover={{ x: 10 }}
                    onClick={() => {
                      setActiveSection(item.id);
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    <Icon size={16} />
                    <span>{item.label}</span>
                  </motion.a>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );

  // Hero Section
  const HeroSection = () => (
    <section ref={heroRef} id="home" className="relative flex items-center justify-center min-h-screen overflow-hidden">
      <motion.video
        autoPlay
        muted
        loop
        className="absolute inset-0 object-cover w-full h-full"
        style={{ y, opacity }}
      >
        <source src={homepageVideo} type="video/mp4" />
      </motion.video>
      <div className="absolute inset-0 bg-black bg-opacity-40" />
      
      <motion.div
        className="relative z-10 px-4 text-center text-white"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <motion.h1
          className="mb-6 text-5xl font-bold md:text-7xl"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          <motion.span
            className="inline-block text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text"
            animate={{ 
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            Innovation
          </motion.span>{" "}
          Meets Design
        </motion.h1>
        <motion.p
          className="max-w-3xl mx-auto mb-8 text-xl md:text-2xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          Experience the future of web development with cutting-edge animations and pixel-perfect design
        </motion.p>
        <motion.button
          className="px-8 py-4 text-lg font-semibold transition-colors rounded-full bg-primary text-primary-foreground hover:bg-primary/90 ripple-effect"
          whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(0,0,0,0.3)" }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <motion.span
            className="flex items-center space-x-2"
            whileHover={{ x: 5 }}
          >
            <Rocket size={20} />
            <span>Explore Now</span>
          </motion.span>
        </motion.button>
      </motion.div>

      <motion.div
        className="absolute transform -translate-x-1/2 bottom-8 left-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <ChevronDown className="text-white" size={32} />
      </motion.div>
    </section>
  );

  // Features Section
  const FeaturesSection = () => (
    <section id="features" className="relative py-20 overflow-hidden bg-background">
      <div className="container px-4 mx-auto">
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.h2
            className="mb-6 text-4xl font-bold text-transparent md:text-5xl text-foreground bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text"
          >
            Powerful Features
          </motion.h2>
          <p className="max-w-3xl mx-auto text-xl text-muted-foreground">
            Discover the innovative features that make our platform stand out
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 mb-16 md:grid-cols-2 lg:grid-cols-3">
          {[
            { image: cardsImage, title: "Brand Kits", desc: "Comprehensive brand management tools for consistent design across all platforms", delay: 0.1 },
            { video: featuresVideo, title: "Advanced Services", desc: "Cutting-edge features and services designed for modern businesses", delay: 0.2 },
            { video: rippleVideo, title: "Interactive Effects", desc: "Engaging animations and effects that captivate your audience", delay: 0.3 }
          ].map((item, index) => (
            <motion.div
              key={index}
              className="overflow-hidden rounded-lg shadow-lg bg-card group"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: item.delay }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02, y: -5 }}
            >
              {item.image ? (
                <motion.img 
                  src={item.image} 
                  alt={item.title} 
                  className="object-cover w-full h-48 transition-transform duration-500 group-hover:scale-110" 
                />
              ) : (
                <motion.video 
                  autoPlay 
                  muted 
                  loop 
                  className="object-cover w-full h-48 transition-transform duration-500 group-hover:scale-110"
                >
                  <source src={item.video} type="video/mp4" />
                </motion.video>
              )}
              <div className="p-6">
                <h3 className="mb-3 text-xl font-semibold text-card-foreground">{item.title}</h3>
                <p className="text-muted-foreground">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="relative overflow-hidden rounded-lg group"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          whileHover={{ scale: 1.02 }}
        >
          <video autoPlay muted loop className="object-cover w-full h-64 transition-transform duration-700 md:h-96 group-hover:scale-105">
            <source src={parallaxVideo} type="video/mp4" />
          </video>
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40">
            <motion.div
              className="text-center text-white"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <h3 className="mb-4 text-3xl font-bold md:text-4xl">Parallax Animations</h3>
              <p className="text-lg md:text-xl">Experience depth and motion like never before</p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );

  // Showcase Section
  const ShowcaseSection = () => (
    <section id="showcase" className="py-20 bg-muted/50">
      <div className="container px-4 mx-auto">
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="mb-6 text-4xl font-bold md:text-5xl text-foreground">Showcase Excellence</h2>
          <p className="max-w-3xl mx-auto text-xl text-muted-foreground">
            Witness the power of our platform through stunning visual demonstrations
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 mb-16 md:grid-cols-2">
          <motion.div
            className="relative overflow-hidden rounded-lg group"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.02 }}
          >
            <video autoPlay muted loop className="object-cover w-full h-64 transition-transform duration-500 group-hover:scale-105">
              <source src={showcaseVideo} type="video/mp4" />
            </video>
            <div className="absolute inset-0 flex items-center justify-center transition-opacity duration-300 bg-black opacity-0 bg-opacity-40 group-hover:opacity-100">
              <div className="text-center text-white">
                <h3 className="mb-2 text-2xl font-bold">Portfolio Showcase</h3>
                <p className="text-lg">Dynamic portfolio presentations that captivate and engage</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="relative overflow-hidden rounded-lg group"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.02 }}
          >
            <video autoPlay muted loop className="object-cover w-full h-64 transition-transform duration-500 group-hover:scale-105">
              <source src={strikingVideo} type="video/mp4" />
            </video>
            <div className="absolute inset-0 flex items-center justify-center transition-opacity duration-300 bg-black opacity-0 bg-opacity-40 group-hover:opacity-100">
              <div className="text-center text-white">
                <h3 className="mb-2 text-2xl font-bold">Striking Visuals</h3>
                <p className="text-lg">Transform simple objects into extraordinary experiences</p>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          className="relative overflow-hidden rounded-lg"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <video autoPlay muted loop className="object-cover w-full h-64 md:h-80">
            <source src={carouselVideo} type="video/mp4" />
          </video>
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40">
            <div className="text-center text-white">
              <h3 className="mb-4 text-3xl font-bold md:text-4xl">Carousel Interactions</h3>
              <p className="text-lg md:text-xl">Seamless transitions and intuitive navigation</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );

  // Analytics Section
  const AnalyticsSection = () => (
    <section id="stats" className="py-20 bg-background">
      <div className="container px-4 mx-auto">
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="mb-6 text-4xl font-bold md:text-5xl text-foreground">Analytics & Insights</h2>
          <p className="max-w-3xl mx-auto text-xl text-muted-foreground">
            Data-driven insights that power intelligent decision making
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 mb-16 md:grid-cols-2">
          <motion.div
            className="overflow-hidden rounded-lg shadow-lg bg-card"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.02 }}
          >
            <img src={statsImage} alt="Portfolio Performance" className="w-full h-auto" />
            <div className="p-6">
              <h3 className="mb-3 text-2xl font-semibold text-card-foreground">Portfolio Performance</h3>
              <p className="mb-4 text-muted-foreground">
                Comprehensive analytics showing carbon footprint, energy intensity, and consumption metrics
              </p>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-primary">45,048</div>
                  <div className="text-sm text-muted-foreground">Carbon Footprint</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary">123</div>
                  <div className="text-sm text-muted-foreground">Energy Intensity</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary">47.7M</div>
                  <div className="text-sm text-muted-foreground">Energy Consumption</div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="overflow-hidden rounded-lg shadow-lg bg-card"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.02 }}
          >
            <img src={graphImage} alt="Emissions Tracking" className="w-full h-auto" />
            <div className="p-6">
              <h3 className="mb-3 text-2xl font-semibold text-card-foreground">Emissions Tracking</h3>
              <p className="mb-4 text-muted-foreground">
                Real-time monitoring of embodied carbon emissions with detailed breakdowns and targets
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <BarChart3 className="text-primary" size={20} />
                  <span className="text-sm text-muted-foreground">Interactive Charts</span>
                </div>
                <div className="flex items-center space-x-2">
                  <TrendingUp className="text-green-500" size={20} />
                  <span className="text-sm text-green-500">16% Improvement</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          className="relative overflow-hidden rounded-lg"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <video autoPlay muted loop className="object-cover w-full h-64 md:h-80">
            <source src={scrollPopupVideo} type="video/mp4" />
          </video>
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40">
            <div className="text-center text-white">
              <h3 className="mb-4 text-3xl font-bold md:text-4xl">Interactive Data</h3>
              <p className="text-lg md:text-xl">Scroll-triggered animations and dynamic popups</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );

  // Testimonials Section
  const TestimonialsSection = () => (
    <section id="testimonials" className="relative py-20 overflow-hidden bg-muted/50">
      <video autoPlay muted loop className="absolute inset-0 object-cover w-full h-full opacity-20">
        <source src={testimonialsVideo} type="video/mp4" />
      </video>
      <div className="container relative z-10 px-4 mx-auto">
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="mb-6 text-4xl font-bold md:text-5xl text-foreground">What Our Clients Say</h2>
          <p className="max-w-3xl mx-auto text-xl text-muted-foreground">
            Hear from satisfied customers who have experienced our innovative solutions
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {[
            {
              name: "Sarah Johnson",
              role: "Creative Director",
              content: "The animations and user experience are absolutely phenomenal. This platform has transformed how we present our work.",
              rating: 5
            },
            {
              name: "Michael Chen",
              role: "Product Manager",
              content: "Outstanding customer service and innovative features. The analytics dashboard provides incredible insights.",
              rating: 5
            }
          ].map((testimonial, index) => (
            <motion.div
              key={index}
              className="p-6 rounded-lg shadow-lg bg-card/90 backdrop-blur-sm"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="text-yellow-400 fill-current" size={20} />
                ))}
              </div>
              <p className="mb-4 italic text-card-foreground">"{testimonial.content}"</p>
              <div className="flex items-center space-x-3">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary">
                  <Users className="text-primary-foreground" size={20} />
                </div>
                <div>
                  <div className="font-semibold text-card-foreground">{testimonial.name}</div>
                  <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );

  // Contact Section
  const ContactSection = () => (
    <section id="contact" className="py-20 bg-background">
      <div className="container px-4 mx-auto">
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="mb-6 text-4xl font-bold md:text-5xl text-foreground">Get In Touch</h2>
          <p className="max-w-3xl mx-auto text-xl text-muted-foreground">
            Ready to transform your digital presence? Let's create something amazing together.
          </p>
        </motion.div>

        <motion.div
          className="max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <form className="space-y-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <label className="block mb-2 text-sm font-medium text-foreground">First Name</label>
                <input
                  type="text"
                  placeholder="John"
                  className="w-full px-4 py-3 border rounded-lg border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-foreground">Last Name</label>
                <input
                  type="text"
                  placeholder="Doe"
                  className="w-full px-4 py-3 border rounded-lg border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-foreground">Email</label>
              <input
                type="email"
                placeholder="john@example.com"
                className="w-full px-4 py-3 border rounded-lg border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-foreground">Message</label>
              <textarea
                rows={5}
                placeholder="Tell us about your project..."
                className="w-full px-4 py-3 border rounded-lg resize-none border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <motion.button
              type="submit"
              className="w-full py-3 font-semibold transition-colors rounded-lg bg-primary text-primary-foreground hover:bg-primary/90"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Send Message
            </motion.button>
          </form>
        </motion.div>
      </div>
    </section>
  );

  if (isLoading) {
    return (
      <AnimatePresence>
        <Loader />
      </AnimatePresence>
    );
  }

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark' : ''}`}>
      <FloatingParticles />
      <Navigation />
      <HeroSection />
      <FeaturesSection />
      <ShowcaseSection />
      <AnalyticsSection />
      <TestimonialsSection />
      <ContactSection />
    </div>
  );
};

export default App;

