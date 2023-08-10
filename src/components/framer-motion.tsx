'use client';

import { motion } from 'framer-motion';

import type { ReactNode } from 'react';

export { AnimatePresence } from 'framer-motion';

export const MotionDiv = motion.div;
export const MotionSpan = motion.span;
export const MotionImg = motion.img;
export const MotionButton = motion.button;
export const MotionLink = motion.a;
export const MotionInput = motion.input;
export const MotionForm = motion.form;
export const MotionLabel = motion.label;
export const MotionSelect = motion.select;
export const MotionOption = motion.option;
export const MotionTextArea = motion.textarea;

export const MotionH1 = motion.h1;
export const MotionH2 = motion.h2;
export const MotionH3 = motion.h3;
export const MotionH4 = motion.h4;
export const MotionH5 = motion.h5;
export const MotionH6 = motion.h6;
export const MotionP = motion.p;
export const MotionUl = motion.ul;
export const MotionOl = motion.ol;
export const MotionLi = motion.li;
export const MotionTable = motion.table;
export const MotionTHead = motion.thead;
export const MotionTBody = motion.tbody;
export const MotionTFoot = motion.tfoot;
export const MotionTr = motion.tr;
export const MotionTh = motion.th;
export const MotionTd = motion.td;
export const MotionCaption = motion.caption;
export const MotionNav = motion.nav;

interface FramerMotionProps {
  children: ReactNode;
}

const FramerMotion = (props: FramerMotionProps) => {
  return <></>;
};

export default FramerMotion;
