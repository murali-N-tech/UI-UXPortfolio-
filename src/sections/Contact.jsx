import { motion } from 'framer-motion';

const Contact = () => {
  return (
    <section id="contact" className="py-24 sm:py-32 px-4 sm:px-6 relative">
      <div className="max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="relative inline-block"
        >
          <div className="absolute -inset-4 bg-primary/20 blur-3xl rounded-full" />
          <h2 className="text-4xl sm:text-5xl md:text-7xl font-bold text-white relative z-10">
            Ready to <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-highlight">Innovate?</span>
          </h2>
        </motion.div>

        <p className="text-secondary/60 mt-8 mb-12 text-base sm:text-lg max-w-xl mx-auto">
          Currently seeking opportunities to deploy high-impact AI systems and modern web architectures. Let's initiate a connection.
        </p>

        <div className="flex flex-wrap justify-center gap-6">
          <motion.a
            whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(99,102,241,0.4)" }}
            href="mailto:your-email@example.com"
            className="px-8 sm:px-10 py-3.5 sm:py-4 bg-primary text-white font-bold rounded-xl transition-all"
          >
            Send Message
          </motion.a>
          
          <motion.a
            whileHover={{ scale: 1.05 }}
            href="https://linkedin.com/in/murali"
            className="px-8 sm:px-10 py-3.5 sm:py-4 glass text-white font-bold rounded-xl border border-white/10"
          >
            LinkedIn
          </motion.a>
        </div>

        <div className="mt-20 sm:mt-24 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-secondary/40 font-mono text-xs gap-4">
          <p>© 2026 MURALI // ALL SYSTEMS OPERATIONAL</p>
          <div className="flex flex-wrap justify-center gap-6">
            <a href="#" className="hover:text-accent">GITHUB</a>
            <a href="#" className="hover:text-accent">RESUME</a>
            <a href="#" className="hover:text-accent">SOURCE_CODE</a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;