import { motion } from "framer-motion";
import { useState } from "react";

export const FramerMotionTest = () => {
  const [isFixed, setIsFixed] = useState(false);

  return (
    <div>
      <div style={{ height: "500px", background: "#ccc" }}>
        <motion.div
          layout="position"
          style={{ height: "200px", width: "200px", background: "#aaa" }}
          animate={{
            position: isFixed ? "fixed" : "absolute",
            // top: isFixed ? "90vh" : "0",
            // y: isFixed ? 400 : 0,
            // x: isFixed ? 400 : 0,
            scale: isFixed ? 0.5 : 1,
            marginLeft: isFixed ? "-220px" : "0px",
          }}
          transition={{ duration: 1 }}
          onClick={() => {
            setIsFixed(!isFixed);
          }}
        ></motion.div>
      </div>
    </div>
  );
};
