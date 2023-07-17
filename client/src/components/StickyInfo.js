import React, { useState, useEffect } from 'react';

const StickyInfo = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY || window.pageYOffset;
            setIsVisible(scrollY > 360);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div
            className={`z-50 fixed top-0 left-0 w-full h-28 bg-gray-200 p-4 transition-transform duration-300 ${isVisible ? 'transform translate-y-0' : 'transform -translate-y-full'
                }`}
        >
            <div className="sticky top-4">
                <h2 className="mb-2 text-lg font-bold">Sticky Info</h2>
                <p className="mb-4 text-gray-700">Bu bilgiler sticky olarak görüntülenecek.</p>
                {/* <div className="flex flex-wrap">
                    <div className="w-1/2">
                        <p className="font-semibold">Bilgi 1:</p>
                        <p>Değer 1</p>
                    </div>
                    <div className="w-1/2">
                        <p className="font-semibold">Bilgi 2:</p>
                        <p>Değer 2</p>
                    </div>
                    <div className="w-1/2">
                        <p className="font-semibold">Bilgi 3:</p>
                        <p>Değer 3</p>
                    </div>
                    <div className="w-1/2">
                        <p className="font-semibold">Bilgi 4:</p>
                        <p>Değer 4</p>
                    </div>
                </div> */}
            </div>
        </div>
    );
};

export default StickyInfo;