import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

// Tạo một component tái sử dụng cho từng phần bài báo
function Div({ children, resetOnOutOfView = false }) {
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: !resetOnOutOfView }); 
  // Nếu reset thì triggerOnce: false, còn không thì true

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    } else if (resetOnOutOfView) {
      controls.start("hidden");
    }
  }, [controls, inView, resetOnOutOfView]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: 60 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
      }}
    
    >
      {children}
    </motion.div>
  );
}

export default Div;
