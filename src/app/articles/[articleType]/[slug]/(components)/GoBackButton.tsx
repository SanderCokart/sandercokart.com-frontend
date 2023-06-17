'use client';
import {useRouter} from 'next/navigation';
import {FaArrowCircleLeft} from 'react-icons/fa';

const GoBackButton = () => {
    const router = useRouter();

    const goBack = () => {
        router.back();
    };
    return (
        <button className="label mb-2 flex items-center gap-2 font-digital text-xl hover:bg-secondary md:text-2xl" onClick={goBack}><FaArrowCircleLeft/><span>Go back</span></button>
    );
};

export default GoBackButton;