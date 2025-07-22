import { motion } from 'framer-motion';

const tourDates = [
  { date: "Mar 15, 2024", city: "Los Angeles", venue: "The Greek Theatre", status: "sold-out" },
  { date: "Mar 18, 2024", city: "San Francisco", venue: "The Fillmore", status: "available" },
  { date: "Mar 22, 2024", city: "Portland", venue: "Crystal Ballroom", status: "available" },
  { date: "Mar 25, 2024", city: "Seattle", venue: "Paramount Theatre", status: "few-left" },
  { date: "Mar 28, 2024", city: "Denver", venue: "Ogden Theatre", status: "available" },
  { date: "Apr 02, 2024", city: "Austin", venue: "Stubb's Bar-B-Q", status: "available" },
  { date: "Apr 05, 2024", city: "Chicago", venue: "Riviera Theatre", status: "few-left" },
  { date: "Apr 08, 2024", city: "New York", venue: "Terminal 5", status: "sold-out" }
];

export default function Tour() {
  return (
    <section id="tour" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.h2 
          className="text-4xl md:text-5xl text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          Tour Dates
        </motion.h2>
        
        <div className="max-w-4xl mx-auto">
          {tourDates.map((show, index) => (
            <motion.div 
              key={index} 
              className="flex flex-col md:flex-row items-start md:items-center justify-between p-6 border-b border-gray-200 hover:bg-gray-50 transition-colors"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ 
                scale: 1.02,
                x: 10,
                transition: { duration: 0.2 }
              }}
            >
              <div className="flex-1 mb-4 md:mb-0">
                <div className="flex flex-col md:flex-row md:items-center md:space-x-8">
                  <motion.div 
                    className="text-orange-500 mb-2 md:mb-0 min-w-[120px]"
                    whileHover={{ scale: 1.05 }}
                  >
                    {show.date}
                  </motion.div>
                  <div>
                    <div className="text-xl mb-1">{show.city}</div>
                    <div className="text-gray-600">{show.venue}</div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                {show.status === 'sold-out' && (
                  <motion.span 
                    className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.1 + 0.3 }}
                    viewport={{ once: true }}
                  >
                    Sold Out
                  </motion.span>
                )}
                {show.status === 'few-left' && (
                  <motion.span 
                    className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.1 + 0.3 }}
                    viewport={{ once: true }}
                    animate={{ 
                      scale: [1, 1.05, 1],
                    }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    Few Left
                  </motion.span>
                )}
                <motion.button 
                  className={`px-6 py-2 rounded-full transition-colors ${
                    show.status === 'sold-out' 
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                      : 'bg-orange-500 text-white hover:bg-orange-600'
                  }`}
                  disabled={show.status === 'sold-out'}
                  whileHover={show.status !== 'sold-out' ? { scale: 1.05 } : {}}
                  whileTap={show.status !== 'sold-out' ? { scale: 0.95 } : {}}
                >
                  {show.status === 'sold-out' ? 'Sold Out' : 'Get Tickets'}
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <p className="text-gray-600 mb-6">Want to be notified about new tour dates?</p>
          <div className="flex flex-col sm:flex-row max-w-md mx-auto gap-4">
            <motion.input 
              type="email" 
              placeholder="Enter your email"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-500"
              whileFocus={{ scale: 1.02 }}
            />
            <motion.button 
              className="bg-orange-500 text-white px-6 py-2 rounded-full hover:bg-orange-600 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Subscribe
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}