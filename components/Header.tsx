
import React from 'react';

const Header: React.FC = () => {
    return (
        <header className="bg-slate-900/80 backdrop-blur-sm shadow-lg sticky top-0 z-10">
            <div className="container mx-auto px-4 py-5 text-center">
                <h1 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-amber-500">
                    <i className="fas fa-car-burst mr-3"></i>
                    음주운전 예방 캠페인
                </h1>
                <p className="text-slate-400 mt-2">한 잔의 술, 인생을 바꿀 수 있습니다.</p>
            </div>
        </header>
    );
};

export default Header;
