import { motion } from 'framer-motion';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Play } from 'lucide-react';

const albums = [
  {
    title: "People in Motion",
    year: "2024",
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop",
    color: "from-orange-400 to-pink-500"
  },
  {
    title: "Harmony House", 
    year: "2021",
    image: "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?w=400&h=400&fit=crop",
    color: "from-purple-400 to-blue-500"
  },
  {
    title: "Fuzzybrain",
    year: "2019", 
    image: "https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=400&h=400&fit=crop",
    color: "from-yellow-400 to-orange-500"
  }
];

const songs = [
  { title: "Can I Call You Tonight?", plays: "2.3M" },
  { title: "Hot Rod", plays: "1.8M" },
  { title: "Close to You", plays: "1.2M" },
  { title: "Listerine", plays: "900K" },
  { title: "Fair Game", plays: "750K" }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut"
    }
  }
};

export default function Music() {
  return (
    <section id="music" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.h2 
          className="text-4xl md:text-5xl text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          Music
        </motion.h2>
        
        {/* Albums */}
        <div className="mb-16">
          <motion.h3 
            className="text-2xl mb-8"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Albums
          </motion.h3>
          <motion.div 
            className="grid md:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {albums.map((album, index) => (
              <motion.div 
                key={index} 
                className="group cursor-pointer"
                variants={itemVariants}
                whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
              >
                <div className="relative overflow-hidden rounded-2xl mb-4">
                  <div className={`absolute inset-0 bg-gradient-to-br ${album.color} opacity-90`}></div>
                  <ImageWithFallback 
                    src={album.image}
                    alt={album.title}
                    className="w-full aspect-square object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <motion.div 
                      className="bg-white rounded-full p-4"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Play size={24} className="text-black ml-1" />
                    </motion.div>
                  </div>
                </div>
                <h4 className="text-xl mb-1">{album.title}</h4>
                <p className="text-gray-600">{album.year}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Popular Songs */}
        <div>
          <motion.h3 
            className="text-2xl mb-8"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Popular Songs
          </motion.h3>
          <motion.div 
            className="bg-white rounded-2xl p-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          >
            {songs.map((song, index) => (
              <motion.div 
                key={index} 
                className="flex items-center justify-between py-4 border-b last:border-b-0 border-gray-100 hover:bg-gray-50 rounded-lg px-4 cursor-pointer group"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ x: 10, transition: { duration: 0.2 } }}
              >
                <div className="flex items-center space-x-4">
                  <motion.div 
                    className="bg-gradient-to-r from-orange-400 to-pink-500 rounded-full p-2 group-hover:scale-110 transition-transform"
                    whileHover={{ rotate: 180 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Play size={16} className="text-white ml-0.5" />
                  </motion.div>
                  <span>{song.title}</span>
                </div>
                <span className="text-gray-500">{song.plays} plays</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}