'use client';
import './globals.css';
import {Typewriter} from 'react-simple-typewriter';
import {motion, Variants} from 'framer-motion';

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
            <div className="grid gap-8">
                <motion.h1 initial="hidden" animate="visible" variants={h1Variants} className="text-7xl font-bold">SanderCokart.com</motion.h1>
                <motion.h2 initial="hidden" animate="visible" variants={h2Variants} className="text-4xl font-bold">
                    <Typewriter typeSpeed={70}
                                deleteSpeed={50}
                                delaySpeed={1000}
                                words={words}
                                loop
                                cursor/>
                </motion.h2>
            </div>
        </main>
    );
};

export default Page;