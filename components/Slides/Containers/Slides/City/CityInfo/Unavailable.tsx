import * as React from "react";
import { motion } from "framer-motion";

const Unavailable = () => (
    <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25, ease: "easeInOut" }}
        key="tempunavailable"
        id="tempunavailable"
        className="transform translate-x-0 translate-y-60px scale-x-114-5 scale-y-100 origin-left absolute whitespace-nowrap font-frutiger57-cond pt-noreport-t pl-tempunavailable-l text-white text-tempunavailable text-shadow z-noreport"
    >
        Temporarily Unavailable
    </motion.div>
);

export default Unavailable;
