import { useEffect, useState } from 'react';

export const useIsMobile = (): boolean => {
    const [isMobile, setIsMobile] = useState(() =>
        typeof window !== 'undefined'
            ? window.matchMedia('(max-width: 768px)').matches
            : false
    );

    useEffect(() => {
        const mediaQuery = window.matchMedia('(max-width: 768px)');

        const handleChange = () => {
            setIsMobile(mediaQuery.matches);
        };
        handleChange();

        mediaQuery.addEventListener('change', handleChange);

        return () => {
            mediaQuery.removeEventListener('change', handleChange);
        };
    }, []);

    return isMobile;
};
