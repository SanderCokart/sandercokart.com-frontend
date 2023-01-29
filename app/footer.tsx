'use client';
import {motion, Variants} from 'framer-motion';

const variants: Variants = {
    hidden: {
        y: '100%'
    },
    visible: {
        y: 0,
        transition: { duration: .5 }
    }
};

export function Footer() {
    return (
        <motion.footer className="h-[50px]  w-full grid place-items-center font-bold overflow-hidden">
            <motion.div className="grid h-full w-full place-items-center bg-red-900 text-white" variants={variants} initial="hidden" animate="visible">
                © {new Date().getFullYear()} Sander Cokart
            </motion.div>
        </motion.footer>
    );
}