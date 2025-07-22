import { motion } from 'framer-motion';
import { Shield, FileText } from 'lucide-react';
import kiteNutritionLogo from 'figma:asset/2a6091bb955b5ddb7d3b32a83e5abf7439a5a095.png';
import fssaiLogo from 'figma:asset/6af98d0745e653b7ab08c291d0f9ba294aae0908.png';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row justify-between items-start mb-12 gap-8">
          {/* Brand Section */}
          <div className="flex-1">
            <motion.div
              className="flex items-center space-x-3 mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              {/* KiTE Nutrition Logo */}
              <img 
                src={kiteNutritionLogo} 
                alt="KiTE Nutrition Logo" 
                className="h-16 w-auto"
              />
            </motion.div>
          </div>

          {/* Certification Section */}
          <motion.div
            className="flex flex-col md:flex-row items-start space-y-4 md:space-y-0 md:space-x-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            {/* GSTIN Card */}
            <motion.div
              className="bg-gray-800 rounded-lg p-4 border border-gray-700 min-w-[200px]"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex items-center space-x-3 mb-2">
                <span className="text-sm font-medium text-gray-300">GSTIN</span>
              </div>
              <p className="text-white font-mono text-sm tracking-wide">
                29BVJPA6966Q1Z
              </p>
            </motion.div>
            
            {/* FSSAI Card */}
            <motion.div
              className="bg-gray-800 rounded-lg p-4 border border-gray-700 min-w-[200px]"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex items-center space-x-3 mb-3">
                <Shield className="w-5 h-5 text-blue-400" />
                <span className="text-sm font-medium text-gray-300">FSSAI Certified</span>
              </div>
              <div className="flex items-center space-x-3">
                <img 
                  src={fssaiLogo} 
                  alt="FSSAI Logo" 
                  className="h-10 w-auto"
                  style={{
                    filter: 'brightness(0) invert(1)',
                  }}
                />
                <div className="flex flex-col">
                  <span className="text-xs text-gray-400">License No.</span>
                  <span className="text-white font-mono text-sm">21225192001288</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex justify-center">
            <motion.p
              className="text-gray-400"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
&copy; 2025 Kite Nutrition &trade;
            </motion.p>
          </div>
        </div>
      </div>
    </footer>
  );
}