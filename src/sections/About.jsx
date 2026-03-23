import { motion } from 'framer-motion';

const About = () => {
  return (
    <section id="about" className="py-20 px-6 max-w-5xl mx-auto">
      <motion.h2 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="text-4xl font-bold mb-16 text-center text-primary"
      >
        The Journey <span className="text-white">_</span>
      </motion.h2>

      <div className="space-y-12">
        {/* Step 1 */}
        <div className="flex flex-col md:flex-row gap-8 items-start">
          <div className="flex-1 glass p-8 rounded-2xl border-l-4 border-accent">
            <h3 className="text-xl font-bold text-accent">01. The Beginning</h3>
            <p className="mt-2 text-secondary/70">
              Started with Web Development, mastering the MERN stack to build scalable applications for real clients.
            </p>
          </div>
          <div className="flex-1 hidden md:block" />
        </div>

        {/* Step 2 */}
        <div className="flex flex-col md:flex-row-reverse gap-8 items-start">
          <div className="flex-1 glass p-8 rounded-2xl border-r-4 border-primary">
            <h3 className="text-xl font-bold text-primary">02. Intelligence Integration</h3>
            <p className="mt-2 text-secondary/70">
              Dived deep into AI/ML, focusing on Neural Networks and Adaptive Systems like the AI-AAP platform.
            </p>
          </div>
          <div className="flex-1 hidden md:block" />
        </div>
      </div>
    </section>
  );
};

export default About;