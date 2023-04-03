import {useLocalStorage} from '@mantine/hooks';
import {AnimatePresence, motion} from 'framer-motion';
import {MdSwipeLeft} from 'react-icons/md';

import {fade} from '@/constants/animations/fade';

import useDev from '@/hooks/useDev';
import useMounted from '@/hooks/useMounted';

const TouchTipNotification = () => {
    const [touched, setTouched] = useLocalStorage({ key: 'swipe-tutorial', defaultValue: false });
    const { mounted } = useMounted();

    useDev(() => {
        setTouched(false);
    });

    if (mounted)
        return (
            <AnimatePresence mode="wait">
                {!touched && (
                    <motion.div animate="visible"
                                className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-8 bg-black/75 md:hidden"
                                exit="exit"
                                initial="hidden"
                                variants={{ ...fade, exit: { ...fade.exit, pointerEvents: 'none' } }}
                                onTouchStart={() => setTouched(true)}>
                        <p className="text-center text-2xl uppercase text-white font-digital">
                            Swipe to see more
                        </p>
                        <MdSwipeLeft className="col-start-2 text-7xl"/>
                    </motion.div>
                )}
            </AnimatePresence>
        );

    return null;
};

export default TouchTipNotification;