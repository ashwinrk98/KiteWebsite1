import { motion, useScroll } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import proteinBarImage from 'figma:asset/1d13b2739e66c2304d0065a1647d6c2cf9b1ae9c.png';
import chocolateBarImage from 'figma:asset/ec66fc0183395d1076ffe034857af99c7d0109c7.png';
import mangoBarImage from 'figma:asset/1a70a9f56e446cc1013179ef01957b644c08881d.png';
import coconutBarImage from 'figma:asset/f9875d779be3ab63a9e500a394a6e0713aa59559.png';
import cloudBackground from 'figma:asset/b4e18fcb6ffa2fc057217513bd2967d915550824.png';

export default function About() {
  const sectionRef = useRef(null);
  const [isFixed, setIsFixed] = useState(false);
  const [sectionTop, setSectionTop] = useState(0);
  
  const { scrollY } = useScroll();

  // Calculate section position on mount and resize
  useEffect(() => {
    const updateSectionPosition = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        setSectionTop(rect.top + scrollTop);
      }
    };

    // Initial calculation
    updateSectionPosition();
    
    // Recalculate on resize
    window.addEventListener('resize', updateSectionPosition);
    
    // Also recalculate after a brief delay to account for layout changes
    const timer = setTimeout(updateSectionPosition, 100);
    
    return () => {
      window.removeEventListener('resize', updateSectionPosition);
      clearTimeout(timer);
    };
  }, []);

  // Monitor scroll position for fixed behavior
  useEffect(() => {
    const unsubscribe = scrollY.on("change", (latest) => {
      if (sectionTop === 0) return; // Wait for section position to be calculated
      
      const viewportHeight = window.innerHeight;
      const fixedScrollRange = viewportHeight * 0.20; // 20% of viewport height
      
      // Section should become fixed when its top reaches the viewport top
      const sectionReachesTop = latest >= sectionTop;
      
      // Section should stop being fixed after scrolling 20% of viewport height
      const withinFixedRange = latest <= (sectionTop + fixedScrollRange);
      
      // Set fixed state when section reaches top AND we're within the fixed range
      setIsFixed(sectionReachesTop && withinFixedRange);
    });

    return () => unsubscribe();
  }, [scrollY, sectionTop]);

  // Simple bounce animation
  const bounceAnimation = {
    y: [0, -20, 0],
    transition: {
      duration: 1.5,
      ease: "easeInOut",
      repeat: Infinity,
      repeatType: "loop"
    }
  };

  return (
    <>
      {/* Spacer when fixed - this maintains the document flow */}
      {isFixed && <div style={{ height: '100vh' }} />}
      
      <section 
        ref={sectionRef}
        id="about" 
        className={isFixed ? 'fixed inset-0 z-50' : 'relative'}
        style={{ 
          height: '100vh',
          backgroundColor: '#87CEEB',
          backgroundImage: `url(${cloudBackground})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          overflow: 'visible', // Allow animations to be visible outside bounds
          paddingTop: '40px', // Add padding for bounce and hover animations
          paddingBottom: '40px',
          paddingLeft: '30px', // Add horizontal padding for scaling effects
          paddingRight: '30px'
        }}
      >
        <div className="container mx-auto px-6 text-center" style={{ overflow: 'visible' }}>
          <h2 className="chewy-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-12 text-gray-900">
            Order Yours Now
          </h2>
          
          <div className="flex justify-center items-center gap-1 sm:gap-2 md:gap-4 mb-8" style={{ 
            overflow: 'visible',
            paddingTop: '35px', // Extra space for bounce and hover animations
            paddingBottom: '35px',
            paddingLeft: '20px', // Extra space for horizontal scaling
            paddingRight: '20px',
            minHeight: '140px', // Ensure minimum height for all animations
            zIndex: 10 // Ensure hover effects appear above other elements
          }}>
            <motion.img 
              src={proteinBarImage} 
              alt="KiTE Cookies & Cream Protein Bar" 
              className="w-32 sm:w-44 md:w-56 lg:w-64 xl:w-80 2xl:w-96 h-auto cursor-pointer hover:scale-110 transition-transform duration-300"
              animate={bounceAnimation}
              style={{ 
                position: 'relative',
                zIndex: 20,
                transformOrigin: 'center center'
              }}
            />
            <motion.img 
              src={chocolateBarImage} 
              alt="KiTE Double Chocolate Protein Bar" 
              className="w-32 sm:w-44 md:w-56 lg:w-64 xl:w-80 2xl:w-96 h-auto cursor-pointer hover:scale-110 transition-transform duration-300"
              animate={{
                ...bounceAnimation,
                transition: { ...bounceAnimation.transition, delay: 0.2 }
              }}
              style={{ 
                position: 'relative',
                zIndex: 20,
                transformOrigin: 'center center'
              }}
            />
            <motion.img 
              src={mangoBarImage} 
              alt="KiTE Alphonso Mango Protein Bar" 
              className="w-32 sm:w-44 md:w-56 lg:w-64 xl:w-80 2xl:w-96 h-auto cursor-pointer hover:scale-110 transition-transform duration-300"
              animate={{
                ...bounceAnimation,
                transition: { ...bounceAnimation.transition, delay: 0.4 }
              }}
              style={{ 
                position: 'relative',
                zIndex: 20,
                transformOrigin: 'center center'
              }}
            />
            <motion.img 
              src={coconutBarImage} 
              alt="KiTE Coconut Water Protein Bar" 
              className="w-32 sm:w-44 md:w-56 lg:w-64 xl:w-80 2xl:w-96 h-auto cursor-pointer hover:scale-110 transition-transform duration-300"
              animate={{
                ...bounceAnimation,
                transition: { ...bounceAnimation.transition, delay: 0.6 }
              }}
              style={{ 
                position: 'relative',
                zIndex: 20,
                transformOrigin: 'center center'
              }}
            />
          </div>
          
          {/* Cash On Delivery Available Text */}
          <div className="text-center mt-8">
            <p className="text-lg text-gray-800 font-medium font-chewy">
              Cash On Delivery Available
            </p>
          </div>

        </div>
        
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center">
          <motion.div className="mx-auto w-6 h-10 border-2 rounded-full relative border-gray-600">
            <motion.div
              className="absolute top-2 left-1/2 w-1 h-3 rounded-full transform -translate-x-1/2 bg-gray-700"
              animate={{
                y: [0, 12, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </motion.div>
        </div>
      </section>
    </>
  );
}