'use client';
import type {ComponentProps} from 'react';

import {AnimatePresence} from 'framer-motion';
import {useTheme} from 'next-themes';
import {FaSun, FaMoon} from 'react-icons/fa';
import {twMerge} from 'tailwind-merge';

import BasicAnimation from '@/components/FramerMotion/BasicAnimation';

import {ascendVariant, descendVariant} from '@/constants/animations/ascendAndDecend';

import useMounted from '@/hooks/useMounted';
export function ThemeToggle({ className,...props }:ComponentProps<'div'>) {
    const { mounted } = useMounted();
    const { setTheme, theme, systemTheme } = useTheme();

    if (!mounted) return null;

    return (
        <div className={twMerge('relative grid place-items-center', className)} {...props}>
            <AnimatePresence mode="wait">
                {(theme === 'dark' || (theme === 'system' && systemTheme === 'dark')) && (
                    <BasicAnimation key="light" variants={ascendVariant}>
                        <FaSun className="cursor-pointer" onClick={() => setTheme('light')}/>
                    </BasicAnimation>
                )}

                {(theme === 'light' || (theme === 'system' && systemTheme === 'light')) && (
                    <BasicAnimation key="dark" variants={descendVariant}>
                        <FaMoon className="cursor-pointer" onClick={() => setTheme('dark')}/>
                    </BasicAnimation>
                )}
            </AnimatePresence>
        </div>
    );
}