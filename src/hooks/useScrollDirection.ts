import { useEffect, useState } from 'react';

export function useScrollDirection(threshold = 0) {
    const [scrollDirection, setScrollDirection] = useState<'up' | 'down' | null>(null);
    const [scrollY, setScrollY] = useState(0);

    useEffect(() => {
        let lastY = window.scrollY;

        const onScroll = () => {
            const currentY = window.scrollY || window.pageYOffset;
            const diff = Math.abs(currentY - lastY);

            if (diff < threshold) return;

            if (currentY === 0) {
                setScrollDirection(null);
            } else if (currentY > lastY) {
                setScrollDirection('down');
            } else {
                setScrollDirection('up');
            }

            setScrollY(currentY);
            lastY = currentY;
        };

        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, [threshold]);

    return { scrollDirection, scrollY };
}
