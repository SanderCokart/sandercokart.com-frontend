'use client';
import './globals.css';
import {Typewriter} from 'react-simple-typewriter';
import {motion, Variants} from 'framer-motion';
import Link from 'next/link';

const h1Variants: Variants = {
    hidden: { x: '-100vw' },
    visible: { x: 0, transition: { duration: 2, delay: .5, type: 'spring', bounce: 0.5 } }
};

const h2Variants: Variants = {
    hidden: { x: '100vw' },
    visible: { x: 0, transition: { duration: 3, delay: .5, type: 'spring', bounce: 0.5 } }
};

const Page = () => {

    const words = [
        'This website is under construction...',
        'Please come back later.',
        'Thank you.'
    ];

    return (
        <main className="h-[calc(100%-50px)] grid place-items-center overflow-hidden">
            <div className="grid grid-rows-[1fr,1fr,1fr] gap-8 text-center h-full font-bold">
                <motion.h1 initial="hidden" animate="visible" variants={h1Variants} className="landscape:text-[4vw] portrait:text-[4vh] self-end">SanderCokart.com</motion.h1>
                <motion.h2 initial="hidden" animate="visible" variants={h2Variants} className="landscape:text-[4vw] portrait:text-[4vh]">
                    <Typewriter typeSpeed={70}
                                deleteSpeed={50}
                                delaySpeed={1000}
                                words={words}
                                loop
                                cursor/>
                </motion.h2>
                <motion.h1 initial="hidden" animate="visible" variants={h1Variants} className="landscape:text-[3vw] portrait:text-[3vh] self-end">While waiting please visit <Link className="hover:text-violet-600" href="https://codehouse.sandercokart.com">codehouse.sandercokart.com</Link></motion.h1>
            </div>
        </main>
    );
};

export default Page;