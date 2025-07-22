import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useRef, useState, useEffect, useCallback } from 'react';
import kiteImage from '../assets/placeholder.png';
import backgroundImage from '../assets/placeholder.png';

import updatedAlphonsoMangoProteinBarImage from '../assets/placeholder.png';
import updatedDoubleChocolateProteinBarImage from 'figma:asset/ec66fc0183395d1076ffe034857af99c7d0109c7.png';
import latestCookiesCreamProteinBarImage from 'figma:asset/1d13b2739e66c2304d0065a1647d6c2cf9b1ae9c.png';
import finalCoconutWaferProteinBarImage from 'figma:asset/f9875d779be3ab63a9e500a394a6e0713aa59559.png';
import coconutBackgroundImage from 'figma:asset/8baee99e3a34286ef33874180fa5c16e5d3e6be2.png';
import tropicalSunsetImage from 'figma:asset/eea57bc2975ad6a003928a2f8ad3d521deb2d396.png';
import cookieImage from 'figma:asset/eb64f6f2bad55387e45510aab52005195035f39e.png';
import oreoImage from 'figma:asset/7949148dbb43ce50d892e9030b5aa8a04d0ec1d3.png';
import mangoTreeImage from 'figma:asset/41376de3ff58593d01acd2a1c0f057afc40fc131.png';
import mangoImage from 'figma:asset/c7d68f44298e491f20795ea4cd67d122d65b079b.png';
// Sky background images for parallax effect
import skyLayer1 from 'figma:asset/b4732b970d2b8d78748c7f7b054a43e5de82f47e.png';
import skyLayer2 from 'figma:asset/b76b10373bba1aa44833b8c62d97af5a0a8a41b4.png';
// Gooey chocolate GIF from Shopify CDN
const chocolateBackgroundGif = 'https://cdn.shopify.com/s/files/1/0425/2699/8690/files/Gooey_Chocolate_Gifs_480x480.gif?v=1652814536';
import { Card, CardContent } from './ui/card';

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Hero positioning function with step logic - FASTER MOVEMENT
  const getHeroPosition = (progress: number) => {
    if (progress <= 0.1) {
      return '0px'; // Stay fixed at top until 10%
    } else if (progress <= 0.25) {
      // Fast exit: complete scroll movement by 25% instead of 100%
      const scrollDistance = ((progress - 0.1) / 0.15) * (window.innerHeight * 0.4);
      return `-${scrollDistance}px`;
    } else {
      // Fully scrolled away after 25%
      return `-${window.innerHeight * 0.4}px`;
    }
  };

  // State for managing word fade sequence
  const [fadeSequenceTriggered, setFadeSequenceTriggered] = useState(false);
  const [currentFadeIndex, setCurrentFadeIndex] = useState(-1);
  const [isReversing, setIsReversing] = useState(false);
  const [reverseIndex, setReverseIndex] = useState(-1);
  const [allWordsFaded, setAllWordsFaded] = useState(false);
  const [logoStartZoom, setLogoStartZoom] = useState(false);
  
  // Time for smooth background animation
  const [animationTime, setAnimationTime] = useState(0);

  // Carousel state management
  const [currentScrollProgress, setCurrentScrollProgress] = useState(0);
  
  // Dynamic background state based on centered carousel item
  const [activeCenterItem, setActiveCenterItem] = useState(0);

  // Text fades out BEFORE logo starts moving up (at 38-40% instead of 95%)
  const curvedTextOpacity = useTransform(scrollYProgress, [0, 0.38, 0.40], [1, 1, 0]);
  const soWeMadeOpacity = useTransform(scrollYProgress, [0, 0.02, 0.38, 0.40], [0, 1, 1, 0]);
  const textScale = useTransform(scrollYProgress, [0, 0.9, 1], [1, 1, 0.8]);
  
  // Brand value phrases display - impactful messaging
  const nutritionalInfo = [
    { value: "MORE", unit: "", period: "", label: "Protein." },
    { value: "LESS", unit: "", period: "", label: "Guilt." },
    { value: "PURE", unit: "", period: "", label: "Nutrition." }
  ];
  const fadeThreshold = 0.10; // 10% scroll progress triggers the sequence

  // Enhanced logo scaling phases - Updated to match exact requirements
  const logoScaleStart = 0.15; // Logo starts scaling at 15% scroll
  const logoScaleEnd = 0.35; // Logo reaches full size at 35% scroll
  const logoTransitionStart = 0.45; // Start logo transition at 45% scroll
  const logoTransitionMid = 0.65; // Logo reaches navbar position at 65% scroll
  const logoTransitionEnd = 1; // Logo stays in navbar until end

  // EXTENDED WHEEL CAROUSEL BREAKPOINTS
  const carouselSlideInStart = 0.60; // 60% - Carousel starts sliding up
  const carouselSlideInEnd = 0.65;   // 65% - Carousel reaches center
  const carouselFixedPeriod = 0.92;  // 92% - Carousel stays fixed until this point (extended for mango animations)
  const carouselSlideOutEnd = 0.95;   // 95% - Carousel finishes sliding out horizontally

  // UNIFIED LOGO SCALING - Single useTransform handles all phases consistently
  const logoScale = useTransform(
    scrollYProgress,
    [0, logoScaleStart, logoScaleEnd, logoTransitionStart, logoTransitionMid, logoTransitionEnd],
    [0.05, 0.1, 1, 1, 0.2, 0.2] // All phases in one transform
  );
  
  const logoY = useTransform(
    scrollYProgress, 
    [logoTransitionStart, logoTransitionMid], 
    [0, -320] // Move up to navbar level, adjusted for header height
  );
  
  const logoX = useTransform(
    scrollYProgress, 
    [logoTransitionStart, logoTransitionMid], 
    [0, 0] // Keep centered horizontally - the header space is already centered
  );
  
  // Logo opacity - appears when logoStartZoom is true, fades at end
  const logoBaseOpacity = useTransform(
    scrollYProgress, 
    [logoTransitionStart, logoTransitionEnd, 0.95], 
    [1, 1, 0]
  );

  // EXTENDED WHEEL CAROUSEL DATA - 4 items for wheel effect (no background themes)
  const carouselItems = [
    {
      title: "COCONUT WATER",
      description: "Refreshing coconut water flavor with all the protein you need",
      image: finalCoconutWaferProteinBarImage,
      accent: "pink",
      highlight: "COCONUT"
    },
    {
      title: "DOUBLE CHOCOLATE",
      description: "Rich chocolate flavor without compromising your nutrition goals",
      image: updatedDoubleChocolateProteinBarImage,
      accent: "light-purple",
      highlight: "CHOCOLATE"
    },
    {
      title: "COOKIES & CREAM",
      description: "Indulgent cookies and cream flavor with all the protein you need",
      image: latestCookiesCreamProteinBarImage,
      accent: "blue",
      highlight: "COOKIES"
    },
    {
      title: "ALPHONSO MANGO",
      description: "Premium Alphonso mango flavor with authentic tropical taste",
      image: updatedAlphonsoMangoProteinBarImage,
      accent: "orange",
      highlight: "ALPHONSO"
    }
  ];

  // Function to determine which item is currently in center
  const getCenterItemIndex = (offset: number) => {
    const itemSpacing = 1200; // Updated to match new spacing
    const centerOffset = offset / itemSpacing;
    return Math.round(centerOffset) % carouselItems.length;
  };

  // No dynamic background themes - clean slate

  // EXTENDED WHEEL HORIZONTAL SCROLLING CALCULATIONS WITH EXTENDED HOLD FOR ALL FLAVORS - Calculate first
  const getScrollOffset = (progress: number) => {
    if (progress < carouselSlideInEnd) {
      return 0; // No scrolling when not in active scrolling period
    }
    
    if (progress < carouselFixedPeriod) {
      // ENHANCED SCROLLING PHASE (65-92%) with EXTENDED hold periods for ALL flavors
      const scrollingProgress = (progress - carouselSlideInEnd) / (carouselFixedPeriod - carouselSlideInEnd);
      const totalScrollRange = carouselFixedPeriod - carouselSlideInEnd; // 27% total scroll range
      const itemSpacing = 1200; // 1200px spacing between items
      const totalItems = carouselItems.length; // 4 items
      
      // EXTENDED HOLD PERIODS FOR EACH FLAVOR: Each gets 6.5% hold + 0.25% transition
      const flavorHoldDuration = 0.065; // 6.5% hold period for each flavor 
      const transitionDuration = 0.0025; // 0.25% transition period between flavors
      const segmentDuration = flavorHoldDuration + transitionDuration; // 6.75% per flavor
      
      // Calculate total progress in scroll range
      const totalProgress = scrollingProgress * totalScrollRange;
      
      // Determine which flavor segment we're in
      const currentFlavorIndex = Math.floor(totalProgress / segmentDuration);
      const segmentProgress = (totalProgress % segmentDuration);
      
      // Check if we're within a valid flavor range
      if (currentFlavorIndex >= totalItems) {
        // Beyond all flavors, return final position
        return (totalItems - 1) * itemSpacing;
      }
      
      if (segmentProgress <= flavorHoldDuration) {
        // HOLD PHASE: Keep current flavor centered
        return currentFlavorIndex * itemSpacing;
      } else {
        // TRANSITION PHASE: Move to next flavor
        const transitionProgress = (segmentProgress - flavorHoldDuration) / transitionDuration;
        const startOffset = currentFlavorIndex * itemSpacing;
        const endOffset = Math.min((currentFlavorIndex + 1) * itemSpacing, (totalItems - 1) * itemSpacing);
        return startOffset + (transitionProgress * (endOffset - startOffset));
      }
    } else {
      // WHEEL EXIT PHASE (92-95%): Continue scrolling to move everything off-screen
      const exitProgress = (progress - carouselFixedPeriod) / (carouselSlideOutEnd - carouselFixedPeriod);
      const normalScrollWidth = (carouselItems.length - 1) * 1200; // Updated spacing
      const additionalExitScroll = carouselItems.length * 1200; // Extra scroll with new spacing
      return normalScrollWidth + (exitProgress * additionalExitScroll);
    }
  };

  // Determine carousel visibility and animation state
  const getCarouselVisibility = (progress: number, offset: number) => {
    // Hide carousel when scroll offset reaches 5400px (updated for new spacing: 1200px * 4.5)
    if (offset >= 5400) return { show: false, state: 'gone' };
    
    if (progress < carouselSlideInStart) return { show: false, state: 'hidden' };
    if (progress < carouselSlideInEnd) return { show: true, state: 'sliding-in' };
    if (progress < carouselFixedPeriod) return { show: true, state: 'fixed-scrolling' };
    if (progress < carouselSlideOutEnd) return { show: true, state: 'wheel-exit' };
    return { show: false, state: 'gone' };
  };

  const scrollOffset = getScrollOffset(currentScrollProgress);
  const carouselVisibility = getCarouselVisibility(currentScrollProgress, scrollOffset);

  // Helper function to determine if we're in hold phase for debugging
  const getHoldPhaseInfo = (progress: number) => {
    if (progress < carouselSlideInEnd || progress >= carouselFixedPeriod) {
      return { inHoldPhase: false, currentItem: 0, phaseProgress: 0 };
    }
    
    const scrollingProgress = (progress - carouselSlideInEnd) / (carouselFixedPeriod - carouselSlideInEnd);
    const totalScrollRange = carouselFixedPeriod - carouselSlideInEnd;
    const totalProgress = scrollingProgress * totalScrollRange;
    
    // ALL FLAVORS GET EXTENDED HOLD PERIODS
    const flavorHoldDuration = 0.065; // 6.5% hold period for each flavor
    const transitionDuration = 0.0025; // 0.25% transition period between flavors
    const segmentDuration = flavorHoldDuration + transitionDuration; // 6.75% per flavor
    
    const currentFlavorIndex = Math.floor(totalProgress / segmentDuration);
    const segmentProgress = (totalProgress % segmentDuration);
    
    if (currentFlavorIndex >= carouselItems.length) {
      return {
        inHoldPhase: false,
        currentItem: carouselItems.length - 1,
        phaseProgress: 100
      };
    }
    
    const isInHoldPhase = segmentProgress <= flavorHoldDuration;
    const phaseProgress = isInHoldPhase 
      ? Math.round((segmentProgress / flavorHoldDuration) * 100)
      : Math.round(((segmentProgress - flavorHoldDuration) / transitionDuration) * 100);
    
    return {
      inHoldPhase: isInHoldPhase,
      currentItem: currentFlavorIndex,
      phaseProgress: phaseProgress
    };
  };

  const holdPhaseInfo = getHoldPhaseInfo(currentScrollProgress);

  // Advanced hover detection using pixel-perfect collision detection
  const useOptimizedImageHover = () => {
    const [hoveredItems, setHoveredItems] = useState<{[key: number]: boolean}>({});
    const [imageData, setImageData] = useState<{[key: number]: ImageData | null}>({});
    const throttleTimeouts = useRef<{[key: number]: NodeJS.Timeout}>({});
    const canvasCache = useRef<{[key: number]: HTMLCanvasElement}>({});
    
    // Create canvas and extract image data for pixel-perfect detection
    const createImageData = useCallback((img: HTMLImageElement, index: number) => {
      if (canvasCache.current[index]) return;
      
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      
      canvas.width = img.naturalWidth || img.width;
      canvas.height = img.naturalHeight || img.height;
      
      // Draw the image to canvas
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      
      try {
        // Get the image data for pixel analysis
        const data = ctx.getImageData(0, 0, canvas.width, canvas.height);
        setImageData(prev => ({ ...prev, [index]: data }));
        canvasCache.current[index] = canvas;
      } catch (error) {
        console.warn('Cannot access image data for pixel detection, falling back to geometry');
        setImageData(prev => ({ ...prev, [index]: null }));
      }
    }, []);
    
    // Pixel-perfect detection for protein bar visibility
    const isOverProteinBar = useCallback((img: HTMLImageElement, clientX: number, clientY: number, index: number) => {
      const rect = img.getBoundingClientRect();
      const x = clientX - rect.left;
      const y = clientY - rect.top;
      
      // Convert to relative coordinates (0-1)
      const relativeX = x / rect.width;
      const relativeY = y / rect.height;
      
      // First check if we're within the image bounds
      if (relativeX < 0 || relativeX > 1 || relativeY < 0 || relativeY > 1) {
        return false;
      }
      
      // Get the cached image data
      const data = imageData[index];
      
      if (data) {
        // Pixel-perfect detection using canvas image data
        const pixelX = Math.floor(relativeX * data.width);
        const pixelY = Math.floor(relativeY * data.height);
        
        // Get the pixel data at this position
        const pixelIndex = (pixelY * data.width + pixelX) * 4;
        const alpha = data.data[pixelIndex + 3]; // Alpha channel
        
        // Consider pixel visible if alpha > threshold (not transparent)
        const alphaThreshold = 50; // Adjust this value to fine-tune sensitivity
        return alpha > alphaThreshold;
      } else {
        // Fallback to improved geometric detection if canvas fails
        // Create a more accurate protein bar shape detection
        const centerX = 0.5;
        const centerY = 0.5;
        
        // Distance from center
        const distanceFromCenterX = Math.abs(relativeX - centerX);
        const distanceFromCenterY = Math.abs(relativeY - centerY);
        
        // Create an elliptical detection area that better matches protein bar shape
        const xRadius = 0.35; // Horizontal radius (protein bars are wider)
        const yRadius = 0.25; // Vertical radius (protein bars are shorter)
        
        // Elliptical equation: (x/a)² + (y/b)² <= 1
        const ellipseValue = Math.pow(distanceFromCenterX / xRadius, 2) + Math.pow(distanceFromCenterY / yRadius, 2);
        
        return ellipseValue <= 1;
      }
    }, [imageData]);
    
    const handleMouseMove = useCallback((e: MouseEvent, img: HTMLImageElement, index: number) => {
      // Create image data if not already created
      if (!imageData[index] && !canvasCache.current[index]) {
        createImageData(img, index);
      }
      
      // Throttle the detection for performance
      if (throttleTimeouts.current[index]) {
        clearTimeout(throttleTimeouts.current[index]);
      }
      
      throttleTimeouts.current[index] = setTimeout(() => {
        const isOver = isOverProteinBar(img, e.clientX, e.clientY, index);
        setHoveredItems(prev => {
          if (prev[index] !== isOver) {
            return { ...prev, [index]: isOver };
          }
          return prev;
        });
      }, 16); // ~60fps throttling
    }, [isOverProteinBar, imageData, createImageData]);
    
    const handleMouseLeave = useCallback((index: number) => {
      if (throttleTimeouts.current[index]) {
        clearTimeout(throttleTimeouts.current[index]);
      }
      setHoveredItems(prev => ({
        ...prev,
        [index]: false
      }));
    }, []);
    
    return { hoveredItems, handleMouseMove, handleMouseLeave };
  };
  
  const { hoveredItems, handleMouseMove, handleMouseLeave } = useOptimizedImageHover();

  // Calculate scroll progress within any flavor slide for badge animations
  const getFlavorSlideProgress = (flavorIndex: number) => {
    if (!carouselVisibility.show || currentScrollProgress < carouselSlideInEnd || activeCenterItem !== flavorIndex) {
      return 0;
    }
    
    // Calculate progress during the time this flavor is centered
    const scrollingProgress = (currentScrollProgress - carouselSlideInEnd) / (carouselFixedPeriod - carouselSlideInEnd);
    const totalScrollRange = carouselFixedPeriod - carouselSlideInEnd; // 27% total scroll range
    const flavorHoldDuration = 0.065; // 6.5% hold period for each flavor
    const transitionDuration = 0.0025; // 0.25% transition period between flavors
    const segmentDuration = flavorHoldDuration + transitionDuration; // 6.75% per flavor
    
    const totalProgress = scrollingProgress * totalScrollRange;
    const flavorStart = flavorIndex * segmentDuration;
    const flavorEnd = flavorStart + flavorHoldDuration;
    
    if (totalProgress >= flavorStart && totalProgress <= flavorEnd) {
      return (totalProgress - flavorStart) / flavorHoldDuration;
    } else if (totalProgress > flavorEnd) {
      return 1; // Fully progressed
    }
    
    return 0;
  };

  // Get progress for each flavor
  const coconutSlideProgress = getFlavorSlideProgress(0);
  const chocolateSlideProgress = getFlavorSlideProgress(1);
  const cookiesSlideProgress = getFlavorSlideProgress(2);
  const mangoSlideProgress = getFlavorSlideProgress(3);

  // SKY BACKGROUND PARALLAX ANIMATION - Active for first 60% of scroll until carousel
  const skyBackgroundOpacity = useTransform(scrollYProgress, [0, 0.05, 0.58, 0.6], [1, 1, 1, 0]);
  // Layer 1 (background) - slower movement for depth
  const skyLayer1Y = useTransform(scrollYProgress, [0, 0.6], [0, -400]); 
  // Layer 2 (foreground) - much faster movement for dramatic parallax effect
  const skyLayer2Y = useTransform(scrollYProgress, [0, 0.6], [0, -1000]); 

  // SCROLL-BASED FLOATING IMAGE ANIMATIONS
  // Coconut Water floating images (65.0% → 71.5%)
  const coconutImagesOpacity = useTransform(scrollYProgress, [0.63, 0.65, 0.67, 0.715], [0, 0, 1, 1]);
  const coconutImagesY = useTransform(scrollYProgress, [0.63, 0.65, 0.67], [50, 30, 0]);
  const coconutImagesScale = useTransform(scrollYProgress, [0.63, 0.65, 0.67], [0.8, 0.9, 1]);

  // Double Chocolate floating images (71.75% → 78.25%)
  const chocolateImagesOpacity = useTransform(scrollYProgress, [0.715, 0.7175, 0.735, 0.7825], [0, 0, 1, 1]);
  const chocolateImagesY = useTransform(scrollYProgress, [0.715, 0.7175, 0.735], [50, 30, 0]);
  const chocolateImagesScale = useTransform(scrollYProgress, [0.715, 0.7175, 0.735], [0.8, 0.9, 1]);

  // Cookies & Cream floating images (78.5% → 85.0%)
  const cookiesImagesOpacity = useTransform(scrollYProgress, [0.7825, 0.785, 0.8, 0.85], [0, 0, 1, 1]);
  const cookiesImagesY = useTransform(scrollYProgress, [0.7825, 0.785, 0.8], [50, 30, 0]);
  const cookiesImagesScale = useTransform(scrollYProgress, [0.7825, 0.785, 0.8], [0.8, 0.9, 1]);

  // Alphonso Mango floating images (85.25% → 91.75%)
  const mangoImagesOpacity = useTransform(scrollYProgress, [0.85, 0.8525, 0.87, 0.9175], [0, 0, 1, 1]);
  const mangoImagesY = useTransform(scrollYProgress, [0.85, 0.8525, 0.87], [50, 30, 0]);
  const mangoImagesScale = useTransform(scrollYProgress, [0.85, 0.8525, 0.87], [0.8, 0.9, 1]);

  // SCROLL TRACKING WITH CENTER ITEM DETECTION
  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (progress) => {
      setCurrentScrollProgress(progress);
      
      // Update active center item when carousel is visible and scrolling
      if (carouselVisibility.show && progress >= carouselSlideInEnd && progress <= carouselFixedPeriod) {
        const centerIndex = getCenterItemIndex(scrollOffset);
        if (centerIndex !== activeCenterItem) {
          setActiveCenterItem(centerIndex);
        }
      }
    });

    return unsubscribe;
  }, [scrollYProgress, carouselVisibility.show, scrollOffset, activeCenterItem, carouselSlideInEnd, carouselFixedPeriod]);

  // Animation time tracking for smooth background float
  useEffect(() => {
    let animationFrame: number;
    
    const updateTime = () => {
      setAnimationTime(Date.now() * 0.001); // Convert to seconds
      animationFrame = requestAnimationFrame(updateTime);
    };
    
    if (carouselVisibility.show) {
      updateTime();
    }
    
    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [carouselVisibility.show]);

  // Calculate carousel animation values - UPDATED FOR HORIZONTAL WHEEL EXIT AND LOWER POSITIONING
  const getCarouselStyle = (progress: number) => {
    if (progress < carouselSlideInStart) {
      return { 
        transform: 'translateY(100vh) scale(0.6)', 
        opacity: 0
      };
    }
    if (progress < carouselSlideInEnd) {
      const slideProgress = (progress - carouselSlideInStart) / (carouselSlideInEnd - carouselSlideInStart);
      // ADJUSTED: Move carousel to lower position (was 100vh, now 80vh from bottom)
      return { 
        transform: `translateY(${80 - (slideProgress * 80)}vh) scale(${0.6 + (slideProgress * 0.4)})`, 
        opacity: slideProgress
      };
    }
    if (progress < carouselFixedPeriod) {
      return { 
        transform: 'translateY(0) scale(1)', 
        opacity: 1
      };
    }
    if (progress < carouselSlideOutEnd) {
      // WHEEL EXIT: Instead of moving up, keep position and let items scroll horizontally
      return { 
        transform: 'translateY(0) scale(1)', 
        opacity: 1
      };
    }
    return { 
      transform: 'translateY(0) scale(0.8)', 
      opacity: 0
    };
  };

  const carouselStyle = getCarouselStyle(currentScrollProgress);



  // Calculate curved bump position for each item - ENHANCED WHEEL EFFECT
  const getBumpPosition = (index: number, offset: number) => {
    const totalItems = carouselItems.length;
    const itemSpacing = 1200; // Increased spacing for single item visibility (was 400)
    const centerIndex = 0; // Start with first item at center, then scroll left
    
    // Calculate horizontal position
    const x = (index - centerIndex) * itemSpacing - offset;
    
    // Calculate curved bump height using a more dramatic parabolic function for wheel effect
    const screenCenterX = 0; // Center of screen
    const distanceFromScreenCenter = Math.abs((x - screenCenterX) / itemSpacing);
    const maxBumpHeight = 120; // Increased height for more dramatic parabolic effect
    
    // More dramatic parabolic curve with steeper wheel-like curvature
    const bumpHeight = Math.max(0, maxBumpHeight - (distanceFromScreenCenter * distanceFromScreenCenter * 60));
    const y = -bumpHeight; // Negative because we want items higher (up on screen)
    
    // Calculate scale based on position (center items much larger) - Wheel effect
    const scale = Math.max(0.2, 1.8 - (distanceFromScreenCenter * 0.6)); // More dramatic scaling
    
    // Calculate opacity based on distance from center - Single item visibility
    const opacity = Math.max(0.0, 1 - (distanceFromScreenCenter * 0.8)); // More aggressive fade
    
    // Calculate z-index based on distance from center
    const zIndex = Math.round((3 - distanceFromScreenCenter) * 10);
    
    // Enhanced rotation for wheel effect - adjusted for single item view
    const rotation = (x / itemSpacing) * 12; // Reduced rotation for single item focus
    
    // Add perspective tilt for 3D wheel effect - more subtle for single items
    const tilt = (x / itemSpacing) * 15; // Reduced perspective tilt
    
    return {
      x,
      y,
      scale,
      opacity,
      zIndex,
      rotation,
      tilt
    };
  };

  // REMOVED: #AsLiteAsKite hashtag text - no longer displayed

  const soWeMadeY = useTransform(
    scrollYProgress,
    [0, logoScaleStart, logoScaleEnd, logoTransitionStart, logoTransitionMid],
    [
      allWordsFaded ? -5 : 20,   // Almost touching initial gap fill
      allWordsFaded ? -5 : 20,   // Stay extremely close when logo is small
      allWordsFaded ? 120 : 20,  // Adequate space below large logo
      allWordsFaded ? 120 : 20,  // Maintain position against logo
      allWordsFaded ? -3 : 20    // Barely any space when logo goes to navbar
    ]
  );



  // Monitor scroll to trigger fade sequence or reverse
  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (progress) => {
      if (progress >= fadeThreshold && !fadeSequenceTriggered && !isReversing) {
        // Forward sequence: scroll down past threshold
        setFadeSequenceTriggered(true);
        setIsReversing(false);
        setAllWordsFaded(false);
        setLogoStartZoom(false);
        setTimeout(() => setCurrentFadeIndex(0), 81); // First word fades after 81ms
      } else if (progress < fadeThreshold && fadeSequenceTriggered && !isReversing) {
        // Reverse sequence: scroll back up below threshold
        setIsReversing(true);
        setFadeSequenceTriggered(false);
        setAllWordsFaded(false);
        setLogoStartZoom(false);
        // Start reverse from the last faded word
        const lastFadedIndex = Math.max(0, currentFadeIndex);
        setReverseIndex(lastFadedIndex);
        setTimeout(() => {
          if (lastFadedIndex >= 0) {
            setReverseIndex(lastFadedIndex - 1);
          }
        }, 81);
      }
    });

    return unsubscribe;
  }, [scrollYProgress, fadeSequenceTriggered, isReversing, currentFadeIndex, fadeThreshold]);

  // Handle automatic nutritional info fading sequence (forward) - simplified for static display
  useEffect(() => {
    if (fadeSequenceTriggered && !isReversing) {
      // Start logo zoom immediately since we're not doing word-by-word fading
      const logoTimer = setTimeout(() => {
        setLogoStartZoom(true);
      }, 40);
      
      // All content has faded, complete the sequence
      const completeTimer = setTimeout(() => {
        setAllWordsFaded(true);
      }, 200);
      
      return () => {
        clearTimeout(logoTimer);
        clearTimeout(completeTimer);
      };
    }
  }, [fadeSequenceTriggered, isReversing]);

  // Handle reverse word appearing sequence
  useEffect(() => {
    if (isReversing && reverseIndex >= 0) {
      const timer = setTimeout(() => {
        if (reverseIndex > 0) {
          setReverseIndex(reverseIndex - 1);
        } else {
          // Reverse sequence complete, reset all states
          setIsReversing(false);
          setCurrentFadeIndex(-1);
          setReverseIndex(-1);
          setAllWordsFaded(false);
          setLogoStartZoom(false);
        }
      }, 60); // 60ms delay between each word reappear

      return () => clearTimeout(timer);
    }
  }, [reverseIndex, isReversing]);

  // Nutritional info is displayed as a static grid - no individual fading needed

  // Determine which text to show
  const showHealthyBars = logoStartZoom || allWordsFaded;
  
  // Logo appears in middle and fades before text
  const daglowLogoOpacity = useTransform(scrollYProgress, [0.3, 0.5, 0.8, 0.9], [0, 1, 1, 0]);
  const daglowLogoScale = useTransform(scrollYProgress, [0.3, 0.5, 0.8], [0, 1, 1.2]);
  const daglowLogoY = useTransform(scrollYProgress, [0.5, 0.85], [0, -400]);
  
  // Clean element appears at the very end
  const cleanElementScale = useTransform(scrollYProgress, [0.95, 1], [0, 1.2]);
  const cleanElementY = useTransform(scrollYProgress, [0.95, 1], [300, -150]);
  const cleanElementOpacity = useTransform(scrollYProgress, [0.95, 0.98, 1], [0, 0.9, 1]);

  // Animation variants for clean text transitions
  const textVariants = {
    initial: {
      opacity: 0,
      scale: 0.9,
      y: 15,
      rotateX: -10
    },
    animate: {
      opacity: 1,
      scale: 1,
      y: 0,
      rotateX: 0,
      transition: {
        duration: 0.6,
        ease: [0.4, 0, 0.2, 1],
        staggerChildren: 0.08
      }
    },
    exit: {
      opacity: 0,
      scale: 1.05,
      y: -15,
      rotateX: 10,
      transition: {
        duration: 0.5,
        ease: [0.4, 0, 1, 1]
      }
    }
  };

  // Simple variant for non-animated text
  const staticTextVariants = {
    initial: {
      opacity: 0
    },
    animate: {
      opacity: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.4,
        ease: "easeIn"
      }
    }
  };

  const letterVariants = {
    initial: {
      opacity: 0,
      y: 15,
      scale: 0.9
    },
    animate: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.35,
        ease: [0.4, 0, 0.2, 1]
      }
    },
    exit: {
      opacity: 0,
      y: -15,
      scale: 1.1,
      transition: {
        duration: 0.25,
        ease: [0.4, 0, 1, 1]
      }
    }
  };

  const getAccentColor = (accent: string) => {
    switch (accent) {
      case 'green':
        return 'border-green-500/30 bg-green-50/80';
      case 'emerald':
        return 'border-emerald-500/30 bg-emerald-50/80';
      case 'teal':
        return 'border-teal-500/30 bg-teal-50/80';
      case 'blue':
        return 'border-blue-500/30 bg-blue-50/80';
      case 'purple':
        return 'border-purple-500/30 bg-purple-50/80';
      case 'light-purple':
        return 'border-purple-300/30 bg-purple-100/80'; // Light purple styling
      case 'indigo':
        return 'border-indigo-500/30 bg-indigo-50/80';
      case 'pink':
        return 'border-pink-500/30 bg-pink-50/80';
      case 'orange':
        return 'border-orange-500/30 bg-orange-50/80';
      default:
        return 'border-green-500/30 bg-green-50/80';
    }
  };

  const getAccentGlow = (accent: string) => {
    switch (accent) {
      case 'green':
        return 'shadow-green-500/15';
      case 'emerald':
        return 'shadow-emerald-500/15';
      case 'teal':
        return 'shadow-teal-500/15';
      case 'blue':
        return 'shadow-blue-500/15';
      case 'purple':
        return 'shadow-purple-500/15';
      case 'light-purple':
        return 'shadow-purple-300/15'; // Light purple glow
      case 'indigo':
        return 'shadow-indigo-500/15';
      case 'pink':
        return 'shadow-pink-500/15';
      case 'orange':
        return 'shadow-orange-500/15';
      default:
        return 'shadow-green-500/15';
    }
  };

  const getHighlightColor = (accent: string) => {
    switch (accent) {
      case 'green':
        return 'text-green-600 bg-green-100';
      case 'emerald':
        return 'text-emerald-600 bg-emerald-100';
      case 'teal':
        return 'text-teal-600 bg-teal-100';
      case 'blue':
        return 'text-blue-600 bg-blue-100';
      case 'purple':
        return 'text-purple-600 bg-purple-100';
      case 'light-purple':
        return 'text-purple-500 bg-purple-50'; // Light purple highlight
      case 'indigo':
        return 'text-indigo-600 bg-indigo-100';
      case 'pink':
        return 'text-pink-600 bg-pink-100';
      case 'orange':
        return 'text-orange-600 bg-orange-100';
      default:
        return 'text-green-600 bg-green-100';
    }
  };

  // Get background color based on active carousel item
  const getBackgroundColor = () => {
    if (carouselVisibility.show && currentScrollProgress >= carouselSlideInEnd) {
      switch (activeCenterItem) {
        case 0: // Coconut Water
          return '#c8956d'; // Warm brown
        case 1: // Double Chocolate
          return '#ba94cb'; // Light purple (changed from dark chocolate brown)
        case 2: // Cookies & Cream
          return '#B0E0E6'; // Light powder blue
        case 3: // Alphonso Mango
          return '#FFF066'; // Lighter mango yellow
        default:
          return '#B0E0E6';
      }
    }
    return '#B0E0E6'; // Default light powder blue background
  };

  return (
    <motion.div 
      ref={containerRef} 
      className="relative h-[1500vh] overflow-hidden"
      style={{
        backgroundColor: getBackgroundColor()
      }}
      animate={{
        backgroundColor: getBackgroundColor()
      }}
      transition={{
        duration: 1.2,
        ease: "easeInOut"
      }}
    >

      {/* SKY BACKGROUND LAYERS - PARALLAX EFFECT (0% to 60% scroll until carousel) */}
      <AnimatePresence>
        {currentScrollProgress < 0.6 && (
          <motion.div
            className="fixed inset-0 z-0 pointer-events-none"
            style={{ opacity: skyBackgroundOpacity }}
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          >
            {/* Background Sky Layer (slower movement) - Orange Sunset Sky */}
            <motion.div
              className="absolute w-full"
              style={{
                y: skyLayer1Y,
                top: '-50vh',
                height: '250vh',
                backgroundImage: `url(${skyLayer1})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center center',
                backgroundRepeat: 'no-repeat',
                opacity: 1
              }}
            />
            
            {/* Foreground Sky Layer (faster movement for parallax) - Blue Sky with Clouds */}
            <motion.div
              className="absolute w-full"
              style={{
                y: skyLayer2Y,
                top: '-50vh',
                height: '250vh',
                backgroundImage: `url(${skyLayer2})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center center',
                backgroundRepeat: 'no-repeat',
                opacity: 0.75,
                mixBlendMode: 'normal',
                maskImage: 'linear-gradient(to bottom, black 0%, black 60%, transparent 100%)',
                WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 60%, transparent 100%)'
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
      {/* Scrolling Content Container */}
      <motion.div 
        className="fixed top-0 left-0 w-full h-[40vh] bg-cover bg-center bg-no-repeat z-10 pointer-events-none"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundPosition: `${50 + (scrollOffset * 0.02) + (carouselVisibility.show ? Math.sin(animationTime * 0.5) * 3 : 0)}% ${80 + (carouselVisibility.show ? Math.cos(animationTime * 0.3) * 2 : 0)}%`,
          backgroundSize: 'cover',
          top: getHeroPosition(currentScrollProgress)
        }}
        animate={{
          // Enhanced floating animation when carousel is active
          x: carouselVisibility.show ? [0, 15, -10, 8, 0] : 0,
          y: carouselVisibility.show ? [0, -8, 5, -3, 0] : 0,
          scale: carouselVisibility.show ? [1, 1.015, 0.985, 1.008, 1] : 1,
          rotateZ: carouselVisibility.show ? [0, 0.5, -0.3, 0.2, 0] : 0,
        }}
        transition={{
          duration: carouselVisibility.show ? 8 : 0,
          repeat: carouselVisibility.show ? Infinity : 0,
          ease: "easeInOut",
          repeatType: "loop"
        }}
      >

        {/* Logo animation - positioned within scrolling background */}
        <motion.div
          style={{ 
            opacity: daglowLogoOpacity,
            scale: daglowLogoScale, 
            y: daglowLogoY 
          }}
          className="absolute inset-0 flex items-center justify-center z-5 pointer-events-none"
        >
          <div className="flex flex-col items-center space-y-4 pointer-events-auto z-[100]" style={{ pointerEvents: 'auto', zIndex: 100 }}>
            {/* Dedicated div for #LeanCleanProtein SVG text (logo phase) */}
            <div className="pointer-events-auto z-[100] relative" style={{ pointerEvents: 'auto', zIndex: 100 }}>
              <svg viewBox="0 0 400 100" className="w-80 h-20 pointer-events-auto cursor-pointer z-[100]" style={{ pointerEvents: 'auto', zIndex: 100 }}>
                <defs>
                  <path id="curve2" d="M 50 80 Q 200 20 350 80" />
                </defs>

              </svg>
            </div>




          </div>
        </motion.div>

        {/* Clean element appears at the very end */}
        <motion.div
          style={{ 
            scale: cleanElementScale, 
            y: cleanElementY,
            opacity: cleanElementOpacity
          }}
          className="absolute bottom-0 left-1/2 transform -translate-x-1/2 z-30 pointer-events-none"
        >
          <motion.div 
            className="w-[120vw] h-[120vw] max-w-[800px] max-h-[800px] bg-gradient-radial from-green-50 via-emerald-50 to-transparent rounded-full"
            style={{
              backgroundImage: 'radial-gradient(circle, rgba(240, 253, 244, 0.8) 0%, rgba(236, 253, 245, 0.6) 50%, transparent 100%)'
            }}
            animate={{ 
              boxShadow: [
                "0 0 50px rgba(34, 197, 94, 0.1)",
                "0 0 80px rgba(16, 185, 129, 0.15)",
                "0 0 100px rgba(20, 184, 166, 0.1)",
                "0 0 50px rgba(34, 197, 94, 0.1)"
              ]
            }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </motion.div>

      {/* Flavor-Specific Background Overlays - Full Screen */}
      <AnimatePresence>
        {carouselVisibility.show && currentScrollProgress >= carouselSlideInEnd && (
          <>
            {/* Coconut Water - Tropical Sunset Background */}
            {activeCenterItem === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.05 }}
                exit={{ opacity: 0 }}
                transition={{ opacity: { duration: 2.0, ease: "easeInOut" } }}
                className="fixed inset-0 z-1 pointer-events-none"
              >
                <div
                  className="w-full h-full bg-cover bg-center bg-no-repeat"
                  style={{
                    backgroundImage: `url(${tropicalSunsetImage})`,
                    backgroundPosition: 'center center',
                    backgroundSize: 'cover'
                  }}
                />
              </motion.div>
            )}
            
            {/* Double Chocolate - Light Purple with Scroll-Controlled Chocolate Animation */}
            {activeCenterItem === 1 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ opacity: { duration: 2.0, ease: "easeInOut" } }}
                className="fixed inset-0 z-1 pointer-events-none"
              >
                {/* Scroll-controlled chocolate animation */}
                <div
                  className="absolute inset-0 w-full h-full"
                  style={{
                    backgroundImage: `url(${chocolateBackgroundGif})`,
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: `${50 + (currentScrollProgress * 30)}% ${50 + (currentScrollProgress * 20)}%`,
                    opacity: 0.10,
                    zIndex: 1,
                    transform: `scale(${1 + (currentScrollProgress * 0.1)}) rotate(${currentScrollProgress * 2}deg)`
                  }}
                />
                
                {/* Additional flowing chocolate layers for enhanced scroll effect */}
                <motion.div
                  className="absolute inset-0 w-full h-full"
                  style={{
                    backgroundImage: `radial-gradient(
                      ellipse at ${30 + (currentScrollProgress * 40)}% ${40 + (currentScrollProgress * 30)}%, 
                      rgba(139, 94, 175, 0.15) 0%, 
                      rgba(156, 120, 175, 0.1) 40%, 
                      transparent 70%
                    )`,
                    zIndex: 2
                  }}
                  animate={{
                    opacity: [0.3, 0.6, 0.3],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{
                    opacity: { duration: 6, repeat: Infinity, ease: "easeInOut" },
                    scale: { duration: 8, repeat: Infinity, ease: "easeInOut" }
                  }}
                />
                
                {/* Light purple overlay with scroll-responsive positioning */}
                <div
                  className="absolute inset-0 w-full h-full"
                  style={{
                    backgroundImage: `radial-gradient(
                      ellipse at ${50 + (currentScrollProgress * 20)}% ${50 + (currentScrollProgress * 15)}%, 
                      rgba(186, 148, 203, 0.4) 0%, 
                      rgba(156, 120, 175, 0.3) 50%, 
                      rgba(139, 94, 175, 0.2) 100%
                    )`,
                    backgroundSize: '150% 150%',
                    zIndex: 3,
                    mixBlendMode: 'multiply'
                  }}
                />
              </motion.div>
            )}
            
            {/* Cookies & Cream - Soft Vanilla Swirl */}
            {activeCenterItem === 2 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.06 }}
                exit={{ opacity: 0 }}
                transition={{ opacity: { duration: 2.0, ease: "easeInOut" } }}
                className="fixed inset-0 z-1 pointer-events-none"
              >
                <div
                  className="w-full h-full"
                  style={{
                    backgroundImage: 'linear-gradient(45deg, rgba(255, 248, 220, 0.4) 0%, rgba(245, 245, 220, 0.3) 25%, rgba(255, 255, 255, 0.2) 50%, rgba(245, 245, 220, 0.3) 75%, rgba(255, 248, 220, 0.4) 100%)',
                    backgroundSize: '400% 400%'
                  }}
                />
              </motion.div>
            )}
            
            {/* Alphonso Mango - Mango Tree Background */}
            {activeCenterItem === 3 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ opacity: { duration: 2.0, ease: "easeInOut" } }}
                className="fixed inset-0 z-1 pointer-events-none"
              >
                {/* Mango tree background image */}
                <div
                  className="absolute inset-0 w-full h-full"
                  style={{
                    backgroundImage: `url(${mangoTreeImage})`,
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center center',
                    opacity: 0.05,
                    zIndex: 1
                  }}
                />
                
                {/* Mango yellow gradient overlay */}
                <div
                  className="absolute inset-0 w-full h-full"
                  style={{
                    backgroundImage: 'radial-gradient(circle at 30% 70%, rgba(255, 179, 71, 0.3) 0%, rgba(255, 160, 20, 0.2) 40%, rgba(255, 225, 53, 0.1) 70%, transparent 100%)',
                    backgroundSize: '150% 150%',
                    zIndex: 2
                  }}
                />
              </motion.div>
            )}
          </>
        )}
      </AnimatePresence>

      {/* Flavor-Specific Bottom Gradient Layers */}
      <AnimatePresence>
        {carouselVisibility.show && currentScrollProgress >= carouselSlideInEnd && (
          <>
            {/* Coconut Water - Brown Gradient */}
            {activeCenterItem === 0 && (
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
                transition={{
                  opacity: { duration: 1.8, ease: "easeInOut", delay: 0.3 },
                  y: { duration: 2.2, ease: "easeOut", delay: 0.3 }
                }}
                className="fixed bottom-0 left-0 w-full z-2 pointer-events-none"
                style={{ height: '60vh' }}
              >
                <div
                  className="w-full h-full"
                  style={{
                    backgroundImage: 'linear-gradient(to top, rgba(101, 67, 33, 0.8) 0%, rgba(139, 94, 60, 0.4) 40%, rgba(200, 149, 109, 0.1) 80%, transparent 100%)',
                    backdropFilter: 'blur(0.5px)'
                  }}
                />
              </motion.div>
            )}
            
            {/* Double Chocolate - Light Purple Gradient with Darker Bottom */}
            {activeCenterItem === 1 && (
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
                transition={{
                  opacity: { duration: 1.8, ease: "easeInOut", delay: 0.3 },
                  y: { duration: 2.2, ease: "easeOut", delay: 0.3 }
                }}
                className="fixed bottom-0 left-0 w-full z-2 pointer-events-none"
                style={{ height: '60vh' }}
              >
                <div
                  className="w-full h-full"
                  style={{
                    backgroundImage: 'linear-gradient(to top, rgba(95, 45, 115, 0.95) 0%, rgba(125, 70, 145, 0.8) 30%, rgba(150, 95, 170, 0.6) 60%, rgba(186, 148, 203, 0.3) 80%, transparent 100%)',
                    backdropFilter: 'blur(0.5px)'
                  }}
                />
              </motion.div>
            )}
            
            {/* Cookies & Cream - Darker Blue Gradient */}
            {activeCenterItem === 2 && (
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
                transition={{
                  opacity: { duration: 1.8, ease: "easeInOut", delay: 0.3 },
                  y: { duration: 2.2, ease: "easeOut", delay: 0.3 }
                }}
                className="fixed bottom-0 left-0 w-full z-2 pointer-events-none"
                style={{ height: '60vh' }}
              >
                <div
                  className="w-full h-full"
                  style={{
                    backgroundImage: 'linear-gradient(to top, rgba(25, 65, 125, 0.85) 0%, rgba(45, 85, 145, 0.7) 30%, rgba(75, 115, 175, 0.5) 60%, rgba(135, 206, 235, 0.3) 80%, transparent 100%)',
                    backdropFilter: 'blur(0.5px)'
                  }}
                />
              </motion.div>
            )}
            
            {/* Alphonso Mango - Mango Yellow Gradient */}
            {activeCenterItem === 3 && (
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
                transition={{
                  opacity: { duration: 1.8, ease: "easeInOut", delay: 0.3 },
                  y: { duration: 2.2, ease: "easeOut", delay: 0.3 }
                }}
                className="fixed bottom-0 left-0 w-full z-2 pointer-events-none"
                style={{ height: '60vh' }}
              >
                <div
                  className="w-full h-full"
                  style={{
                    backgroundImage: 'linear-gradient(to top, rgba(255, 140, 0, 0.85) 0%, rgba(255, 160, 20, 0.7) 30%, rgba(255, 179, 71, 0.5) 60%, rgba(255, 225, 53, 0.3) 80%, transparent 100%)',
                    backdropFilter: 'blur(0.5px)'
                  }}
                />
              </motion.div>
            )}
          </>
        )}
      </AnimatePresence>

      {/* Cookie Image Overlay - Right Side (Double Chocolate) */}
      <AnimatePresence>
        {carouselVisibility.show && currentScrollProgress >= carouselSlideInEnd && activeCenterItem === 1 && (
          <motion.div
            className="fixed top-[18%] right-[18%] z-5 pointer-events-none"
            style={{
              opacity: chocolateImagesOpacity,
              y: chocolateImagesY,
              scale: chocolateImagesScale
            }}
          >
            <motion.img
              src={cookieImage}
              alt="Chocolate Cookie"
              className="w-32 h-32 md:w-36 md:h-36 lg:w-40 lg:h-40 object-contain"
              animate={{
                rotate: [0, 5, -3, 2, 0],
                scale: [1, 1.05, 0.98, 1.02, 1],
                x: [0, 10, -5, 0],
                y: [0, -5, 3, 0]
              }}
              transition={{
                rotate: { duration: 10, repeat: Infinity, ease: "easeInOut" },
                scale: { duration: 10, repeat: Infinity, ease: "easeInOut" },
                x: { duration: 6, repeat: Infinity, ease: "easeInOut" },
                y: { duration: 8, repeat: Infinity, ease: "easeInOut" }
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cookie Image Overlay - Left Side (Double Chocolate) */}
      <AnimatePresence>
        {carouselVisibility.show && currentScrollProgress >= carouselSlideInEnd && activeCenterItem === 1 && (
          <motion.div
            className="fixed top-[12%] left-[15%] z-5 pointer-events-none"
            style={{
              opacity: chocolateImagesOpacity,
              y: chocolateImagesY,
              scale: chocolateImagesScale
            }}
          >
            <motion.img
              src={cookieImage}
              alt="Chocolate Cookie"
              className="w-20 h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 object-contain"
              style={{
                transform: 'scaleX(-1)',
                filter: 'blur(1.5px) opacity(0.7)'
              }}
              animate={{
                rotate: [0, 5, -3, 2, 0],
                scale: [1, 1.02, 0.99, 1.03, 1],
                x: [0, -10, 5, 0],
                y: [0, -3, 5, 0]
              }}
              transition={{
                rotate: { duration: 12, repeat: Infinity, ease: "easeInOut" },
                scale: { duration: 12, repeat: Infinity, ease: "easeInOut" },
                x: { duration: 7, repeat: Infinity, ease: "easeInOut" },
                y: { duration: 9, repeat: Infinity, ease: "easeInOut" }
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cookie Image Overlay - Bottom Left Center (Double Chocolate) */}
      <AnimatePresence>
        {carouselVisibility.show && currentScrollProgress >= carouselSlideInEnd && activeCenterItem === 1 && (
          <motion.div
            className="fixed bottom-[8%] left-[25%] z-5 pointer-events-none"
            style={{
              opacity: chocolateImagesOpacity,
              y: chocolateImagesY,
              scale: chocolateImagesScale
            }}
          >
            <motion.img
              src={cookieImage}
              alt="Chocolate Cookie"
              className="w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 object-contain"
              style={{
                filter: 'blur(4px) opacity(0.4)'
              }}
              animate={{
                rotate: [0, -8, 4, -3, 0],
                scale: [1, 1.05, 0.98, 1.02, 1],
                x: [0, -8, 4, 0],
                y: [0, -4, 6, 0]
              }}
              transition={{
                rotate: { duration: 15, repeat: Infinity, ease: "easeInOut" },
                scale: { duration: 15, repeat: Infinity, ease: "easeInOut" },
                x: { duration: 11, repeat: Infinity, ease: "easeInOut" },
                y: { duration: 13, repeat: Infinity, ease: "easeInOut" }
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cookie Image Overlay - Right Side (Cookies & Cream) */}
      <AnimatePresence>
        {carouselVisibility.show && currentScrollProgress >= carouselSlideInEnd && activeCenterItem === 2 && (
          <motion.div
            className="fixed top-[18%] right-[18%] z-5 pointer-events-none"
            style={{
              opacity: cookiesImagesOpacity,
              y: cookiesImagesY,
              scale: cookiesImagesScale
            }}
          >
            <motion.img
              src={oreoImage}
              alt="Oreo Cookie"
              className="w-44 h-44 md:w-52 md:h-52 lg:w-60 lg:h-60 object-contain"
              animate={{
                rotate: [0, 5, -3, 2, 0],
                scale: [1, 1.05, 0.98, 1.02, 1],
                x: [0, 10, -5, 0],
                y: [0, -5, 3, 0]
              }}
              transition={{
                rotate: { duration: 10, repeat: Infinity, ease: "easeInOut" },
                scale: { duration: 10, repeat: Infinity, ease: "easeInOut" },
                x: { duration: 6, repeat: Infinity, ease: "easeInOut" },
                y: { duration: 8, repeat: Infinity, ease: "easeInOut" }
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cookie Image Overlay - Left Side (Cookies & Cream) */}
      <AnimatePresence>
        {carouselVisibility.show && currentScrollProgress >= carouselSlideInEnd && activeCenterItem === 2 && (
          <motion.div
            className="fixed top-[12%] left-[15%] z-5 pointer-events-none"
            style={{
              opacity: cookiesImagesOpacity,
              y: cookiesImagesY,
              scale: cookiesImagesScale
            }}
          >
            <motion.img
              src={oreoImage}
              alt="Oreo Cookie"
              className="w-32 h-32 md:w-36 md:h-36 lg:w-40 lg:h-40 object-contain"
              style={{
                transform: 'scaleX(-1)',
                filter: 'blur(1.5px) opacity(0.7)'
              }}
              animate={{
                rotate: [0, 5, -3, 2, 0],
                scale: [1, 1.02, 0.99, 1.03, 1],
                x: [0, -10, 5, 0],
                y: [0, -3, 5, 0]
              }}
              transition={{
                rotate: { duration: 12, repeat: Infinity, ease: "easeInOut" },
                scale: { duration: 12, repeat: Infinity, ease: "easeInOut" },
                x: { duration: 7, repeat: Infinity, ease: "easeInOut" },
                y: { duration: 9, repeat: Infinity, ease: "easeInOut" }
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cookie Image Overlay - Bottom Left Center (Cookies & Cream) */}
      <AnimatePresence>
        {carouselVisibility.show && currentScrollProgress >= carouselSlideInEnd && activeCenterItem === 2 && (
          <motion.div
            className="fixed bottom-[8%] left-[25%] z-5 pointer-events-none"
            style={{
              opacity: cookiesImagesOpacity,
              y: cookiesImagesY,
              scale: cookiesImagesScale
            }}
          >
            <motion.img
              src={oreoImage}
              alt="Oreo Cookie"
              className="w-18 h-18 md:w-22 md:h-22 lg:w-26 lg:h-26 object-contain"
              style={{
                filter: 'blur(4px) opacity(0.4)'
              }}
              animate={{
                rotate: [0, -8, 4, -3, 0],
                scale: [1, 1.05, 0.98, 1.02, 1],
                x: [0, -8, 4, 0],
                y: [0, -4, 6, 0]
              }}
              transition={{
                rotate: { duration: 15, repeat: Infinity, ease: "easeInOut" },
                scale: { duration: 15, repeat: Infinity, ease: "easeInOut" },
                x: { duration: 11, repeat: Infinity, ease: "easeInOut" },
                y: { duration: 13, repeat: Infinity, ease: "easeInOut" }
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Coconut Background Image Overlay - Right Side */}
      <AnimatePresence>
        {carouselVisibility.show && currentScrollProgress >= carouselSlideInEnd && activeCenterItem === 0 && (
          <motion.div
            className="fixed top-[18%] right-[15%] z-5 pointer-events-none"
            style={{
              opacity: coconutImagesOpacity,
              y: coconutImagesY,
              scale: coconutImagesScale
            }}
          >
            <motion.img
              src={coconutBackgroundImage}
              alt="Coconut"
              className="w-40 h-40 md:w-52 md:h-52 lg:w-64 lg:h-64 object-contain"
              animate={{
                rotate: [0, 5, -3, 2, 0],
                scale: [1, 1.05, 0.98, 1.02, 1],
                x: [0, 10, -5, 0],
                y: [0, -5, 3, 0]
              }}
              transition={{
                rotate: { duration: 10, repeat: Infinity, ease: "easeInOut" },
                scale: { duration: 10, repeat: Infinity, ease: "easeInOut" },
                x: { duration: 6, repeat: Infinity, ease: "easeInOut" },
                y: { duration: 8, repeat: Infinity, ease: "easeInOut" }
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Coconut Background Image Overlay - Left Side */}
      <AnimatePresence>
        {carouselVisibility.show && currentScrollProgress >= carouselSlideInEnd && activeCenterItem === 0 && (
          <motion.div
            className="fixed top-[12%] left-[15%] z-5 pointer-events-none"
            style={{
              opacity: coconutImagesOpacity,
              y: coconutImagesY,
              scale: coconutImagesScale
            }}
          >
            <motion.img
              src={coconutBackgroundImage}
              alt="Coconut"
              className="w-28 h-28 md:w-36 md:h-36 lg:w-44 lg:h-44 object-contain"
              style={{
                transform: 'scaleX(-1)',
                filter: 'blur(1.5px) opacity(0.7)'
              }}
              animate={{
                rotate: [0, 5, -3, 2, 0],
                scale: [1, 1.02, 0.99, 1.03, 1],
                x: [0, -10, 5, 0],
                y: [0, -3, 5, 0]
              }}
              transition={{
                rotate: { duration: 12, repeat: Infinity, ease: "easeInOut" },
                scale: { duration: 12, repeat: Infinity, ease: "easeInOut" },
                x: { duration: 7, repeat: Infinity, ease: "easeInOut" },
                y: { duration: 9, repeat: Infinity, ease: "easeInOut" }
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Third Coconut Background Image Overlay - Bottom Left Center */}
      <AnimatePresence>
        {carouselVisibility.show && currentScrollProgress >= carouselSlideInEnd && activeCenterItem === 0 && (
          <motion.div
            className="fixed bottom-[8%] left-[25%] z-5 pointer-events-none"
            style={{
              opacity: coconutImagesOpacity,
              y: coconutImagesY,
              scale: coconutImagesScale
            }}
          >
            <motion.img
              src={coconutBackgroundImage}
              alt="Coconut"
              className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 object-contain"
              style={{
                filter: 'blur(4px) opacity(0.4)'
              }}
              animate={{
                rotate: [0, -8, 4, -3, 0],
                scale: [1, 1.05, 0.98, 1.02, 1],
                x: [0, -8, 4, 0],
                y: [0, -4, 6, 0]
              }}
              transition={{
                rotate: { duration: 15, repeat: Infinity, ease: "easeInOut" },
                scale: { duration: 15, repeat: Infinity, ease: "easeInOut" },
                x: { duration: 11, repeat: Infinity, ease: "easeInOut" },
                y: { duration: 13, repeat: Infinity, ease: "easeInOut" }
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mangoes for Alphonso Mango */}
      <AnimatePresence>
        {carouselVisibility.show && currentScrollProgress >= carouselSlideInEnd && activeCenterItem === 3 && (
          <>
            {/* Main mango - positioned on the right */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
              animate={{ 
                opacity: 1, 
                scale: 1, 
                rotate: 0,
                x: [0, 10, -5, 0],
                y: [0, -5, 3, 0]
              }}
              exit={{ opacity: 0, scale: 0.8, rotate: 10 }}
              transition={{
                opacity: { duration: 1.2, ease: "easeInOut" },
                scale: { duration: 1.5, ease: "backOut" },
                rotate: { duration: 1.8, ease: "easeInOut" },
                x: { duration: 6, repeat: Infinity, ease: "easeInOut" },
                y: { duration: 8, repeat: Infinity, ease: "easeInOut" }
              }}
              className="fixed top-[18%] right-[18%] z-5 pointer-events-none"
            >
              <motion.img
                src={mangoImage}
                alt="Alphonso Mango"
                className="w-44 h-44 md:w-52 md:h-52 lg:w-60 lg:h-60 object-contain"
                animate={{
                  rotate: [0, 5, -3, 2, 0],
                  scale: [1, 1.05, 0.98, 1.02, 1]
                }}
                transition={{
                  duration: 10,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </motion.div>

            {/* Blurred mango on the left side */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotate: 10 }}
              animate={{ 
                opacity: 1, 
                scale: 1, 
                rotate: 0,
                x: [0, -10, 5, 0],
                y: [0, -3, 5, 0]
              }}
              exit={{ opacity: 0, scale: 0.8, rotate: -10 }}
              transition={{
                opacity: { duration: 1.2, ease: "easeInOut" },
                scale: { duration: 1.5, ease: "backOut" },
                rotate: { duration: 1.8, ease: "easeInOut" },
                x: { duration: 7, repeat: Infinity, ease: "easeInOut" },
                y: { duration: 9, repeat: Infinity, ease: "easeInOut" }
              }}
              className="fixed top-[12%] left-[15%] z-5 pointer-events-none"
            >
              <motion.img
                src={mangoImage}
                alt="Alphonso Mango"
                className="w-32 h-32 md:w-36 md:h-36 lg:w-40 lg:h-40 object-contain"
                style={{
                  transform: 'scaleX(-1)',
                  filter: 'blur(1.5px) opacity(0.7)'
                }}
                animate={{
                  rotate: [0, 5, -3, 2, 0],
                  scale: [1, 1.02, 0.99, 1.03, 1]
                }}
                transition={{
                  duration: 12,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </motion.div>

            {/* Third mango - Bottom Left Center */}
            <motion.div
              initial={{ opacity: 0, scale: 0.6, rotate: -15 }}
              animate={{ 
                opacity: 1, 
                scale: 1, 
                rotate: 0,
                x: [0, -8, 4, 0],
                y: [0, -4, 6, 0]
              }}
              exit={{ opacity: 0, scale: 0.6, rotate: 15 }}
              transition={{
                opacity: { duration: 1.4, ease: "easeInOut" },
                scale: { duration: 1.6, ease: "backOut" },
                rotate: { duration: 2.0, ease: "easeInOut" },
                x: { duration: 11, repeat: Infinity, ease: "easeInOut" },
                y: { duration: 13, repeat: Infinity, ease: "easeInOut" }
              }}
              className="fixed bottom-[8%] left-[25%] z-5 pointer-events-none"
            >
              <motion.img
                src={mangoImage}
                alt="Alphonso Mango"
                className="w-18 h-18 md:w-22 md:h-22 lg:w-26 lg:h-26 object-contain"
                style={{
                  filter: 'blur(4px) opacity(0.4)'
                }}
                animate={{
                  rotate: [0, -8, 4, -3, 0],
                  scale: [1, 1.05, 0.98, 1.02, 1]
                }}
                transition={{
                  duration: 15,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* 20g PROTEIN Badge - Scroll-based fade at 10% progress */}
      <AnimatePresence>
        {carouselVisibility.show && currentScrollProgress >= carouselSlideInEnd && activeCenterItem === 0 && coconutSlideProgress >= 0.1 && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.7, rotateX: -15 }}
            animate={{ 
              opacity: coconutSlideProgress >= 0.2 ? 1 : Math.min((coconutSlideProgress - 0.1) / 0.1, 1), 
              y: coconutSlideProgress >= 0.2 ? 0 : Math.max(30 - (coconutSlideProgress - 0.1) * 300, 0), 
              scale: coconutSlideProgress >= 0.2 ? 1 : Math.min(0.7 + (coconutSlideProgress - 0.1) * 3, 1),
              rotateX: coconutSlideProgress >= 0.2 ? 0 : Math.max(-15 + (coconutSlideProgress - 0.1) * 150, 0)
            }}
            exit={{ opacity: 0, y: -30, scale: 0.7, rotateX: 15 }}
            transition={{
              opacity: { duration: 0.6, ease: "easeOut" },
              y: { duration: 0.8, ease: "backOut" },
              scale: { duration: 1.0, ease: "backOut" },
              rotateX: { duration: 0.6, ease: "easeOut" }
            }}
            className="fixed z-20 pointer-events-none flex flex-col items-center"
            style={{
              left: '15.5%',
              bottom: '55%'
            }}
          >
            {/* White text content - no background */}
            <div className="relative text-center">
              <motion.div
                className="text-white text-3xl md:text-4xl font-[Chewy] font-bold tracking-wide drop-shadow-lg"
                animate={{
                  scale: [1, 1.05, 1]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                style={{
                  textShadow: '0 2px 8px rgba(0,0,0,0.7), 0 0 20px rgba(0,0,0,0.5)'
                }}
              >
                20g
              </motion.div>
              <div 
                className="text-white text-lg md:text-xl font-[Chewy] font-bold tracking-widest drop-shadow-lg"
                style={{
                  textShadow: '0 2px 8px rgba(0,0,0,0.7), 0 0 20px rgba(0,0,0,0.5)'
                }}
              >
                PROTEIN
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 180 CALORIES Badge - Scroll-based fade at 30% progress */}
      <AnimatePresence>
        {carouselVisibility.show && currentScrollProgress >= carouselSlideInEnd && activeCenterItem === 0 && coconutSlideProgress >= 0.3 && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.7, rotateY: -15 }}
            animate={{ 
              opacity: coconutSlideProgress >= 0.45 ? 1 : Math.min((coconutSlideProgress - 0.3) / 0.15, 1), 
              y: coconutSlideProgress >= 0.45 ? 0 : Math.max(30 - (coconutSlideProgress - 0.3) * 200, 0), 
              scale: coconutSlideProgress >= 0.45 ? 1 : Math.min(0.7 + (coconutSlideProgress - 0.3) * 2, 1),
              rotateY: coconutSlideProgress >= 0.45 ? 0 : Math.max(-15 + (coconutSlideProgress - 0.3) * 100, 0)
            }}
            exit={{ opacity: 0, y: -30, scale: 0.7, rotateY: 15 }}
            transition={{
              opacity: { duration: 0.6, ease: "easeOut" },
              y: { duration: 0.8, ease: "backOut" },
              scale: { duration: 1.0, ease: "backOut" },
              rotateY: { duration: 0.6, ease: "easeOut" }
            }}
            className="fixed z-20 pointer-events-none flex flex-col items-center"
            style={{
              left: '15%',
              bottom: '35%'
            }}
          >
            {/* White text content - no background */}
            <div className="relative text-center">
              <motion.div
                className="text-white text-3xl md:text-4xl font-[Chewy] font-bold tracking-wide drop-shadow-lg"
                animate={{
                  scale: [1, 1.05, 1]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                style={{
                  textShadow: '0 2px 8px rgba(0,0,0,0.7), 0 0 20px rgba(0,0,0,0.5)'
                }}
              >
                180
              </motion.div>
              <div 
                className="text-white text-lg md:text-xl font-[Chewy] font-bold tracking-widest drop-shadow-lg"
                style={{
                  textShadow: '0 2px 8px rgba(0,0,0,0.7), 0 0 20px rgba(0,0,0,0.5)'
                }}
              >
                CALORIES
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 14g FIBER Badge - Scroll-based fade at 50% progress */}
      <AnimatePresence>
        {carouselVisibility.show && currentScrollProgress >= carouselSlideInEnd && activeCenterItem === 0 && coconutSlideProgress >= 0.5 && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.7, rotateX: 15 }}
            animate={{ 
              opacity: coconutSlideProgress >= 0.65 ? 1 : Math.min((coconutSlideProgress - 0.5) / 0.15, 1), 
              y: coconutSlideProgress >= 0.65 ? 0 : Math.max(30 - (coconutSlideProgress - 0.5) * 200, 0), 
              scale: coconutSlideProgress >= 0.65 ? 1 : Math.min(0.7 + (coconutSlideProgress - 0.5) * 2, 1),
              rotateX: coconutSlideProgress >= 0.65 ? 0 : Math.max(15 - (coconutSlideProgress - 0.5) * 100, 0)
            }}
            exit={{ opacity: 0, y: -30, scale: 0.7, rotateX: -15 }}
            transition={{
              opacity: { duration: 0.6, ease: "easeOut" },
              y: { duration: 0.8, ease: "backOut" },
              scale: { duration: 1.0, ease: "backOut" },
              rotateX: { duration: 0.6, ease: "easeOut" }
            }}
            className="fixed z-20 pointer-events-none flex flex-col items-center"
            style={{
              left: '16.5%',
              bottom: '15%'
            }}
          >
            {/* White text content - no background */}
            <div className="relative text-center">
              <motion.div
                className="text-white text-3xl md:text-4xl font-[Chewy] font-bold tracking-wide drop-shadow-lg"
                animate={{
                  scale: [1, 1.05, 1]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                style={{
                  textShadow: '0 2px 8px rgba(0,0,0,0.7), 0 0 20px rgba(0,0,0,0.5)'
                }}
              >
                14g
              </motion.div>
              <div 
                className="text-white text-lg md:text-xl font-[Chewy] font-bold tracking-widest drop-shadow-lg"
                style={{
                  textShadow: '0 2px 8px rgba(0,0,0,0.7), 0 0 20px rgba(0,0,0,0.5)'
                }}
              >
                FIBER
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 0% Added Sugar Badge - Scroll-based fade at 70% progress */}
      <AnimatePresence>
        {carouselVisibility.show && currentScrollProgress >= carouselSlideInEnd && activeCenterItem === 0 && coconutSlideProgress >= 0.7 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.6, y: 40, rotateZ: -10 }}
            animate={{ 
              opacity: coconutSlideProgress >= 0.85 ? 1 : Math.min((coconutSlideProgress - 0.7) / 0.15, 1), 
              scale: coconutSlideProgress >= 0.85 ? 1 : Math.min(0.6 + (coconutSlideProgress - 0.7) * 2.67, 1), 
              y: coconutSlideProgress >= 0.85 ? 0 : Math.max(40 - (coconutSlideProgress - 0.7) * 267, 0),
              rotateZ: coconutSlideProgress >= 0.85 ? 0 : Math.max(-10 + (coconutSlideProgress - 0.7) * 67, 0)
            }}
            exit={{ opacity: 0, scale: 0.6, y: -40, rotateZ: 10 }}
            transition={{
              opacity: { duration: 0.7, ease: "easeOut" },
              scale: { duration: 1.0, ease: "backOut" },
              y: { duration: 0.9, ease: "backOut" },
              rotateZ: { duration: 0.7, ease: "easeOut" }
            }}
            className="fixed z-20 pointer-events-none flex flex-col items-center"
            style={{
              right: '15%',
              top: '50%'
            }}
          >
            {/* White text content with large "0" spanning two lines */}
            <div className="relative flex items-start gap-2">
              <motion.div
                className="text-white font-[Chewy] font-bold drop-shadow-lg"
                style={{
                  fontSize: '4rem',
                  lineHeight: '0.85',
                  textShadow: '0 2px 8px rgba(0,0,0,0.7), 0 0 20px rgba(0,0,0,0.5)'
                }}
                animate={{
                  scale: [1, 1.05, 1]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                0
              </motion.div>
              <div className="flex flex-col items-end">
                <div 
                  className="text-white text-xs md:text-sm font-[Chewy] font-bold tracking-wider drop-shadow-lg"
                  style={{
                    textShadow: '0 2px 8px rgba(0,0,0,0.7), 0 0 20px rgba(0,0,0,0.5)',
                    marginRight: '0.1em'
                  }}
                >
                  % ADDED
                </div>
                <div 
                  className="text-white text-xl md:text-2xl font-[Chewy] font-bold tracking-wider drop-shadow-lg -mt-1"
                  style={{
                    textShadow: '0 2px 8px rgba(0,0,0,0.7), 0 0 20px rgba(0,0,0,0.5)'
                  }}
                >
                  SUGAR
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 4g Net Carbs Badge - Scroll-based fade at 80% progress (adjusted for extended window) */}
      <AnimatePresence>
        {carouselVisibility.show && currentScrollProgress >= carouselSlideInEnd && activeCenterItem === 0 && coconutSlideProgress >= 0.8 && (
          <motion.div
            initial={{ opacity: 0, y: 35, scale: 0.6, rotateY: 20 }}
            animate={{ 
              opacity: coconutSlideProgress >= 0.95 ? 1 : Math.min((coconutSlideProgress - 0.8) / 0.15, 1), 
              y: coconutSlideProgress >= 0.95 ? 0 : Math.max(35 - (coconutSlideProgress - 0.8) * 233, 0), 
              scale: coconutSlideProgress >= 0.95 ? 1 : Math.min(0.6 + (coconutSlideProgress - 0.8) * 2.67, 1),
              rotateY: coconutSlideProgress >= 0.95 ? 0 : Math.max(20 - (coconutSlideProgress - 0.8) * 133, 0)
            }}
            exit={{ opacity: 0, y: -35, scale: 0.6, rotateY: -20 }}
            transition={{
              opacity: { duration: 0.7, ease: "easeOut" },
              y: { duration: 0.9, ease: "backOut" },
              scale: { duration: 1.1, ease: "backOut" },
              rotateY: { duration: 0.7, ease: "easeOut" }
            }}
            className="fixed z-20 pointer-events-none"
            style={{
              right: '15%',
              top: '65%'
            }}
          >
            <div className="text-center">
              <motion.div 
                className="text-white font-[Chewy] font-bold drop-shadow-lg"
                style={{
                  fontSize: '2.25rem',
                  lineHeight: '1',
                  textShadow: '0 2px 8px rgba(0,0,0,0.7), 0 0 20px rgba(0,0,0,0.5)'
                }}
                animate={{
                  scale: [1, 1.05, 1]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                4g
              </motion.div>
              <div 
                className="text-white font-[Chewy] font-bold tracking-wider drop-shadow-lg"
                style={{
                  fontSize: '1.125rem',
                  lineHeight: '1',
                  marginTop: '4px',
                  textShadow: '0 2px 8px rgba(0,0,0,0.7), 0 0 20px rgba(0,0,0,0.5)'
                }}
              >
                NET CARBS
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* DOUBLE CHOCOLATE NUTRITIONAL BADGES */}
      {/* 22g PROTEIN Badge - Double Chocolate */}
      <AnimatePresence>
        {carouselVisibility.show && currentScrollProgress >= carouselSlideInEnd && activeCenterItem === 1 && chocolateSlideProgress >= 0.1 && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.7, rotateX: -15 }}
            animate={{ 
              opacity: chocolateSlideProgress >= 0.2 ? 1 : Math.min((chocolateSlideProgress - 0.1) / 0.1, 1), 
              y: chocolateSlideProgress >= 0.2 ? 0 : Math.max(30 - (chocolateSlideProgress - 0.1) * 300, 0), 
              scale: chocolateSlideProgress >= 0.2 ? 1 : Math.min(0.7 + (chocolateSlideProgress - 0.1) * 3, 1),
              rotateX: chocolateSlideProgress >= 0.2 ? 0 : Math.max(-15 + (chocolateSlideProgress - 0.1) * 150, 0)
            }}
            exit={{ opacity: 0, y: -30, scale: 0.7, rotateX: 15 }}
            className="fixed z-20 pointer-events-none flex flex-col items-center"
            style={{ left: '15.5%', bottom: '55%' }}
          >
            <div className="relative text-center">
              <motion.div className="text-white text-3xl md:text-4xl font-[Chewy] font-bold tracking-wide drop-shadow-lg"
                style={{ textShadow: '0 2px 8px rgba(0,0,0,0.7), 0 0 20px rgba(0,0,0,0.5)' }}
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                20g
              </motion.div>
              <div className="text-white text-lg md:text-xl font-[Chewy] font-bold tracking-widest drop-shadow-lg"
                style={{ textShadow: '0 2px 8px rgba(0,0,0,0.7), 0 0 20px rgba(0,0,0,0.5)' }}
              >
                PROTEIN
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 190 CALORIES Badge - Double Chocolate */}
      <AnimatePresence>
        {carouselVisibility.show && currentScrollProgress >= carouselSlideInEnd && activeCenterItem === 1 && chocolateSlideProgress >= 0.3 && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.7, rotateY: -15 }}
            animate={{ 
              opacity: chocolateSlideProgress >= 0.45 ? 1 : Math.min((chocolateSlideProgress - 0.3) / 0.15, 1), 
              y: chocolateSlideProgress >= 0.45 ? 0 : Math.max(30 - (chocolateSlideProgress - 0.3) * 200, 0), 
              scale: chocolateSlideProgress >= 0.45 ? 1 : Math.min(0.7 + (chocolateSlideProgress - 0.3) * 2, 1),
              rotateY: chocolateSlideProgress >= 0.45 ? 0 : Math.max(-15 + (chocolateSlideProgress - 0.3) * 100, 0)
            }}
            exit={{ opacity: 0, y: -30, scale: 0.7, rotateY: 15 }}
            className="fixed z-20 pointer-events-none flex flex-col items-center"
            style={{ left: '15%', bottom: '35%' }}
          >
            <div className="relative text-center">
              <motion.div className="text-white text-3xl md:text-4xl font-[Chewy] font-bold tracking-wide drop-shadow-lg"
                style={{ textShadow: '0 2px 8px rgba(0,0,0,0.7), 0 0 20px rgba(0,0,0,0.5)' }}
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                170
              </motion.div>
              <div className="text-white text-lg md:text-xl font-[Chewy] font-bold tracking-widest drop-shadow-lg"
                style={{ textShadow: '0 2px 8px rgba(0,0,0,0.7), 0 0 20px rgba(0,0,0,0.5)' }}
              >
                CALORIES
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 12g FIBER Badge - Double Chocolate */}
      <AnimatePresence>
        {carouselVisibility.show && currentScrollProgress >= carouselSlideInEnd && activeCenterItem === 1 && chocolateSlideProgress >= 0.5 && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.7, rotateX: 15 }}
            animate={{ 
              opacity: chocolateSlideProgress >= 0.65 ? 1 : Math.min((chocolateSlideProgress - 0.5) / 0.15, 1), 
              y: chocolateSlideProgress >= 0.65 ? 0 : Math.max(30 - (chocolateSlideProgress - 0.5) * 200, 0), 
              scale: chocolateSlideProgress >= 0.65 ? 1 : Math.min(0.7 + (chocolateSlideProgress - 0.5) * 2, 1),
              rotateX: chocolateSlideProgress >= 0.65 ? 0 : Math.max(15 - (chocolateSlideProgress - 0.5) * 100, 0)
            }}
            exit={{ opacity: 0, y: -30, scale: 0.7, rotateX: -15 }}
            className="fixed z-20 pointer-events-none flex flex-col items-center"
            style={{ left: '16.5%', bottom: '15%' }}
          >
            <div className="relative text-center">
              <motion.div className="text-white text-3xl md:text-4xl font-[Chewy] font-bold tracking-wide drop-shadow-lg"
                style={{ textShadow: '0 2px 8px rgba(0,0,0,0.7), 0 0 20px rgba(0,0,0,0.5)' }}
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                14g
              </motion.div>
              <div className="text-white text-lg md:text-xl font-[Chewy] font-bold tracking-widest drop-shadow-lg"
                style={{ textShadow: '0 2px 8px rgba(0,0,0,0.7), 0 0 20px rgba(0,0,0,0.5)' }}
              >
                FIBER
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2g SUGAR Badge - Double Chocolate */}
      <AnimatePresence>
        {carouselVisibility.show && currentScrollProgress >= carouselSlideInEnd && activeCenterItem === 1 && chocolateSlideProgress >= 0.7 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.6, y: 40, rotateZ: -10 }}
            animate={{ 
              opacity: chocolateSlideProgress >= 0.85 ? 1 : Math.min((chocolateSlideProgress - 0.7) / 0.15, 1), 
              scale: chocolateSlideProgress >= 0.85 ? 1 : Math.min(0.6 + (chocolateSlideProgress - 0.7) * 2.67, 1), 
              y: chocolateSlideProgress >= 0.85 ? 0 : Math.max(40 - (chocolateSlideProgress - 0.7) * 267, 0),
              rotateZ: chocolateSlideProgress >= 0.85 ? 0 : Math.max(-10 + (chocolateSlideProgress - 0.7) * 67, 0)
            }}
            exit={{ opacity: 0, scale: 0.6, y: -40, rotateZ: 10 }}
            className="fixed z-20 pointer-events-none flex flex-col items-center"
            style={{ right: '15%', top: '50%' }}
          >
            <div className="relative flex items-start gap-2">
              <motion.div className="text-white font-[Chewy] font-bold drop-shadow-lg"
                style={{
                  fontSize: '4rem', lineHeight: '0.85',
                  textShadow: '0 2px 8px rgba(0,0,0,0.7), 0 0 20px rgba(0,0,0,0.5)'
                }}
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                0
              </motion.div>
              <div className="flex flex-col items-end">
                <div className="text-white text-xs md:text-sm font-[Chewy] font-bold tracking-wider drop-shadow-lg"
                  style={{
                    textShadow: '0 2px 8px rgba(0,0,0,0.7), 0 0 20px rgba(0,0,0,0.5)',
                    marginRight: '0.1em'
                  }}
                >
                  % ADDED
                </div>
                <div className="text-white text-xl md:text-2xl font-[Chewy] font-bold tracking-wider drop-shadow-lg -mt-1"
                  style={{ textShadow: '0 2px 8px rgba(0,0,0,0.7), 0 0 20px rgba(0,0,0,0.5)' }}
                >
                  SUGAR
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 6g Net Carbs Badge - Double Chocolate */}
      <AnimatePresence>
        {carouselVisibility.show && currentScrollProgress >= carouselSlideInEnd && activeCenterItem === 1 && chocolateSlideProgress >= 0.8 && (
          <motion.div
            initial={{ opacity: 0, y: 35, scale: 0.6, rotateY: 20 }}
            animate={{ 
              opacity: chocolateSlideProgress >= 0.95 ? 1 : Math.min((chocolateSlideProgress - 0.8) / 0.15, 1), 
              y: chocolateSlideProgress >= 0.95 ? 0 : Math.max(35 - (chocolateSlideProgress - 0.8) * 233, 0), 
              scale: chocolateSlideProgress >= 0.95 ? 1 : Math.min(0.6 + (chocolateSlideProgress - 0.8) * 2.67, 1),
              rotateY: chocolateSlideProgress >= 0.95 ? 0 : Math.max(20 - (chocolateSlideProgress - 0.8) * 133, 0)
            }}
            exit={{ opacity: 0, y: -35, scale: 0.6, rotateY: -20 }}
            className="fixed z-20 pointer-events-none"
            style={{ right: '15%', top: '65%' }}
          >
            <div className="text-center">
              <motion.div className="text-white font-[Chewy] font-bold drop-shadow-lg"
                style={{
                  fontSize: '2.25rem', lineHeight: '1',
                  textShadow: '0 2px 8px rgba(0,0,0,0.7), 0 0 20px rgba(0,0,0,0.5)'
                }}
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                3g
              </motion.div>
              <div className="text-white font-[Chewy] font-bold tracking-wider drop-shadow-lg"
                style={{
                  fontSize: '1.125rem', lineHeight: '1', marginTop: '4px',
                  textShadow: '0 2px 8px rgba(0,0,0,0.7), 0 0 20px rgba(0,0,0,0.5)'
                }}
              >
                NET CARBS
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* COOKIES & CREAM NUTRITIONAL BADGES */}
      {/* 21g PROTEIN Badge - Cookies & Cream */}
      <AnimatePresence>
        {carouselVisibility.show && currentScrollProgress >= carouselSlideInEnd && activeCenterItem === 2 && cookiesSlideProgress >= 0.1 && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.7, rotateX: -15 }}
            animate={{ 
              opacity: cookiesSlideProgress >= 0.2 ? 1 : Math.min((cookiesSlideProgress - 0.1) / 0.1, 1), 
              y: cookiesSlideProgress >= 0.2 ? 0 : Math.max(30 - (cookiesSlideProgress - 0.1) * 300, 0), 
              scale: cookiesSlideProgress >= 0.2 ? 1 : Math.min(0.7 + (cookiesSlideProgress - 0.1) * 3, 1),
              rotateX: cookiesSlideProgress >= 0.2 ? 0 : Math.max(-15 + (cookiesSlideProgress - 0.1) * 150, 0)
            }}
            exit={{ opacity: 0, y: -30, scale: 0.7, rotateX: 15 }}
            className="fixed z-20 pointer-events-none flex flex-col items-center"
            style={{ left: '15.5%', bottom: '55%' }}
          >
            <div className="relative text-center">
              <motion.div className="text-gray-800 text-3xl md:text-4xl font-[Chewy] font-bold tracking-wide drop-shadow-lg"
                style={{ textShadow: '0 2px 8px rgba(0,0,0,0.3), 0 0 20px rgba(0,0,0,0.2)' }}
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                21g
              </motion.div>
              <div className="text-gray-800 text-lg md:text-xl font-[Chewy] font-bold tracking-widest drop-shadow-lg"
                style={{ textShadow: '0 2px 8px rgba(0,0,0,0.3), 0 0 20px rgba(0,0,0,0.2)' }}
              >
                PROTEIN
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 200 CALORIES Badge - Cookies & Cream */}
      <AnimatePresence>
        {carouselVisibility.show && currentScrollProgress >= carouselSlideInEnd && activeCenterItem === 2 && cookiesSlideProgress >= 0.3 && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.7, rotateY: -15 }}
            animate={{ 
              opacity: cookiesSlideProgress >= 0.45 ? 1 : Math.min((cookiesSlideProgress - 0.3) / 0.15, 1), 
              y: cookiesSlideProgress >= 0.45 ? 0 : Math.max(30 - (cookiesSlideProgress - 0.3) * 200, 0), 
              scale: cookiesSlideProgress >= 0.45 ? 1 : Math.min(0.7 + (cookiesSlideProgress - 0.3) * 2, 1),
              rotateY: cookiesSlideProgress >= 0.45 ? 0 : Math.max(-15 + (cookiesSlideProgress - 0.3) * 100, 0)
            }}
            exit={{ opacity: 0, y: -30, scale: 0.7, rotateY: 15 }}
            className="fixed z-20 pointer-events-none flex flex-col items-center"
            style={{ left: '15%', bottom: '35%' }}
          >
            <div className="relative text-center">
              <motion.div className="text-gray-800 text-3xl md:text-4xl font-[Chewy] font-bold tracking-wide drop-shadow-lg"
                style={{ textShadow: '0 2px 8px rgba(0,0,0,0.3), 0 0 20px rgba(0,0,0,0.2)' }}
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                190
              </motion.div>
              <div className="text-gray-800 text-lg md:text-xl font-[Chewy] font-bold tracking-widest drop-shadow-lg"
                style={{ textShadow: '0 2px 8px rgba(0,0,0,0.3), 0 0 20px rgba(0,0,0,0.2)' }}
              >
                CALORIES
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 10g FIBER Badge - Cookies & Cream */}
      <AnimatePresence>
        {carouselVisibility.show && currentScrollProgress >= carouselSlideInEnd && activeCenterItem === 2 && cookiesSlideProgress >= 0.5 && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.7, rotateX: 15 }}
            animate={{ 
              opacity: cookiesSlideProgress >= 0.65 ? 1 : Math.min((cookiesSlideProgress - 0.5) / 0.15, 1), 
              y: cookiesSlideProgress >= 0.65 ? 0 : Math.max(30 - (cookiesSlideProgress - 0.5) * 200, 0), 
              scale: cookiesSlideProgress >= 0.65 ? 1 : Math.min(0.7 + (cookiesSlideProgress - 0.5) * 2, 1),
              rotateX: cookiesSlideProgress >= 0.65 ? 0 : Math.max(15 - (cookiesSlideProgress - 0.5) * 100, 0)
            }}
            exit={{ opacity: 0, y: -30, scale: 0.7, rotateX: -15 }}
            className="fixed z-20 pointer-events-none flex flex-col items-center"
            style={{ left: '16.5%', bottom: '15%' }}
          >
            <div className="relative text-center">
              <motion.div className="text-gray-800 text-3xl md:text-4xl font-[Chewy] font-bold tracking-wide drop-shadow-lg"
                style={{ textShadow: '0 2px 8px rgba(0,0,0,0.3), 0 0 20px rgba(0,0,0,0.2)' }}
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                14g
              </motion.div>
              <div className="text-gray-800 text-lg md:text-xl font-[Chewy] font-bold tracking-widest drop-shadow-lg"
                style={{ textShadow: '0 2px 8px rgba(0,0,0,0.3), 0 0 20px rgba(0,0,0,0.2)' }}
              >
                FIBER
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3g SUGAR Badge - Cookies & Cream */}
      <AnimatePresence>
        {carouselVisibility.show && currentScrollProgress >= carouselSlideInEnd && activeCenterItem === 2 && cookiesSlideProgress >= 0.7 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.6, y: 40, rotateZ: -10 }}
            animate={{ 
              opacity: cookiesSlideProgress >= 0.85 ? 1 : Math.min((cookiesSlideProgress - 0.7) / 0.15, 1), 
              scale: cookiesSlideProgress >= 0.85 ? 1 : Math.min(0.6 + (cookiesSlideProgress - 0.7) * 2.67, 1), 
              y: cookiesSlideProgress >= 0.85 ? 0 : Math.max(40 - (cookiesSlideProgress - 0.7) * 267, 0),
              rotateZ: cookiesSlideProgress >= 0.85 ? 0 : Math.max(-10 + (cookiesSlideProgress - 0.7) * 67, 0)
            }}
            exit={{ opacity: 0, scale: 0.6, y: -40, rotateZ: 10 }}
            className="fixed z-20 pointer-events-none flex flex-col items-center"
            style={{ right: '15%', top: '50%' }}
          >
            <div className="relative flex items-start gap-2">
              <motion.div className="text-gray-800 font-[Chewy] font-bold drop-shadow-lg"
                style={{
                  fontSize: '4rem', lineHeight: '0.85',
                  textShadow: '0 2px 8px rgba(0,0,0,0.3), 0 0 20px rgba(0,0,0,0.2)'
                }}
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                0
              </motion.div>
              <div className="flex flex-col items-end">
                <div className="text-gray-800 text-xs md:text-sm font-[Chewy] font-bold tracking-wider drop-shadow-lg"
                  style={{
                    textShadow: '0 2px 8px rgba(0,0,0,0.3), 0 0 20px rgba(0,0,0,0.2)',
                    marginRight: '0.1em'
                  }}
                >
                  % ADDED
                </div>
                <div className="text-gray-800 text-xl md:text-2xl font-[Chewy] font-bold tracking-wider drop-shadow-lg -mt-1"
                  style={{ textShadow: '0 2px 8px rgba(0,0,0,0.3), 0 0 20px rgba(0,0,0,0.2)' }}
                >
                  SUGAR
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 8g Net Carbs Badge - Cookies & Cream */}
      <AnimatePresence>
        {carouselVisibility.show && currentScrollProgress >= carouselSlideInEnd && activeCenterItem === 2 && cookiesSlideProgress >= 0.8 && (
          <motion.div
            initial={{ opacity: 0, y: 35, scale: 0.6, rotateY: 20 }}
            animate={{ 
              opacity: cookiesSlideProgress >= 0.95 ? 1 : Math.min((cookiesSlideProgress - 0.8) / 0.15, 1), 
              y: cookiesSlideProgress >= 0.95 ? 0 : Math.max(35 - (cookiesSlideProgress - 0.8) * 233, 0), 
              scale: cookiesSlideProgress >= 0.95 ? 1 : Math.min(0.6 + (cookiesSlideProgress - 0.8) * 2.67, 1),
              rotateY: cookiesSlideProgress >= 0.95 ? 0 : Math.max(20 - (cookiesSlideProgress - 0.8) * 133, 0)
            }}
            exit={{ opacity: 0, y: -35, scale: 0.6, rotateY: -20 }}
            className="fixed z-20 pointer-events-none"
            style={{ right: '15%', top: '65%' }}
          >
            <div className="text-center">
              <motion.div className="text-gray-800 font-[Chewy] font-bold drop-shadow-lg"
                style={{
                  fontSize: '2.25rem', lineHeight: '1',
                  textShadow: '0 2px 8px rgba(0,0,0,0.3), 0 0 20px rgba(0,0,0,0.2)'
                }}
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                5g
              </motion.div>
              <div className="text-gray-800 font-[Chewy] font-bold tracking-wider drop-shadow-lg"
                style={{
                  fontSize: '1.125rem', lineHeight: '1', marginTop: '4px',
                  textShadow: '0 2px 8px rgba(0,0,0,0.3), 0 0 20px rgba(0,0,0,0.2)'
                }}
              >
                NET CARBS
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ALPHONSO MANGO NUTRITIONAL BADGES */}
      {/* 20g PROTEIN Badge - Alphonso Mango */}
      <AnimatePresence>
        {carouselVisibility.show && currentScrollProgress >= carouselSlideInEnd && activeCenterItem === 3 && mangoSlideProgress >= 0.1 && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.7, rotateX: -15 }}
            animate={{ 
              opacity: mangoSlideProgress >= 0.2 ? 1 : Math.min((mangoSlideProgress - 0.1) / 0.1, 1), 
              y: mangoSlideProgress >= 0.2 ? 0 : Math.max(30 - (mangoSlideProgress - 0.1) * 300, 0), 
              scale: mangoSlideProgress >= 0.2 ? 1 : Math.min(0.7 + (mangoSlideProgress - 0.1) * 3, 1),
              rotateX: mangoSlideProgress >= 0.2 ? 0 : Math.max(-15 + (mangoSlideProgress - 0.1) * 150, 0)
            }}
            exit={{ opacity: 0, y: -30, scale: 0.7, rotateX: 15 }}
            className="fixed z-20 pointer-events-none flex flex-col items-center"
            style={{ left: '15.5%', bottom: '55%' }}
          >
            <div className="relative text-center">
              <motion.div className="text-white text-3xl md:text-4xl font-[Chewy] font-bold tracking-wide drop-shadow-lg"
                style={{ textShadow: '0 2px 8px rgba(0,0,0,0.7), 0 0 20px rgba(0,0,0,0.5)' }}
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                20g
              </motion.div>
              <div className="text-white text-lg md:text-xl font-[Chewy] font-bold tracking-widest drop-shadow-lg"
                style={{ textShadow: '0 2px 8px rgba(0,0,0,0.7), 0 0 20px rgba(0,0,0,0.5)' }}
              >
                PROTEIN
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 185 CALORIES Badge - Alphonso Mango */}
      <AnimatePresence>
        {carouselVisibility.show && currentScrollProgress >= carouselSlideInEnd && activeCenterItem === 3 && mangoSlideProgress >= 0.3 && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.7, rotateY: -15 }}
            animate={{ 
              opacity: mangoSlideProgress >= 0.45 ? 1 : Math.min((mangoSlideProgress - 0.3) / 0.15, 1), 
              y: mangoSlideProgress >= 0.45 ? 0 : Math.max(30 - (mangoSlideProgress - 0.3) * 200, 0), 
              scale: mangoSlideProgress >= 0.45 ? 1 : Math.min(0.7 + (mangoSlideProgress - 0.3) * 2, 1),
              rotateY: mangoSlideProgress >= 0.45 ? 0 : Math.max(-15 + (mangoSlideProgress - 0.3) * 100, 0)
            }}
            exit={{ opacity: 0, y: -30, scale: 0.7, rotateY: 15 }}
            className="fixed z-20 pointer-events-none flex flex-col items-center"
            style={{ left: '15%', bottom: '35%' }}
          >
            <div className="relative text-center">
              <motion.div className="text-white text-3xl md:text-4xl font-[Chewy] font-bold tracking-wide drop-shadow-lg"
                style={{ textShadow: '0 2px 8px rgba(0,0,0,0.7), 0 0 20px rgba(0,0,0,0.5)' }}
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                180
              </motion.div>
              <div className="text-white text-lg md:text-xl font-[Chewy] font-bold tracking-widest drop-shadow-lg"
                style={{ textShadow: '0 2px 8px rgba(0,0,0,0.7), 0 0 20px rgba(0,0,0,0.5)' }}
              >
                CALORIES
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 15g FIBER Badge - Alphonso Mango */}
      <AnimatePresence>
        {carouselVisibility.show && currentScrollProgress >= carouselSlideInEnd && activeCenterItem === 3 && mangoSlideProgress >= 0.5 && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.7, rotateX: 15 }}
            animate={{ 
              opacity: mangoSlideProgress >= 0.65 ? 1 : Math.min((mangoSlideProgress - 0.5) / 0.15, 1), 
              y: mangoSlideProgress >= 0.65 ? 0 : Math.max(30 - (mangoSlideProgress - 0.5) * 200, 0), 
              scale: mangoSlideProgress >= 0.65 ? 1 : Math.min(0.7 + (mangoSlideProgress - 0.5) * 2, 1),
              rotateX: mangoSlideProgress >= 0.65 ? 0 : Math.max(15 - (mangoSlideProgress - 0.5) * 100, 0)
            }}
            exit={{ opacity: 0, y: -30, scale: 0.7, rotateX: -15 }}
            className="fixed z-20 pointer-events-none flex flex-col items-center"
            style={{ left: '16.5%', bottom: '15%' }}
          >
            <div className="relative text-center">
              <motion.div className="text-white text-3xl md:text-4xl font-[Chewy] font-bold tracking-wide drop-shadow-lg"
                style={{ textShadow: '0 2px 8px rgba(0,0,0,0.7), 0 0 20px rgba(0,0,0,0.5)' }}
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                15g
              </motion.div>
              <div className="text-white text-lg md:text-xl font-[Chewy] font-bold tracking-widest drop-shadow-lg"
                style={{ textShadow: '0 2px 8px rgba(0,0,0,0.7), 0 0 20px rgba(0,0,0,0.5)' }}
              >
                FIBER
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 1g SUGAR Badge - Alphonso Mango */}
      <AnimatePresence>
        {carouselVisibility.show && currentScrollProgress >= carouselSlideInEnd && activeCenterItem === 3 && mangoSlideProgress >= 0.7 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.6, y: 40, rotateZ: -10 }}
            animate={{ 
              opacity: mangoSlideProgress >= 0.85 ? 1 : Math.min((mangoSlideProgress - 0.7) / 0.15, 1), 
              scale: mangoSlideProgress >= 0.85 ? 1 : Math.min(0.6 + (mangoSlideProgress - 0.7) * 2.67, 1), 
              y: mangoSlideProgress >= 0.85 ? 0 : Math.max(40 - (mangoSlideProgress - 0.7) * 267, 0),
              rotateZ: mangoSlideProgress >= 0.85 ? 0 : Math.max(-10 + (mangoSlideProgress - 0.7) * 67, 0)
            }}
            exit={{ opacity: 0, scale: 0.6, y: -40, rotateZ: 10 }}
            className="fixed z-20 pointer-events-none flex flex-col items-center"
            style={{ right: '15%', top: '50%' }}
          >
            <div className="relative flex items-start gap-2">
              <motion.div className="text-white font-[Chewy] font-bold drop-shadow-lg"
                style={{
                  fontSize: '4rem', lineHeight: '0.85',
                  textShadow: '0 2px 8px rgba(0,0,0,0.7), 0 0 20px rgba(0,0,0,0.5)'
                }}
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                0
              </motion.div>
              <div className="flex flex-col items-end">
                <div className="text-white text-xs md:text-sm font-[Chewy] font-bold tracking-wider drop-shadow-lg"
                  style={{
                    textShadow: '0 2px 8px rgba(0,0,0,0.7), 0 0 20px rgba(0,0,0,0.5)',
                    marginRight: '0.1em'
                  }}
                >
                  % ADDED
                </div>
                <div className="text-white text-xl md:text-2xl font-[Chewy] font-bold tracking-wider drop-shadow-lg -mt-1"
                  style={{ textShadow: '0 2px 8px rgba(0,0,0,0.7), 0 0 20px rgba(0,0,0,0.5)' }}
                >
                  SUGAR
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 5g Net Carbs Badge - Alphonso Mango */}
      <AnimatePresence>
        {carouselVisibility.show && currentScrollProgress >= carouselSlideInEnd && activeCenterItem === 3 && mangoSlideProgress >= 0.8 && (
          <motion.div
            initial={{ opacity: 0, y: 35, scale: 0.6, rotateY: 20 }}
            animate={{ 
              opacity: mangoSlideProgress >= 0.95 ? 1 : Math.min((mangoSlideProgress - 0.8) / 0.15, 1), 
              y: mangoSlideProgress >= 0.95 ? 0 : Math.max(35 - (mangoSlideProgress - 0.8) * 233, 0), 
              scale: mangoSlideProgress >= 0.95 ? 1 : Math.min(0.6 + (mangoSlideProgress - 0.8) * 2.67, 1),
              rotateY: mangoSlideProgress >= 0.95 ? 0 : Math.max(20 - (mangoSlideProgress - 0.8) * 133, 0)
            }}
            exit={{ opacity: 0, y: -35, scale: 0.6, rotateY: -20 }}
            className="fixed z-20 pointer-events-none"
            style={{ right: '15%', top: '65%' }}
          >
            <div className="text-center">
              <motion.div className="text-white font-[Chewy] font-bold drop-shadow-lg"
                style={{
                  fontSize: '2.25rem', lineHeight: '1',
                  textShadow: '0 2px 8px rgba(0,0,0,0.7), 0 0 20px rgba(0,0,0,0.5)'
                }}
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                5g
              </motion.div>
              <div className="text-white font-[Chewy] font-bold tracking-wider drop-shadow-lg"
                style={{
                  fontSize: '1.125rem', lineHeight: '1', marginTop: '4px',
                  textShadow: '0 2px 8px rgba(0,0,0,0.7), 0 0 20px rgba(0,0,0,0.5)'
                }}
              >
                NET CARBS
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Active Flavor Background Indicator - Hidden in production */}
      {false && carouselVisibility.show && currentScrollProgress >= carouselSlideInEnd && (
        <motion.div
          className="fixed top-20 left-6 z-40 bg-black/70 backdrop-blur-sm rounded-full px-4 py-2 text-white text-sm font-medium"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.5 }}
        >
          <span className="text-xs opacity-80">ACTIVE FLAVOR:</span>
          <br />
          <span 
            className={`${activeCenterItem === 0 ? 'text-blue-300' : 'text-white'} transition-colors duration-500`}
          >
            {carouselItems[activeCenterItem]?.title || 'LOADING...'}
          </span>
          {activeCenterItem === 0 && (
            <div className="text-xs opacity-70 mt-1">
              🎨 Solid #347eae + 🤎 Bold Compact Marquee + 🥥 Coconut Image
            </div>
          )}
        </motion.div>
      )}



      {/* 🎡 EXTENDED WHEEL CAROUSEL WITH INTEGRATED HEADING - CLEAN VERSION */}
      {carouselVisibility.show && (
        <div
          className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-[55] pointer-events-none"
          style={{
            transform: carouselStyle.transform,
            opacity: carouselStyle.opacity,
            transition: 'all 0.3s ease-out',
            width: '300vw',
            maxWidth: 'none'
          }}
        >
          {/* EXTENDED WIDE CONTAINER FOR WHEEL EFFECT */}
          <div className="w-full px-8 pointer-events-auto overflow-hidden">
            {/* INTEGRATED SCROLL TO DISCOVER HEADING */}
            <motion.div
              className="flex flex-col items-center space-y-4 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              {/* Custom Curved Text Heading */}

              
              {/* Scroll to discover text and arrow */}
              <motion.div
                className="flex flex-col items-center space-y-3"
                animate={{
                  y: [0, 8, 0]
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <span 
                  className="text-sm uppercase tracking-[0.2em] transition-colors duration-500"
                  style={{ 
                    color: carouselVisibility.show && currentScrollProgress >= carouselSlideInEnd 
                      ? 'rgba(255, 255, 255, 0.9)' 
                      : '#6b7280' 
                  }}
                >
                  Scroll to discover
                </span>
                <div 
                  className="w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-colors duration-500"
                  style={{
                    backgroundColor: carouselVisibility.show && currentScrollProgress >= carouselSlideInEnd 
                      ? 'rgba(255, 255, 255, 0.2)' 
                      : '#000000'
                  }}
                >
                  <div 
                    className="w-0 h-0 border-l-[6px] border-r-[6px] border-t-[8px] border-l-transparent border-r-transparent transition-colors duration-500"
                    style={{
                      borderTopColor: carouselVisibility.show && currentScrollProgress >= carouselSlideInEnd 
                        ? '#ffffff' 
                        : '#ffffff'
                    }}
                  ></div>
                </div>
                
                {/* Small connecting line to carousel */}
                <motion.div 
                  className="w-0.5 h-4 transition-colors duration-500"
                  style={{
                    backgroundImage: carouselVisibility.show && currentScrollProgress >= carouselSlideInEnd && activeCenterItem === 0
                      ? 'linear-gradient(to bottom, #60a5fa, transparent)' 
                      : 'linear-gradient(to bottom, #22c55e, transparent)'
                  }}
                  animate={{
                    scaleY: [1, 1.2, 1],
                    opacity: [0.6, 1, 0.6]
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </motion.div>
            </motion.div>
            
            {/* EXTENDED WHEEL HORIZONTAL CAROUSEL CONTAINER */}
            <div 
              className="relative w-full h-[32rem] flex items-center justify-center"
              style={{ 
                perspective: '1000px',
                perspectiveOrigin: 'center center'
              }}
            >
              {/* Extended curved bump path visualization - SINGLE ITEM FOCUSED */}
              <div className="absolute inset-0 flex items-center justify-center opacity-15">
                <svg width="800%" height="200" viewBox="0 0 9600 200" className="absolute">
                  <path 
                    d="M -2400 160 Q 2400 20 7200 160 Q 9600 20 12000 160" 
                    stroke="url(#singleItemBumpGrad)" 
                    strokeWidth="2" 
                    fill="none"
                    strokeDasharray="15,10"
                  />
                  <defs>
                    <linearGradient id="singleItemBumpGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="rgba(255, 255, 255, 0.1)" stopOpacity="0.1"/>
                      <stop offset="25%" stopColor="rgba(255, 255, 255, 0.3)" stopOpacity="0.3"/>
                      <stop offset="50%" stopColor="rgba(255, 255, 255, 0.5)" stopOpacity="0.5"/>
                      <stop offset="75%" stopColor="rgba(255, 255, 255, 0.3)" stopOpacity="0.3"/>
                      <stop offset="100%" stopColor="rgba(255, 255, 255, 0.1)" stopOpacity="0.1"/>
                    </linearGradient>
                  </defs>
                </svg>
              </div>

              {/* EXTENDED CAROUSEL ITEMS IN WHEEL LAYOUT */}
              {carouselItems.map((item, index) => {
                const position = getBumpPosition(index, scrollOffset);
                
                return (
                  <motion.div
                    key={index}
                    className="absolute"
                    style={{
                      x: position.x,
                      y: position.y,
                      scale: position.scale,
                      rotate: position.rotation,
                      rotateY: position.tilt,
                      zIndex: position.zIndex,
                      opacity: position.opacity,
                      transformStyle: 'preserve-3d'
                    }}
                    animate={{
                      x: position.x,
                      y: position.y,
                      scale: position.scale,
                      rotate: position.rotation,
                      rotateY: position.tilt,
                      opacity: position.opacity
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 100,
                      damping: 20,
                      mass: 1
                    }}
                  >


                    <div 
                      className="flex items-center justify-center relative z-10"
                    >
                      <motion.img 
                        ref={(el) => {
                          if (el) {
                            const handleMove = (e: MouseEvent) => handleMouseMove(e, el, index);
                            const handleLeave = () => handleMouseLeave(index);
                            
                            el.addEventListener('mousemove', handleMove);
                            el.addEventListener('mouseleave', handleLeave);
                            
                            return () => {
                              el.removeEventListener('mousemove', handleMove);
                              el.removeEventListener('mouseleave', handleLeave);
                            };
                          }
                        }}
                        src={item.image} 
                        alt={item.title}
                        className="w-[28rem] h-auto object-contain cursor-pointer"
                        animate={{
                          scale: hoveredItems[index] ? 1.15 : 1,
                          rotate: hoveredItems[index] ? 2 : 0,
                        }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        style={{
                          filter: `brightness(${1 + (position.scale - 1) * 0.2}) contrast(${1 + (position.scale - 1) * 0.1})`,
                          zIndex: 10,
                        }}
                      />
                    </div>
                  </motion.div>
                );
              })}

              {/* Center focus indicator - More prominent for single item focus */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <motion.div 
                  className="w-3 h-3 rounded-full shadow-lg animate-pulse transition-colors duration-500"
                  style={{
                    backgroundColor: activeCenterItem === 0 ? '#60a5fa' : '#22c55e',
                    boxShadow: `0 0 20px ${activeCenterItem === 0 ? '#60a5fa80' : '#22c55e80'}`
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      )}



      {/* SCROLLING TEXT CONTENT - Clean styling */}
      <motion.div
        className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 pointer-events-auto z-5"
        style={{ 
          scale: textScale,
          pointerEvents: 'auto',
          top: '0vh',
          height: '100vh'
        }}
      >
        <div className="space-y-6 pointer-events-auto" style={{ pointerEvents: 'auto' }}>
          {/* Clean tagline text */}
          <motion.div 
            className="relative pointer-events-auto z-[100]"
            style={{ 
              opacity: curvedTextOpacity,
              pointerEvents: 'auto',
              zIndex: 100
            }}
            initial={{ opacity: 0 }}
            transition={{ 
              opacity: { duration: 1, delay: 0.5 },
              y: { duration: 0.6, ease: "easeOut" }
            }}
          >
            {/* Dedicated div for #LeanCleanProtein SVG text */}
            <div className="pointer-events-auto z-[100] relative" style={{ pointerEvents: 'auto', zIndex: 100 }}>
              <svg viewBox="0 0 400 100" className="w-80 h-20 mx-auto pointer-events-auto cursor-pointer z-[100]" style={{ pointerEvents: 'auto', zIndex: 100 }}>
                <defs>
                  <path id="curve" d="M 50 80 Q 200 20 350 80" />
                </defs>

              </svg>
            </div>
          </motion.div>

          {/* Nutritional Information Display */}
          <motion.div 
            className="relative max-w-6xl mx-auto leading-tight text-black clean-text mobile-push-down"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1 }}
          >
            {/* Nutritional Information Grid */}
            <div className="relative z-10">
              <div className="flex flex-wrap justify-center items-center gap-4 md:gap-6 lg:gap-8 pointer-events-auto font-[Chewy] font-bold">
                {nutritionalInfo.map((info, index) => (
                  <div key={index} className="flex items-baseline">
                    <span className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-black leading-none">
                      {info.value}
                    </span>
                    {info.unit && (
                      <span className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl text-black leading-none ml-1">
                        {info.unit}
                      </span>
                    )}
                    <span className="text-xl md:text-2xl lg:text-3xl xl:text-4xl text-black leading-none">
                      {info.period}
                    </span>
                    <span className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl text-gray-800 ml-2">
                      {info.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Brand message */}
          <motion.div 
            className="text-xl md:text-2xl tracking-[0.3em] text-gray-800 clean-text mt-8 relative pointer-events-auto z-[100]"
            style={{ 
              opacity: soWeMadeOpacity,
              y: soWeMadeY,
              pointerEvents: 'auto',
              zIndex: 100
            }}
            initial={{ opacity: 0, y: 20 }}
            transition={{ 
              opacity: { duration: 1, delay: 1.5 },
              y: { duration: 0.6, ease: "easeOut" }
            }}
          >
            <AnimatePresence mode="wait">
              {showHealthyBars ? (
                <motion.div
                  key="fixed-protein-bars"
                  variants={textVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="flex justify-center overflow-hidden pointer-events-auto font-[Chewy]"
                  style={{ transformPerspective: 1000, pointerEvents: 'auto' }}
                >
                  {"PROTEIN BARS".split("").map((letter, index) => (
                    <motion.span
                      key={`fixed-protein-${index}`}
                      variants={letterVariants}
                      className="inline-block pointer-events-auto cursor-pointer"
                      style={{ 
                        transformOrigin: "center bottom",
                        display: letter === " " ? "inline" : "inline-block",
                        width: letter === " " ? "0.5ch" : "auto",
                        pointerEvents: 'auto'
                      }}
                    >
                      {letter === " " ? "\u00A0" : letter}
                    </motion.span>
                  ))}
                </motion.div>
              ) : (
                <div className="pointer-events-auto z-[100] relative" style={{ pointerEvents: 'auto', zIndex: 100 }}>

                </div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Clean scroll indicator */}
          <motion.div 
            className="absolute bottom-16 left-1/2 transform -translate-x-1/2 pointer-events-none"
            style={{ pointerEvents: 'none' }}
            animate={{ 
              opacity: (fadeSequenceTriggered || isReversing) ? 0 : 1,
              y: (fadeSequenceTriggered || isReversing) ? 20 : [0, 10, 0]
            }}
            transition={{ 
              opacity: { duration: 0.3 },
              y: (fadeSequenceTriggered || isReversing) ? { duration: 0.3 } : { duration: 2, repeat: Infinity, ease: "easeInOut" }
            }}
          >
            <div className="w-6 h-10 border-2 border-green-400/60 rounded-full flex justify-center clean-accent pointer-events-none">
              <motion.div 
                className="w-1 h-2 bg-green-500 rounded-full mt-2 pointer-events-none"
                animate={{ y: (fadeSequenceTriggered || isReversing) ? 0 : [0, 4, 0] }}
                transition={{ duration: 2, repeat: (fadeSequenceTriggered || isReversing) ? 0 : Infinity, ease: "easeInOut" }}
              />
            </div>
            <p className="text-xs text-green-600 mt-2 tracking-wide clean-text pointer-events-none">SCROLL</p>
          </motion.div>
        </div>
      </motion.div>

      {/* Kite Logo Animation */}
      <motion.div
        className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[60] pointer-events-none"
        style={{
          scale: logoScale,
          x: logoX,
          y: logoY,
          opacity: logoStartZoom ? logoBaseOpacity : 0,
          pointerEvents: 'none'
        }}
      >
        <div>
          <img 
            src={kiteImage} 
            alt="Clean Nutrition Logo" 
            className="w-96 h-auto object-contain"
            style={{
              filter: 'brightness(1.3) contrast(1.2) saturate(1.1) drop-shadow(0 0 20px rgba(0, 0, 0, 0.4))',
              WebkitFilter: 'brightness(1.3) contrast(1.2) saturate(1.1) drop-shadow(0 0 20px rgba(0, 0, 0, 0.4))',
              imageRendering: 'crisp-edges'
            }}
          />
        </div>

      </motion.div>

      {/* Clean progress indicator */}
      <motion.div 
        className="fixed bottom-8 right-8 w-16 h-16 rounded-full border-2 border-green-500/30 flex items-center justify-center z-50 clean-accent pointer-events-none"
        style={{ 
          opacity: useTransform(scrollYProgress, [0.1, 0.9], [1, 0]),
          pointerEvents: 'none'
        }}
      >
        <svg className="w-12 h-12 transform -rotate-90">
          <circle
            cx="24"
            cy="24"
            r="20"
            stroke="rgba(34, 197, 94, 0.3)"
            strokeWidth="2"
            fill="none"
          />
          <motion.circle
            cx="24"
            cy="24"
            r="20"
            stroke="rgba(34, 197, 94, 0.8)"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            style={{
              pathLength: scrollYProgress
            }}
            strokeDasharray="0 1"
          />
          <motion.circle
            cx="24"
            cy="4"
            r="2"
            animate={{ 
              fill: fadeSequenceTriggered ? "#dc2626" : isReversing ? "#22c55e" : "#22c55e"
            }}
            transition={{ duration: 0.3 }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xs text-green-600 font-medium clean-text">
            {Math.round(scrollYProgress.get() * 100)}%
          </span>
        </div>
      </motion.div>

      {/* Debug info - Hidden in production */}
      {false && (
        <div className="fixed top-24 left-4 z-50 bg-white/90 border border-green-500/20 text-green-700 p-3 rounded text-xs backdrop-blur-sm minimal-shadow pointer-events-none">
          <div>Scroll: {Math.round(currentScrollProgress * 100)}%</div>
          <div>Forward: {fadeSequenceTriggered ? 'Yes' : 'No'}</div>
          <div>Reverse: {isReversing ? 'Yes' : 'No'}</div>
          <div>Fade Index: {currentFadeIndex}</div>
          <div>Reverse Index: {reverseIndex}</div>
          <div>All Faded: {allWordsFaded ? 'Yes' : 'No'}</div>
          <div>Logo Zoom Started: {logoStartZoom ? 'Yes' : 'No'}</div>
          <div>Current Scale: {Math.round(logoScale.get() * 100) / 100}</div>
          <div>Mode: {isReversing ? 'Reversing' : fadeSequenceTriggered ? 'Fading' : 'Normal'}</div>
          <div className="mt-2 pt-2 border-t border-green-500/20">
            <div>🎡 CLEAN CAROUSEL</div>
            <div>Show: <span className="font-bold">{carouselVisibility.show ? 'YES' : 'NO'}</span></div>
            <div>State: <span className="font-bold text-gray-800">{carouselVisibility.state.toUpperCase()}</span></div>
            <div>Scroll Offset: <span className="font-bold text-blue-600">{Math.round(scrollOffset)}px</span></div>
            <div>Items: <span className="font-bold text-purple-600">{carouselItems.length}</span></div>
            <div>Container Width: <span className="font-bold text-orange-600">300vw</span></div>
            <div>Progress in Fixed: <span className="text-purple-600">
              {carouselVisibility.state === 'fixed-scrolling' ? 
                Math.round(((currentScrollProgress - carouselSlideInEnd) / (carouselFixedPeriod - carouselSlideInEnd)) * 100) + '%' : 
                'N/A'
              }
            </span></div>
            <div className="text-green-600">✅ Position: Bottom of screen</div>
            <div className="text-blue-600">✅ Heading: Integrated above carousel</div>
            <div className="text-orange-600">✅ Width: 300vw (Extended)</div>
            <div className="text-green-600">✅ Slide In: 60%</div>
            <div className="text-green-600">✅ Fixed: 65-90%</div>
            <div className="text-orange-600">🎡 Wheel Exit: 90-100%</div>
            <div className="text-pink-600">⏸️ Center Hold: 3% scroll per item</div>
            <div className="text-indigo-600">🔄 Transition Time: 2% scroll between items</div>
            <div className={`${holdPhaseInfo.inHoldPhase ? 'text-pink-600 font-bold' : 'text-indigo-600'}`}>
              {holdPhaseInfo.inHoldPhase ? '⏸️ HOLDING' : '🔄 SCROLLING'} - Item #{holdPhaseInfo.currentItem + 1} ({holdPhaseInfo.phaseProgress}%)
            </div>
            <div className="text-purple-600">📏 Item Spacing: 1200px (Single Item View)</div>
            <div className="text-cyan-600">👁️ Max Visibility Distance: 0.8x spacing</div>
            <div className="mt-2 pt-2 border-t border-green-500/20">
              <div>🎨 SOLID #347eae BACKGROUND</div>
              <div>Active Item: <span className="font-bold text-blue-600">#{activeCenterItem + 1}</span></div>
              <div className={`${activeCenterItem === 0 && carouselVisibility.show && currentScrollProgress >= carouselSlideInEnd ? 'text-blue-600 font-bold' : 'text-gray-500'}`}>
                {activeCenterItem === 0 && carouselVisibility.show && currentScrollProgress >= carouselSlideInEnd ? '🎨 #347eae SOLID COLOR ACTIVE' : '⚪ WHITE BACKGROUND'}
              </div>
              <div className="text-blue-500">✅ Clean solid background color</div>
              <div className="text-blue-400">✅ Pure #347eae with smooth transitions</div>
              <div className={`mt-1 ${activeCenterItem === 0 ? 'text-amber-800 font-bold' : 'text-gray-400'}`}>
                🤎 Marquee: {activeCenterItem === 0 ? 'BOLD BROWN (Coconut)' : 'WHITE (Default)'}
              </div>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
}