import { motion } from 'framer-motion';
import { ImageWithFallback } from './figma/ImageWithFallback';

const photos = [
  {
    src: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&h=400&fit=crop",
    alt: "Live performance 1"
  },
  {
    src: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=600&h=600&fit=crop", 
    alt: "Studio session"
  },
  {
    src: "https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=600&h=400&fit=crop",
    alt: "Live performance 2"
  },
  {
    src: "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?w=600&h=800&fit=crop",
    alt: "Behind the scenes"
  },
  {
    src: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&h=400&fit=crop",
    alt: "Concert crowd"
  },
  {
    src: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=600&h=600&fit=crop",
    alt: "Recording process"
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: "easeOut"
    }
  }
};

export default function Gallery() {
  return (
    <section id="gallery" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.h2 
          className="text-4xl md:text-5xl text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          Gallery
        </motion.h2>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {photos.map((photo, index) => (
            <motion.div 
              key={index} 
              className="group cursor-pointer overflow-hidden rounded-2xl"
              variants={itemVariants}
              whileHover={{ 
                scale: 1.05,
                transition: { duration: 0.3 }
              }}
            >
              <ImageWithFallback
                src={photo.src}
                alt={photo.alt}
                className={`w-full object-cover group-hover:scale-110 transition-transform duration-700 ${
                  index % 4 === 1 || index % 4 === 3 ? 'aspect-square' : 'aspect-[4/3]'
                }`}
              />
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <motion.button 
            className="bg-orange-500 text-white px-8 py-3 rounded-full hover:bg-orange-600 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            View More Photos
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}