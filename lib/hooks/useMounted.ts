import {useState, useEffect} from 'react';

const UseMounted = (callback: () => void) => {
    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        setMounted(true);
        callback?.();
    }, []);

    return { mounted };
};

export default UseMounted;