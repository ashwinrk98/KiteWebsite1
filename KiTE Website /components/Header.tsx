import { motion, useScroll, useTransform } from 'framer-motion';
import { useState } from 'react';

export default function Header() {
  const { scrollY } = useScroll();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // Header appears after scrolling
  const headerOpacity = useTransform(scrollY, [100, 200], [0, 1]);
  const headerY = useTransform(scrollY, [100, 200], [-50, 0]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <motion.header 
      className="fixed top-0 left-0 right-0 z-50"
      style={{ 
        opacity: headerOpacity,
        y: headerY,
        background: 'transparent'
      }}
    >
      <div className="container mx-auto px-6 py-8 flex items-center justify-center min-h-[80px] overflow-visible relative">
        {/* Centered logo space - will be filled by the animated logo from Hero */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 flex items-center justify-center overflow-visible header-logo-space">
          {/* Logo will animate into this centered space */}
        </div>
        
        {/* Hamburger Menu Button - positioned absolutely to the right */}
        <button 
          onClick={toggleMenu}
          className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 flex flex-col justify-center items-center space-y-2 group bg-black/20 backdrop-blur-sm rounded-full hover:bg-black/30 transition-all duration-300"
          aria-label="Toggle menu"
        >
          <motion.div 
            className="w-7 h-0.5 bg-white rounded-full shadow-lg"
            animate={{
              rotate: isMenuOpen ? 45 : 0,
              y: isMenuOpen ? 8 : 0,
            }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            style={{
              filter: 'drop-shadow(0 1px 2px rgba(0, 0, 0, 0.5))'
            }}
          />
          <motion.div 
            className="w-7 h-0.5 bg-white rounded-full shadow-lg"
            animate={{
              opacity: isMenuOpen ? 0 : 1,
              x: isMenuOpen ? 10 : 0,
            }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            style={{
              filter: 'drop-shadow(0 1px 2px rgba(0, 0, 0, 0.5))'
            }}
          />
          <motion.div 
            className="w-7 h-0.5 bg-white rounded-full shadow-lg"
            animate={{
              rotate: isMenuOpen ? -45 : 0,
              y: isMenuOpen ? -8 : 0,
            }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            style={{
              filter: 'drop-shadow(0 1px 2px rgba(0, 0, 0, 0.5))'
            }}
          />
        </button>
      </div>

      {/* Mobile Menu Overlay - Enhanced transparency */}
      <motion.div
        className="absolute top-full left-0 right-0 bg-black/80 backdrop-blur-md border-b border-white/10"
        initial={false}
        animate={{
          height: isMenuOpen ? "auto" : 0,
          opacity: isMenuOpen ? 1 : 0,
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        style={{ overflow: "hidden" }}
      >
        <nav className="container mx-auto px-6 py-6">
          <div className="flex flex-col space-y-4">
            <a 
              href="#home" 
              className="text-white hover:text-green-400 transition-colors py-3 border-b border-white/20 text-lg font-medium"
              onClick={toggleMenu}
            >
              Home
            </a>
            <a 
              href="#products" 
              className="text-white hover:text-green-400 transition-colors py-3 border-b border-white/20 text-lg font-medium"
              onClick={toggleMenu}
            >
              Products
            </a>
            <a 
              href="#about" 
              className="text-white hover:text-green-400 transition-colors py-3 border-b border-white/20 text-lg font-medium"
              onClick={toggleMenu}
            >
              About
            </a>
            <a 
              href="#contact" 
              className="text-white hover:text-green-400 transition-colors py-3 text-lg font-medium"
              onClick={toggleMenu}
            >
              Contact
            </a>
          </div>
        </nav>
      </motion.div>
    </motion.header>
  );
}