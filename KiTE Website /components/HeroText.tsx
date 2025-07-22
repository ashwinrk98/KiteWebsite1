import { motion } from 'framer-motion';

interface HeroTextProps {
  variant: 'all-visible' | 'hide-l1' | 'hide-l2' | 'hide-all';
  onVariantChange: (variant: 'all-visible' | 'hide-l1' | 'hide-l2' | 'hide-all') => void;
}

export default function HeroText({ variant, onVariantChange }: HeroTextProps) {
  // Trigger automatic sequence when Hide-L1 is reached
  if (variant === 'hide-l1') {
    setTimeout(() => onVariantChange('hide-l2'), 100);
  }
  
  // Trigger automatic sequence when Hide-L2 is reached
  if (variant === 'hide-l2') {
    setTimeout(() => onVariantChange('hide-all'), 100);
  }

  return (
    <div className="space-y-8">
      {/* Arc tagline "MAKE LIFE GLOW" - 180° / 300px radius */}
      <motion.div 
        className="relative"
        animate={{ opacity: variant === 'hide-all' ? 0 : 1 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        <svg viewBox="0 0 600 200" className="w-[600px] h-[200px] mx-auto">
          <defs>
            <path id="arc-curve" d="M 100 150 A 200 200 0 0 1 500 150" />
          </defs>
          <text className="text-sm tracking-[0.3em] fill-gray-700">
            <textPath href="#arc-curve" startOffset="50%" textAnchor="middle">
              MAKE LIFE GLOW
            </textPath>
          </text>
        </svg>
      </motion.div>

      {/* Headline line 1: "We're the home for" */}
      <motion.h1 
        className="text-4xl md:text-6xl lg:text-7xl max-w-4xl mx-auto leading-tight text-gray-800"
        animate={{ 
          opacity: (variant === 'hide-l1' || variant === 'hide-l2' || variant === 'hide-all') ? 0 : 1 
        }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        We're the home for
      </motion.h1>

      {/* Headline line 2: "exceptional brands" */}
      <motion.h1 
        className="text-4xl md:text-6xl lg:text-7xl max-w-4xl mx-auto leading-tight text-gray-600 -mt-4"
        animate={{ 
          opacity: (variant === 'hide-l2' || variant === 'hide-all') ? 0 : 1 
        }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        exceptional brands
      </motion.h1>

      {/* Small word-mark DAYGLOW */}
      <motion.div 
        className="text-xl md:text-2xl tracking-[0.3em] text-gray-700 mt-12"
        animate={{ opacity: variant === 'hide-all' ? 0 : 1 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        DAYGLOW
      </motion.div>
    </div>
  );
}