import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Palette, Monitor, TrendingUp, Zap } from 'lucide-react';
import proteinBarImage from '../assets/placeholder.png';
import cookiesCreamBarImage from '../assets/placeholder.png';
import mangoBarImage from '../assets/placeholder.png';
import coconutWaterBarImage from '../assets/placeholder.png';

export default function Services() {
  // Create refs for each protein bar image
  const proteinBarRef = useRef(null);
  const cookiesCreamRef = useRef(null);
  const mangoRef = useRef(null);
  const coconutRef = useRef(null);

  // Track when each image is in view - BIDIRECTIONAL with better threshold
  const proteinBarInView = useInView(proteinBarRef, { 
    margin: "-50px",
    amount: 0.3 
  });
  const cookiesCreamInView = useInView(cookiesCreamRef, { 
    margin: "-50px",
    amount: 0.3 
  });
  const mangoInView = useInView(mangoRef, { 
    margin: "-50px",
    amount: 0.3 
  });
  const coconutInView = useInView(coconutRef, { 
    margin: "-50px",
    amount: 0.3 
  });

  // Simplified and more reliable scroll function
  const scrollToPreOrder = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    try {
      const aboutSection = document.getElementById('about');
      if (aboutSection) {
        // Simple, reliable scroll method
        aboutSection.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }
    } catch (error) {
      console.warn('Scroll failed:', error);
    }
  };

  return (
    <section id="services" className="relative min-h-screen py-20">
      {/* Fixed background to prevent scroll conflicts */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-white"></div>
      
      <div className="relative z-10 container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="chewy-heading text-4xl sm:text-5xl lg:text-6xl mb-6">
            Nutrition Facts
          </h2>
        </div>
        
        {/* 4 Rows, 1 Column Layout - with proper spacing */}
        <div className="space-y-20 lg:space-y-32 max-w-4xl mx-auto">
          
          {/* Container Pair 1 - Row 1 */}
          <div className="relative flex items-center justify-start pl-[8%] lg:pl-[5%] min-h-[500px]">
            {/* White Container - larger size, positioned behind, horizontal rectangle */}
            <div className="figma-white-container-services p-5 lg:p-7 min-h-[240px] aspect-[4/3] scale-[1.0] relative z-10 overflow-visible">
              <div className="flex flex-col gap-3 h-full">
                {/* Content container 1 */}
                <div className="flex-1 min-h-[90px] relative">
                  {/* Empty - protein bar image moved outside */}
                </div>
                {/* Content container 2 */}
                <div className="flex-1 min-h-[90px]">
                  {/* Empty container - ready for content */}
                </div>
              </div>
            </div>
            {/* Purple Container - positioned on top with -15% overlap */}
            <div className="figma-light-blue-container p-5 lg:p-6 min-h-[420px] w-[280px] lg:w-[300px] scale-95 relative z-20 -ml-[15%]">
              <div className="flex flex-col pt-4">
                {/* Content container 1 - Ingredients Heading */}
                <div className="flex items-center justify-center mb-4">
                  <h3 className="chewy-heading text-3xl lg:text-4xl">Ingredients</h3>
                </div>
                {/* Content container 2 - Ingredients List */}
                <div className="flex items-start justify-center px-1">
                  <div className="space-y-1.5 font-chewy">
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <span className="mr-2 mt-0.5 text-2xl">1.</span>
                        <div className="flex flex-col -space-y-1">
                          <span className="text-2xl">Protein Blend</span>
                          <span className="text-sm">(Whey & Milk Protein Isolates, Whey Crispy)</span>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2 mt-0.5 text-2xl">2.</span>
                        <div className="flex flex-col -space-y-1">
                          <span className="text-2xl">Dietary fiber</span>
                          <span className="text-sm">(Polydextrose)</span>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2 mt-0.5 text-2xl">3.</span>
                        <div className="flex flex-col -space-y-1">
                          <span className="text-2xl">Natural Sweetener Blend</span>
                          <span className="text-sm">(Allulose, stevia)</span>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2 mt-0.5 text-2xl">4.</span>
                        <div className="flex flex-col -space-y-1">
                          <span className="text-2xl">Almond</span>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2 mt-0.5 text-2xl">5.</span>
                        <div className="flex flex-col -space-y-1">
                          <span className="text-2xl">Dutch Cocoa Powder</span>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2 mt-0.5 text-2xl">6.</span>
                        <div className="flex flex-col -space-y-1">
                          <span className="text-2xl">Cocoa butter</span>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2 mt-0.5 text-2xl">7.</span>
                        <div className="flex flex-col -space-y-1">
                          <span className="text-2xl">Vegetable glycerin</span>
                        </div>
                      </li>
                    </ul>
                    <div className="mt-3 pt-2 border-t border-black/20">
                      <p className="mb-1 text-lg font-chewy">Less than 2% of:</p>
                      <p className="text-lg font-chewy">Natural Flavoring, Sunflower lecithin, Sea salt</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Protein Bar Image - positioned to appear on white container */}
            <motion.div 
              ref={proteinBarRef}
              className="absolute left-[3%] top-1/2 -translate-y-1/2 z-50 pointer-events-none"
              animate={proteinBarInView ? { 
                opacity: 1, 
                y: 0, 
                x: 0, 
                rotate: 0, 
                scale: 1 
              } : { 
                opacity: 0, 
                y: 50, 
                x: -50, 
                rotate: -5, 
                scale: 0.8 
              }}
              transition={{ 
                duration: 0.6, 
                ease: "easeOut"
              }}
            >
              <img 
                src={proteinBarImage} 
                alt="KiTE Protein Bar - Double Chocolate Chunks" 
                className="w-[12rem] h-auto sm:w-[15rem] md:w-[18rem] lg:w-[21rem] xl:w-[24rem] 2xl:w-[26rem] object-contain rotate-12 transform transition-transform hover:rotate-6 hover:scale-105 duration-300"
              />
            </motion.div>
          </div>

          {/* Container Pair 2 - Row 2 */}
          <div className="relative flex items-center justify-start pl-[8%] lg:pl-[5%] min-h-[500px]">
            {/* White Container - larger size, positioned behind, horizontal rectangle */}
            <div className="figma-white-container-services p-5 lg:p-7 min-h-[240px] aspect-[4/3] scale-[1.0] relative z-10 overflow-visible">
              <div className="flex flex-col gap-3 h-full">
                {/* Content container 1 */}
                <div className="flex-1 min-h-[90px] relative">
                  {/* Empty - protein bar image moved outside */}
                </div>
                {/* Content container 2 */}
                <div className="flex-1 min-h-[90px]">
                  {/* Empty container - ready for content */}
                </div>
              </div>
            </div>
            {/* Light Blue Container - positioned on top with -15% overlap */}
            <div className="figma-original-blue-container p-5 lg:p-6 min-h-[420px] w-[280px] lg:w-[300px] scale-95 relative z-20 -ml-[15%]">
              <div className="flex flex-col pt-4">
                {/* Content container 1 - Ingredients Heading */}
                <div className="flex items-center justify-center mb-4">
                  <h3 className="chewy-heading text-3xl lg:text-4xl">Ingredients</h3>
                </div>
                {/* Content container 2 - Ingredients List */}
                <div className="flex items-start justify-center px-1">
                  <div className="space-y-1.5 font-chewy">
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <span className="mr-2 mt-0.5 text-2xl">1.</span>
                        <div className="flex flex-col -space-y-1">
                          <span className="text-2xl">Protein Blend</span>
                          <span className="text-sm">(Whey Protein Isolate, Milk Protein Isolate, Whey Crispy)</span>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2 mt-0.5 text-2xl">2.</span>
                        <div className="flex flex-col -space-y-1">
                          <span className="text-2xl">Polydextrose</span>
                          <span className="text-sm">(Dietary fiber)</span>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2 mt-0.5 text-2xl">3.</span>
                        <div className="flex flex-col -space-y-1">
                          <span className="text-2xl">Natural Sweetener Blend</span>
                          <span className="text-sm">(Allulose, stevia)</span>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2 mt-0.5 text-2xl">4.</span>
                        <div className="flex flex-col -space-y-1">
                          <span className="text-2xl">Almonds</span>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2 mt-0.5 text-2xl">5.</span>
                        <div className="flex flex-col -space-y-1">
                          <span className="text-2xl">Cocoa butter</span>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2 mt-0.5 text-2xl">6.</span>
                        <div className="flex flex-col -space-y-1">
                          <span className="text-2xl">Vegetable Glycerin</span>
                        </div>
                      </li>
                    </ul>
                    <div className="mt-3 pt-2 border-t border-black/20">
                      <p className="mb-1 text-lg font-chewy">Less than 2% of:</p>
                      <p className="text-lg font-chewy">Natural flavoring, Dutch cocoa powder, Coconut oil, Sunflower Lecithin, Sea Salt, Banking Soda</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Cookies & Cream Protein Bar Image - positioned to appear on white container */}
            <motion.div 
              ref={cookiesCreamRef}
              className="absolute left-[3%] top-1/2 -translate-y-1/2 z-50 pointer-events-none"
              animate={cookiesCreamInView ? { 
                opacity: 1, 
                y: 0, 
                x: 0, 
                rotate: 0, 
                scale: 1 
              } : { 
                opacity: 0, 
                y: 50, 
                x: -50, 
                rotate: -5, 
                scale: 0.8 
              }}
              transition={{ 
                duration: 0.6, 
                ease: "easeOut"
              }}
            >
              <img 
                src={cookiesCreamBarImage} 
                alt="KiTE Protein Bar - Cookies & Cream" 
                className="w-[12rem] h-auto sm:w-[15rem] md:w-[18rem] lg:w-[21rem] xl:w-[24rem] 2xl:w-[26rem] object-contain rotate-12 transform transition-transform hover:rotate-6 hover:scale-105 duration-300"
              />
            </motion.div>
          </div>

          {/* Container Pair 3 - Row 3 */}
          <div className="relative flex items-center justify-start pl-[8%] lg:pl-[5%] min-h-[500px]">
            {/* White Container - larger size, positioned behind, horizontal rectangle */}
            <div className="figma-white-container-services p-5 lg:p-7 min-h-[240px] aspect-[4/3] scale-[1.0] relative z-10 overflow-visible">
              <div className="flex flex-col gap-3 h-full">
                {/* Content container 1 */}
                <div className="flex-1 min-h-[90px] relative">
                  {/* Empty - protein bar image moved outside */}
                </div>
                {/* Content container 2 */}
                <div className="flex-1 min-h-[90px]">  
                  {/* Empty container - ready for content */}
                </div>
              </div>
            </div>
            {/* Mango Yellow Container - positioned on top with -15% overlap */}
            <div className="figma-mango-yellow-container p-5 lg:p-6 min-h-[420px] w-[280px] lg:w-[300px] scale-95 relative z-20 -ml-[15%]">
              <div className="flex flex-col pt-4">
                {/* Content container 1 - Ingredients Heading */}
                <div className="flex items-center justify-center mb-4">
                  <h3 className="chewy-heading text-3xl lg:text-4xl">Ingredients</h3>
                </div>
                {/* Content container 2 - Ingredients List */}
                <div className="flex items-start justify-center px-1">
                  <div className="space-y-1.5 font-chewy">
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <span className="mr-2 mt-0.5 text-2xl">1.</span>
                        <div className="flex flex-col -space-y-1">
                          <span className="text-2xl">Protein Blend</span>
                          <span className="text-sm">(Whey Protein Isolate, Milk Protein Isolate, Whey Crispy)</span>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2 mt-0.5 text-2xl">2.</span>
                        <div className="flex flex-col -space-y-1">
                          <span className="text-2xl">Polydextrose</span>
                          <span className="text-sm">(Dietary fiber)</span>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2 mt-0.5 text-2xl">3.</span>
                        <div className="flex flex-col -space-y-1">
                          <span className="text-2xl">Natural Sweetener Blend</span>
                          <span className="text-sm">(Allulose, stevia)</span>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2 mt-0.5 text-2xl">4.</span>
                        <div className="flex flex-col -space-y-1">
                          <span className="text-2xl">Almond</span>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2 mt-0.5 text-2xl">5.</span>
                        <div className="flex flex-col -space-y-1">
                          <span className="text-2xl">Alphonso Mango</span>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2 mt-0.5 text-2xl">6.</span>
                        <div className="flex flex-col -space-y-1">
                          <span className="text-2xl">Cocoa Butter</span>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2 mt-0.5 text-2xl">7.</span>
                        <div className="flex flex-col -space-y-1">
                          <span className="text-2xl">Vegetable Glycerin</span>
                        </div>
                      </li>
                    </ul>
                    <div className="mt-3 pt-2 border-t border-black/20">
                      <p className="mb-1 text-lg font-chewy">Less than 2% of:</p>
                      <p className="text-lg font-chewy">Natural Flavoring, Sunflower lecithin, Sea salt</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Mango Protein Bar Image - positioned to appear on white container */}
            <motion.div 
              ref={mangoRef}
              className="absolute left-[3%] top-1/2 -translate-y-1/2 z-50 pointer-events-none"
              animate={mangoInView ? { 
                opacity: 1, 
                y: 0, 
                x: 0, 
                rotate: 0, 
                scale: 1 
              } : { 
                opacity: 0, 
                y: 50, 
                x: -50, 
                rotate: -5, 
                scale: 0.8 
              }}
              transition={{ 
                duration: 0.6, 
                ease: "easeOut"
              }}
            >
              <img 
                src={mangoBarImage} 
                alt="KiTE Protein Bar - Alphonso Mango" 
                className="w-[12rem] h-auto sm:w-[15rem] md:w-[18rem] lg:w-[21rem] xl:w-[24rem] 2xl:w-[26rem] object-contain rotate-12 transform transition-transform hover:rotate-6 hover:scale-105 duration-300"
              />
            </motion.div>
          </div>

          {/* Container Pair 4 - Row 4 */}
          <div className="relative flex items-center justify-start pl-[8%] lg:pl-[5%] min-h-[500px]">
            {/* White Container - larger size, positioned behind, horizontal rectangle */}
            <div className="figma-white-container-services p-5 lg:p-7 min-h-[240px] aspect-[4/3] scale-[1.0] relative z-10 overflow-visible">
              <div className="flex flex-col gap-3 h-full">
                {/* Content container 1 */}
                <div className="flex-1 min-h-[90px] relative">
                  {/* Empty - protein bar image moved outside */}
                </div>
                {/* Content container 2 */}
                <div className="flex-1 min-h-[90px]">
                  {/* Empty container - ready for content */}
                </div>
              </div>
            </div>
            {/* Brown Container - positioned on top with -15% overlap */}
            <div className="figma-brown-container p-5 lg:p-6 min-h-[420px] w-[280px] lg:w-[300px] scale-95 relative z-20 -ml-[15%]">
              <div className="flex flex-col pt-4">
                {/* Content container 1 - Ingredients Heading */}
                <div className="flex items-center justify-center mb-4">
                  <h3 className="chewy-heading text-3xl lg:text-4xl">Ingredients</h3>
                </div>
                {/* Content container 2 - Ingredients List */}
                <div className="flex items-start justify-center px-1">
                  <div className="space-y-1.5 font-chewy">
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <span className="mr-2 mt-0.5 text-2xl">1.</span>
                        <div className="flex flex-col -space-y-1">
                          <span className="text-2xl">Protein Blend</span>
                          <span className="text-sm">(Whey Protein Isolate, Milk Protein Isolate, Whey Crispy)</span>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2 mt-0.5 text-2xl">2.</span>
                        <div className="flex flex-col -space-y-1">
                          <span className="text-2xl">Polydextrose</span>
                          <span className="text-sm">(Dietary fiber)</span>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2 mt-0.5 text-2xl">3.</span>
                        <div className="flex flex-col -space-y-1">
                          <span className="text-2xl">Natural Sweetener Blend</span>
                          <span className="text-sm">(Allulose, stevia)</span>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2 mt-0.5 text-2xl">4.</span>
                        <div className="flex flex-col -space-y-1">
                          <span className="text-2xl">Almond</span>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2 mt-0.5 text-2xl">5.</span>
                        <div className="flex flex-col -space-y-1">
                          <span className="text-2xl">Coconut</span>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2 mt-0.5 text-2xl">6.</span>
                        <div className="flex flex-col -space-y-1">
                          <span className="text-2xl">Cocoa Butter</span>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2 mt-0.5 text-2xl">7.</span>
                        <div className="flex flex-col -space-y-1">
                          <span className="text-2xl">Vegetable glycerin</span>
                        </div>
                      </li>
                    </ul>
                    <div className="mt-3 pt-2 border-t border-black/20">
                      <p className="mb-1 text-lg font-chewy">Less than 2% of:</p>
                      <p className="text-lg font-chewy">Natural Flavoring, Sunflower lecithin, Sea salt</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Coconut Water Protein Bar Image - positioned to appear on white container */}
            <motion.div 
              ref={coconutRef}
              className="absolute left-[3%] top-1/2 -translate-y-1/2 z-50 pointer-events-none"
              animate={coconutInView ? { 
                opacity: 1, 
                y: 0, 
                x: 0, 
                rotate: 0, 
                scale: 1 
              } : { 
                opacity: 0, 
                y: 50, 
                x: -50, 
                rotate: -5, 
                scale: 0.8 
              }}
              transition={{ 
                duration: 0.6, 
                ease: "easeOut"
              }}
            >
              <img 
                src={coconutWaterBarImage} 
                alt="KiTE Protein Bar - Coconut Water Bliss" 
                className="w-[12rem] h-auto sm:w-[15rem] md:w-[18rem] lg:w-[21rem] xl:w-[24rem] 2xl:w-[26rem] object-contain rotate-12 transform transition-transform hover:rotate-6 hover:scale-105 duration-300"
              />
            </motion.div>
          </div>
        </div>
        
        {/* Pre Order Now Button - Changed to black color */}
        <div className="relative z-50 text-center mt-20 mb-10">
          <div className="inline-block relative">

          </div>
        </div>
      </div>
    </section>
  );
}