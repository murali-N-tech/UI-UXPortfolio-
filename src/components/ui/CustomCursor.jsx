import { useEffect, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

const CustomCursor = () => {
  const [isHovering, setIsHovering] = useState(false);
  
  // Smooth spring physics for the "motion" feel
  const mouseX = useSpring(0, { stiffness: 150, damping: 20 });
  const mouseY = useSpring(0, { stiffness: 150, damping: 20 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleHover = (e) => {
      // Check if the hovered element is a link, button, or has a 'data-cursor' attribute
      const target = e.target;
      if (target.closest('a') || target.closest('button') || target.closest('[data-cursor]')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleHover);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleHover);
    };
  }, [mouseX, mouseY]);

  return (
    <motion.div
      style={{
        x: mouseX,
        y: mouseY,
        translateX: "-50%",
        translateY: "-50%",
      }}
      animate={{
        width: isHovering ? 80 : 20,
        height: isHovering ? 80 : 20,
        backgroundColor: isHovering ? "rgba(34, 211, 238, 0.1)" : "rgba(99, 102, 241, 1)",
        border: isHovering ? "1px solid rgba(34, 211, 238, 1)" : "0px solid transparent",
      }}
      className="fixed top-0 left-0 rounded-full pointer-events-none z-[9999] hidden md:block mix-blend-screen"
    >
      {isHovering && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <div className="w-1 h-1 bg-accent rounded-full animate-ping" />
        </motion.div>
      )}
    </motion.div>
  );
};

export default CustomCursor;