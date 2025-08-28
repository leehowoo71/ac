
import React from 'react';

const Header = () => {
    return (
        React.createElement("header", { className: "bg-slate-900/80 backdrop-blur-sm shadow-lg sticky top-0 z-10" },
            React.createElement("div", { className: "container mx-auto px-4 py-5 text-center" },
                React.createElement("h1", { className: "text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-amber-500" },
                    React.createElement("i", { className: "fas fa-car-burst mr-3" }),
                    "음주운전 예방 캠페인"
                ),
                React.createElement("p", { className: "text-slate-400 mt-2" }, "한 잔의 술, 인생을 바꿀 수 있습니다.")
            )
        )
    );
};

export default Header;
