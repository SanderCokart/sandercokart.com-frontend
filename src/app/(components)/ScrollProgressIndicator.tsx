'use client';
import {useScroll, motion} from 'framer-motion';

const ScrollProgressIndicator = () => {
    const { scrollYProgress } = useScroll();
    return (
        <motion.div className="absolute -bottom-0 h-1 w-full bg-secondary dark:bg-secondaryDark"
                    style={{ scaleX: scrollYProgress }}/>
    );
};
export default ScrollProgressIndicator