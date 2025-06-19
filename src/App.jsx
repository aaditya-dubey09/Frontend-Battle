import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
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
    <div className="fixed inset-0 pointer-events-none z-10">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-primary/20 rounded-full"
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
      <div className="relative w-full h-full flex items-center justify-center">
        <video
          autoPlay
          muted
          loop
          className="w-full h-full object-cover"
        >
          <source src={loaderVideo} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <motion.div
            className="text-white text-4xl font-bold"
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
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <motion.div
          className="text-2xl font-bold text-primary flex items-center space-x-2"
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
        <div className="hidden md:flex items-center space-x-8">
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
            className="p-2 rounded-full bg-secondary hover:bg-accent transition-colors glow-effect"
            whileHover={{ scale: 1.1, rotate: 180 }}
            whileTap={{ scale: 0.95 }}
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </motion.button>

          <motion.button
            className="md:hidden p-2 rounded-full bg-secondary hover:bg-accent transition-colors"
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
            className="md:hidden bg-background border-t border-border"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="container mx-auto px-4 py-4 space-y-4">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <motion.a
                    key={item.id}
                    href={`#${item.id}`}
                    className="flex items-center space-x-3 text-foreground hover:text-primary transition-colors"
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
    <section ref={heroRef} id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <motion.video
        autoPlay
        muted
        loop
        className="absolute inset-0 w-full h-full object-cover"
        style={{ y, opacity }}
      >
        <source src={homepageVideo} type="video/mp4" />
      </motion.video>
      <div className="absolute inset-0 bg-black bg-opacity-40" />
      
      <motion.div
        className="relative z-10 text-center text-white px-4"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <motion.h1
          className="text-5xl md:text-7xl font-bold mb-6"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          <motion.span
            className="inline-block bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent"
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
          className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          Experience the future of web development with cutting-edge animations and pixel-perfect design
        </motion.p>
        <motion.button
          className="bg-primary text-primary-foreground px-8 py-4 rounded-full text-lg font-semibold hover:bg-primary/90 transition-colors ripple-effect"
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
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <ChevronDown className="text-white" size={32} />
      </motion.div>
    </section>
  );

  // Features Section
  const FeaturesSection = () => (
    <section id="features" className="py-20 bg-background relative overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.h2
            className="text-4xl md:text-5xl font-bold mb-6 text-foreground bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent"
          >
            Powerful Features
          </motion.h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover the innovative features that make our platform stand out
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {[
            { image: cardsImage, title: "Brand Kits", desc: "Comprehensive brand management tools for consistent design across all platforms", delay: 0.1 },
            { video: featuresVideo, title: "Advanced Services", desc: "Cutting-edge features and services designed for modern businesses", delay: 0.2 },
            { video: rippleVideo, title: "Interactive Effects", desc: "Engaging animations and effects that captivate your audience", delay: 0.3 }
          ].map((item, index) => (
            <motion.div
              key={index}
              className="bg-card rounded-lg overflow-hidden shadow-lg group"
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
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500" 
                />
              ) : (
                <motion.video 
                  autoPlay 
                  muted 
                  loop 
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                >
                  <source src={item.video} type="video/mp4" />
                </motion.video>
              )}
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-3 text-card-foreground">{item.title}</h3>
                <p className="text-muted-foreground">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="relative rounded-lg overflow-hidden group"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          whileHover={{ scale: 1.02 }}
        >
          <video autoPlay muted loop className="w-full h-64 md:h-96 object-cover group-hover:scale-105 transition-transform duration-700">
            <source src={parallaxVideo} type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
            <motion.div
              className="text-center text-white"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <h3 className="text-3xl md:text-4xl font-bold mb-4">Parallax Animations</h3>
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
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">Showcase Excellence</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Witness the power of our platform through stunning visual demonstrations
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <motion.div
            className="relative rounded-lg overflow-hidden group"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.02 }}
          >
            <video autoPlay muted loop className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500">
              <source src={showcaseVideo} type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="text-center text-white">
                <h3 className="text-2xl font-bold mb-2">Portfolio Showcase</h3>
                <p className="text-lg">Dynamic portfolio presentations that captivate and engage</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="relative rounded-lg overflow-hidden group"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.02 }}
          >
            <video autoPlay muted loop className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500">
              <source src={strikingVideo} type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="text-center text-white">
                <h3 className="text-2xl font-bold mb-2">Striking Visuals</h3>
                <p className="text-lg">Transform simple objects into extraordinary experiences</p>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          className="relative rounded-lg overflow-hidden"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <video autoPlay muted loop className="w-full h-64 md:h-80 object-cover">
            <source src={carouselVideo} type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
            <div className="text-center text-white">
              <h3 className="text-3xl md:text-4xl font-bold mb-4">Carousel Interactions</h3>
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
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">Analytics & Insights</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Data-driven insights that power intelligent decision making
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <motion.div
            className="bg-card rounded-lg overflow-hidden shadow-lg"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.02 }}
          >
            <img src={statsImage} alt="Portfolio Performance" className="w-full h-auto" />
            <div className="p-6">
              <h3 className="text-2xl font-semibold mb-3 text-card-foreground">Portfolio Performance</h3>
              <p className="text-muted-foreground mb-4">
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
            className="bg-card rounded-lg overflow-hidden shadow-lg"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.02 }}
          >
            <img src={graphImage} alt="Emissions Tracking" className="w-full h-auto" />
            <div className="p-6">
              <h3 className="text-2xl font-semibold mb-3 text-card-foreground">Emissions Tracking</h3>
              <p className="text-muted-foreground mb-4">
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
          className="relative rounded-lg overflow-hidden"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <video autoPlay muted loop className="w-full h-64 md:h-80 object-cover">
            <source src={scrollPopupVideo} type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
            <div className="text-center text-white">
              <h3 className="text-3xl md:text-4xl font-bold mb-4">Interactive Data</h3>
              <p className="text-lg md:text-xl">Scroll-triggered animations and dynamic popups</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );

  // Testimonials Section
  const TestimonialsSection = () => (
    <section id="testimonials" className="py-20 bg-muted/50 relative overflow-hidden">
      <video autoPlay muted loop className="absolute inset-0 w-full h-full object-cover opacity-20">
        <source src={testimonialsVideo} type="video/mp4" />
      </video>
      <div className="relative z-10 container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">What Our Clients Say</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Hear from satisfied customers who have experienced our innovative solutions
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
              className="bg-card/90 backdrop-blur-sm rounded-lg p-6 shadow-lg"
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
              <p className="text-card-foreground mb-4 italic">"{testimonial.content}"</p>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
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
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">Get In Touch</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">First Name</label>
                <input
                  type="text"
                  placeholder="John"
                  className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Last Name</label>
                <input
                  type="text"
                  placeholder="Doe"
                  className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Email</label>
              <input
                type="email"
                placeholder="john@example.com"
                className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Message</label>
              <textarea
                rows={5}
                placeholder="Tell us about your project..."
                className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
              />
            </div>
            <motion.button
              type="submit"
              className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
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

