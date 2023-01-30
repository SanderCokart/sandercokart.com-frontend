'use client';

import {useEffect} from 'react';

export function OverflowDetector() {
    function overflowDetector() {
        //if document body is overflowing, add class to body
        (document.body.scrollHeight > window.innerHeight)
        ? document.body.classList.add('overflowing')
        : document.body.classList.remove('overflowing');
    }

    useEffect(() => {
        window.addEventListener('resize', overflowDetector);
        overflowDetector();
        return () => {
            window.removeEventListener('resize', overflowDetector);
        };
    }, []);

    return null;
}