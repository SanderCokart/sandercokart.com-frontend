'use client';
import {motion, Variants} from 'framer-motion';
import useMediaQuery from '@/hooks/useMediaQuery';

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
    const isDesktop = useMediaQuery({ from: 'sm', option: 'up' });
    return (
        <footer className="h-[50px] w-full grid place-items-center font-bold overflow-hidden">
            <motion.div className="grid h-full w-full place-items-center bg-red-900 text-white" variants={variants} initial={isDesktop ? 'hidden' : false} animate={isDesktop ? 'visible' : false}>
                © {new Date().getFullYear()} Sander Cokart
            </motion.div>
        </footer>
    );
}